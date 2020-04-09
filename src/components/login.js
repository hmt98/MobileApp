import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import logo from '../../images/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {startGetToken, loginSuccess, loginError} from '../redux/actionCreaters';
import getTokenEmail from '../api/getTokenEmail';
import getTokenSDT from '../api/getTokenSDT';
var {width, height} = Dimensions.get('window');
class login extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-left"
            color="#ffffff"
            size={25}
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', name: '', hindPass: true};
  }

  componentWillReceiveProps = async nextProps => {
    //kiểm tra xem có kết nối mạng chưa
    if (nextProps.myError) {
      Alert.alert('Error!', 'Vui lòng kiểm tra kết nối mạng!');
      return;
    }
    //kiểm tra xem thông tin đăng nhập đúng chưa
    if (nextProps.myToken === 'ERROR') {
      Alert.alert('Error!', 'Thông tin đăng nhập không chính xác!');
      return;
    }
    if (nextProps.myToken !== 'ERROR' && nextProps.myToken !== null) {
      await AsyncStorage.setItem('tokenLogin', nextProps.myToken);
      Alert.alert('Đăng nhập thành công!');
      this.props.navigation.navigate('Main');
    }
  };

  getLoginStatus() {
    const {myUserName, myError, myPassWord, myToken} = this.props;
    if (myError) return `Vui lòng kiểm tra lại kết nối mạng!`;
    else return `${myUserName},${myPassWord} là ${myToken} `;
  }

  login = async () => {
    const {username, password} = this.state;
    const {myError, myPassWord, myToken, myUserName} = this.props;
    //kiểm tra xem điền thông tin đăng nhập chưa
    if (username === '' || password === '') {
      Alert.alert('Error!', 'Vui lòng điền thông tin đăng nhập!');
      return;
    }
    this.props.startGetToken();
    if (username.includes('@')) {
      getTokenEmail(username, password)
        .then(res => this.props.loginSuccess(username, password, res['token']))
        .catch(() => this.props.loginError());
    } else {
      getTokenSDT(username, password)
        .then(res => this.props.loginSuccess(username, password, res['token']))
        .catch(() => this.props.loginError());
    }
  };

  showPass() {
    this.setState({hindPass: !this.state.hindPass});
  }

  forgotPass() {
    Alert.alert(
      'Notice!',
      'Bạn vui lòng truy cập website http://smallgiving.com để được hỗ trợ! Trân trọng!',
    );
  }
  render(item) {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.main}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập Email hoặc SĐT'}
              onChangeText={text => this.setState({username: text})}
              value={this.state.username}
              keyboardType="email-address"
            />
          </View>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập mật khẩu'}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={this.state.hindPass}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPass.bind(this)}>
              <Feather
                name={this.state.hindPass ? 'eye' : 'eye-off'}
                size={20}
              />
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity
            onPress={this.forgotPass.bind(this)}
            style={styles.forgotPass}>
            <Text style={styles.txtForgotPass}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.login.bind(this)}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('Signin');
              }}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Đăng ký</Text>
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
    backgroundColor: 'white',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 2,
  },
  footer: {
    flex: 4,
  },
  logo: {
    height: height / 3,
    width: width / 1.8,
  },
  textInput: {
    height: height / 15,
    width: width / 1.2,
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    margin: 5,
    paddingLeft: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textInputPass: {
    height: height / 15,
    width: width / 1.2,
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: 'center',
    margin: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textInputIn: {
    fontSize: 20,
    justifyContent: 'center',
    padding: 5,
  },
  textInputInPass: {
    fontSize: 20,
    padding: 5,
    flex: 9,
    justifyContent: 'center',
  },
  showPass: {
    flex: 1,
    justifyContent: 'center',
  },
  forgotPass: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtForgotPass: {
    fontSize: 18,
    color: '#545454',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIn: {
    height: height / 15,
    width: width / 3,
    backgroundColor: '#AE1F17',
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

function mapStateToProps(state) {
  return {
    myUserName: state.username,
    myPassWord: state.password,
    myError: state.err,
    myToken: state.token,
  };
}
export default connect(
  mapStateToProps,
  {
    startGetToken,
    loginSuccess,
    loginError,
  },
)(login);
