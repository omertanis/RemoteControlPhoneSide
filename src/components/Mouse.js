import React, { Component } from 'react';
import { Keyboard, TextInput,StyleSheet, View } from 'react-native';
import Bluetooth from './Bluetooth.js'


export default class Mouse extends Component {



  onStartShouldSetResponder () {
    return true;
  }

  onMoveShouldSetResponder () {
    return true;
  }

  onResponderMove (e) {
    Bluetooth.test(e.nativeEvent.locationX +"/" +e.nativeEvent.locationY)
  }


  render() {
    return (
      <View
        style={styles.box}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onMoveShouldSetResponder={this.onMoveShouldSetResponder}
        onResponderMove={this.onResponderMove}>
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
