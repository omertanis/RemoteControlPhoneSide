'use strict';

import React, { Component } from 'react';
import Toast from '@remobile/react-native-toast'
import WifiOperations from './WifiOperations.js'
var net = require('net');
var client;

import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Linking,
  View,
  Platform,
  Button,
  TextInput,
} from 'react-native';
import PanResponderWifi from './PanResponderWifi.js'

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Wifi extends Component {

  constructor(props) {
      super(props);

      this.leftClickOnPress = this.leftClickOnPress.bind(this); // This is important

    }

  componentDidMount(){
    WifiOperations.connect(this.props.navigation.state.params.ip)
  }
  //
  // sendData(){
  //   client.write('Hello, server! Love, Client.');
  // }

  onStartShouldSetResponder () {
    return true;
  }

  onMoveShouldSetResponder () {
    return true;
  }

  onResponderMove (e) {
    console.log("-----------********------------");
    client.write("mouse/" +e.nativeEvent.locationX +"/" +e.nativeEvent.locationY)
  }


  componentWillMount(){

  }

  postOnClick(){
    console.log("post on postOnClick");
    WifiOperations.send(this.state.text);
  }
   onKeyPress = ({ nativeEvent: { key } }) => {
     WifiOperations.send(key)

};

leftClickOnPress(){
  WifiOperations.send("mouse/left")
  // client.write("mouse/left");
}

rightClickOnPress(){
  WifiOperations.send("mouse/right")
  // client.write("mouse/right");
}

openKeyboardOnClick(){

}


  render() {
    return (
      <View>
            <View
            style={{height: 0, width:0, borderColor: 'gray', borderWidth: 1, opacity: 0}}>
            <TextInput
              autoFocus = {true}
              onKeyPress={this.onKeyPress}/>

              </View>
                <View>
                <Button
                style={styles.button}
                title="Left Click"
                onPress={this.leftClickOnPress.bind(this)}
                color="#841584"/>
                </View>
                <View>
                <Button
                style={styles.button}
                title="Right Click"
                onPress={this.rightClickOnPress.bind(this)}
                color="#841584"/>
                </View>

                <View style={styles.PanResponder}>
                <PanResponderWifi />
                </View>

                <View style ={{ marginTop: 100}}>
                <Button
                style={styles.button}
                title="Open Keyboard"
                onPress={this.openKeyboardOnClick.bind(this)}
                color="#841584"/>
                </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  PanResponder:{
    width: "100%",
    height: 300
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'red',
    width: '30%',
    height: 10,
  },
  mouse: {
    height: 250,
    backgroundColor: 'white',
    borderColor: "black",
  },
  box: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: "100%",
    height: 300,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('defaultAndroid', () => ScanScreen);
