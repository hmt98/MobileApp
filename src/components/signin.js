import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import logo from '../../images/logo.png';
import register from '../api/register';
var URL = 'https://5e57414d4c695f001432fb16.mockapi.io/api/tblNguoiDung';

export default class sigin extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', sdt: '', email: '', matkhau: ''};
  }
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

  onSuccess() {
    Alert.alert(
      'Notice',
      'Sign up successfully',
      [{text: 'OK', onPress: this.props.navigation.navigate('Login')}],
      {cancelable: false},
    );
  }

  onFail() {
    Alert.alert(
      'Notice',
      'Email has been used by other',
      [{text: 'OK', onPress: () => this.removeEmail.bind(this)}],
      {cancelable: false},
    );
  }

  removeEmail() {
    this.setState({email: ''});
  }

  registerUser() {
    const {name, sdt, email, password} = this.state;
    register(name, sdt, email, password).then(res => {
      if (res === 'THANH_CONG') return this.onSuccess();
      this.onFail();
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
        <SafeAreaView>
          <View style={styles.logo}>
            <Image source={logo} style={styles.logoapp} />
            <Text style={styles.title1}>Small Giving</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.title2}>Tạo tài khoản</Text>
          </View>
          {/*---Text nhập email*/}
          <View style={styles.email}>
            <TextInput
              style={styles.ipEmail}
              placeholder="Nhập họ tên"
              placeholderTextColor="#BAA8A8"
              onChangeText={name => this.setState({name})}
              value={this.state.name}
              keyboardType="email-address"
            />
          </View>
          {/*---Text nhập số điện thoại*/}
          <View style={styles.sodienthoai}>
            <TextInput
              style={styles.ipsodienthoai}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#BAA8A8"
              onChangeText={sdt => this.setState({sdt})}
              value={this.state.sdt}
              keyboardType="email-address"
            />
          </View>
          {/*---Text nhập email*/}
          <View style={styles.email}>
            <TextInput
              style={styles.ipEmail}
              placeholder="Nhập email"
              placeholderTextColor="#BAA8A8"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              keyboardType="email-address"
            />
          </View>
          {/*---Text nhập password*/}
          <View style={styles.pass}>
            <TextInput
              style={styles.ipPass}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#BAA8A8"
              keyboardType="default"
              onChangeText={matkhau => this.setState({matkhau})}
              value={this.state.matkhau}
              secureTextEntry={true}
            />
          </View>
          {/*---Text nhập lại password*/}
          <View style={styles.pass1}>
            <TextInput
              style={styles.ipPass1}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#BAA8A8"
              keyboardType="default"
              onChangeText={matkhau2 => this.setState({matkhau2})}
              value={this.state.matkhau2}
              secureTextEntry={true}
            />
          </View>

          <View style={{paddingTop: 15}}>
            <TouchableOpacity
              onPress={this.registerUser.bind(this)}
              style={styles.btnDangki}>
              <Text style={styles.ttdangki}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.btnThem}>
              <TouchableOpacity
                onPress={() => {
                  navigate('Login');
                }}
                style={styles.btnquaylai}>
                <Text style={styles.ttquaylai}>Quay lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnhotro}>
                <Text style={styles.tthotro}>Hỗ trợ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  sigin = async () => {
    if (this.state.email === '') {
      Alert.alert('Error!', 'Bạn chưa nhập email!');
    } else if (this.state.sdt === '') {
      Alert.alert('Error!', 'Bạn chưa nhập số điện thoại!');
    } else if (this.state.matkhau === '') {
      Alert.alert('Error!', 'Bạn chưa nhập mật khẩu!');
    } else if (this.state.matkhau2 === '') {
      Alert.alert('Error!', 'Bạn chưa nhập lại mật khẩu!');
    } else if (this.state.matkhau !== this.state.matkhau2) {
      Alert.alert('Error!', 'Mật khẩu nhập không giống nhau!');
    } else {
      fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          sdt: this.state.sdt,
          matkhau: this.state.matkhau,
        }),
      })
        .then(response => response.json())
        .then(res => {
          alert('Đăng ký thành công');
          this.props.navigation.navigate('Login');
        })
        .done();
    }
  };
}

const styles = StyleSheet.create({
  logo: {
    flexDirection: 'row',
  },
  logoapp: {
    width: 100,
    height: 110,
    marginLeft: 50,
    marginTop: 20,
  },
  title1: {
    color: '#CD0606',
    fontSize: 35,
    marginTop: 45,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  email: {
    width: 350,
    height: 35,
    marginTop: 10,
    marginLeft: 30,
  },
  ipEmail: {
    borderColor: '#7E5D5D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  sodienthoai: {
    width: 350,
    height: 35,
    marginTop: 15,
    marginLeft: 30,
  },
  ipsodienthoai: {
    borderColor: '#7E5D5D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  pass: {
    width: 350,
    height: 35,
    marginTop: 15,
    marginLeft: 30,
  },
  ipPass: {
    borderColor: '#7E5D5D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  pass1: {
    textAlign: 'center',
    width: 350,
    height: 35,
    marginTop: 15,
    marginLeft: 30,
  },
  ipPass1: {
    borderColor: '#7E5D5D',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  gioitinh: {
    marginTop: 30,
    marginLeft: 30,
  },
  ttgioitinh: {
    fontSize: 15,
    color: '#474747',
    fontWeight: 'bold',
  },
  rdgioitinh: {
    marginLeft: 80,
    marginTop: -20,
    paddingRight: 90,
  },
  btnDangki: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    marginLeft: 150,
    marginTop: 20,
    borderColor: '#DE1F28',
    backgroundColor: '#B00C14',
  },
  ttdangki: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#F8F3F3',
  },
  btnThem: {
    flexDirection: 'row',
  },
  btnquaylai: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    marginLeft: 37,
    marginTop: 20,
    borderColor: '#DE1F28',
    backgroundColor: '#F8F3F3',
  },
  ttquaylai: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#B00C14',
  },
  btnhotro: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    marginLeft: 120,
    marginTop: 20,
    borderColor: '#DE1F28',
    backgroundColor: '#F8F3F3',
  },
  tthotro: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#B00C14',
  },
});
