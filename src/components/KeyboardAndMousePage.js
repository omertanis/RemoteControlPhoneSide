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
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial'
import Bluetooth from './Bluetooth.js'
import IndexPage from './IndexPage.js';
import PanResponderBluetooth from './PanResponderBluetooth.js'
import PanResponderBluetoothSlider from './PanResponderBluetoothSlider.js'
import RadioButton from 'radio-button-react-native';
import { NavigationActions } from 'react-navigation';
import Toast from '@remobile/react-native-toast'
import SettingsList from 'react-native-settings-list';


let solEl = false;
let hassaslik = 6.0;
let tersineKaydirma = false;
export default class KeyboardAndMousePage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        nextInput:"input1",
        modalVisible: false,
        solEl: false,
        hassaslik:6.0,
        tersineKaydirma:false
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

componentWillMount(){
  
  BluetoothSerial.on('connectionLost', () => {

    this.props
               .navigation
               .dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'MainPage'})
                    ]
                  }));
  })


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
     Bluetooth.test(key)
     this.refs.input1.clear();
     this.refs.input2.clear();
};

leftClickOnPress(){
  if(this.state.solEl){
    Bluetooth.test("mouse/right")
  }
  else{
    Bluetooth.test("mouse/left")
  }
}

rightClickOnPress(){
  if(this.state.solEl){
    Bluetooth.test("mouse/left");
}
else {
  Bluetooth.test("mouse/right");
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
      <View style={{backgroundColor:"#b4b9c1", height:"100%"}}>

            <View style={{height: 0, width:"100%", borderColor: 'gray', borderWidth: 1}}>
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
              ref = "left"
              onPress={this.leftClickOnPress.bind(this)}
              style={styles.button}>
                <Text style={{fontSize: 22, color:"#fff"}}>
                Left
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
              ref = "right"
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
                                            maximumValue={20}
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
  },
  imageStyle:{
    alignSelf:'center',
    width:'100%',
    height:1,
    marginLeft:15,
    justifyContent:'center'
}
});
