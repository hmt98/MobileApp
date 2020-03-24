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
  Platform,
  Animated,
  Easing,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
const {width: screenWidth, height} = Dimensions.get('window');
import {getBlogFromServer} from '../../networking/Server';
import coin from '../../images/coin.png';
import Donate_infor_items from './donate_infor_items';

export default class donate_infor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogFromServer: [],
      xValue: new Animated.Value(-350),
      follow: false,
      shake: true,
    };
  }

  follow = () => {
    this.setState({follow: !this.state.follow});
  };

  shake = () => {
    this.setState({shake: this.state.shake});
  };

  componentDidMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getBlogFromServer()
      .then(blog => {
        this.setState({blogFromServer: blog});
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.setState({blogFromServer: []});
        this.setState({refreshing: false});
      });
  };
  onRefresh = () => {
    this.refreshDataFromServer();
  };
  _goAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: height - 675,
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  _backAnimation = () => {
    // alert('Bấm');
    Animated.timing(this.state.xValue, {
      toValue: -350,
      duration: 0,
      easing: Easing.linear,
    }).start();
  };

  render() {
    return (
      <View>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={this.state.blogFromServer}
          renderItem={item => (
            <Donate_infor_items
              item={item.item}
              index={item.index}
              navigation={this.props.navigation}
              textInput={this.textInput_money}
              goAni={this._goAnimation}
            />
          )}
          hasParallaxImages={true}
        />
        <Animatable.View
          animation="fadeInUpBig"
          duration={1000}
          style={[styles.containerDN, {bottom: this.state.xValue}]}>
          <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={100}>
            <View style={styles.Tien}>
              <Image style={styles.imgCoin} source={coin} />
              <Text style={styles.txtSotien}>Số tiền hiện tại bạn có là:</Text>
              <Text style={styles.txtTien}>2.000.000 VNĐ</Text>
              <TextInput
                ref={view => (this.textInput_money = view)}
                style={styles.ipTien}
                placeholder="Nhập số tiền..."
                placeholderTextColor="#707070"
                keyboardType="default"
              />
              <TouchableOpacity style={styles.btnQuyengopDN}>
                <Text style={styles.ttQuyengopDN}>Quyên góp</Text>
              </TouchableOpacity>
              <View style={styles.btnThem}>
                <TouchableOpacity
                  onPress={this._backAnimation}
                  style={styles.btnBoqua}>
                  <Text style={styles.ttBoqua}>Bỏ qua</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Guide')}
                  style={styles.btnNaptien}>
                  <Text style={styles.ttNaptien}>Nạp tiền</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animatable.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  down: {
    flex: 8.75,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 30,
    margin: 10,
  },
  item: {
    width: 350,
    height: 580,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#AE1F17',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 30,
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
  upText: {
    fontSize: 25,
    color: 'white',
    paddingTop: 20,
  },
  imgNguoigia: {
    height: 290,
    width: 330,
    borderRadius: 15,
    marginTop: 5,
  },
  up: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainerR: {
    borderRadius: 15,
    width: 110,
    height: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CD0606',
    marginTop: 10,
  },
  textButtonR: {
    fontSize: 15,
    color: '#CD0606',
    fontWeight: 'bold',
  },
  imgRing: {
    height: 30,
    width: 30,
    marginLeft: 150,
    marginTop: 10,
  },
  txtNguoigia: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CD0606',
    paddingTop: 10,
  },
  money: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
  },
  moneyStart: {
    flex: 5,
    flexDirection: 'row',
  },
  moneyEnd: {
    flex: 5,
    flexDirection: 'row',
  },
  txtMoneyStart: {
    fontSize: 20,
    color: '#CD0606',
    fontWeight: 'bold',
  },
  txtMoneyEnd: {
    fontSize: 20,
    color: '#CD0606',
    fontWeight: 'bold',
    marginLeft: 40,
  },
  btnQuyengop: {
    height: 40,
    borderWidth: 2,
    width: 110,
    borderRadius: 10,
    borderColor: '#CD0606',
    backgroundColor: 'white',
    marginTop: 5,
  },
  ttQuyengop: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#CD0606',
  },
  follow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 20,
  },
  followIcon: {
    flex: 3,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  followCount: {
    flex: 7,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  txtCount: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#545454',
  },
  containerDN: {
    borderRadius: 30,
    width: 345,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 250,
    elevation: 2,
    position: 'absolute',
  },
  Tien: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  imgCoin: {
    height: 80,
    width: 80,
  },
  last1: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: 10,
    height: 30,
  },
  txtSotien: {
    fontSize: 20,
  },
  txtTien: {
    fontSize: 20,
    color: '#AA040D',
    textAlign: 'center',
  },
  btnQuyengopDN: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: '#CD0606',
    marginTop: 60,
    marginLeft: 5,
  },
  btnBoqua: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 10,
    borderColor: '#DE1F28',
    backgroundColor: '#F8F3F3',
    marginTop: 25,
    marginLeft: 5,
  },
  btnNaptien: {
    height: 40,
    borderWidth: 1,
    width: 110,
    borderRadius: 10,
    borderColor: '#DE1F28',
    backgroundColor: '#F8F3F3',
    marginTop: -40,
    marginLeft: 200,
  },
  ttBoqua: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#B00C14',
  },
  ttNaptien: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#B00C14',
  },
  ttQuyengopDN: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    color: '#F8F3F3',
  },
  ipTien: {
    borderColor: '#DE1F28',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    marginBottom: -50,
    marginVertical: 10,
    width: 190,
    paddingLeft: 8,
    fontSize: 18,
  },
});
