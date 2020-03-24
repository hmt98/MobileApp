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
  Alert,
} from 'react-native';
import logo from '../../images/logo.png';
import mail from '../../images/mail.png';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
export default class otp extends Component {
  constructor(props) {
    super(props);
    this.state = {ma: ''};
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
          </View>
          <View style={styles.inputOTP}>
            <TextInput
              style={styles.txitOtp}
              placeholder={'Nhập mã xác nhận'}
              onChangeText={ma => this.setState({ma})}
              value={this.state.ma}
            />
          </View>
          <TouchableOpacity style={styles.buttonContainerMa}>
            <Text style={styles.textButtonMa}>Gửi lại mã!</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={this.ktra}
              style={styles.buttonContainer}>
              <Text style={styles.textButton}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('Forgot_pass');
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
    if (this.state.ma === '') {
      Alert.alert('Error!', 'Bạn chưa nhập mã!');
    } else {
      this.props.navigation.navigate('Reset_pass');
    }
  };
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoapp: {
    marginTop: 20,
    flexDirection: 'row',
  },
  txtSmall: {
    color: '#CD0606',
    fontSize: 35,
    marginTop: 35,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  imgLogo: {
    width: 100,
    height: 100,
    marginLeft: '5%',
    marginTop: 10,
  },
  imgMail: {
    width: 135,
    height: 130,
    marginLeft: 110,
    marginTop: 20,
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
    marginTop: 10,
  },
  inputOTP: {
    flexDirection: 'row',
    marginLeft: '15%',
    marginTop: '2%',
  },
  txitOtp: {
    width: '80%',
    height: '80%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#545454',
    alignItems: 'center',
    fontSize: 15,
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#CD0606',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: '30%',
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
    borderRadius: 15,
    marginTop: 20,
  },
  textButtonR: {
    fontSize: 22,
    color: '#CD0606',
  },
  buttonContainerMa: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: 'black',
    marginTop: '1%',
  },
  textButtonMa: {
    fontSize: 18,
    color: '#CD0606',
  },
});
