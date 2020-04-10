import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  RefreshControl,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import Anh from '../../images/canhan.png';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
export default class Guide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      id: '',
      sdt: '',
      email: '',
      refreshing: false,
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
    this.setState({refreshing: true});
    const {id} = this.state;
    getUserByID(id)
      .then(resName => resName[0]['TenNguoiDung'])
      .then(resJSON => {
        this.setState({name: resJSON});
      })
      .catch(error => console.log(error));
    getUserByID(id)
      .then(resName => resName[0]['SDT'])
      .then(resJSON => {
        this.setState({sdt: resJSON});
      })
      .catch(error => console.log(error));
    getUserByID(id)
      .then(resName => resName[0]['Email'])
      .then(resJSON => {
        this.setState({email: resJSON});
      })
      .catch(error => console.log(error));
    this.setState({refreshing: false});
  }
  onRefresh = () => {
    this.getdata();
  };
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.imgCaNhan} source={Anh} />
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtName}>
            {this.state.name}
          </Text>
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtInfor}>
            {this.state.sdt}
          </Text>
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtInfor}>
            {this.state.email}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.thank}>
            <Text style={styles.txtThank}>
              Cảm ơn bạn đã tin tưởng chúng tôi!
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardInfor}>
              <View style={styles.colName}>
                <Text style={styles.txtColName}>Chủ thẻ:</Text>
              </View>
              <View style={styles.colValue}>
                <Text style={styles.txtColValue}>Sinh Tồn</Text>
              </View>
            </View>
            <View style={styles.cardInfor}>
              <View style={styles.colName}>
                <Text style={styles.txtColName}>Số tài khoản:</Text>
              </View>
              <View style={styles.colValue}>
                <Text style={styles.txtColValue}>0123456789999</Text>
              </View>
            </View>
            <View style={styles.cardInfor}>
              <View style={styles.colName}>
                <Text style={styles.txtColName}>Ngân hàng:</Text>
              </View>
              <View style={styles.colValue}>
                <Text style={styles.txtColValue}>Small Giving</Text>
              </View>
            </View>
          </View>
          <View style={styles.guide}>
            <View style={styles.thuchien}>
              <Text style={styles.txtThucHien}>Cách thực hiện</Text>
            </View>
            <View style={styles.step}>
              <Text style={styles.txtStep}>
                Bước 1: Nhập số tài khoản phía trên
              </Text>
              <Text style={styles.txtStep}>
                Bước 2: Nhập nội dung chuyển khoản là SĐT đăng ký
              </Text>
              <Text style={styles.txtStep}>
                Bước 3: Chuyển khoản và chờ kết quả
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    flex: 6,
  },
  imgCaNhan: {
    width: width / 3,
    height: height / 5,
  },
  txtName: {
    fontSize: 20,
    color: '#545454',
    fontWeight: 'bold',
    margin: '1%',
  },
  txtInfor: {
    fontSize: 18,
    color: '#545454',
    margin: '1%',
  },
  thank: {
    height: height / 15,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#545454',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtThank: {
    color: '#AE1E17',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardInfor: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '2%',
    marginLeft: '15%',
  },
  colName: {
    flex: 4,
    justifyContent: 'center',
  },
  colValue: {
    flex: 6,
    justifyContent: 'center',
  },
  txtColName: {
    color: '#545454',
    fontWeight: 'bold',
    fontSize: 17,
  },
  txtColValue: {
    color: '#AE1E17',
    fontSize: 17,
  },
  card: {
    borderBottomWidth: 2,
    borderColor: '#545454',
  },
  thuchien: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtThucHien: {
    fontSize: 30,
    color: '#545454',
  },
  step: {
    marginLeft: '3%',
  },
  txtStep: {
    color: '#545454',
    fontSize: 18,
    fontWeight: 'bold',
    margin: '1%',
  },
});
