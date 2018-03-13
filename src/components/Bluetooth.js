import Toast from '@remobile/react-native-toast'
import BluetoothSerial from 'react-native-bluetooth-serial'

class Bluetooth {
  static test(message){
    BluetoothSerial.write(message)
    .then((res) => {
    })
    .catch((err) => Toast.showShortBottom(err.message))

  }
}
module.exports = Bluetooth;
