import IndexPage from './src/components/IndexPage.js'
import MainPage from './src/components/MainPage.js'
import KeyboardAndMousePage from './src/components/KeyboardAndMousePage.js'
import ConnectWifiPage from './src/components/ConnectWifiPage.js'
import KeyboardAndMousePageWifi from './src/components/KeyboardAndMousePageWifi.js'
import BluetoothConnect from './src/components/BluetoothConnect.js'

// import ModalExample from './src/components/ModalExample.ks'

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
    ConnectWifiPage: {
      screen: ConnectWifiPage,
    },
    KeyboardAndMousePage: {
      screen: KeyboardAndMousePage,
    },
    ConnectKeyboardAndMousePageWifiPage: {
      screen: ConnectWifiPage,
    },
    KeyboardAndMousePageWifi: {
      screen: KeyboardAndMousePageWifi,
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
