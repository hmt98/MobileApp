import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  AsyncStorage,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import getUserByToken from '../api/getUserByToken';
import getUserByID from '../api/getUserByID';
const {width, height} = Dimensions.get('window');
import contact from '../api/contact';
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {noidung: '', name: '', id: '', refreshing: false};
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
    this.setState({refreshing: false});
  }

  onSuccess() {
    Alert.alert('Cảm ơn bạn đã góp ý!');
    this.setState({noidung: ''});
  }

  onFail() {
    Alert.alert('Error!', 'Có lỗi xảy ra, vui lòng thử lại!');
  }

  onRefresh = () => {
    this.getdata();
  };

  gopy() {
    const {id, noidung} = this.state;
    if (noidung === '') {
      Alert.alert('Error!', 'Vui lòng nhập góp ý của bạn!');
      return;
    } else {
      contact(id, noidung)
        .then(res => res['message'])
        .then(result => {
          if (result === 'Success') return this.onSuccess();
          else this.onFail();
        });
    }
  }

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
          <View style={styles.headerTop}>
            <Text style={styles.txtThank}>
              CẢM ƠN BẠN VÌ NHỮNG HÀNH ĐỘNG CAO ĐẸP!
            </Text>
            <Text style={styles.txtThacMac}>
              Mọi thắc mắc xin liên hệ và góp ý với chúng tôi!
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20}
          style={styles.main}>
          <Text style={styles.txtGuiGopY}>Gửi góp ý của bạn</Text>
          <View style={styles.noiGopY}>
            <View style={styles.colName}>
              <Text style={styles.txtColName}>Họ và tên:</Text>
            </View>
            <View style={styles.colValue}>
              <Text style={styles.txtColValue}>{this.state.name}</Text>
            </View>
          </View>
          <View style={styles.noiGuiGopY}>
            <View style={styles.colNameGui}>
              <Text style={styles.txtColNameGui}>Góp ý của bạn:</Text>
            </View>
            <View style={styles.colValueGui}>
              <TextInput
                style={styles.inputGopY}
                multiline={true}
                onChangeText={text => this.setState({noidung: text})}
                value={this.state.noidung}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.gopy.bind(this)}
            style={styles.btnGuiGopY}>
            <Text style={styles.txtBtn}>Gửi góp ý</Text>
          </TouchableOpacity>
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
    flex: 2,
  },
  headerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  main: {
    flex: 5,
  },
  footer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtThank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AE1E17',
  },
  txtThacMac: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AE1E17',
    marginTop: '2%',
  },
  txtGuiGopY: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: '5%',
  },
  noiGopY: {
    flexDirection: 'row',
    margin: '2%',
  },
  colName: {
    flex: 4,
  },
  txtColValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  colValue: {
    flex: 6,
    justifyContent: 'center',
  },
  txtColName: {
    fontSize: 18,
  },
  txtColNameGui: {
    fontSize: 18,
  },
  noiGuiGopY: {
    flexDirection: 'column',
    margin: '2%',
  },
  inputGopY: {
    width: '100%',
    height: height / 4,
    borderColor: '#AE1E17',
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
  },
  colValueGui: {
    marginTop: '3%',
  },
  btnGuiGopY: {
    height: height / 15,
    width: width / 3,
    backgroundColor: '#AE1E17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtBtn: {
    color: 'white',
    fontSize: 18,
  },
});
