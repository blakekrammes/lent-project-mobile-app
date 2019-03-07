import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

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
        <ImageBackground source={require('../img/gold.png')} style={{flex: 1}}>
          {/* row 1 */}
          <Text style={styles.title}>{'The Lent Project'}</Text>
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
              <View style={styles.imageBorderContainer}>
                <ImageBackground source={require('../img/photo1.png')} style={styles.calendarDay} >
                  <View style={styles.daySquares}>
                    <Text style={{
                      color: 'white', 
                      textAlign: 'center'}}>
                      31
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableHighlight>
            <View style={styles.imageBorderContainer}>
              <ImageBackground source={require('../img/photo2.jpg')} style={styles.calendarDay} >
                <View style={styles.daySquares}>
                    <Text style={{
                      color: 'white', 
                      textAlign: 'center'}}>
                      1
                    </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.imageBorderContainer}>
              <ImageBackground source={require('../img/photo3.jpg')} style={styles.calendarDay} >
              <View style={styles.daySquares}>
                    <Text style={{
                      color: 'white', 
                      textAlign: 'center'}}>
                      2
                    </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
          {/* row 2 */}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={styles.imageBorderContainer}>            
              <ImageBackground source={require('../img/photo4.jpg')} style={styles.calendarDay} >
                <View style={styles.daySquares}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    3
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.imageBorderContainer}>
              <ImageBackground source={require('../img/photo5.jpg')} style={styles.calendarDay} >
                <View style={styles.daySquares}>
                    <Text style={{
                      color: 'white', 
                      textAlign: 'center'}}>
                      4
                    </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.imageBorderContainer}>
              <ImageBackground source={require('../img/photo6.png')} style={styles.calendarDay} >
              <View style={styles.daySquares}>
                    <Text style={{
                      color: 'white', 
                      textAlign: 'center'}}>
                      5
                    </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
          {/* row 3 */}
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={styles.imageBorderContainer}>
              <ImageBackground source={require('../img/photo7.png')} style={styles.calendarDay} >
                <View style={styles.daySquares}>
                  <Text style={{
                    color: 'white', 
                    textAlign: 'center'}}>
                    6
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.imageBorderContainer}>
              <ImageBackground source={require('../img/photo8.png')} style={styles.calendarDay} >
                <View style={styles.daySquares}>
                    <Text style={{
                      color: 'white', 
                      textAlign: 'center'}}>
                      7
                    </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    fontSize: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendarDay: {
    width: 80, 
    height: 80
  },
  imageBorderContainer: {
    width: 80, 
    height: 80,
    borderRadius: 5,
    overflow: 'hidden'
  },
  daySquares: {
    backgroundColor: 'rgb(174, 40, 40)',
    width: 20, 
    height: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 5
  }
});


export default HomeScreen;
