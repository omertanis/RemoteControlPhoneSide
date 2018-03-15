import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';


export default class MainPage extends Component<Props> {

  connectWithBluetoothOnClick(){
    this.props.navigation.navigate('ConnectPage');
  }
  connectWithWifiOnClick(){
    this.props.navigation.navigate('ConnectWifiPage');
  }

  render() {
    return (
      <View>
      <View>
      <Button
      title="Connect with Bluetooth"
      onPress={this.connectWithBluetoothOnClick.bind(this)}
      color="#841584"/>
      </View>
      <View>
      <Button
      title="Connect with Wi-Fi"
      onPress={this.connectWithWifiOnClick.bind(this)}
      color="#841584"/>
      </View>

      </View>
    );
  }
}
