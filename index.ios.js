/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  PanResponder,
  Animated
} from 'react-native';

export default class forceTouchTest extends Component {
  constructor(props) {
    super(props);  
    this._touchable = this._touchable.bind(this);
    this.state = {
      panViewIsTapped: false
    }
  }

  componentWillMount() {
    this._panResponderChild = PanResponder.create({

      // true because we want tapping on the cal, to set it as a responder
      onStartShouldSetPanResponder: () => true,

      // false because we DON'T want to grab the responder lock from our children on start
      onStartShouldSetPanResponderCapture: () => false,

      /*
      onMoveShouldSetPanResponderCapture:
        false because we don't want to accidentally grab the responder lock from
        our children on movement.
          That's because sometimes even a small tap contains movement,
          and thus a big percentage of taps will not work.
          Keeping that flag false does not nessecarily mean that our children will
         always capture the responder lock on movement, (they can if they want),
         we're just not strict enough to grab it from them.
      */
      onMoveShouldSetPanResponderCapture: () => false,

      /*
      onMoveShouldSetPanResponder:
        We DO want moving the finter on the cal, to set it as a responder,
        BUT, we don't always want moving the finger on an appointment setting this parent
        as the responder.
 
        Logic:
        So, when the dx AND dy of the pan are 0, we return false, because we don't
        want to grab the responder from our appointment children.
 
        For anything other than that we just allow this parent to become the responder.
 
        (dx, dy: accumulated distance of the gesture since the touch started)
      */
      onMoveShouldSetPanResponder: (e, gestureState) =>
        !(gestureState.dx === 4 || gestureState.dy === 4),
    }),

    this._panResponderParent = PanResponder.create({
      // true because we want tapping on this to set it as the responder
      onStartShouldSetPanResponder: () => true,

      // true because we want this to capture the responder lock from it's parent on start
      onStartShouldSetPanResponderCapture: () => true,

      // when the pan responder lock is terminated, set the pan view as NOT tapped
      onPanResponderTerminate: () => {
        this.setState({ panViewIsTapped: false });
      },

      // true so that the parent can grab our responder lock if he wan'ts to.
      onPanResponderTerminationRequest: () => true,

      // false because we DON'T want this btn capturing the resp lock from it's parent on move
      onMoveShouldSetPanResponderCapture: () => false,

      // false because we DON'T want moving the finger on this to set it as the responder
      onMoveShouldSetPanResponder: () => false,

      onPanResponderGrant: () => {
        this.setState({ panViewIsTapped: true });
      },

      onPanResponderRelease: () => {
        this.setState({ panViewIsTapped: false });
        console.log('hello world');
      },
    })
  }

  _touchable() {
    let touchable;
    const touchableText = 'This should be force touchable!';
    const touchableChildren = (
      
        <Text>
          {touchableText}
        </Text>
      
    )
    if (View.forceTouchAvailable === false) {
      touchable = (
        <TouchableHighlight
          onPress={() => {console.log('forceTouchAvailable = false');}}
          style={styles.noForceTouch}
          underlayColor={styles.underlayHighlight}
        >
          {touchableChildren}
        </TouchableHighlight>
      );
    } else {
      touchable = (
        <View
          style={[styles.yesForceTouch, {
            backgroundColor: this.state.panViewIsTapped ? 
            styles.forceTouchHighlightBgColorTapped
            :
            styles.forceTouchHighlightBgColorNotTapped,
          }]}
          {...this._panResponderChild.PanHandlers} //_panResponderChild
        >
          {touchableChildren}
        </View>
      )
    }
    debugger;
    return (
      <View {...this._panResponderParent.panHandlers}>
        <Animated.View>
          <View>
            {touchable}
          </View>
        </Animated.View>
      </View>
    )
  }

  _appendEvent(event) {
    console.log('event: ', event);
  }

  render() {
    let touchable;
    const touchableText = 'This should be force touchable!';
    const touchableChildren = (
      <Text>
        {touchableText}
      </Text>
    );

    if (View.forceTouchAvailable === false) {
      touchable = (
        <TouchableHighlight
          onPress={() => { console.log('forceTouchAvailable = false'); }}
          style={styles.noForceTouch}
          underlayColor={styles.underlayHighlight}
        >
          {touchableChildren}
        </TouchableHighlight>
      );
    } else {
      touchable = (
        <View
          style={[styles.yesForceTouch, {
            backgroundColor: this.state.panViewIsTapped ?
              styles.forceTouchHighlightBgColorTapped
              :
              styles.forceTouchHighlightBgColorNotTapped,
          }]}
          {...this._panResponderChild.PanHandlers} //_panResponderChild
        >
          {touchableChildren}
        </View>
      )
    }
    return (
      <View style={styles.otherContainer}>
      <View {...this._panResponderParent.panHandlers}>
        <Animated.View>
          <View>
            {touchable}
          </View>
        </Animated.View>
      </View>
      </View>
    )
  }
/*
  render() {
    const renderTouchable = this._touchable();

    return (
      <View style={styles.otherContainer}>
        {renderTouchable}
      </View>
    );
  }
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  otherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  noForceTouch: {
    borderWidth: 1
  },
  yesForceTouch: {
    borderWidth: 2,
    borderColor: '#7cfc00'
  },
  underlayHighlight: {
    color: '#0000ff'
  },
  forceTouchHighlightBgColorNotTapped: {
    color: '#adff2f'
  },
  forceTouchHighlightBgColorTapped: {
    color: '#008000'
  }
});

AppRegistry.registerComponent('forceTouchTest', () => forceTouchTest);
