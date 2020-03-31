import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
} from 'react-native';
import logo1 from '../../images/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import {startGetToken, loginSuccess, loginError} from '../redux/actionCreaters';
import getTokenEmail from '../api/getTokenEmail';
import getTokenSDT from '../api/getTokenSDT';
import getUser from '../api/getUser';

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
    this.state = {username: '', password: '', name: ''};
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
    // //kiểm tra xem có kết nối mạng chưa
    // if (myError) {
    //   Alert.alert('Error!', 'Vui lòng kiểm tra kết nối mạng!');
    //   return;
    // }
    // //kiểm tra xem thông tin đăng nhập đúng chưa
    // if (myToken === 'ERROR') {
    //   Alert.alert('Error!', 'Thông tin đăng nhập không chính xác!');
    //   return;
    // }
    // if (myToken !== 'ERROR' && myToken !== null) {
    //   await AsyncStorage.setItem('tokenLogin', myToken);
    //   getUser(myToken)
    //     .then(res => res.json())
    //     .then(resJSON => console.log(resJSON));
    //   Alert.alert('Đăng nhập thành công!');
    //   this.props.navigation.navigate('Main');
    // }
  };

  render(item) {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoconatainer}>
          <Image style={styles.logo} source={logo1} />
        </View>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
          <View style={{paddingTop: 20}}>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại hoặc email"
              placeholderTextColor="#A0A0A0"
              onChangeText={text => this.setState({username: text})}
              value={this.state.username}
              //keyboardType="email-address"
            />
          </View>
          <View style={{paddingTop: 10}}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              keyboardType="default"
              placeholderTextColor="#A0A0A0"
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.login.bind(this)}
              style={styles.btnLogin}>
              <Text style={styles.textbtnLogin}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('Signin');
              }}
              style={styles.btnSignin}>
              <Text style={styles.textbtnSignin}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => {
            navigate('Forgot_pass');
          }}
          style={styles.btnQuenpass}>
          <Text style={styles.quenpass} placeholderTextColor="ra(255,0)">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    width: 190,
    height: 209,
    marginLeft: 110,
  },
  title: {
    fontSize: 20,
    color: '#AE1F17',
    textAlign: 'center',
    paddingTop: 20,
  },
  input: {
    borderRadius: 10,
    paddingVertical: 7,
    marginHorizontal: 20,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#A0A0A0',
    padding: 15,
  },
  buttonContainer: {
    paddingVertical: 30,
    marginHorizontal: 50,
    flexDirection: 'row',
  },
  btnLogin: {
    flexDirection: 'row',
    flex: 5,
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    height: 40,
    borderColor: '#AE1F17',
    marginRight: 20,
  },
  btnSignin: {
    flexDirection: 'row',
    flex: 5,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#AE1F17',
    marginLeft: 20,
  },
  textbtnLogin: {
    fontSize: 20,
    color: '#AE1F17',
    padding: 15,
  },
  textbtnSignin: {
    fontSize: 20,
    color: 'white',
    padding: 27,
  },
  btnquenpass: {
    marginLeft: 40,
  },
  quenpass: {
    fontSize: 20,
    color: '#545454',
    marginTop: -10,
    textAlign: 'center',
  },
  loginStatus: {
    alignSelf: 'center',
    fontSize: 15,
    paddingTop: 5,
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
export default connect(mapStateToProps, {
  startGetToken,
  loginSuccess,
  loginError,
})(login);
