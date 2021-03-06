import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Animated,
  Easing,
  AsyncStorage,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as f} from 'react-native-responsive-dimensions';
import Loading from '../loading/myIsLoading';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import coin from '../../images/coin.png';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
import {SafeAreaView} from 'react-native-safe-area-context';
import quyengop from '../api/quyengop';
export default class Donate_infor_items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
      xValue: new Animated.Value(height),
      id: '',
      sodu: '',
      sotien: null,
      isLoading: false,
    };
  }

  follow = () => {
    this.setState({follow: !this.state.follow});
    if (!this.state.follow) {
      Alert.alert('Notice!', 'Cảm ơn bạn đã quan tâm đến chương trình!');
    } else {
      Alert.alert('Notice!', 'Đã bỏ theo dõi!');
    }
    this.bell.shake(2000);
  };

  _goAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: height / 50,
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  _backAnimation = () => {
    // alert('Bấm');
    Animated.timing(this.state.xValue, {
      toValue: height,
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  componentDidMount = async () => {
    var tokenAsync = await AsyncStorage.getItem('tokenLogin');
    getUserByToken(tokenAsync)
      .then(resID => resID['idNguoiDung'])
      .then(resJSON => {
        this.setState({id: resJSON});
      })
      .catch(error => {
        this.onFailNetWork(error);
      });
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
      .catch(error => {
        this.onFailNetWork(error);
      });
  }

  quyengopAnimate() {
    if (this.props.item.ThoiGian * 1 <= 0) {
      Alert.alert('Notice!', 'Thời gian quyên góp hiện đã hết!');
      return;
    } else if ((this.props.item.ChiDK - this.props.item.SoDuTK) * 1 <= 0) {
      Alert.alert(
        'Notice!',
        'Đã đạt số tiền dự kiến! Vui lòng sang hoạt động khác!',
      );
      return;
    }
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
      this.setState({isLoading: true});
      this.donate();
      return;
    } else {
      Alert.alert('Error!', 'Số tiền không hợp lệ!');
      return;
    }
  }
  onSuccess() {
    Alert.alert('Quyên góp thành công!', 'Cảm ơn tấm lòng hảo tâm của bạn!');
    this.setState({isLoading: false});
    this.setState({sotien: null});
  }
  onFail() {
    this.setState({isLoading: false});
    Alert.alert('Error!', 'Có lỗi xảy ra! Vui lòng thử lại!');
  }
  onFailNetWork(error) {
    Alert.alert('Có lỗi xảy ra! Vui lòng thử lại', 'LỖI: ' + error);
    this.setState({isLoading: false});
  }
  donate() {
    const {id, sotien} = this.state;
    const {item} = this.props;
    quyengop(id, item.idHoatDong, sotien)
      .then(res => res['message'])
      .then(result => {
        if (result === 'success') return this.onSuccess();
        else this.onFail();
      })
      .catch(error => {
        this.onFailNetWork(error);
      });
  }

  render() {
    const {item, index, parallaxProps} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ParallaxImage
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />

        <View style={styles.absolute}>
          <View style={styles.box}>
            <View style={styles.up}>
              <View style={styles.XemChiTiet}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('New_details', {
                      item: item,
                    })
                  }
                  style={styles.btnXemChiTiet}>
                  <Text style={styles.txtBtnXemChiTiet}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.chuong}>
                <TouchableOpacity onPress={this.follow}>
                  <Animatable.View ref={a => (this.bell = a)}>
                    <FontAwesome
                      name={'bell'}
                      size={wp('6%')}
                      color={this.state.follow ? '#AE1F17' : '#545454'}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            </View>
            <Image style={styles.imgHoatDong} source={{uri: item.Anh}} />
            <View>
              <Text
                style={styles.txtTenChuongTrinh}
                eclipSizeMode={'tail'}
                numberOfLines={1}
                allowFontScaling={false}>
                {item.TenHoatDong}
              </Text>
            </View>
            <Progress.Bar
              progress={item.SoDuTK / item.ChiDK}
              width={wp('85%')}
              height={hp('4%')}
              color={'#AE1F17'}
              marginTop={hp('1%')}
              borderRadius={10}
            />
            <View style={styles.money}>
              <View style={styles.moneyStart}>
                <Text style={styles.txtMoneyStart}>{item.SoDuTK}</Text>
              </View>
              <View style={styles.moneyEnd}>
                <Text style={styles.txtMoneyEnd}>{item.ChiDK}</Text>
              </View>
            </View>
            <View style={styles.quyengop}>
              <TouchableOpacity
                disabled={this.state.disabled}
                onPress={() => {
                  this.quyengopAnimate();
                  this.textInput_money.focus();
                }}
                style={styles.btnQuyengop}>
                <Text style={styles.ttQuyengop}>Quyên góp</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.follow}>
              <View style={styles.followIcon}>
                <FontAwesome5
                  name={'user-friends'}
                  size={wp('8%')}
                  color={'#545454'}
                />
              </View>
              <View style={styles.followCount}>
                <Text style={styles.txtCount}>
                  {item.SoNguoi} lượt quyên góp
                </Text>
              </View>
            </View>
            <View style={styles.follow}>
              <View style={styles.followIcon}>
                <Ionicons name={'ios-time'} size={wp('8%')} color={'#545454'} />
              </View>
              <View style={styles.followCount}>
                <Text style={styles.txtCount}>
                  {item.ThoiGian} ngày còn lại
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={1000}
          style={[styles.containerDN, {bottom: this.state.xValue}]}>
          <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
            <View style={styles.animateView}>
              <Image source={coin} style={styles.imgCoin} />
              <Text style={styles.txtSotienhientai}>
                Số tiền hiện tại bạn có là:
              </Text>
              <Text style={styles.txtSoTien}>{this.state.sodu} VNĐ</Text>
              <TextInput
                ref={view => (this.textInput_money = view)}
                style={styles.ipTien}
                onChangeText={text => this.setState({sotien: text})}
                value={this.state.sotien}
                placeholder="Nhập số tiền..."
              />
              <TouchableOpacity
                onPress={this.quyengop.bind(this)}
                style={styles.btnQuyenGopDN}>
                <Text style={styles.txtBtnQuyenGop}>Quyên góp</Text>
              </TouchableOpacity>
              <View style={styles.btnBoquaHotro}>
                <TouchableOpacity
                  onPress={this._backAnimation}
                  style={styles.btnBoqua}>
                  <Text style={styles.txtBtnBoquaHotro}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Guide')}
                  style={styles.btnHotro}>
                  <Text style={styles.txtBtnBoquaHotro}>Nạp tiền</Text>
                </TouchableOpacity>
              </View>
              <Loading show={this.state.isLoading} />
            </View>
          </KeyboardAvoidingView>
        </Animatable.View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '96%',
    marginTop: '5%',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#AE1F17',
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  absolute: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  imgHoatDong: {
    height: hp('45%'),
    width: wp('85%'),
    borderRadius: 15,
  },
  up: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    margin: 5,
  },
  XemChiTiet: {
    flex: 9,
  },
  chuong: {
    flex: 2,
  },
  btnXemChiTiet: {
    borderRadius: 15,
    height: hp('4%'),
    width: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#CD0606',
  },
  txtBtnXemChiTiet: {
    fontSize: f(1.8),
    color: '#CD0606',
    fontWeight: 'bold',
  },
  txtTenChuongTrinh: {
    fontSize: f(2.1),
    fontWeight: 'bold',
    color: '#CD0606',
    padding: '2%',
  },
  money: {
    flexDirection: 'row',
  },
  moneyStart: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyEnd: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtMoneyStart: {
    fontSize: f(2.5),
    color: '#CD0606',
    fontWeight: 'bold',
  },
  txtMoneyEnd: {
    fontSize: f(2.5),
    color: '#CD0606',
    fontWeight: 'bold',
  },
  quyengop: {
    marginTop: '1%',
  },
  btnQuyengop: {
    height: hp('6%'),
    borderWidth: 2,
    width: wp('35%'),
    borderRadius: 10,
    borderColor: '#CD0606',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ttQuyengop: {
    fontSize: f(2.2),
    color: '#CD0606',
    alignSelf: 'center',
  },
  follow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    marginLeft: wp('5%'),
  },
  followIcon: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  followCount: {
    flex: 8,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  txtCount: {
    fontSize: f(2.2),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#545454',
  },
  containerDN: {
    borderRadius: 30,
    height: hp('47%'),
    width: wp('85%'),
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  animateView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCoin: {
    width: f(10),
    height: f(10),
    marginTop: '1%',
  },
  txtSotienhientai: {
    fontSize: f(2.5),
  },
  txtSoTien: {
    color: '#AE1F17',
    fontSize: f(2.5),
  },
  ipTien: {
    height: hp('7%'),
    width: wp('45%'),
    backgroundColor: 'white',
    borderColor: '#AE1F17',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: f(2.2),
    paddingLeft: '3%',
  },
  btnQuyenGopDN: {
    height: hp('6%'),
    width: wp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AE1F17',
    borderRadius: 15,
    margin: '3%',
  },
  txtBtnQuyenGop: {
    color: 'white',
    fontSize: f(2.2),
  },
  btnBoquaHotro: {
    flexDirection: 'row',
  },
  btnBoqua: {
    height: hp('6%'),
    width: wp('27%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: '10%',
    borderWidth: 2,
    borderColor: '#AE1F17',
  },
  btnHotro: {
    height: hp('6%'),
    width: wp('27%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: '10%',
    borderWidth: 2,
    borderColor: '#AE1F17',
  },
  txtBtnBoquaHotro: {
    color: '#AE1F17',
    fontSize: f(2.2),
  },
});
