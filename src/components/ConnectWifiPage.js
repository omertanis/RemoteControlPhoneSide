'use strict';

import React, { Component } from 'react';
import Toast from '@remobile/react-native-toast';
import Wifi from './Wifi.js';

var net = require('net');
var client;

import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  sendData(){
    client.write('Hello, server! Love, Client.');
  }

  onSuccess(e) {
    console.log(e);
    Toast.showShortBottom(e.data)
    var ip = e.data;
if(net.isIP(ip)){
  this.props.navigation.push({
    name: Wifi,
    passProps: {
      url: 'www.xyz.com',
      data: 'abc'
    }
  })
  this.props.navigation.navigate('Wifi', {"ip":ip});
}
    // this.props.navigation.navigate('Wifi');

    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={(
          <Text style={styles.centerText}>
            Lütfen ciahzınızda oluşturulan <Text style={styles.buttonText}>QR</Text> kodunu okutunuz.
          </Text>
        )}
        bottomContent={(
          <TouchableOpacity
          onPress={this.sendData.bind(this)}
          style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 18,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});

AppRegistry.registerComponent('defaultAndroid', () => ScanScreen);
