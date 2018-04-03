import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  BackHandler,
  ScrollView,
} from 'react-native';

import Bluetooth from './Bluetooth.js'
import IndexPage from './IndexPage.js';
import PanResponderBluetooth from './PanResponderBluetooth.js'
import RadioButton from 'radio-button-react-native';
import { NavigationActions } from 'react-navigation';
export default class App extends Component<Props> {

  constructor (props) {
    super(props)
    this.state = {
      nextInput:"input1",
    };

  }


  onStartShouldSetResponder () {
    return true;
  }

  onMoveShouldSetResponder () {
    return true;
  }

  onResponderMove (e) {
    Bluetooth.test("mouse/" +e.nativeEvent.locationX +"/" +e.nativeEvent.locationY)
  }


  postOnClick(){
    console.log("post on postOnClick");
    Bluetooth.test(this.state.text);
  }


   onKeyPress = ({ nativeEvent: { key } }) => {
     Bluetooth.test(key)
     this.refs.input1.clear();
     this.refs.input2.clear();
};

leftClickOnPress(){
  Bluetooth.test("mouse/left");
}

rightClickOnPress(){
  Bluetooth.test("mouse/right");
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
      <View>
            <View
            style={{height: 0, width:0, borderColor: 'gray', borderWidth: 1, opacity: 0}}>
            <TextInput
            secureTextEntry={true}
            ref = "input1"
            onKeyPress={this.onKeyPress}/>

            <TextInput
            secureTextEntry={true}
            ref = "input2"
            autoFocus={true}
            onKeyPress={this.onKeyPress}/>
              </View>



              <View style={styles.mouseButton}>
              <Button
              style={styles.button}
              title="Left Click"
              onPress={this.leftClickOnPress.bind(this)}
              color="#841584"/>

            <Button
            style={styles.button}
            title="Right Click"
            onPress={this.rightClickOnPress.bind(this)}
            color="#841584"/>

            </View>


                <View style={styles.PanResponder}>
                <PanResponderBluetooth/>
                </View>

                <View style ={{ marginTop:"10%"}}>
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
    height: "80%"
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
  },
  mouseButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'-1%'
    // marginLeft:"25%",
  },
});
