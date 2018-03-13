import React, { Component } from 'react';
import { Keyboard, TextInput,StyleSheet, View } from 'react-native';

export default class Example extends Component {
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    alert('Keyboard Shown');
  }

  _keyboardDidHide () {

    alert('Keyboard Hidden');
  }

  render() {
    return (
      <View>
      <TextInput
        onSubmitEditing={Keyboard.dismiss}
      />
      <View style={styles.mouse}>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mouse: {
    height: 250,
    backgroundColor: 'white',
    borderColor: "black",
  }
});
