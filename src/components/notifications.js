import React from 'react'
import { Text, View, Button, AppState } from 'react-native'
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';

export default class MyApp extends React.Component {

  constructor(props){
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      seconds: 1,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    console.log("-*- Start here -*-");
    this.configNotification()
  }

  componentWillUnMount(){
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(appState){

    if(appState === 'background'){

        PushNotification.localNotificationSchedule({
          message: "My notification Message",
          date: new Date(Date.now()),
        })


    }
    console.log(appState);
  }

  configNotification(){
    PushNotification.configure({
      onNotification: function(notification) {
    console.log( 'NOTIFICATION:', notification );
  },
    })

  }

  test(){
    const intervalId = BackgroundTimer.setInterval(() => {
    	console.log('tic');
    }, 200);

  }

  render() {
    return (<View><Text>Notifications Page</Text>
      <Button
        textStyle={{ color: '#FFFFFF' }}
        title='Cancel Discovery'
        onPress={() => this.test()} />
        </View>)
  }
}
