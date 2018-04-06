import Toast from '@remobile/react-native-toast'
var net = require('net');
var client;
const dgram = require('dgram')
const socket = dgram.createSocket('udp4');
const Buffer = global.Buffer = require('buffer').Buffer;
var pcip;
import { NavigationActions } from 'react-navigation';



class WifiOperations {
  static connect(ip) {
    pcip = ip
  }

  static send(data) {
    socket.send(Buffer.from(data), 0, 3, 8089,pcip, function(err){
      if (err) throw err

    // console.log('message was sent')
   });
  }

}

module.exports = WifiOperations
