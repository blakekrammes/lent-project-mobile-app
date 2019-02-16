import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen.js';
import CalendarDayScreen from './CalendarDayScreen.js';

export const Navigator = createStackNavigator({
    Home: { screen: HomeScreen },
    CalendarDay: { screen: CalendarDayScreen }
}, {
    initialRouteName: 'Home',
    headerMode: 'none'
});

class Nav extends Component {
    render() {
        return (
            <Navigator />
        )
    }
}

//something fishy

export default createAppContainer(Nav);
