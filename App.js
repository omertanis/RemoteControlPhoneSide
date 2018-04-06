import MainPage from './src/components/MainPage.js'
import KeyboardAndMousePage from './src/components/KeyboardAndMousePage.js'

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
    KeyboardAndMousePage: {
      screen: KeyboardAndMousePage,
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
