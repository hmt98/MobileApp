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
  ImageBackground,
} from 'react-native';

import heart from '../images/heart.png';
import khaosat from '../images/khaosat.png';
import iconHeart from '../images/iconHeart.png';
import kimcuong from '../images/kimcuong.png';
import vang from '../images/vang.png';
import bac from '../images/bac.png';
import FontAwesomefrom from 'react-native-vector-icons/FontAwesome';

export default class home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.imgNguoigia} source={heart}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <FontAwesomefrom
              style={styles.menuIcon}
              name={'bars'}
              size={40}
              color={'#AE1F17'}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.cover}>
          <TouchableOpacity style={styles.left}>
            <Image style={styles.imgKS} source={khaosat} />
            <Text style={styles.txtLeft}> Làm phiếu khảo sát </Text>
          </TouchableOpacity>
          <View style={styles.right}>
            <Image style={styles.imgKS} source={iconHeart} />
            <Text style={styles.txtLeft}>40.000 </Text>
          </View>
        </View>

        <View style={styles.BXH}>
          <Text style={styles.txtBXH}>BẢNG XẾP HẠNG</Text>
        </View>

        <View style={styles.coverDown}>
          <View style={styles.leftDown1}>
            <Text style={styles.txtDown}> HUY HIỆU </Text>
          </View>
          <View style={styles.leftDown2}>
            <Text style={styles.txtDown}>NGƯỜI DÙNG </Text>
          </View>
          <View style={styles.leftDown3}>
            <Text style={styles.txtDown}>QUYÊN GÓP </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgKC} source={kimcuong} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Hà Minh Tú </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 999.999.999 </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgKC} source={kimcuong} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Nguyễn Thanh Dương </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 888.888.888 </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgKC} source={kimcuong} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Nguyễn Thị Phấn </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 777.777.777 </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgVang} source={vang} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Vũ Hồng Phượng </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 666.666.666 </Text>
          </View>
        </View>
        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgVang} source={vang} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Bùi Minh Thu </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 555.555.555 </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgVang} source={vang} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Trần Git Hub </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 444.444.444 </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgVang} source={bac} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Nguyễn Thị Tuyến Dung </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 333.333.333 </Text>
          </View>
        </View>

        <View style={styles.coverBXH}>
          <View style={styles.bxhHH}>
            <Image style={styles.imgVang} source={bac} />
          </View>
          <View style={styles.bxhND}>
            <Text style={styles.txtInBXH}>Trần Phúc Chiêu </Text>
          </View>
          <View style={styles.bxhQG}>
            <Text style={styles.txtInBXH}> 222.222.222 </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgNguoigia: {
    height: 270,
    width: 420,
  },
  imgKS: {
    height: 50,
    width: 50,
  },
  cover: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 5,
    flexDirection: 'row',
    marginLeft: 20,
  },
  right: {
    flex: 5,
    flexDirection: 'row',
    marginLeft: 90,
  },
  txtLeft: {
    paddingTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
  },
  BXH: {
    height: 30,
    width: '100%',
    marginHorizontal: 50,
    backgroundColor: '#AE1F17',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBXH: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  coverDown: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    paddingTop: 5,
  },
  leftDown1: {
    flex: 4,
    flexDirection: 'row',
  },
  leftDown2: {
    flex: 6,
    flexDirection: 'row',
    marginLeft: 20,
  },
  leftDown3: {
    flex: 3,
    flexDirection: 'row',
    paddingRight: 10,
  },
  txtDown: {
    fontWeight: 'bold',
    color: '#AE1F17',
  },
  coverBXH: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: -20,
  },
  bxhHH: {
    flex: 4,
    flexDirection: 'row',
  },
  bxhND: {
    flex: 6,
    flexDirection: 'row',
  },
  bxhQG: {
    flex: 3,
    flexDirection: 'row',
    marginRight: 5,
  },
  imgKC: {
    height: 30,
    width: 30,
    marginLeft: 20,
    marginTop: -5,
  },
  imgVang: {
    height: 33,
    width: 33,
    marginLeft: 17,
    marginTop: -5,
  },
  menuIcon: {
    margin: 15,
  },
});
