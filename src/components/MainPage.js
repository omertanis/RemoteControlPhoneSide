import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import RadioButton from 'radio-button-react-native';

export default class MainPage extends Component<Props> {
  constructor (props){
    super(props)
      this.state = {
            value: "Bluetooth"
        }

}

handleOnPress(value){
    this.setState({value:value})
}

  connectWithBluetoothOnClick(){
    this.props.navigation.navigate('ConnectPage');
  }
  connectWithWifiOnClick(){
    this.props.navigation.navigate('ConnectWifiPage');
  }

  searchButtonOnClick(){
    if(this.state.value == "Bluetooth"){
       this.props.navigation.navigate('ConnectPage');
    }else if(this.state.value == "Wi-Fi"){
       this.props.navigation.navigate('ConnectWifiPage');
    }
  }

  render() {
    return (

      <View style={styles.container}>
      <Image
          style={styles.logo}
          source={require('../images/logo.png')}
        />

        <View style={styles.logoText}>
        <Text style={{fontSize: 50}}>
        Remote Control
        </Text>
        </View>

        <View style={styles.description}>
        <Text style={styles.description}>
        Lütfen kullanacağınız cihaza gereken uygulamaları yükledikten sonra gerekli talimatları yapınız..
        </Text>
        </View>
        <View style={styles.radioButton}>
      <RadioButton currentValue={this.state.value} value={"Bluetooth"} onPress={this.handleOnPress.bind(this)}>
      <Text>  Bluetooth  </Text>
      </RadioButton>

      <RadioButton currentValue={this.state.value} value={"Wi-Fi"} onPress={this.handleOnPress.bind(this)}>
      <Text>  Wi-Fi  </Text>
      </RadioButton>
      </View>
      <TouchableOpacity
      onPress={this.searchButtonOnClick.bind(this)}
      style={styles.button}>
      <Text style={{fontSize: 30}}>
      Cihaz ara
      </Text>
    </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#299FD2',
    paddingHorizontal: 10
  },
  back: {
    flex: 1,
  },
  logo: {
    width: "40%",
    height: "20%",
    marginTop:"15%",
    marginLeft :"30%",
  },
  button: {
    backgroundColor: '#b3c6e5',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:"50%",
    height:"10%",
    marginLeft:"25%",
    marginTop: "5%"
  },
  logoText: {
    justifyContent: 'center',
    // alignItems: 'center',
    // width:"50%",
    // height:"10%",
    marginLeft:"25%",
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'5%'
    // marginLeft:"25%",
  },
  description: {
    justifyContent: 'center',
    width:"90%",
    marginLeft:"5%",

  }
})
