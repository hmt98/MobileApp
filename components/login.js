import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keybroad,
  keyboardType,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Alert,
  AsyncStorage,
  FlatList,
} from 'react-native';
var URL = 'https://5e57414d4c695f001432fb16.mockapi.io/api/tblNguoiDung';
import logo1 from '../images/logo.png';
import {getUserFromServer} from '../networking/Server';
import Entypo from 'react-native-vector-icons/Entypo';

const userInfor = {email: 'tu', matkhau: '1'};

export default class login extends Component {
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
    this.state = {email: '', matkhau: '', token: 'a'};
  }

  render(item) {
    if (this.state.token !== null) {
      this.props.navigation.navigate('Main');
    }

    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView behavior="padding" style={styles.container}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <StatusBar barStyle="light-content" />
          <View style={styles.logoconatainer}>
            <Image style={styles.logo} source={logo1} />
          </View>
          <View style={{paddingTop: 20}}>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại hoặc email"
              placeholderTextColor="#A0A0A0"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              keyboardType="email-address"
            />
          </View>
          <View style={{paddingTop: 10}}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              keyboardType="default"
              placeholderTextColor="#A0A0A0"
              onChangeText={matkhau => this.setState({matkhau})}
              value={this.state.matkhau}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._login} style={styles.btnLogin}>
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
          <TouchableOpacity
            onPress={() => {
              navigate('Forgot_pass');
            }}
            style={styles.btnQuenpass}>
            <Text style={styles.quenpass} placeholderTextColor="ra(255,0)">
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ktra = async () => {
  //   if (this.state.taikhoan === '') {
  //     Alert.alert('Error!', 'Bạn chưa nhập tài khoản!');
  //   } else if (this.state.matkhau === '') {
  //     Alert.alert('Error!', 'Bạn chưa nhập mật khẩu!');
  //   } else {
  //     Alert.alert('Đăng nhập thành công!');
  //     this.props.navigation.navigate('Home');
  //   }
  // };

  _login = async () => {
    if (this.state.email === '') {
      Alert.alert('Error!', 'Bạn chưa nhập tài khoản!');
    } else if (this.state.matkhau === '') {
      Alert.alert('Error!', 'Bạn chưa nhập mật khẩu!');
    } else {
      if (
        userInfor.email === this.state.email &&
        userInfor.matkhau === this.state.matkhau
      ) {
        this.state.token = 'a';
        alert('Đăng nhập thành công!');
        this.props.navigation.navigate('Main');
      } else {
        alert('Thông tin tài khoản hoặc mật khẩu không đúng!');
      }
    }
  };
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
});
