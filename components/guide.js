import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Anh from '../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';

export default class menu extends React.Component {
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
      <View style={styles.container}>
        <View style={styles.TboCanhan}>
          <Image source={Anh} style={styles.imgCanhan} />
          <Text style={styles.txtName}>Phạm Thị A</Text>
          <Text style={styles.txtSdt}>0942646398</Text>
          <Text style={styles.txtMail}>minhtuha98@gmail.com</Text>
        </View>
        <View style={styles.thanks}>
          <Text style={styles.txtThanks}>
            Cảm ơn bạn đã tin tưởng chúng tôi!
          </Text>
        </View>
        <View style={[{borderBottomWidth: 1}]}>
          <View style={styles.info}>
            <Text style={styles.col1}>Chủ thẻ:</Text>
            <Text style={styles.col2}>Sinh Tồn</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.col1}>Số tài khoản:</Text>
            <Text style={styles.col2}>0123456789999</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.col1}>Ngân hàng:</Text>
            <Text style={styles.col2}>Ngân hàng Small Giving</Text>
          </View>
        </View>
        <View>
          <Text style={styles.cachthuchien}>Cách thực hiện</Text>
          <Text style={styles.step}>
            Bước 1: Chuyển tiền vào số tài khoản trên
          </Text>
          <Text style={styles.step}>
            Bước 2: Nhập nội dung chuyển tiền: SĐT đăng ký
          </Text>
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
    height: height / 3.5,
    width: width,
    alignSelf: 'center',
    borderBottomColor: '#545454',
    borderBottomWidth: 1,
  },
  imgCanhan: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
  txtName: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#545454',
  },
  txtSdt: {
    textAlign: 'center',
    fontSize: 15,
    color: '#545454',
  },
  txtMail: {
    textAlign: 'center',
    fontSize: 15,
    color: '#545454',
  },
  thanks: {
    borderBottomColor: '#545454',
    borderBottomWidth: 1,
    height: height / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtThanks: {
    color: '#AE1F17',
    fontWeight: 'bold',
    fontSize: 15,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  col1: {
    flex: 3,
    marginLeft: '25%',
    fontWeight: 'bold',
    color: '#545454',
  },
  col2: {
    flex: 10,
    color: '#545454',
  },
  thuchien: {
    alignItems: 'center',
  },
  cachthuchien: {
    fontSize: 30,
    color: '#545454',
    alignSelf: 'center',
  },
  step: {
    textAlign: 'justify',
    marginLeft: '10%',
    color: '#545454',
    fontSize: 15,
  },
});
