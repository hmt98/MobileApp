import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keybroad,
  keyboardType,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
var {width, height} = Dimensions.get('window');

export default class taikhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(300),
      animateValue: '',
    };
  }

  _fadeAnimation = () => {
    // alert('Bấm');
    Animated.timing(this.state.fadeValue, {
      toValue: 2,
      duration: 1000,
    }).start();
  };

  _goAnimation = () => {
    // alert('Bấm');
    Animated.timing(this.state.xValue, {
      toValue: height - 300,
      duration: 500,
      easing: Easing.linear,
    }).start();
  };

  _backAnimation = () => {
    // alert('Bấm');
    Animated.timing(this.state.xValue, {
      toValue: 300,
      duration: 500,
      easing: Easing.linear,
      animateValue: 'shake',
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ani}>
          <TouchableOpacity onPress={this._goAnimation} style={styles.button}>
            <Text style={[{color: 'white'}]}>Tiến</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._backAnimation}
            style={styles.button1}>
            <Text style={[{color: 'white'}]}>Lùi</Text>
          </TouchableOpacity>
          <Animatable.View
            style={[
              styles.animationView /*{opacity: this.state.fadeValue}*/,
              ,
              {bottom: this.state.xValue},
            ]}></Animatable.View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationView: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginTop: 400,
    alignSelf: 'center',
  },
  button: {
    height: 40,
    width: 90,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 300,
  },
  button1: {
    height: 40,
    width: 90,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 300,
    marginBottom: 40,
  },
  ani: {
    marginTop: 450,
  },
});
