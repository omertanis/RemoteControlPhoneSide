import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  BackHandler,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import RadioButton from 'radio-button-react-native';
import Slider from "react-native-slider";
import BluetoothSerial from 'react-native-bluetooth-serial'
import Toast from '@remobile/react-native-toast';
import KeyboardAndMousePageWifi from './KeyboardAndMousePageWifi.js';
import WifiOperations from './WifiOperations.js';
import Bluetooth from './Bluetooth.js'
import QRCodeScanner from 'react-native-qrcode-scanner';

var net = require('net');
var client;

export default class MainPage extends Component<Props> {
  constructor (props){
    super(props)
      this.state = {
            value: "Bluetooth",
            modalBluetoothVisible: false,
            modalVisible: false,
        }
}

toggleModalBluetooth(visible) {
      this.setState({ modalBluetoothVisible: visible });
   }

   toggleModal(visible) {
         this.setState({ modalVisible: visible });
      }

handleBackButtonClick() {
  NavigationActions.navigate({ routeName: 'MainPage' })
  setTimeout(function() {
    Bluetooth.disable();
}, 1000);
}

componentDidMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleOnPress(value){
    this.setState({value:value})
}


  searchButtonOnClick(){

    if(this.state.value == "Bluetooth"){
      this.toggleModalBluetooth(true)
      Bluetooth.enable()
       // this.props.navigation.navigate('ConnectPage');

    }else if(this.state.value == "Wi-Fi"){
      this.toggleModal(true)
       // this.props.navigation.navigate('ConnectWifiPage');
    }

  }

  onSuccess(e) {
    console.log(e);
    Toast.showShortBottom(e.data)
    var ip = e.data;
    // console.log(net.isIP(ip));
    if(net.isIP(ip)==4){
  this.props.navigation.navigate('KeyboardAndMousePageWifi', {"ip":ip});
  this.toggleModal(!this.state.modalVisible);
}
else{
  Toast.showShortBottom("QR kodu hatalı tekrar deneiniz...");
  this.toggleModal(!this.state.modalVisible);

}
}



  onSuccessBluetooth(e) {
    try{
      console.log(net.isIP(e.data));
      if (net.isIP(e.data) == 6) {
        var result = Bluetooth.connect(e.data);
      }
      console.log("result: "+ result);
    var that = this;

      setTimeout(function() {
        var resultConnect = Bluetooth.resultConnect();
        if(resultConnect){
          that.props.navigation.navigate('KeyboardAndMousePage');
        }
        else {
          Toast.showShortBottom("QR kodu hatalı tekrar deneiniz...");
        }
        that.toggleModalBluetooth(!that.state.modalBluetoothVisible);
  }, 2000);

}catch(err) {
  console.log(err);
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


    <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalBluetoothVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               <QRCodeScanner
                 onRead={this.onSuccessBluetooth.bind(this)}
                 topContent={(
                   <Text style={styles.centerText}>
                     Lütfen cihazınızda oluşturulan <Text style={styles.buttonText}>QR</Text> kodunu okutunuz.
                   </Text>
                 )}
                 bottomContent={(
                   <TouchableOpacity
                   onPress={this.toggleModalBluetooth.bind(this,!this.state.modalBluetoothVisible)}
                   style={styles.buttonTouchable}>
                     <Text style={styles.buttonText}>Bluetooth!</Text>
                   </TouchableOpacity>
                 )}
               />
            </Modal>


            <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               <QRCodeScanner
                 onRead={this.onSuccess.bind(this)}
                 topContent={(
                   <Text style={styles.centerText}>
                     Lütfen cihazınızda oluşturulan <Text style={styles.buttonText}>QR</Text> kodunu okutunuz.
                   </Text>
                 )}
                 bottomContent={(
                   <TouchableOpacity
                   onPress={this.toggleModal.bind(this,!this.state.modalVisible)}
                   style={styles.buttonTouchable}>
                     <Text style={styles.buttonText}>Wi-Fi!</Text>
                   </TouchableOpacity>
                 )}
               />

            </Modal>


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

  },
  slider: {
    transform: [{ rotate: '90deg'}],
    backgroundColor: '#FFF'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 28,
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
}
})
