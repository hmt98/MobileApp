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
  ImageBackground,
  Dimensions,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import heart from '../images/heart.png';
import canhan from '../images/canhan.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export default class account_info extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      tennguoidung: 'Hà Minh Tú',
      matkhau: '123456789',
      ngaysinh: '01/11/1998',
      sdt: '0942646398',
      email: 'minhtuha98@gmail.com',
      stk: '0451000504125',
    };
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
          <ImageBackground style={styles.imgNguoigia} source={heart}>
            <View style={styles.profile}>
              <Image style={styles.avata} source={canhan} />
              <ImageBackground style={styles.name}>
                <TextInput
                  ref={view => (this.textInput_name = view)}
                  style={styles.nameIn}
                  onChangeText={tennguoidung => this.setState(tennguoidung)}
                  value={this.state.tennguoidung}
                />
                <TouchableOpacity onPress={() => this.textInput_name.focus()}>
                  <Icon
                    name="pencil-square-o"
                    color="#ffffff"
                    style={{marginHorizontal: 30}}
                    size={20}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </ImageBackground>
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Mật khẩu</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_pass = view)}
                onChangeText={matkhau => this.setState(matkhau)}
                value={this.state.matkhau}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.textInput_pass.focus()}
              style={styles.img}>
              <Icon
                name="pencil-square-o"
                style={{marginHorizontal: 30}}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Ngày sinh</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_date = view)}
                onChangeText={ngaysinh => this.setState(ngaysinh)}
                value={this.state.ngaysinh}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.textInput_date.focus()}
              style={styles.img}>
              <Icon
                name="pencil-square-o"
                style={{marginHorizontal: 30}}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Số điện thoại</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_sdt = view)}
                onChangeText={sdt => this.setState(sdt)}
                value={this.state.sdt}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.textInput_sdt.focus()}
              style={styles.img}>
              <Icon
                name="pencil-square-o"
                style={{marginHorizontal: 30}}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Email</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_email = view)}
                onChangeText={email => this.setState(email)}
                value={this.state.email}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.textInput_email.focus()}
              style={styles.img}>
              <Icon
                name="pencil-square-o"
                style={{marginHorizontal: 30}}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Số tài khoản</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_stk = view)}
                onChangeText={stk => this.setState(stk)}
                value={this.state.stk}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.textInput_stk.focus()}
              style={styles.img}>
              <Icon
                name="pencil-square-o"
                style={{marginHorizontal: 30}}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.btnThem}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}
              style={styles.btnquaylai}>
              <Text style={styles.ttquaylai}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnhotro}>
              <Text style={styles.tthotro}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
  _edit = () => {};
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imgNguoigia: {
    height: height - 400,
    width: width,
  },
  profile: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  avata: {
    height: 70,
    width: 70,
    marginTop: height - 465,
  },
  name: {
    flexDirection: 'row',
    backgroundColor: '#AE1E17',
    height: 40,
    width: width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: height - 450,
    flexDirection: 'row',
  },
  nameIn: {
    fontSize: 20,
    color: 'white',
    flex: 5,
    padding: 5,
    marginLeft: 50,
  },
  imgEditName: {
    margin: 40,
    height: 20,
    width: 20,
  },
  taikhoan: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  tongchi: {
    flex: 5,
    alignItems: 'center',
  },
  sodu: {
    flex: 5,
    alignItems: 'center',
  },
  txtTaikhoan: {
    fontWeight: 'bold',
    color: '#545454',
    fontSize: 15,
  },
  nguoidung: {
    flexDirection: 'row',
    height: 40,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  tennguoidung: {
    flex: 3,
    paddingLeft: 10,
  },
  ten: {
    flex: 4,
  },
  img: {
    flex: 3,
    alignItems: 'center',
  },
  imgEdit: {
    height: 20,
    width: 20,
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
    marginTop: 30,
    borderColor: '#DE1F28',
    backgroundColor: '#AE1E17',
  },
  ttquaylai: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: 'white',
  },
  btnhotro: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 5,
    marginLeft: 120,
    marginTop: 30,
    borderColor: '#DE1F28',
    backgroundColor: '#AE1E17',
  },
  tthotro: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: 'white',
  },
  imgEditdate: {},
});
