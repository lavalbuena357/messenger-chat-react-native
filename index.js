/**
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native';
import App from './App';
import store from './src/redux/store'
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es-CO.json'
import {name as appName} from './app.json';

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
