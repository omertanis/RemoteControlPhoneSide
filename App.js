import IndexPage from './src/components/IndexPage.js'
import KeyboardAndMousePage from './src/components/KeyboardAndMousePage.js'
import BackgroundTaskPage from './src/components/background.js'
import NotificationPage from './src/components/notifications.js'
import Keyboard from './src/components/Keyboard.js'
import Mouse from './src/components/Mouse.js'
import PanResponderTest from './src/components/PanResponderTest.js'
import TcpTest from './src/components/TcpTest.js'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import {StackNavigator} from 'react-navigation';

type Props = {};

const RootStack = StackNavigator(
  {
    ConnectPage: {
      screen: IndexPage,
    },
    KeyboardAndMousePage: {
      screen: KeyboardAndMousePage,
    },
  },
  {
    initialRouteName: 'ConnectPage',
    headerMode: "none"
  }
);


export default class App extends Component<Props> {

  render() {
    return (
      <RootStack />
    );
  }
}
