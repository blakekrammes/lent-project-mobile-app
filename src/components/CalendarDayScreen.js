import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Image, Slider, ScrollView, Dimensions } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Audio } from 'expo';
import Devotional from './Devotional';

export default class CalendarDayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackInstance: null,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      isSeeking: false,
      shouldPlay: false,
      isPlaying: false,
      shouldPlayAtEndOfSeek: false,
      reachedEnd: false,
      playbackStatusIsUpdating: false,
      sliderTouched: false,
      slideBeforePlay: false,
      sliderValue: 0,
      totalTime: {
        minutes: '00',
        seconds: '00'
      },
      currentTime: {
        minutes: '00',
        seconds: '00'
      },
      dimensions: Dimensions.get('window')
    };
  }

  componentDidMount() {
    if (this.state.playbackInstance !== null) {
      this.state.playbackInstance.unloadAsync();
    }
    this.loadAudio();
  }

  componentWillUnmount() {
    if (this.state.playbackInstance !== null) {
      this.state.playbackInstance.unloadAsync();
    }
  }

  _onPlaybackStatusUpdate(status) {
    
    if (status.isLoaded) {
      // if we come to the end of the track, reset the slider
      if (status.didJustFinish || this.state.reachedEnd) {
        this.setState({
          sliderValue: null,
          // isPlaying: false,
          reachedEnd: true,
          playbackInstancePosition: 0
        });
        this.setCurrentTime();
        // only if the slider isn't being moved through the track do we set the value
        // otherwise it keeps jumping back to the beginning
      } else if (!this.state.sliderTouched) {
        this.setState({
          sliderValue: status.positionMillis / status.durationMillis
        });
      }
      if (!this.state.reachedEnd) {
        this.setState({
          playbackInstancePosition: status.positionMillis,
          playbackInstanceDuration: status.durationMillis,
          shouldPlay: status.shouldPlay,
          isPlaying: status.isPlaying
        });
        // every time the position updates
        this.setCurrentTime();
        if (this.state.playbackInstanceDuration !== null) {
          // after everything is loaded, set the total time
          this.setTime();
        }
      }
    } else {
      if (status.error) {
        alert(status.error);
      }
    }
  }

  async _onSeekSliderSlidingComplete(value) {

    if (this.state.playbackInstance === null) {
      this.setState({ slideBeforePlay: true });
    }
    
    let seekPosition;
    // if it's repeated and playing
    if (this.state.isPlaying) {
      // this.state.isSeeking = false;
      try {
        seekPosition = value * this.state.playbackInstanceDuration;
        await this.state.playbackInstance.playFromPositionAsync(seekPosition);
        this.setState({ sliderTouched: false })
      } catch (error) {
        alert(error);
      } // if it's not playing set it at the new position without playing it
    } else { 
        try {
          await this.setState({ playbackInstancePosition: value });
          seekPosition = value * this.state.playbackInstanceDuration;
          await this.state.playbackInstance.setPositionAsync(seekPosition);
          this.setState({ sliderTouched: false })
        } catch (error) {
            alert(error);
          }
      }
  }

  async loadAudio() {
    if (this.state.playbackInstance === null) {
      await this.setState({
        playbackInstance: new Audio.Sound()
      });
      await this.state.playbackInstance.loadAsync(require('../assets/sounds/early_morning_fog.mp3'));
      await this.state.playbackInstance.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate.bind(this));
    }
  }

  async setTime() {
    let minutes = parseInt((this.state.playbackInstanceDuration / (1000 * 60)) % 60);
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    } else {
      minutes = minutes.toString();
    }
    await this.setState({
      totalTime: {
        minutes: minutes,
        seconds: parseInt((this.state.playbackInstanceDuration / 1000) % 60).toString()
      }
    });
  }

  async setCurrentTime() {
    let minutes = parseInt((this.state.playbackInstancePosition / (1000 * 60)) % 60);
    let seconds = parseInt((this.state.playbackInstancePosition / 1000) % 60);
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    } else {
      minutes = minutes.toString();
    }
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    } else {
      seconds = seconds.toString();
    }
    await this.setState({
      currentTime: {
        minutes: minutes,
        seconds: seconds
      }
    });

  }

  async playAndPauseAudio() {
    try {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true
      });
    } catch (error) {
      alert(error);
    }
    
    try { // if state is initial or paused
      if (this.state.isPlaying === false) {
        // for multiple audio files on diff days, you may need to unload first
        // if it's a repeat of track
        if (this.state.reachedEnd) {
          await this.state.playbackInstance.replayAsync(); // check if it has been set without playing it yet
          this.setState({ reachedEnd: false });
          this.setState({ sliderTouched: false })
        } else {
          await this.state.playbackInstance.playAsync();
          this.setState({
            isPlaying: true,
            sliderTouched: false
          });
        }
      } else {
        await this.state.playbackInstance.pauseAsync();
        this.setState({
          isPlaying: false,
          sliderTouched: false
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  async stopAudio() {
    try {
      await this.state.playbackInstance.stopAsync();
      await this.setState({
        isPlaying: false,
        // move it back to the beginning
        sliderValue: null
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    if (this.state.isPlaying === true) {
      playButtonSource = require('../img/icons/pause.png');
    } else {
      playButtonSource = require('../img/icons/play.png');
    }

    return ( 
      <View style={{ backgroundColor: '#000', flex: 1}}>
          <View style={{
            
            flex: 9,
            flexDirection: 'column'
            
            
            }}>
            <ScrollView style={{}}>           
              <Image source={require('../img/photo1.png')} 
                     style={{width: this.state.dimensions.width, height: this.state.dimensions.height}}
                              
                              >        
              </Image>
              <View style={{backgroundColor: 'white', padding: 8}}>
                <TouchableHighlight
                        onPress={() => {
                        this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Home' })
                        ],
                        })) 
                }}
                >
                    <Text style={{textDecorationLine: 'underline', color: '#2d6bb8'}}>
                        {'< Back to Calendar'}
                        {'\n'}
                    </Text>
                </TouchableHighlight>
                <Devotional />
              </View>
              
            
            {/* <View>
              
            </View> */}
          {/* </TouchableHighlight> */}
            </ScrollView> 
          </View>
        
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(68,68,68)'}}>
          {/* <Image source={require('../img/icons/music.png')} 
                  style={{width: 20, height: 20, marginRight: 5, marginLeft: 5}}></Image> */}
          {/* <Text style={{color: 'rgb(185,185,185)'}}>Music:</Text> */}
          <TouchableOpacity onPress={() => {
            this.playAndPauseAudio();
          }}>
            <Image source={playButtonSource} 
                    style={{width: 25, height: 25, marginRight: 8, marginLeft: 8
                    }}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              this.stopAudio();
          }}>
            <Image source={require('../img/icons/stop.png')} 
                    style={{width: 25, height: 25, marginRight: 8, marginLeft: 8
                    }}></Image>
          </TouchableOpacity>
          <Text style={{color: 'rgb(187,187,187)', width: 39
          }}>{`${this.state.currentTime.minutes}:${this.state.currentTime.seconds}`}</Text>
          <TouchableWithoutFeedback onPressIn={() => {this.setState({ sliderTouched: true })}} >
            <Slider style={{minWidth: 130, height: 300, marginLeft: 8}} 
                    value={this.state.sliderValue} 
                    onSlidingComplete={this._onSeekSliderSlidingComplete.bind(this)} />
          </TouchableWithoutFeedback>
          <Text style={{color: 'rgb(187,187,187)', marginLeft: 8}}>{`${this.state.totalTime.minutes}:${this.state.totalTime.seconds}`}</Text>
        </View>
      </View>
    );
  }
}