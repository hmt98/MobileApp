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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Donate_infor_items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: false,
      follower: this.props.item.SoNguoi,
    };
  }

  follow = () => {
    this.setState({follow: !this.state.follow});
    if (this.state.follow) {
      this.setState({follower: this.state.follower - 1});
    } else {
      this.setState({follower: this.state.follower * 1 + 1});
    }
    this.bell.shake(2000);
  };

  render() {
    const {item, index, parallaxProps, textInput, goAni} = this.props;
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.thumbnail}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />

        <View style={styles.absolute}>
          <View style={styles.box}>
            <View style={styles.up}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('New_details', {
                    item: item,
                  })
                }
                style={styles.buttonContainerR}>
                <Text style={styles.textButtonR}>Xem chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.follow}>
                <Animatable.View ref={a => (this.bell = a)}>
                  <FontAwesome
                    style={styles.imgRing}
                    name={'bell'}
                    size={25}
                    color={this.state.follow ? '#AE1F17' : '#545454'}
                  />
                </Animatable.View>
              </TouchableOpacity>
            </View>
            <Image style={[styles.imgNguoigia]} source={{uri: item.Anh}} />
            <View>
              <Text
                style={styles.txtNguoigia}
                eclipSizeMode={'tail'}
                numberOfLines={1}
                allowFontScaling={false}>
                {item.TenHoatDong}
              </Text>
            </View>
            <Progress.Bar
              progress={item.SoDuTK / item.ChiDK}
              width={300}
              height={15}
              color={'#AE1F17'}
              marginTop={10}
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
            <Animatable.View>
              <TouchableOpacity
                onPress={() => {
                  textInput.focus();
                  goAni();
                }}
                style={styles.btnQuyengop}>
                <Text style={styles.ttQuyengop}>Quyên góp</Text>
              </TouchableOpacity>
            </Animatable.View>

            <View style={styles.follow}>
              <View style={styles.followIcon}>
                <FontAwesome5
                  name={'user-friends'}
                  size={30}
                  color={'#545454'}
                />
              </View>
              <View style={styles.followCount}>
                <Text style={styles.txtCount}>
                  {this.state.follower} người đã quyên góp
                </Text>
              </View>
            </View>
            <View style={styles.follow}>
              <View style={styles.followIcon}>
                <Ionicons name={'ios-time'} size={30} color={'#545454'} />
              </View>
              <View style={styles.followCount}>
                <Text style={styles.txtCount}>
                  {item.ThoiGian} ngày còn lại
                </Text>
              </View>
            </View>
          </View>
        </View>
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
    padding: 10,
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
    fontSize: 18,
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
