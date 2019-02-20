import React from 'react';
import { Text, View, ImageBackground, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Image, Slider } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Audio } from 'expo';

let soundObject;

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
      sliderTouched: false
    };
  }

  _onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying
      });
      if (status.didJustFinish) {
        this.setState({
          playbackInstancePosition: 0,
          isPlaying: false,
          reachedEnd: true
        });
      }
    } else {
      if (status.error) {
        alert(status.error);
      }
    }
  }

  _getSeekSliderPosition(value) {
    // return if the audio is playing while the user is moving the slider
    if (this.state.isPlaying && this.state.sliderTouched) {
      return;
    } else if (this.state.playbackInstancePosition !== null 
            && this.state.playbackInstanceDuration !== null) {
      return (this.state.playbackInstancePosition / this.state.playbackInstanceDuration);  
    } else {
        return 0;
    }
  }

  // _onSeekSliderValueChange(value) {
  //   if (this.state.playbackInstance !== null && !this.state.isSeeking) {
  //     this.isSeeking = true;
  //     // this.state.shouldPlayAtEndOfSeek = this.state.shouldPlay;
  //     this.state.playbackInstance.pauseAsync();
  //   }
  // }

  async _onSeekSliderSlidingComplete(value) {
    console.log(value)
    let seekPosition;
    // if it's repeated and playing
    if (this.state.playbackInstance !== null && this.state.isPlaying) {
      // this.state.isSeeking = false;
      try {
        await this.state.playbackInstance.playFromPositionAsync(seekPosition);
        // await this.state.playbackInstance.playAsync();
      } catch (error) {
        alert(error);
      } // if it's not playing set it at the new position without playing it
    } else if (!this.state.isPlaying) { 
        try {
          // if it's null, you don't need to worry about loading and adding the playbackStatusUpdate callback here
          if (this.state.playbackInstance === null) {
            await this.setState({
              playbackInstance: new Audio.Sound()
            });
            // await this.state.playbackInstance.setStatusAsync(50);
            await this.state.playbackInstance.loadAsync(require('../assets/sounds/early_morning_fog.mp3'));
            await this.state.playbackInstance.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate.bind(this));
          }
          await this.setState({ playbackInstancePosition: value });
          console.log(this.state.playbackInstancePosition)
          seekPosition = value * this.state.playbackInstanceDuration;
          await this.state.playbackInstance.setPositionAsync(seekPosition);
          // console.log(this.state.playbackInstancePosition, this.state.playbackInstanceDuration)
        } catch (error) {
            alert(error);
          }
      }
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
        console.log(this.state.playbackInstancePosition)
        if (this.state.playbackInstance !== null) {
          if (this.state.reachedEnd) {
            await this.state.playbackInstance.replayAsync(); // check if it has been set without playing it yet
            this.setState({ reachedEnd: false });
          } else if (this.state.playbackInstancePosition !== 0) {
            console.log('here')
            await this.state.playbackInstance.playFromPositionAsync(this.state.playbackInstancePosition / this.state.playbackInstanceDuration);
          } else {
            console.log('paused but play again')
            await this.state.playbackInstance.playAsync();
            this.setState({
              isPlaying: true
            });
          }
        } else {
            await this.setState({
              isPlaying: true,
              playbackInstance: new Audio.Sound()
            });
            if (this.state.playbackInstancePosition === null) {
              await this.state.playbackInstance.loadAsync(require('../assets/sounds/early_morning_fog.mp3'));
              this.state.playbackInstance.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate.bind(this));
              await this.state.playbackInstance.playAsync();
            }
        }
      } else {
        await this.state.playbackInstance.pauseAsync();
        this.setState({
          isPlaying: false
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  async stopAudio() {
    if (this.state.playbackInstance !== null) {
      try {
        await this.state.playbackInstance.stopAsync();
        this.setState({
          isPlaying: false,
          // move it back to the beginning
          playbackInstancePosition: 0
        });
      } catch (error) {
        alert(error);
      }
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
        <TouchableHighlight
          style={{flex: 9}} 
          onPress={() => {
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' })
            ],
          })) 
        }}>
          <ImageBackground source={require('../img/photo1.png')} 
                          style={{flex: 1, height: undefined, width: undefined}}
                          resizeMode="cover"
                          >
          
          </ImageBackground>
        </TouchableHighlight>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(68,68,68)'}}>
            <Image source={require('../img/icons/music.png')} 
                    style={{width: 20, height: 20, marginRight: 5, marginLeft: 5}}></Image>
            <Text style={{color: 'rgb(185,185,185)'}}>Music:</Text>
            <TouchableOpacity onPress={() => {
              this.playAndPauseAudio();
            }}>
              <Image source={playButtonSource} 
                      style={{width: 25, height: 25, marginRight: 10, marginLeft: 10}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (this.state.isPlaying === true) {
                this.stopAudio();
              }
            }}>
              <Image source={require('../img/icons/stop.png')} 
                      style={{width: 25, height: 25, marginRight: 10, marginLeft: 10}}></Image>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPressIn={() => { this.setState({ sliderTouched: true })}}
                                      onPressOut={() => { this.setState({ sliderTouched: false })}} >
              <Slider style={{width: 130, height: 100, marginLeft: 10 }} 
                      value={this._getSeekSliderPosition()} 
                      // onValueChange={this._onSeekSliderValueChange.bind(this)} 
                      onSlidingComplete={this._onSeekSliderSlidingComplete.bind(this)} />
            </TouchableWithoutFeedback>
          </View>
      </View>
    );
  }
}