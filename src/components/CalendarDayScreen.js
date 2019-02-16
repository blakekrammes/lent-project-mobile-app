import React from 'react';
import { View, ImageBackground, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

export default class CalendarDayScreen extends React.Component {
    render() {
  
      // console.log(this.props)
  
  
      if (this.props.audioPlaying === true) {
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
          {/* <TouchableWithoutFeedback style={{flex: 1 }}> */}
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(68,68,68)'}}>
              <Image source={require('../img/icons/music.png')} 
                     style={{width: 20, height: 20, marginRight: 5, marginLeft: 5}}></Image>
              <Text style={{color: 'rgb(185,185,185)'}}>Music:</Text>
              <TouchableOpacity onPress={() => {
                fetchAndPlayAudio();
              }}>
                <Image source={playButtonSource} 
                       style={{width: 25, height: 25, marginRight: 10, marginLeft: 10}}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (this.props.audioPlaying === true) {
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