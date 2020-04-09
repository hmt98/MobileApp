import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import logo from '../../images/logo.png';
import {connect} from 'react-redux';
var {width, height} = Dimensions.get('window');
class intro extends Component {
  checkToken = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    if (tokenAsync === null) {
      this.props.navigation.navigate('Login');
      return;
    }
    if (tokenAsync !== null) this.props.navigation.navigate('Main');
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} />
        </View>
        <View style={styles.main}>
          <Text style={styles.txtLogo}>Small Giving</Text>
          <Text style={styles.txtSlogan}>small giving - big meaning</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.sloganVn}>
            <Text style={styles.txtSloganVn}>Việc làm nhỏ - Ý nghĩa lớn</Text>
            <Text style={styles.txtSloganVn}>
              Cùng chung tay giúp những hoàn cảnh khó khăn
            </Text>
          </View>
          <View style={styles.sloganVn}>
            <TouchableOpacity
              onPress={() => {
                this.checkToken();
              }}
              style={styles.btnTieptuc}>
              <Text style={styles.txtBtn}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#AE1F17',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 2,
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    flexDirection: 'column',
  },
  txtLogo: {
    color: 'white',
    fontSize: 50,
  },
  txtSlogan: {
    color: 'white',
    fontSize: 25,
  },
  txtSloganVn: {
    fontSize: 15,
    color: 'white',
  },
  sloganVn: {
    alignItems: 'center',
    flex: 5,
  },
  btnTieptuc: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: width / 2,
    height: height / 15,
  },
  txtBtn: {
    fontSize: 30,
  },
});
function mapStateToProps(state) {
  return {
    myToken: state.token,
  };
}
export default connect(mapStateToProps)(intro);
