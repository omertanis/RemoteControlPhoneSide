import Toast from '@remobile/react-native-toast'
var net = require('net');
var client;
const dgram = require('dgram')
const socket = dgram.createSocket('udp4');
const Buffer = global.Buffer = require('buffer').Buffer;
var pcip;



class WifiOperations {
  static connect(ip) {
    pcip = ip
    // client = net.createConnection(8089, ip);
    //
    // client.on('error', function(error) {
    //   console.log("error")
    // });

    socket.bind(8089, ip, function() {
      console.log('connection');
    });

    socket.on('error', (err) => {
      console.log("error udp");
    });

  }
  // static send(data) {
  //   console.log("yaziyo");
  //   console.log(data);
  //   client.write(data + "/")
  // }

  //192.168.2.69
  static send(data) {
    socket.send(Buffer.from(data), 0, 3, 8089,pcip, function(err){
      err && console.error(err.stack || err);
   });

  }

}

module.exports = WifiOperations
