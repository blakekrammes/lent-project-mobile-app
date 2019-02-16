import React, { Component } from 'react';
import Store from './store.js';
import { Provider } from 'react-redux';

import AppNavigator from './components/App.js';

export default class Root extends Component {
    render() {
        return (
            <Provider store={Store}>
                <AppNavigator />
            </Provider>
        )
    }
}