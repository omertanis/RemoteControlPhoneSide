import React from 'react'
import { Text, View, Button } from 'react-native'
import BackgroundTimer from 'react-native-background-timer';


export default class MyApp extends React.Component {
  componentDidMount() {
    console.log("-*- Start here -*-");
  }

  test(){
    const intervalId = BackgroundTimer.setInterval(() => {
    	console.log('tic');
    }, 200);

  }

  render() {
    return (<View><Text>Hello world</Text>
      <Button
        textStyle={{ color: '#FFFFFF' }}
        title='Cancel Discovery'
        onPress={() => this.test()} />
        </View>)
  }
}
