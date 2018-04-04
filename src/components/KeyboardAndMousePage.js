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
  TouchableOpacity,
  Modal,
  Switch,
  Slider,
  FlatList,
  List,
} from 'react-native';

import Bluetooth from './Bluetooth.js'
import IndexPage from './IndexPage.js';
import PanResponderBluetooth from './PanResponderBluetooth.js'
import PanResponderBluetoothSlider from './PanResponderBluetoothSlider.js'
import RadioButton from 'radio-button-react-native';
import { NavigationActions } from 'react-navigation';

var data = "";
var leftRightHand="";
var sensitive=0.0;
export default class Wifi extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nextInput:"input1",
        modalVisible: false,
        data:"",
        leftRightHand: false,
        valueSlider:6.0,
      };
    }

    static getValue(){
      return sensitive
    }

    toggleModal(visible) {
      this.setState({ modalVisible: visible });

      if(!visible){
        data = this.state.data;
        leftRightHand = this.state.leftRightHand;
        sensitive = this.state.valueSlider;
      }

   }

   onKeyPress = ({ nativeEvent: { key } }) => {
     Bluetooth.test(key)
     this.refs.input1.clear();
     this.refs.input2.clear();
};

leftClickOnPress(){
  Bluetooth.test("mouse/left")
}

rightClickOnPress(){
  Bluetooth.test("mouse/right")
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
              <PanResponderBluetooth/>
              </View>

              <View style= {styles.panresponderScroll}>
              <PanResponderBluetoothSlider/>
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


               <TouchableOpacity
               disabled={true}
               style={styles.header}>
               <Text style={{fontSize: 30, color:"#fff"}}>
               AYARLAR
               </Text>
             </TouchableOpacity>

              <Text>
                Sağ el
              </Text>

                  <Switch
                    onValueChange={leftRightHand => this.setState({leftRightHand})}
                    value={this.state.leftRightHand}
                    />
                    <Text>
                      Hassaslık
                    </Text>
                    <Slider
                      value={this.state.valueSlider}
                      step={1}
                      minimumValue={1}
                      maximumValue={20}
                      onValueChange={valueSlider => this.setState({valueSlider:valueSlider})}
                    />
                    <Text>
                      Value: {this.state.valueSlider}
                    </Text>

                    <Text>


                      Tersine olayı
                    </Text>
                    <Switch
                      onValueChange={leftRightHand => this.setState({leftRightHand})}
                      value={this.state.leftRightHand}
                      />


                    <TouchableOpacity
                    onPress = {() => {
                       this.toggleModal(!this.state.modalVisible)}}
                    style={styles.openModal}>
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
  },
  header: {
    backgroundColor: '#299FD2',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
