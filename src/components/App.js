import React, { Component } from 'react';
import Store from '../store.js';
import { Provider } from 'react-redux';
import Navigator from './Navigator.js'


export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Navigator />
            </Provider>
        )
    }
}