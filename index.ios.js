 /*
 * Sample React Native Force Touch App
 * based on https://github.com/facebook/react-native
 * React-Native Version 0.45.0
 * Last successful compile and test on June 13, 2017
 * WARNING: View.forceTouchAvailable has been deprecated and will be removed in a future version of ReactNative. 
 * Use NativeModules.PlatformConstants.forceTouchAvailable instead.
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NativeModules,
  View,
} from 'react-native';

export default class forceTouchTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      force: 0
    }
  }

  _renderConsoleText() {
    return (
      NativeModules.PlatformConstants.forceTouchAvailable ? //We need check if force push is available on the device.
      'Force: ' + this.state.force.toFixed(3) :
      '3D Touch not available on this device'
    );
  }

  _forceTouchDemonstration() {
    return (
      <View>
        <View style={styles.forceTouchBox}>
          <Text>
            {this._renderConsoleText()}
          </Text>
        </View>
        <View style={styles.row}>
          <View
            style={styles.wrapper}
            onStartShouldSetResponder={() => true}
            onResponderMove={(event) => this.setState({ force: event.nativeEvent.force })}
            onResponderRelease={(event) => this.setState({ force: 0 })}>
            <Text style={styles.button}>
              Press Me
              </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const forceTouchDemonstration = this._forceTouchDemonstration();
    return (
      <View style={styles.container}>
        {forceTouchDemonstration}
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    borderRadius: 8,
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    color: '#007AFF',
  },
  forceTouchBox: {
    padding: 10,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('forceTouchTest', () => forceTouchTest);
