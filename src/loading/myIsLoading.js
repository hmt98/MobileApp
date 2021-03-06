import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import loading from '../../images/loading.png';
import loading from '../../images/loading.gif';
export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
    };
  }

  rotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.rotateValue, {
        toValue: 0,
        duration: 0,
      }),
    ]).start(() => {
      this.rotateAnimation();
    });
  };
  componentDidMount() {
    this.rotateAnimation();
  }
  render() {
    const interpolateAnimation = this.state.rotateValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.loginStatus} opacity={this.props.show ? 1 : 0}>
        <Animated.Image
          source={loading}
          style={[
            styles.imgLoad,
            {transform: [{rotate: interpolateAnimation}]},
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLoginStatus: {
    fontSize: f(2),
  },
  imgLoad: {
    height: hp('10%'),
    width: wp('10%'),
  },
});
