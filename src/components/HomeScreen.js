import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator, createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import { toggleAudioStatus } from '../actions.js';


let soundObject;

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
    this.props.dispatch(toggleAudioStatus());
  } catch (error) {
    alert(error);
  }
}

async function stopAudio() {
  if (soundObject !== undefined) {
    try {
      soundObject.stopAsync();
      this.props.dispatch(toggleAudioStatus());
    } catch (error) {
      alert(error);
    }
  }
}


export class HomeScreen extends React.Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: App,
//   },
//   CalendarDay: {
//     screen: CalendarDay,
//   },
// }, {
//     initialRouteName: 'CalendarDay',
//     headerMode: 'none'
// });

const mapStateToProps = state => ({
  audioPlaying: state.audioPlaying
});

// const HomeScreen = connect(mapStateToProps)(createAppContainer(AppNavigator));

// export default createAppContainer(AppNavigator);

export default connect(mapStateToProps)(HomeScreen);
