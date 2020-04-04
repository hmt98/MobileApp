import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Anh from '../../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';

export default class menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: '', name: ''};
  }

  logout = async () => {
    this.setState({token: null});
    await AsyncStorage.setItem('tokenLogin', this.state.token);
    this.props.navigation.navigate('Intro');
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then(resName => resName['TenNguoiDung'])
      .then(resJSONName => {
        this.setState({name: resJSONName});
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.TboCanhan}>
            <Image source={Anh} style={styles.imgCanhan} />
            <Text
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}
              style={styles.txtCanhan}>
              {this.state.name}
            </Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.closeDrawer();
            }}
            style={styles.tboMenu}>
            <Entypo name={'home'} size={30} style={styles.imgLogo} />
            <Text style={styles.txtMenu}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Contact');
            }}
            style={styles.tboMenu}>
            <Entypo name={'phone'} size={30} style={styles.imgLogo} />
            <Text style={styles.txtMenu}>Liên hệ và góp ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Guide');
            }}
            style={styles.tboMenu}>
            <Entypo name={'text-document'} size={30} style={styles.imgLogo} />
            <Text style={styles.txtMenu}>Hướng dẫn nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.logout();
            }}
            style={styles.tboMenu}>
            <Entypo name={'log-out'} size={30} style={styles.imgLogo} />
            <Text style={styles.txtMenu}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  TboCanhan: {
    borderColor: '#545454',
    borderWidth: 1,
    height: 200,
    justifyContent: 'center',
  },
  imgCanhan: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  txtCanhan: {
    textAlign: 'center',
    fontSize: 25,
  },
  menu: {
    marginTop: '5%',
  },
  tboMenu: {
    flexDirection: 'row',
    height: height / 15,
  },
  imgLogo: {
    flex: 1,
    marginLeft: 30,
  },
  txtMenu: {
    flex: 4,
    alignSelf: 'center',
    fontSize: 18,
  },
});
