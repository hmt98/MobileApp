import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import heart from '../../images/heart.png';
import canhan from '../../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class account extends Component {
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
          <ImageBackground style={styles.imgNguoigia} source={heart}>
            <View style={styles.profile}>
              <Image style={styles.avata} source={canhan} />
              <ImageBackground style={styles.name}>
                <Text style={styles.nameIn}>Hà Minh Tú</Text>
              </ImageBackground>
            </View>
          </ImageBackground>
          <View style={styles.taikhoan}>
            <View style={styles.tongchi}>
              <Text style={styles.txtTaikhoan}>Tổng chi 5/2020</Text>
              <Text>500000</Text>
            </View>
            <View style={styles.sodu}>
              <Text style={styles.txtTaikhoan}>Số dư</Text>
              <Text>4000000</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Account_info')}
            style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Entypo
                name={'v-card'}
                size={30}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Chỉnh sửa thông tin</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <FontAwesome5
                name={'medal'}
                size={30}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Xem huy hiệu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Entypo
                name={'back-in-time'}
                size={30}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Lịch sử giao dịch</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nguoidung}>
            <View style={styles.tennguoidung}>
              <Entypo
                name={'magnifying-glass'}
                size={30}
                style={styles.imgLogo}
                color={'#545454'}
              />
            </View>
            <View style={styles.ten}>
              <Text style={styles.giaodich}>Tra soát giao dịch</Text>
            </View>
          </TouchableOpacity>
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
  },
  nameIn: {
    fontSize: 20,
    color: 'white',
    padding: 5,
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
    height: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  tennguoidung: {
    flex: 3,
    paddingLeft: 10,
  },
  ten: {
    flex: 5,
  },
  img: {
    flex: 3,
    alignItems: 'center',
  },
  imgLogo: {
    alignSelf: 'center',
  },
  giaodich: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#545454',
  },
});
