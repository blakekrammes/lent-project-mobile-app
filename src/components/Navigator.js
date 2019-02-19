import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen.js';
import CalendarDayScreen from './CalendarDayScreen.js';

export const Navigator = createStackNavigator({
    Home: { screen: HomeScreen },
    CalendarDay: { screen: CalendarDayScreen }
}, {
    initialRouteName: 'CalendarDay',
    headerMode: 'none'
});

export default createAppContainer(Navigator);
