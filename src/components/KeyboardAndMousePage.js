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
  ScrollView
} from 'react-native';

import Bluetooth from './Bluetooth.js'
import IndexPage from './IndexPage.js';
import PanResponderTest from './PanResponderTest.js'

export default class App extends Component<Props> {

  constructor (props) {
    super(props)
    this.state = {
      text:"anan",
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


  componentWillMount(){

  }

  postOnClick(){
    console.log("post on postOnClick");
    Bluetooth.test(this.state.text);
  }


   onKeyPress = ({ nativeEvent: { key } }) => {
     Bluetooth.test(key)
};

leftClickOnPress(){
  Bluetooth.test("mouse/left");
}

rightClickOnPress(){
  Bluetooth.test("mouse/right");
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
                <PanResponderTest/>
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
