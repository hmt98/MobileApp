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
import coin from '../images/coin.png';
import nguoigia from '../images/nguoigia.png';
const {width: Width, height} = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class changepass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: new Animated.Value(450),
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
      toValue: 5,
      duration: 0,
    }).start();
  };
  _backAnimation = () => {
    Animated.timing(this.state.xValue, {
      toValue: 450,
      duration: 0,
    }).start();
  };
  render() {
    const {navigate} = this.props.navigation;
    const item = this.props.navigation.state.params.item;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
          <View style={styles.down}>
            <Image style={styles.imgNguoigia} source={{uri: item.Anh}} />
            <Text style={styles.titleNews}>{item.Ten}</Text>
            <ImageBackground style={styles.News}>
              <ScrollView style={{height: 200}}>
                <Text style={styles.News}>{item.NoiDung}</Text>
              </ScrollView>
            </ImageBackground>
          </View>
          <TouchableOpacity
            onPress={this._goAnimation}
            style={styles.btnQuyengop}>
            <Text style={styles.ttQuyengop}>Quyên góp</Text>
          </TouchableOpacity>
          <Animatable.View style={styles.Animate} left={this.state.xValue}>
            <View style={styles.Tien}>
              <TouchableOpacity onPress={this._backAnimation}>
                <AntDesign style={styles.exit} name="close" size={20} />
              </TouchableOpacity>
              <Image style={styles.imgCoin} source={coin} />
              <Text style={styles.txtSotien}>Số tiền hiện tại bạn có là:</Text>
              <Text style={styles.txtTien}>2.000.000 VNĐ</Text>
              <TextInput
                style={styles.ipTien}
                placeholder="Nhập số tiền..."
                placeholderTextColor="#707070"
                keyboardType="default"
              />
              <TouchableOpacity style={styles.btnQuyengop2}>
                <Text style={styles.ttQuyengop}>Quyên góp</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  up: {
    flex: 1.25,
    flexDirection: 'column',
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  down: {
    flex: 8.75,
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: '#AE1F17',
    margin: 5,
  },
  upText: {
    fontSize: 25,
    color: 'white',
    paddingTop: 20,
  },
  imgNguoigia: {
    height: 250,
    width: 410,
    borderRadius: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnQuyengop: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#CD0606',
    backgroundColor: '#CD0606',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: Width / 3,
    bottom: 10,
    padding: 5,
    alignSelf: 'center',
  },
  ttQuyengop: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  titleNews: {
    fontSize: 20,
    color: '#CD0606',
    fontWeight: 'bold',
    paddingTop: 5,
  },
  News: {
    fontSize: 20,
    textAlign: 'justify',
    width: 350,
  },
  Animate: {
    height: height / 2,
    width: Width,
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: height - 430,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tien: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  imgCoin: {
    height: 70,
    width: 70,
  },
  last1: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: 10,
    height: 30,
  },
  txtSotien: {
    fontSize: 18,
    textAlign: 'center',
  },
  txtTien: {
    fontSize: 18,
    color: '#AA040D',
    textAlign: 'center',
  },
  ipTien: {
    borderRadius: 5,
    borderColor: '#AA040D',
    borderWidth: 2,
    height: height / 18,
    marginTop: 15,
    width: Width / 3,
    padding: 10,
    fontSize: 15,
  },
  exit: {
    marginLeft: 300,
    color: '#AE1F17',
  },
  btnQuyengop2: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#CD0606',
    backgroundColor: '#CD0606',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: Width / 3,
    bottom: 10,
    padding: 5,
    alignSelf: 'center',
  },
});
