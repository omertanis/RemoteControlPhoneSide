import Toast from '@remobile/react-native-toast'
var net = require('net');
var client;

class WifiOperations {
  static connect(ip) {
    client = net.createConnection(8089, ip);
    client.on('error', function(error) {
      console.log(error)
    });
  }
  static send(data){
    console.log(data);
      client.write(data)
  }

}
module.exports = WifiOperations
