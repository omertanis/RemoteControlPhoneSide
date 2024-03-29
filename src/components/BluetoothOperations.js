import Toast from '@remobile/react-native-toast'
import BluetoothSerial from 'react-native-bluetooth-serial'

var isConnected = false;

class Bluetooth {

  static test(message){
    BluetoothSerial.write(message)
    .then((res) => {
    })
    .catch((err) => Toast.showShortBottom(err.message))
  }

  static connect(id){
    console.log("kaksbf");
    try{
      BluetoothSerial.connect(id)
      .then((res) => {
        isConnected = true;
      })
      .catch((err) => {
        Toast.showShortBottom(err.message);
        isConnected = false;
      })
    }
    catch(err) {
    console.log(err.message);
}
  }

  static resultConnect(){
    return isConnected;
  }

  static enable () {
    BluetoothSerial.enable()
    .then((res) => Toast.showShortBottom("Bluetooth açıldı"))
    .catch((err) => Toast.showShortBottom(err.message))
  }

  static disable () {
    BluetoothSerial.disconnect()
  }
}
module.exports = Bluetooth;
