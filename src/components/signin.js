import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import logo from '../../images/logo.png';
import register from '../api/register';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
var {width, height} = Dimensions.get('window');
export default class sigin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sdt: '',
      email: '',
      matkhau: '',
      matkhau2: '',
      hindPass: true,
      hindPassRe: true,
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-left"
            color="#ffffff"
            size={wp('6%')}
            style={{paddingLeft: 10}}
          />
        </TouchableOpacity>
      ),
    };
  };

  onSuccess() {
    Alert.alert('Đăng ký thành công!');
    this.props.navigation.navigate('Login');
  }

  onFail() {
    Alert.alert('Error!', 'Email hoặc SĐT đã tồn tại!');
    this.setState({email: ''});
    this.setState({sdt: ''});
  }

  registerUser() {
    const {name, sdt, email, matkhau, matkhau2} = this.state;
    if (
      name === '' ||
      sdt === '' ||
      email === '' ||
      matkhau === '' ||
      matkhau2 === ''
    ) {
      Alert.alert('Error!', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (matkhau !== matkhau2) {
      Alert.alert('Error!', 'Mật khẩu không trùng khớp!');
      return;
    }
    register(name, sdt, email, matkhau)
      .then(res => res['message'])
      .then(result => {
        if (result === 'Dang ki thanh cong') return this.onSuccess();
        else this.onFail();
      });
  }

  showPass() {
    this.setState({hindPass: !this.state.hindPass});
  }
  showPassRe() {
    this.setState({hindPassRe: !this.state.hindPassRe});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.imgLogo} />
          </View>
          <View style={styles.logo}>
            <Text style={styles.txtHeader}>Small Giving</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập họ tên'}
              onChangeText={text => this.setState({name: text})}
              value={this.state.name}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập số điện thoại'}
              onChangeText={text => this.setState({sdt: text})}
              value={this.state.sdt}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              placeholder={'Nhập email'}
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
              keyboardType="email-address"
            />
          </View>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập mật khẩu'}
              onChangeText={text => this.setState({matkhau: text})}
              value={this.state.matkhau}
              secureTextEntry={this.state.hindPass}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPass.bind(this)}>
              <Feather
                name={this.state.hindPass ? 'eye' : 'eye-off'}
                size={wp('5%')}
              />
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground style={styles.textInputPass}>
            <TextInput
              style={styles.textInputInPass}
              placeholder={'Nhập lại mật khẩu'}
              onChangeText={text => this.setState({matkhau2: text})}
              value={this.state.matkhau2}
              secureTextEntry={this.state.hindPassRe}
            />
            <TouchableOpacity
              style={styles.showPass}
              onPress={this.showPassRe.bind(this)}>
              <Feather
                name={this.state.hindPassRe ? 'eye' : 'eye-off'}
                size={wp('5%')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                navigate('Login');
              }}
              style={styles.buttonIn}>
              <Text style={styles.buttonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.registerUser.bind(this)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    flexDirection: 'row',
  },
  logo: {
    margin: 10,
  },
  imgLogo: {
    height: hp('27%'),
    width: wp('40%'),
  },
  txtHeader: {
    fontSize: f(4.0),
    color: '#CD0606',
    fontWeight: 'bold',
  },
  textInput: {
    height: hp('6%'),
    width: wp('90%'),
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textInputIn: {
    fontSize: f(2),
    padding: 5,
  },
  textInputPass: {
    height: hp('6%'),
    width: wp('90%'),
    borderColor: '#545454',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    margin: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textInputInPass: {
    fontSize: f(2),
    padding: 5,
    flex: 9,
    justifyContent: 'center',
  },
  showPass: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIn: {
    height: hp('7%'),
    width: wp('35%'),
    backgroundColor: '#AE1F17',
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: f(2.5),
  },
});
