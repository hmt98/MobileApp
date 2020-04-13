import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Animated,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import coin from '../../images/coin.png';
const {width, height} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import updateSoduHoatdong from '../api/updateSoduHoatdong';
import updateSoduNguoidung from '../api/updateSoduNguoidung';
import insertQuyengop from '../api/insertQuyengop';
export default class changepass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: new Animated.Value(width),
      id: '',
      sodu: '',
      sotien: null,
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Entypo
            name="chevron-left"
            color="#ffffff"
            size={wp('6%')}
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
      .then(resSodu => resSodu[0]['SoDuTK'])
      .then(resJSON => {
        this.setState({sodu: resJSON});
      })
      .catch(error => console.log(error));
  }

  quyengopAnimate() {
    this.getdata();
    this._goAnimation();
  }

  quyengop() {
    const {id, sodu, sotien} = this.state;
    if (sotien === null) {
      Alert.alert('Error!', 'Vui lòng nhập số tiền!');
      return;
    } else if (sotien * 1 < 5000) {
      Alert.alert('Error!', 'Số tiền tối thiểu là 5000 VNĐ!');
      return;
    } else if ((sotien - sodu) * 1 <= 0) {
      this.donate();
      return;
    } else {
      Alert.alert('Error!', 'Số tiền không hợp lệ!');
      return;
    }
  }

  onSuccessupdateSoduNguoidung() {
    const item = this.props.navigation.state.params.item;
    const {id, sotien} = this.state;
    updateSoduHoatdong(item.idHoatDong, sotien)
      .then(res => res['message'])
      .then(result => {
        if (result === 'success') return this.onSuccessupdateSoduHoatdong();
        else this.onFail();
      })
      .catch(error => console.log(error));
  }

  onSuccessupdateSoduHoatdong() {
    const item = this.props.navigation.state.params.item;
    const {id, sotien} = this.state;
    insertQuyengop(id, item.idHoatDong, sotien)
      .then(res => res['message'])
      .then(result => {
        if (result === 'success') return this.onSuccessinsertQuyengop();
        else this.onFail();
      })
      .catch(error => console.log(error));
  }

  onSuccessinsertQuyengop() {
    Alert.alert('Quyên góp thành công!', 'Cảm ơn lòng hảo tâm của bạn!');
    this.getdata();
  }

  onFail() {
    Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại!');
  }

  donate() {
    const {id, sotien} = this.state;

    updateSoduNguoidung(id, sotien)
      .then(res => res['message'])
      .then(result => {
        if (result === 'success') return this.onSuccessupdateSoduNguoidung();
        else this.onFail();
      })
      .catch(error => console.log(error));
  }
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
                onPress={() => {
                  this.quyengopAnimate();
                  this.textInput_money.focus();
                }}
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
                    <AntDesign color={'#AE1F17'} name="close" size={wp('5%')} />
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
                <Text style={styles.txtSotien}>{this.state.sodu} VNĐ</Text>
                <TextInput
                  ref={view => (this.textInput_money = view)}
                  style={styles.ipTien}
                  onChangeText={text => this.setState({sotien: text})}
                  value={this.state.sotien}
                  placeholder="Nhập số tiền..."
                  keyboardType="default"
                />
                <View style={styles.btnQuyenGopView}>
                  <TouchableOpacity
                    onPress={this.quyengop.bind(this)}
                    style={styles.btnQuyenGopOut}>
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
    width: wp('95%'),
    height: hp('36%'),
    borderRadius: 10,
    marginTop: '2%',
  },
  tenHoatDong: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  txtTenHoatDong: {
    fontSize: f(2.5),
    color: '#AE1F17',
    fontWeight: 'bold',
  },
  noidungHoatDong: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtNoiDungHoatDong: {
    fontSize: f(2.2),
    textAlign: 'justify',
  },
  scroll: {
    height: hp('28%'),
    width: wp('95%'),
  },
  btnQuyenGopOut: {
    height: hp('7%'),
    width: wp('40%'),
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtBtnQuyenGopOut: {
    color: 'white',
    fontSize: f(2.2),
  },
  animateView: {
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: 'white',
    position: 'absolute',
  },
  coin: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCoin: {
    height: hp('10%'),
    width: wp('17%'),
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
    fontSize: f(2.5),
  },
  txtSotien: {
    color: '#AE1F17',
    fontSize: f(2.5),
  },
  ipTien: {
    height: hp('7%'),
    width: wp('45%'),
    borderColor: '#AE1F17',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: f(2.2),
    paddingLeft: '3%',
  },
  btnQuyenGopView: {
    marginTop: '5%',
  },
});
