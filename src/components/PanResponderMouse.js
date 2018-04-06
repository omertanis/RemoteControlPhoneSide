import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import BluetoothOperations from './BluetoothOperations.js'
import KeyboardAndMousePage from './KeyboardAndMousePage';
import MainPage from './MainPage.js';
import WifiOperations from './WifiOperations.js';
function float2int (value) {
    return value | 0;
}

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 10;
  const draggedUp = dy < -10;
  const draggedLeft = dx < -10;
  const draggedRight = dx > 10;
  let dragDirection = "";
    dragDirection += float2int(dx)*KeyboardAndMousePage.getHassaslik()+"/";
    dragDirection += float2int(dy)*KeyboardAndMousePage.getHassaslik();

  if(MainPage.getChoose() == "Bluetooth"){
    BluetoothOperations.test("mouse/"+dragDirection)
  }
  else{
    WifiOperations.send("mouse/"+dragDirection)
  }
  if (dragDirection) return dragDirection;
};

export default class PanResponderTest extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirectionAndColor(gestureState),
      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }


  leftClickOnPress(){
    if(MainPage.getChoose() == "Bluetooth"){
    BluetoothOperations.test("mouse/left");
  }else{
    WifiOperations.send("mouse/left")
  }
}

  rightClickOnPress(){
    if(MainPage.getChoose() == "Bluetooth"){
    BluetoothOperations.test("mouse/right");
  }else{
    WifiOperations.send("mouse/right");
  }
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View style={styles.center}>
        <TouchableOpacity style={{backgroundColor: "#d7dbe2"}}
        onPress={this.leftClickOnPress.bind(this)}
        onLongPress={this.rightClickOnPress.bind(this)} >
        <View style={styles.description}>
        <Text>
        Mouseun gitmesini istediğiniz yöne doğru çekiniz.
        </Text>
        <Text>
        Tek tıklamak Mouse sol tuş
        </Text>
        <Text>
        Basılı tutmak Mouse sağ tuş
        </Text>
        <Text>
        Scroll icin yan tarafi kullaniniz
        </Text>
        </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    backgroundColor:"#b3c6e5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    backgroundColor:"#b3c6e5",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    backgroundColor:"#b3c6e5",
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
