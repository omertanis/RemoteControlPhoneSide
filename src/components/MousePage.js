import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Slider,
  ScrollView
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'
import BluetoothOperations from './BluetoothOperations.js'
import PanResponderMouse from './PanResponderMouse.js'
import { NavigationActions } from 'react-navigation';
import SettingsList from 'react-native-settings-list';
import MainPage from './MainPage.js';
import WifiOperations from './WifiOperations';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
var net = require('net');

let solEl = false;
let hassaslik = 50.0;
let tersineKaydirma = false;
export default class KeyboardAndMousePage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nextInput:"input1",
        modalVisible: false,
        solEl: false,
        hassaslik:50.0,
        tersineKaydirma:false,
        value:"..........."
      };
    }

    static getHassaslik(){
      return hassaslik;
    }

    static getTersineKaydirma(){
      if (tersineKaydirma){
        return -1;
      }
      else{
        return 1;
      }
    }


    toggleModal(visible) {
      this.setState({ modalVisible: visible });

      if(!visible){
        // solEl = this.state.solEl;
        hassaslik = this.state.hassaslik;
        tersineKaydirma = this.state.tersineKaydirma;
      }

   }

   onKeyPress = ({ nativeEvent: { key } }) => {
     if(MainPage.getChoose() == "Bluetooth"){
     BluetoothOperations.test("keyboard/"+key)
   }else{
     WifiOperations.send("keyboard/"+key)
   }
};

leftClickOnPress(){
  if(MainPage.getChoose() == "Bluetooth"){

  if(this.state.solEl){
    BluetoothOperations.test("mouse/right")
  }
  else{
    BluetoothOperations.test("mouse/left")
  }
}
  else{
    if(this.state.solEl){
      WifiOperations.send("mouse/right")
    }
    else{
      WifiOperations.send("mouse/left")
    }
  }
}

rightClickOnPress() {
  if (MainPage.getChoose() == "Bluetooth") {

    if (this.state.solEl) {
      BluetoothOperations.test("mouse/left");
    } else {
      BluetoothOperations.test("mouse/right");
    }
  } else {
    if (this.state.solEl) {
      WifiOperations.send("mouse/left");
    } else {
      WifiOperations.send("mouse/right");
    }
  }
}

searchSubmit(){
  if (MainPage.getChoose() == "Bluetooth") {
    BluetoothOperations.test("keyboard/Enter");
}else{
  WifiOperations.send("keyboard/Enter")
}
}

solElChange(value){
  this.setState({solEl:value})
}

tersineKaydirmaChange(value){
    this.setState({tersineKaydirma:value})
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

openModal(){
  this.toggleModal(true);
}

  render() {
    return (
      <ScrollView style={{backgroundColor:"#b4b9c1", height:"100%"}}>

            <View style={{height: 0, width:"100%", borderColor: 'gray', borderWidth: 1}}>
              <TextInput
              ref = "input1"
              spellCheck={true}
              autoCorrect={true}
              keyboardType="default"
              value={this.state.value}
              onSubmitEditing={this.searchSubmit.bind(this)}
              onKeyPress={this.onKeyPress}/>

              <TextInput
              ref = "input2"
              keyboardType="default"
              autoCorrect={false}
              spellCheck={false}
              value={this.state.value}
              onSubmitEditing={this.searchSubmit.bind(this)}
              onKeyPress={this.onKeyPress}/>
            </View>

            <View style={styles.mouseButton}>

              <TouchableOpacity
              ref = "left"
              onPress={this.leftClickOnPress.bind(this)}
              style={styles.button}>
                <Text style={{fontSize: 22, color:"#fff"}}>
                Sol
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
              ref = "right"
              onPress={this.rightClickOnPress.bind(this)}
              style={styles.button}>
                <Text style={{fontSize: 22, color:"#fff"}}>
                Sağ
                </Text>
              </TouchableOpacity>

            </View>


            <View style={styles.mouseButton}>

              <View style={styles.panresponderMouse}>
              <PanResponderMouse/>
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
               onRequestClose = {() => {  this.setState({modalVisible: false})} }>
              <View style = {styles.modal}>
                 <TouchableOpacity
                 disabled={true}
                 style={styles.header}>
                   <Text style={{fontSize: 30, color:"#fff"}}>
                   AYARLAR
                   </Text>
                 </TouchableOpacity>

                          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                                    <SettingsList.Item
                                        icon={<Text></Text>}
                                        hasSwitch={true}
                                        hasNavArrow={false}
                                        title='Sol el'
                                        titleStyle={{fontSize: 16}}
                                        switchOnValueChange={this.solElChange.bind(this)}
                                        switchState={this.state.solEl}
                                      />
                                      <SettingsList.Header headerStyle={{marginTop: -13}}/>

                                      <SettingsList.Item
                                        icon={
                                          <View style={styles.imageStyle}>
                                          <Text style={{marginLeft:"5%", fontSize:16}}>
                                           Hassaslık
                                          </Text>
                                          <Slider
                                            value={this.state.hassaslik}
                                            step={1}
                                            minimumValue={1}
                                            maximumValue={100}
                                            onValueChange={hassaslik => this.setState({hassaslik:hassaslik})}/>
                                          </View>
                                        }
                                        hasNavArrow={false}
                                    />
                                    <SettingsList.Header headerStyle={{marginTop: -13}}/>

                                    <SettingsList.Item
                                        switchOnValueChange={this.tersineKaydirmaChange.bind(this)}
                                        switchState={this.state.tersineKaydirma}
                                        hasSwitch={true}
                                        hasNavArrow={false}
                                        title='Tersine Kaydırma'
                                        titleStyle={{fontSize: 16}}
                                      />

                          </SettingsList>
                          <TouchableOpacity
                          onPress = {() => {
                             this.toggleModal(!this.state.modalVisible)}}
                          style={styles.modalButton}>
                          <Text style={{fontSize: 30, color:"#fff"}}>
                          KAYDET
                          </Text>
                        </TouchableOpacity>

               </View>
            </Modal>

            <TouchableOpacity
            onPress = {this.openModal.bind(this)}
            style={styles.openModal}>
            <Text style={{fontSize: 30, color:"#fff"}}>
            Ayarlar
            </Text>
          </TouchableOpacity>


         </View>

      </ScrollView>
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
    width:"50%",
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
    width: "100%",
    height: 380
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
  },
  modalButton:{
    backgroundColor: '#299FD2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width:"50%",
    marginLeft:"25%",
    marginTop: "10%"
  },
  header: {
    backgroundColor: '#299FD2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle:{
    alignSelf:'center',
    width:'100%',
    height:1,
    marginLeft:15,
    justifyContent:'center'
}
});
