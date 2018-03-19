import IndexPage from './src/components/IndexPage.js'
import MainPage from './src/components/MainPage.js'
import KeyboardAndMousePage from './src/components/KeyboardAndMousePage.js'
import BackgroundTaskPage from './src/components/background.js'
import NotificationPage from './src/components/notifications.js'
import Keyboard from './src/components/Keyboard.js'
import Mouse from './src/components/Mouse.js'
import PanResponderTest from './src/components/PanResponderTest.js'
import TcpTest from './src/components/TcpTest.js'
import ConnectWifiPage from './src/components/ConnectWifiPage.js'
import Wifi from './src/components/Wifi.js'
import BluetoothConnect from './src/components/BluetoothConnect.js'


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
    MainPage: {
      screen: MainPage,
    },
    ConnectPage: {
      screen: BluetoothConnect,
    },
    KeyboardAndMousePage: {
      screen: KeyboardAndMousePage,
    },
    ConnectWifiPage: {
      screen: ConnectWifiPage,
    },
    Wifi: {
      screen: Wifi,
    },
  },
  {
    initialRouteName: 'MainPage',
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
