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
import Entypo from 'react-native-vector-icons/Entypo';
var URL = 'https://5e57414d4c695f001432fb16.mockapi.io/api/tblNguoiDung';

export default class sigin extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
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
  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <Text style={[{paddingTop: 20}, {fontSize: 15}]}>
            Mọi thắc mắc xin liên hệ và
          </Text>
          <Text style={[{fontSize: 15}]}>góp ý với chúng tôi</Text>
          <Text style={[{paddingTop: 15}, {fontSize: 15}]}>
            Cảm ơn bạn về những hành động cao đẹp!
          </Text>
        </View>
        <View>
          <View style={styles.gopy}>
            <Text style={[styles.cot1, {paddingRight: 10}]}>Họ và tên:</Text>
            <Text style={[styles.cot2, {marginLeft: 30}]}>Hà Minh Tú</Text>
          </View>
          <View style={styles.gopy}>
            <Text style={styles.cot1}>Số điện thoại:</Text>
            <Text style={styles.cot2}>0942646398</Text>
          </View>
          <View style={styles.gopy}>
            <Text style={styles.cot1}>Góp ý của bạn:</Text>
            <TextInput style={[styles.textInput, {marginLeft: 15}]}></TextInput>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.btngopy}>
            <Text style={styles.txtGopy}>Gửi góp ý</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  gopy: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  cot1: {
    color: '#545454',
  },
  cot2: {
    borderWidth: 1,
    width: '50%',
    textAlign: 'center',
    marginLeft: 20,
    borderColor: '#8e8e8e',
    color: '#545454',
  },
  textInput: {
    borderWidth: 1,
    width: '50%',
    height: '200%',
    marginLeft: 20,
    borderColor: '#8e8e8e',
    color: '#545454',
  },
  button: {
    flexDirection: 'row',
    marginTop: 90,
    alignSelf: 'center',
  },
  btngopy: {
    height: '130%',
    width: '30%',
    backgroundColor: '#AE1F17',
    borderRadius: 5,
  },
  txtGopy: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 9,
    fontSize: 15,
  },
});
