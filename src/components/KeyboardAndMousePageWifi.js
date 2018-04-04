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
  BackHandler,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';
import PanResponderWifi from './PanResponderWifi.js'
import PanResponderWifiSlider from './PanResponderWifiSlider.js'


import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Wifi extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nextInput:"input1",
        modalVisible: false,
      };
    }

    toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }



  componentDidMount(){
    WifiOperations.connect(this.props.navigation.state.params.ip)
    }

   onKeyPress = ({ nativeEvent: { key } }) => {
     WifiOperations.send(key)
     this.refs.input1.clear();
     this.refs.input2.clear();
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
  if(this.state.nextInput == "input1"){
    this.refs.input1.focus();
    this.setState({nextInput: "input2"})
  }else{
    this.refs.input2.focus();
    this.setState({nextInput: "input1"})
  }
}


  render() {
    return (
      <View style={{backgroundColor:"#b4b9c1", height:"100%"}}>
            <View
            style={{height: 0, width:"100%", borderColor: 'gray', borderWidth: 1}}>
            <TextInput
            ref = "input1"
            secureTextEntry={true}
            onKeyPress={this.onKeyPress}/>

            <TextInput
            ref = "input2"
            autoFocus={true}
            secureTextEntry={true}
            onKeyPress={this.onKeyPress}/>


              </View>

              <View style={styles.mouseButton}>

              <TouchableOpacity
              onPress={this.leftClickOnPress.bind(this)}
              style={styles.button}>
              <Text style={{fontSize: 22, color:"#fff"}}>
              Left
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.rightClickOnPress.bind(this)}
            style={styles.button}>
            <Text style={{fontSize: 22, color:"#fff"}}>
            Right
            </Text>
          </TouchableOpacity>

              </View>


              <View style={styles.mouseButton}>

              <View style={styles.panresponderMouse}>
              <PanResponderWifi/>
              </View>

              <View style= {styles.panresponderScroll}>
              <PanResponderWifiSlider/>
              </View>
              </View>

                <View style ={{ marginTop: "2%"}}>

                <TouchableOpacity
                onPress={this.openKeyboardOnClick.bind(this)}
                style={styles.openModal}>
                <Text style={{fontSize: 30, color:"#fff"}}>
                Klavye
                </Text>
              </TouchableOpacity>
                </View>

                <View>


            <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               <View style = {styles.modal}>
                  <Text style = {styles.text}>Modal is open!</Text>

                  <TouchableHighlight onPress = {() => {
                     this.toggleModal(!this.state.modalVisible)}}>

                     <Text style = {styles.text}>Close Modal</Text>
                  </TouchableHighlight>
               </View>
            </Modal>

            <TouchableOpacity
            onPress = {() => {this.toggleModal(true)}}
            style={styles.openModal}>
            <Text style={{fontSize: 30, color:"#fff"}}>
            Ayarlar
            </Text>
          </TouchableOpacity>


         </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  PanResponder:{
    width: "100%",
    height: "80%"
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#299FD2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:"30%",
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
  },
  mouseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:'-1%'
    // marginLeft:"25%",
  },
  panresponderMouse: {
    width: "90%",
  },
  panresponderScroll: {
    width: "10%",
    height: 400
  },
  openKeyboardButton: {
    backgroundColor: 'red',
    width: "50px",
    height: 10
  },
  openModal: {
    backgroundColor: '#299FD2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:"50%",
    marginLeft:"25%",
    marginTop: "2%"
  }
});


AppRegistry.registerComponent('defaultAndroid', () => ScanScreen);
