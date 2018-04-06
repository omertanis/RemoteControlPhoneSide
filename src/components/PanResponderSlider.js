import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import KeyboardAndMousePage from './KeyboardAndMousePage';
import BluetoothOperations from './BluetoothOperations.js'
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

    dragDirection += float2int(dy)*KeyboardAndMousePage.getTersineKaydirma();
    if(dragDirection != "" && MainPage.getChoose() == "Bluetooth"){
      BluetoothOperations.test("mouse/scroll/"+dragDirection);
    }else if(dragDirection != "" && MainPage.getChoose() == "Wi-Fi"){
      WifiOperations.send("mouse/scroll/"+dragDirection);
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

  buttonClicked(){
    console.log("left")
  }
  leftClickOnPress(){
    BluetoothOperations.test("mouse/left");
  }

  rightClickOnPress(){
    BluetoothOperations.test("mouse/right");
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View style={styles.center}>
        <TouchableOpacity style={{backgroundColor: "#d7dbe2"}}
        onPress={this.leftClickOnPress.bind(this)}
        onLongPress={this.rightClickOnPress.bind(this)} >

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
    backgroundColor:"#bacff2",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    backgroundColor:"#bacff2",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
