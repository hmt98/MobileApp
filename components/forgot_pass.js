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
  ToastAndroid,
  Alert,
} from 'react-native';
import logo from '../images/logo.png';
import mail from '../images/mail.png';

export default class forgot_pass extends Component {
  constructor(props) {
    super(props);
    this.state = {email: ''};
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.logoapp}>
            <Image style={styles.imgLogo} source={logo} />
            <Text style={styles.txtSmall}>Small Giving</Text>
          </View>
          <View style={styles.txtTitle}>
            <Text style={styles.txtXacnhan}>XÁC NHẬN QUÊN MẬT KHẨU</Text>
            <Text style={styles.txtOtp}>Chúng tôi sẽ gửi mã xác nhận qua</Text>
            <Text style={styles.txtSMS}>Email của bạn</Text>
          </View>
          <View style={styles.inputThongtin}>
            <TextInput
              style={styles.txitThongtin}
              placeholder="Nhập email"
              placeholderTextColor="#BAA8A8"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
              keyboardType="email-address"
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={this.ktra}
              style={styles.buttonContainer}>
              <Text style={styles.textButton}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('Login');
              }}
              style={styles.buttonContainerR}>
              <Text style={styles.textButtonR}>Quay lại</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image style={styles.imgMail} source={mail} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  ktra = async () => {
    if (this.state.email === '') {
      Alert.alert('Error!', 'Bạn chưa nhập email!');
    } else {
      this.props.navigation.navigate('OTP');
    }
  };
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  logoapp: {
    flexDirection: 'row',
  },
  imgLogo: {
    width: 100,
    height: 100,
    marginLeft: 50,
    marginTop: 10,
  },
  imgMail: {
    width: 145,
    height: 140,
    marginLeft: 140,
    marginTop: 10,
  },
  txtSmall: {
    color: '#CD0606',
    fontSize: 35,
    marginTop: 35,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  txtTitle: {
    marginTop: 20,
  },
  txtXacnhan: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtOtp: {
    fontSize: 16,
    textAlign: 'center',
    color: '#545454',
    marginTop: 20,
  },
  txtSMS: {
    fontSize: 16,
    textAlign: 'center',
    color: '#545454',
    marginTop: 1,
  },
  txitThongtin: {
    width: 350,
    height: 40,
    borderWidth: 1,
    borderColor: '#545454',
    borderRadius: 6,
    marginLeft: 30,
    marginTop: 25,
    padding: 7,
    paddingLeft: 15,
    fontSize: 18,
  },
  Xacminh: {
    marginTop: 20,
    flexDirection: 'row',
  },
  labXacminh: {
    marginLeft: 30,
    fontSize: 16,
  },
  rdXacminh: {
    marginLeft: 15,
  },
  buttonContainer: {
    backgroundColor: '#CD0606',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 140,
    borderRadius: 15,
    marginTop: 20,
  },
  textButton: {
    fontSize: 22,
    color: 'white',
  },
  buttonContainerR: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 140,
    borderRadius: 15,
    marginTop: 10,
  },
  textButtonR: {
    fontSize: 22,
    color: '#CD0606',
  },
});
