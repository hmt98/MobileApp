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
import getUserByID from '../api/getUserByID';
export default class menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: '', name: '', id: ''};
  }

  logout = async () => {
    this.setState({token: null});
    await AsyncStorage.setItem('tokenLogin', this.state.token);
    this.props.navigation.navigate('Intro');
  };

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
      this.getdata();
    }
  }

  getdata() {
    const {id} = this.state;
    getUserByID(id)
      .then(resName => resName[0]['TenNguoiDung'])
      .then(resJSON => {
        this.setState({name: resJSON});
      })
      .catch(error => console.log(error));
  }

  home() {
    this.getdata();
    this.props.navigation.closeDrawer();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={Anh} style={styles.imgCanhan} />
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtCanhan}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={this.home.bind(this)}
              style={styles.btnAll}>
              <Entypo name={'home'} size={30} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Trang chủ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Contact');
              }}
              style={styles.btnAll}>
              <Entypo name={'phone'} size={30} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Liên hệ và góp ý</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Guide');
              }}
              style={styles.btnAll}>
              <Entypo name={'text-document'} size={30} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Hướng dẫn nạp tiền</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() => {
                this.logout();
              }}
              style={styles.btnAll}>
              <Entypo name={'log-out'} size={30} style={styles.imgBtn} />
              <Text style={styles.txtBtn}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 3,
    borderBottomColor: '#545454',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 5,
  },
  footer: {
    flex: 2,
  },
  imgCanhan: {
    width: width / 4,
    height: height / 5,
  },
  txtCanhan: {
    fontSize: 25,
  },
  btnAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: '10%',
  },
  imgBtn: {
    flex: 1,
    marginLeft: '10%',
  },
  txtBtn: {
    flex: 9,
    marginLeft: '2%',
    fontSize: 20,
  },
});
