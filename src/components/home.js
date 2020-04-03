import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  RefreshControl,
} from 'react-native';
import heart from '../../images/heart.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getBXHFromServer} from '../../networking/Server';
import Home_item from './home_item';
import {connect} from 'react-redux';
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      bxhFromServer: [],
      readfull: false,
      networkError: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.refreshDataFromServer();
  }

  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getBXHFromServer()
      .then(blog => {
        this.setState({bxhFromServer: blog});
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.setState({bxhFromServer: []});
        this.setState({refreshing: false});
      });
  };
  onRefresh = () => {
    this.refreshDataFromServer();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ImageBackground style={styles.headerImage} source={heart}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <FontAwesome
                style={styles.menuIcon}
                name={'bars'}
                size={40}
                color={'#AE1F17'}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.between}>
          <View style={styles.betweenLeft}>
            <TouchableOpacity
              onPress={() => this.test()}
              style={styles.betweenLeftTO}>
              <AntDesign style={styles.imgKS} name={'profile'} size={35} />
              <Text style={styles.txtKS}> Làm phiếu khảo sát </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.betweenRight}>
            <Text style={styles.thank}>SMALL GIVING</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.bxh}>
            <Text style={styles.txtBXH}>BẢNG XẾP HẠNG</Text>
          </View>
          <View style={styles.colName}>
            <View style={styles.colNameLeft}>
              <Text style={styles.txtColName}>HUY HIỆU</Text>
            </View>
            <View style={styles.colNameBetween}>
              <Text style={styles.txtColName}>NGƯỜI DÙNG</Text>
            </View>
            <View style={styles.colNameRight}>
              <Text style={styles.txtColName}>QUYÊN GÓP</Text>
            </View>
          </View>
          <FlatList
            data={this.state.bxhFromServer}
            renderItem={({item, index}) => <Home_item item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 4,
    backgroundColor: 'red',
  },
  between: {
    flex: 0.8,
    flexDirection: 'row',
  },
  footer: {
    flex: 4,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  menuIcon: {
    margin: '5%',
  },
  betweenLeft: {
    flex: 6,
    borderRightWidth: 2,
    borderRightColor: '#AE1F17',
  },
  betweenRight: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  betweenLeftTO: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
  },
  imgKS: {
    flex: 2,
  },
  txtKS: {
    flex: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  thank: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AE1F17',
  },
  bxh: {
    width: '100%',
    height: '12%',
    backgroundColor: '#AE1F17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBXH: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  colName: {
    flexDirection: 'row',
    height: '12%',
  },
  colNameLeft: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colNameBetween: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colNameRight: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtColName: {
    color: '#AE1F17',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
function mapStateToProps(state) {
  return {
    myToken: state.token,
  };
}
export default connect(mapStateToProps)(home);
