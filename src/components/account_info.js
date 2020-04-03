import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  RefreshControl,
  Alert,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import heart from '../../images/heart.png';
import canhan from '../../images/canhan.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
import updateInfor from '../api/updateInfor';
import Feather from 'react-native-vector-icons/Feather';
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
      id: '',
      name: '',
      pass: '',
      ngaysinh: '',
      sdt: '',
      email: '',
      stk: '',
      hindPass: true,
    };
  }

  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then(resID => resID['idNguoiDung'])
      .then(resJSON => {
        this.setState({id: resJSON});
      })
      .catch(error => console.log(error));
  };

  componentDidUpdate(preProps, preState, a) {
    const {id} = this.state;
    if (preState.id !== id) {
      getUserByID(id)
        .then(resName => resName[0]['TenNguoiDung'])
        .then(resJSON => {
          this.setState({name: resJSON});
        })
        .catch(error => console.log(error));

      getUserByID(id)
        .then(resPass => resPass[0]['MatKhau'])
        .then(resJSON => {
          this.setState({pass: resJSON});
        })
        .catch(error => console.log(error));

      getUserByID(id)
        .then(resSDT => resSDT[0]['SDT'])
        .then(resJSON => {
          this.setState({sdt: resJSON});
        })
        .catch(error => console.log(error));

      getUserByID(id)
        .then(resEmail => resEmail[0]['Email'])
        .then(resJSON => {
          this.setState({email: resJSON});
        })
        .catch(error => console.log(error));

      getUserByID(id)
        .then(resDate => resDate[0]['NgaySinh'])
        .then(resJSON => {
          this.setState({ngaysinh: resJSON});
        })
        .catch(error => console.log(error));

      getUserByID(id)
        .then(resSTK => resSTK[0]['STK'])
        .then(resJSON => {
          this.setState({stk: resJSON});
        })
        .catch(error => console.log(error));
    }
  }
  showPass() {
    this.setState({hindPass: !this.state.hindPass});
  }
  boqua() {
    this.props.navigation.goBack(null);
  }
  onSuccess() {
    Alert.alert('Cập nhật thành công!');
  }

  onFail() {
    Alert.alert('Error!', 'Email hoặc SĐT đã tồn tại!');
    this.setState({email: ''});
    this.setState({sdt: ''});
  }
  update = async () => {
    const {id, name, pass, sdt, email, ngaysinh, stk} = this.state;
    updateInfor(id, name, pass, sdt, email, ngaysinh, stk)
      .then(res => res['message'])
      .then(result => {
        if (result === 'Success') return this.onSuccess();
        else this.onFail();
      })
      .catch(error => console.log(error));
  };

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
                  onChangeText={text => this.setState({name: text})}
                  value={this.state.name}
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
                onChangeText={text => this.setState({pass: text})}
                value={this.state.pass}
                secureTextEntry={this.state.hindPass}
              />
            </View>
            <View style={[styles.img, {flexDirection: 'row'}]}>
              <TouchableOpacity onPress={this.showPass.bind(this)}>
                <Feather
                  name={this.state.hindPass ? 'eye' : 'eye-off'}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.textInput_pass.focus()}>
                <Icon
                  name="pencil-square-o"
                  style={{marginHorizontal: 30}}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Số điện thoại</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_sdt = view)}
                onChangeText={text => this.setState({sdt: text})}
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
                onChangeText={text => this.setState({email: text})}
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
              <Text>Ngày sinh</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_date = view)}
                onChangeText={text => this.setState({ngaysinh: text})}
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
          <RefreshControl refreshing={true} />
          <View style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Text>Số tài khoản</Text>
            </View>
            <View style={styles.ten}>
              <TextInput
                ref={view => (this.textInput_stk = view)}
                onChangeText={text => this.setState({stk: text})}
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
              onPress={() => this.boqua()}
              style={styles.btnquaylai}>
              <Text style={styles.ttquaylai}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.update.bind(this)}
              style={styles.btnhotro}>
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
    height: height / 15,
    width: width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: height - 450,
  },
  nameIn: {
    fontSize: 20,
    color: 'white',
  },
  imgEditName: {
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
