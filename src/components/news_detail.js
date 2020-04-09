import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import coin from '../../images/coin.png';
const {width, height} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {round} from 'react-native-reanimated';
export default class changepass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: new Animated.Value(width),
    };
  }
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
  _goAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width - width,
      duration: 0,
    }).start();
  };
  _backAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: width,
      duration: 0,
    }).start();
  };
  render() {
    const {navigate} = this.props.navigation;
    const item = this.props.navigation.state.params.item;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.imgSuKien} source={{uri: item.Anh}} />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20}
          style={styles.main}>
          <View style={styles.tenHoatDong}>
            <Text
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}
              style={styles.txtTenHoatDong}>
              {item.TenHoatDong}
            </Text>
          </View>
          <View style={styles.noidungHoatDong}>
            <ScrollView style={styles.scroll}>
              <Text style={styles.txtNoiDungHoatDong}>{item.NoiDung}</Text>
            </ScrollView>
            <View style={styles.btnQuyenGopView}>
              <TouchableOpacity
                onPress={this._goAnimation}
                style={styles.btnQuyenGopOut}>
                <Text style={styles.txtBtnQuyenGopOut}>Quyên góp</Text>
              </TouchableOpacity>
            </View>
            <Animatable.View
              style={styles.animateView}
              left={this.state.xValue}>
              <View style={styles.exit}>
                <View style={styles.exitLeft} />
                <View style={styles.exitRight}>
                  <TouchableOpacity onPress={this._backAnimation}>
                    <AntDesign color={'#AE1F17'} name="close" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.coin}>
                <Image source={coin} style={styles.imgCoin} />
              </View>
              <View style={styles.tien}>
                <Text style={styles.txtSotienhientai}>
                  Số tiền hiện tại bạn có là:
                </Text>
                <Text style={styles.txtSotien}>20.000.000 VNĐ</Text>
                <TextInput
                  ref={view => (this.textInput_money = view)}
                  style={styles.ipTien}
                  placeholder="Nhập số tiền..."
                  placeholderTextColor="#707070"
                  keyboardType="default"
                />
                <View style={styles.btnQuyenGopView}>
                  <TouchableOpacity style={styles.btnQuyenGopOut}>
                    <Text style={styles.txtBtnQuyenGopOut}>Quyên góp</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 5,
  },
  imgSuKien: {
    width: '98%',
    height: height / 2.8,
    borderRadius: 10,
    marginTop: '2%',
  },
  tenHoatDong: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  txtTenHoatDong: {
    fontSize: 20,
    color: '#AE1F17',
    fontWeight: 'bold',
  },
  noidungHoatDong: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtNoiDungHoatDong: {
    fontSize: 18,
    textAlign: 'justify',
  },
  scroll: {
    height: height / 3.5,
    width: '95%',
  },
  btnQuyenGopOut: {
    height: height / 17,
    width: width / 3,
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtBtnQuyenGopOut: {
    color: 'white',
    fontSize: 20,
  },
  animateView: {
    height: height / 2,
    width: width,
    backgroundColor: 'white',
    position: 'absolute',
  },
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCoin: {
    height: height / 8,
    width: width / 5,
    marginTop: '1%',
  },
  exit: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  exitLeft: {
    flex: 9,
  },
  exitRight: {
    flex: 1,
  },
  tien: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSotienhientai: {
    fontSize: 22,
  },
  txtSotien: {
    color: '#AE1F17',
    fontSize: 25,
  },
  ipTien: {
    height: height / 16,
    width: width / 2,
    borderColor: '#AE1F17',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: '3%',
    // marginBottom: '5%',
  },
  btnQuyenGopView: {
    marginTop: '5%',
  },
});
