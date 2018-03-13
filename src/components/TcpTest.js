import React, { Component } from 'react';
import { Keyboard, TextInput,StyleSheet, View, Button } from 'react-native';
import Bluetooth from './Bluetooth.js'
var net = require('net');
var client;
export default class Mouse extends Component {


buttonClick(){
  client = net.createConnection(8089, "192.168.2.69");

  client.on('error', function(error) {
  console.log(error)
});

client.on('data', function(data) {
  console.log('message was received', data)
});

client.write('Hello, server! Love, Client.');

}

button2Click(){
      client.write('Hello, server! Love, Client.');
}

  render() {
    return (
      <View>
      <Button
      title="Connect"
      onPress={this.buttonClick.bind(this)}
      color="#841584"/>

      <Button
      title="Send Data"
      onPress={this.button2Click.bind(this)}
      color="#841584"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  box: {
    marginTop: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'red'
  }
});
