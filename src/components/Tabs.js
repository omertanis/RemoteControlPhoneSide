import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap,TabViewPagerPan  } from 'react-native-tab-view';
import MousePage from './MousePage.js'
import KeyboardPage from './KeyboardPage.js'
import MainPage from './MainPage.js';
import BluetoothSerial from 'react-native-bluetooth-serial'
import WifiOperations from './WifiOperations';
import { NavigationActions } from 'react-navigation';



const FirstRoute = () => <MousePage/>;
const SecondRoute = () => <KeyboardPage />;

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Mouse' },
      { key: 'second', title: 'Klavye' },
    ],
  };


  componentWillMount(){

    if(MainPage.getChoose() == "Bluetooth"){

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
    }else{
      WifiOperations.connect(this.props.navigation.state.params.ip)
    }


  }
  
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  render() {
    return (
      <TabViewAnimated
      style={styles.container}
      navigationState={this.state}
      renderScene={this._renderScene}
      renderFooter={this._renderHeader}
      onIndexChange={this._handleIndexChange}
      animationEnabled={false}
      swipeEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:200,
  },
});
