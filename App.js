import MainPage from './src/components/MainPage.js'
import MousePage from './src/components/MousePage.js'
import Tabs from './src/components/Tabs.js'

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
    MousePage: {
      screen: Tabs,
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
