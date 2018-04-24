import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Slider,
  Image,
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

export default class KeyboardAndMousePage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nextInput:"input1",
      };
    }


   onKeyPress = ({ nativeEvent: { key } }) => {
     if(MainPage.getChoose() == "Bluetooth"){
     BluetoothOperations.test("keyboard/"+key)
   }else{
     WifiOperations.send("keyboard/"+key)
   }
};


searchSubmit(){
  if (MainPage.getChoose() == "Bluetooth") {
    BluetoothOperations.test("keyboard/Enter");
}else{
  WifiOperations.send("keyboard/Enter")
}
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

fbuttonOnClick(button){
  if(MainPage.getChoose() == "Bluetooth"){
  BluetoothOperations.test("keyboard/fButtons/"+button)
}else{
  WifiOperations.send("keyboard/fButtons/"+button)
}
}


handlePressIn(button){
  if(MainPage.getChoose() == "Bluetooth"){
  BluetoothOperations.test("keyboard/controlButtonsPress/"+button)
}else{
  WifiOperations.send("keyboard/controlButtonsPress/"+button)
}

}

handlePressOut(button){
  if(MainPage.getChoose() == "Bluetooth"){
  BluetoothOperations.test("keyboard/controlButtonsRelease/"+button)
}else{
  WifiOperations.send("keyboard/controlButtonsRelease/"+button)
}
}


shortcutOnClick(button){

  if(MainPage.getChoose() == "Bluetooth"){
  BluetoothOperations.test("keyboard/shortcut/"+button)
}else{
  WifiOperations.send("keyboard/shortcut/"+button)
}

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

            <View style={styles.mouseButtonF}>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f1")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f2")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f3")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f4")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f5")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f6")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F6
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f7")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f8")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F8
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f9")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F9
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f10")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f11")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F11
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.fbuttonOnClick.bind(this,"f12")}
            style={styles.button}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              F12
              </Text>
            </TouchableOpacity>

            </View>



            <View style={styles.mouseButton}>
            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"esc")}
              onPressOut={this.handlePressOut.bind(this,"esc")}
              style={styles.ControlButtons}>
              <Text style={{fontSize: 17.5, color:"#fff"}}>
              ESC
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"tab")}
              onPressOut={this.handlePressOut.bind(this,"tab")}
              style={styles.ControlButtons}>
              <Image
                  key="tab"
                  style={styles.arrowLeft}
                  source={require('../images/tab.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"ctrl")}
              onPressOut={this.handlePressOut.bind(this,"ctrl")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"alt")}
              onPressOut={this.handlePressOut.bind(this,"alt")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                ALT
                </Text>
            </TouchableOpacity>
              </View>
              <View style={styles.mouseButton}>

              <TouchableOpacity
                onPressIn={this.handlePressIn.bind(this,"arrowTop")}
                onPressOut={this.handlePressOut.bind(this,"arrowTop")}
                style={styles.ControlButtons}>
                <Image
                    key="arrowTop"
                    style={styles.arrowTop}
                    source={require('../images/right.png')}
                  />
              </TouchableOpacity>
              </View>
            <View style={styles.mouseButton}>

            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"arrowLeft")}
              onPressOut={this.handlePressOut.bind(this,"arrowLeft")}
              style={styles.ControlButtons}>
              <Image
                  key="arrowLeft"
                  style={styles.arrowLeft}
                  source={require('../images/right.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"arrowBottom")}
              onPressOut={this.handlePressOut.bind(this,"arrowBottom")}
              style={styles.ControlButtons}>
              <Image
                  key="arrowBottom"
                  style={styles.arrowBottom}
                  source={require('../images/right.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={this.handlePressIn.bind(this,"arrowRight")}
              onPressOut={this.handlePressOut.bind(this,"arrowRight")}
              style={styles.ControlButtons}>
              <Image
                  key="arrowRight"
                  style={styles.arrowRight}
                  source={require('../images/right.png')}
                />
            </TouchableOpacity>

            </View>

            <View style={styles.mouseButton}>
            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+c")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+C
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+x")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+X
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+v")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+V
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+s")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+S
                </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.mouseButton}>
            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+z")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+Z
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+y")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+Y
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+a")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+A
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+p")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+P
                </Text>
            </TouchableOpacity>

            </View>

            <View style={styles.mouseButton}>
            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"alt+f4")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                ALT+F4
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"ctrl+w")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                CTRL+W
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPressIn={this.handlePressIn.bind(this,"delete")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 20, color:"#fff"}}>
                Delete
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this.shortcutOnClick.bind(this,"enter")}
              style={styles.ControlButtons}>
                <Text style={{fontSize: 17.2, color:"#fff"}}>
                Enter
                </Text>
            </TouchableOpacity>
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
    width:"8.3%",
  },
  ControlButtons:{
    backgroundColor: '#299FD2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "1%",
    width:"23%",
    height:40,
    marginLeft:"1%"
  },
  arrowRight:{
    height:30,
    width:20,
  },
  arrowLeft:{
    height:30,
    width:20,
    transform: [{ rotate: '180deg'}]
  },
  arrowTop:{
    height:30,
    width:20,
    transform: [{ rotate: '270deg'}]
  },
  arrowBottom:{
    height:30,
    width:20,
    transform: [{ rotate: '90deg'}]
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
    marginTop:'2%'
    // marginLeft:"25%",
  },
  mouseButtonF: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'0%'
    // marginLeft:"25%",
  },
  panresponderMouse: {
    width: "100%",
    height: 300
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
    marginTop: "20%"
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
