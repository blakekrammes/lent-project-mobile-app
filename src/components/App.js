import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { Audio } from 'expo';


let soundObject;
let audioPlaying = false;
// let playButtonIconSource = './img/icons/play.png';

async function fetchAndPlayAudio() {
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
  
  soundObject = new Audio.Sound();
  
  try {
    await soundObject.loadAsync(require('../assets/sounds/early_morning_fog.mp3'));
    await soundObject.playAsync();
    audioPlaying = true;
    // playButtonIconSource = './img/icons/pause.png';
  } catch (error) {
    alert(error);
  }
}

async function stopAudio() {
  if (soundObject !== undefined) {
    try {
      soundObject.stopAsync();
      audioPlaying = false;
    } catch (error) {
      alert(error);
    }
  }
}


export class App extends React.Component {
  render() {

    // let daysOfLent = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    // let calendarDayNumber;

    // daysOfLent.forEach(day => {
    //   calendarDayNumber = <View style={{
    //     backgroundColor: 'red', 
    //     width: 20, 
    //     height: 20,
    //     position: 'absolute',
    //     right: 0,
    //     top: 0
    //   }}>
    //     <Text style={{
    //       color: 'white', 
    //       textAlign: 'center'}}>
    //       {day}
    //     </Text>
    //   </View>
    // });

    return (
        <View style={{backgroundColor: 'black', flex: 1}}>
          {/* row 1 */}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName:
                  'CalendarDay' })
                ],
              }))
            }}>
              <ImageBackground source={require('../img/photo1.png')} style={{width: 80, height: 80}} >
                <View style={{
                  backgroundColor: 'red', 
                  width: 20, 
                  height: 20,
                  position: 'absolute',
                  right: 0,
                  top: 0
                  }}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    31
                  </Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
            <ImageBackground source={require('../img/photo2.jpg')} style={{width: 80, height: 80}} >
              <View style={{
                  backgroundColor: 'red', 
                  width: 20, 
                  height: 20,
                  position: 'absolute',
                  right: 0,
                  top: 0
                  }}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    1
                  </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require('../img/photo3.jpg')} style={{width: 80, height: 80}} >
            <View style={{
                  backgroundColor: 'red', 
                  width: 20, 
                  height: 20,
                  position: 'absolute',
                  right: 0,
                  top: 0
                  }}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    2
                  </Text>
              </View>
            </ImageBackground>
          </View>
          {/* row 2 */}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <ImageBackground source={require('../img/photo4.jpg')} style={{width: 80, height: 80}} >
              <View style={{
                backgroundColor: 'red', 
                width: 20, 
                height: 20,
                position: 'absolute',
                right: 0,
                top: 0
                }}>
                <Text style={{
                  color: 'white', 
                  textAlign: 'center'}}>
                  3
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require('../img/photo5.jpg')} style={{width: 80, height: 80}} >
              <View style={{
                  backgroundColor: 'red', 
                  width: 20, 
                  height: 20,
                  position: 'absolute',
                  right: 0,
                  top: 0
                  }}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    4
                  </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require('../img/photo6.png')} style={{width: 80, height: 80}} >
            <View style={{
                  backgroundColor: 'red', 
                  width: 20, 
                  height: 20,
                  position: 'absolute',
                  right: 0,
                  top: 0
                  }}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    5
                  </Text>
              </View>
            </ImageBackground>
          </View>
          {/* row 3 */}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <ImageBackground source={require('../img/photo7.png')} style={{width: 80, height: 80}} >
              <View style={{
                backgroundColor: 'red', 
                width: 20, 
                height: 20,
                position: 'absolute',
                right: 0,
                top: 0
                }}>
                <Text style={{
                  color: 'white', 
                  textAlign: 'center'}}>
                  6
                </Text>
              </View>
            </ImageBackground>
            <ImageBackground source={require('../img/photo8.png')} style={{width: 80, height: 80}} >
              <View style={{
                  backgroundColor: 'red', 
                  width: 20, 
                  height: 20,
                  position: 'absolute',
                  right: 0,
                  top: 0
                  }}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    7
                  </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
    );
  }
}

class CalendarDay extends React.Component {
  render() {
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
        {/* <TouchableWithoutFeedback style={{flex: 1 }}> */}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(68,68,68)'}}>
            <Image source={require('../img/icons/music.png')} 
                   style={{width: 20, height: 20, marginRight: 5, marginLeft: 5}}></Image>
            <Text style={{color: 'rgb(185,185,185)'}}>Music:</Text>
            <TouchableOpacity onPress={() => {
              fetchAndPlayAudio();
            }}>
              <Image source={require('../img/icons/play.png')} 
                     style={{width: 25, height: 25, marginRight: 10, marginLeft: 10}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (audioPlaying === true) {
                stopAudio();
              }
            }}>
              <Image source={require('../img/icons/stop.png')} 
                     style={{width: 25, height: 25, marginRight: 10, marginLeft: 10}}></Image>
            </TouchableOpacity>
          </View>
        {/* </TouchableWithoutFeedback> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
  CalendarDay: {
    screen: CalendarDay,
  },
}, {
    initialRouteName: 'CalendarDay',
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
