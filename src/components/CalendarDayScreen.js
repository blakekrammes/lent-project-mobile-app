import React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Image, Slider, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Audio } from 'expo';

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
      }
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
          <View style={{flex: 9}}>
            <ScrollView style={{}}> 
          {/* <TouchableHighlight
            // style={{flex: 9}} 
          //   onPress={() => {
          //   this.props.navigation.dispatch(StackActions.reset({
          //     index: 0,
          //     actions: [
          //       NavigationActions.navigate({ routeName: 'Home' })
          //     ],
          //   })) 
          // }}
          // > */}
            
              <Image source={require('../img/photo1.png')} 
                              style={{width: '100%', height: 500}}
                              resizeMode="cover"
                              >        
              </Image>
              <Text style={{backgroundColor: 'white', padding: 8}}>
                <Text style={styles.titleText}>
                  {'Day 30 - Monday, December 31'} 
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'Born of God'}
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'Scripture: John 1:11-13'}
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'He came to his own, and his own people did not receive him. But to all who did receive him, who believed in his name, he gave the right to become children of God, who were born, not of blood nor of the will of the flesh nor of the will of man, but of God.'}
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'Poetry:'} 
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'Author’s Prayer'} 
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'by Ilya Kaminsky'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'If I speak for the dead, I must leave'} 
                  {'\n'}
                  {'this animal of my body,'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'I must write the same poem over and over,'} 
                  {'\n'}
                  {'for an empty page is the white flag of their surrender.'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'If I speak for them, I must walk on the edge'} 
                  {'\n'}
                  {'of myself, I must live as a blind man,'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'who runs through rooms without'} 
                  {'\n'}
                  {'touching the furniture.'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'Yes, I live. I can cross the streets asking “What year is it?”'} 
                  {'\n'}
                  {'I can dance in my sleep and laugh'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'in front of the mirror.'} 
                  {'\n'}
                  {'Even sleep is a prayer, Lord,'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'I will praise your madness, and'} 
                  {'\n'}
                  {'in a language not mine, speak'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'of music that wakes us, music'} 
                  {'\n'}
                  {'in which we move. For whatever I say'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'is a kind of petition, and the darkest'}
                  {'\n'} 
                  {'days must I praise.'} 
                  {'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'PINAKIS AGRAPHOS'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'Imagine you are able to go back and witness that first day of creation. Everything is formless and void and in the darkness you hear the waters of earth raging and surging with a wild violence and unbounded chaos. The violence is rivaled only by the loneliness of nonexistence. Then a stillness comes and a rest and you feel the Holy Presence of God’s Spirit gently, but quietly descending above the waters. Then nothing happens and you wait.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'You know that God is amidst the desolation, but the silence is overwhelming: an entity in itself, and still nothing happens. There is only rest for what seems like an eon and still you wait. When God speaks on that first day and suddenly the light breaks through, it is unlike anything you could have ever expected or anticipated and suddenly there is the beginning of order. Day and night are separate and the cosmos throbs with the energy and passion of God’s desire for this new beginning. It is the most glorious and amazing unfolding of events and each day dawns upon you with more beauty and creative zeal than the first. Sunday through Saturday are subsequently more poetic than anything C.S. Lewis envisioned in the founding of Narnia and more epic than the greatest imaginings of Milton.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'You see the dry land drawn forth from chaos and suddenly green sprouts burst into upward motion from the ground as grass, trees, and flowering saplings crawl over every slope and into every valley spreading shades of lavender and green and maroon, conquering the desolate horizons with color. Fruit trees blossom and streams of purest water collect into rivers and fountains in preparation for the feeding of multitudes. In the presence of God’s voice there is glory everywhere. Mysterious creatures play in the depths, and the waves of the sea sparkle with the newly created lights of heaven. What’s more, is that there is absolutely no conflict or guile among the animals which awaken among the new meadows and plains of this wondrous week. Baby deer and gazelles prance unafraid among lion cubs, nuzzling each other with curiosity and eager playfulness for new companions as they explore the wonderful new thickets and groves beneath the warmth of springtime sun. The sixth day ends with God calling forth the most beautiful and glorious of his creatures to shepherd this work, a man and a woman, and everything is perfect. God rests on the seventh day… and then you see his new shepherds ruin everything.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'It is far too easy to forget why Advent is important to humanity, but if you could have only seen Creation in such all-surpassing perfection you would certainly shudder to think of what we, in the legacy of Adam have done to our home. In the butterfly effect of one sin entire species have been exterminated, genocides have been committed, and the beauty of paradise has been all but wiped away with the exploitation of our commercial lusts. In the aftermath it remains no wonder that among our best thinkers, Charles Darwin could only describe nature’s dynamic ecological relationships as “the warring of the species” between flora and fauna resulting in the survival of the fittest and elimination of the weakest. God’s intended shepherds have been entirely complicit in this degradation of the earth, but unfortunately, their sins and ours were far greater than any scars we’ve made to the environment. In the lust of the flesh, the lust of our eyes, and the pride of life we have defamed God’s image on our souls. The beautiful, radiant handiwork of His creation which reached its apex in our being has been so abysmally marred that if, like Dorian Gray, we could see the state of our souls as paintings on a canvas, we would surely draw back in horror. The divine art the Creator intended has become too grotesque to even look upon.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'This is why we commemorate the Advent season. A baby came in his innocence to wipe the slate clean and let us begin again. This baby was none other than God himself who rested over the waters at the first creation and His coming in human form signified that God had not given up on His original work. The forms and expressions of His holy imagination would be made anew at any cost, even the washing of His own blood, so that peace and harmony could be restored and death would be forever conquered. We would become like this baby in Advent, as newborns. Once created and now created anew we would have the opportunity to participate in composing new stories for our lives.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'And yet, though rebirth is instantaneous, redemption is a process. Not only is it painful to let go of the broken identities we have made for ourselves in sin, but once cleansed by Jesus’ blood we must at times sit in the formless void waiting for the Spirit of God to hover over our chaos and bring us to rest until He discerns we are ready for Him to continue His creative work. We may know that we are cleansed from sin a long time before we ever feel that our story picks up again and, for many, once the initial joy of new creation wears off we spend years waiting.  Nothing seems to be happening.  It is in times like these that we should not lose hope for in this rebirth we have been born ‘not of blood nor of the will of the flesh nor of the will of man, but of God.’ Though we are not inactive in this new story, we are not truly the authors of this transformation. Certain details of this artwork may appear bold and vivid, jumping forth from the page, while others may be dull or dark, filled with days of silence, uncertainty, and unsatisfied longing. Yet if we are able to rest our hearts we can be confident that God is carefully and gently removing the things from our lives which might conflict with the beauty He intends for us, so that, like the Tabula Rasa in today’s artwork we can present ourselves unblemished for a brand-new portrait of divine grandeur. Rest in this.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.paragraphText}>
                  {'God’s Spirit hovers over you.'}
                  {'\n'} 
                  {'\n'}
                </Text>
                <Text style={styles.titleText}>
                  {'Prayer:'}
                  {'\n'} 
                </Text>
                <Text style={styles.paragraphText}>
                  {'Come Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created. And You shall renew the face of the earth. O, God, who by the light of the Holy Spirit, did instruct the hearts of the faithful, grant that by the same Holy Spirit we may be truly wise and ever enjoy His consolations,'}
                  {'\n'} 
                  {'Through Christ Our Lord, Amen.'}
                  {'\n'} 
                  {'-A Catholic Prayer'}
                  {'\n'} 
                  {'\n'} 
                </Text>
                <Text style={styles.titleText}>
                  {'Jamie Bos'}
                  {'\n'} 
                </Text>
                <Text style={styles.paragraphText}>
                  {'Academic Advisor/First Year Seminar Instructor'}
                  {'\n'} 
                  {'Biola University'}
                  {'\n'} 
                </Text>
              </Text>
            
            {/* <View>
              
            </View> */}
          {/* </TouchableHighlight> */}
            </ScrollView> 
          </View>
        
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(68,68,68)'}}>
          {/* <Image source={require('../img/icons/music.png')} 
                  style={{width: 20, height: 20, marginRight: 5, marginLeft: 5}}></Image> */}
          {/* <Text style={{color: 'rgb(185,185,185)'}}>Music:</Text> */}
          <TouchableOpacity onPress={() => {
            this.playAndPauseAudio();
          }}>
            <Image source={playButtonSource} 
                    style={{width: 25, height: 25, marginRight: 8, marginLeft: 8}}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              this.stopAudio();
          }}>
            <Image source={require('../img/icons/stop.png')} 
                    style={{width: 25, height: 25, marginRight: 8, marginLeft: 8}}></Image>
          </TouchableOpacity>
          <Text style={{color: 'white', width: 40}}>{`${this.state.currentTime.minutes}:${this.state.currentTime.seconds}`}</Text>
          <TouchableWithoutFeedback onPressIn={() => {this.setState({ sliderTouched: true })}} >
            <Slider style={{minWidth: 130, height: 300, marginLeft: 8 }} 
                    value={this.state.sliderValue} 
                    onSlidingComplete={this._onSeekSliderSlidingComplete.bind(this)} />
          </TouchableWithoutFeedback>
          <Text style={{color: 'white', marginLeft: 8}}>{`${this.state.totalTime.minutes}:${this.state.totalTime.seconds}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  titleText: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  paragraphText: {
    fontSize: 11,
    lineHeight: 15
  }

});