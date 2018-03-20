import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

export default class BackgroundImage extends Component {

    render() {
        return (
            <Image source={require('../images/1.png')}
                  style={styles.backgroundImage}>

                  {this.props.children}

            </Image>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32
    }
});
