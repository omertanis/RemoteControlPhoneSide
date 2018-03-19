'use strict';

import React, { Component } from 'react';
import Toast from '@remobile/react-native-toast';
import Wifi from './Wifi.js';
import BluetoothSerial from 'react-native-bluetooth-serial'

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
import Bluetooth from './Bluetooth.js'
export default class BluetoothConnect extends Component {


  componentWillMount(){
    Bluetooth.enable();
    // BluetoothSerial.disconnect();
    BluetoothSerial.on('connectionLost', () => {
        Toast.showShortBottom(`Connection lost`)
        //Main Page'ye gönder
        this.props.navigation.navigate('MainPage');
    })
  }
  onSuccess(e) {
    Toast.showShortBottom(e.data);
    var result = Bluetooth.connect(e.data);
    var that = this;
    setTimeout(function() {
      var resultConnect = Bluetooth.resultConnect();
      console.log("resultConnect:" +resultConnect);
      if(resultConnect){
        console.log("SAYFA GEÇİŞİ");
        that.props.navigation.navigate('KeyboardAndMousePage');
      }
      else {
        console.log("Hata oluştu tekrar deneyiniz");
        Toast.showShortBottom("Hata oluştu tekrar deneyiniz.");
        that.forceUpdate();
      }
}, 3000);


  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={(
          <Text style={styles.centerText}>
            Lütfen cihazınızda oluşturulan <Text style={styles.buttonText}>QR</Text> kodunu okutunuz.
          </Text>
        )}
        bottomContent={(
          <TouchableOpacity
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
