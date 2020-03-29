import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import avatar from '../../images/canhan.png';
export default class Item_blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readfull: false,
    };
  }

  readfull = () => {
    this.setState({readfull: !this.state.readfull});
  };

  render() {
    const item = this.props.item;
    return (
      <View style={styles.txtxuat}>
        <View>
          <View style={styles.list}>
            <Image style={styles.avatar} source={avatar} />
            <View>
              <Text
                style={styles.tieude}
                eclipSizeMode={'tail'}
                numberOfLines={1}
                allowFontScaling={false}>
                {item.TenTin}
              </Text>
              <Text style={styles.ngaygio}> {item.ThoiGian}</Text>
            </View>
          </View>
          <Text
            style={styles.noidung}
            eclipSizeMode={'tail'}
            numberOfLines={this.state.readfull ? null : 2}
            allowFontScaling={false}>
            {item.NoiDung}
          </Text>
          <TouchableOpacity onPress={this.readfull}>
            <Text
              style={[
                styles.noidung,
                {fontWeight: 'bold'},
                {color: '#426ec7'},
              ]}>
              {this.state.readfull ? 'Rút gọn' : 'Xem thêm'}
            </Text>
          </TouchableOpacity>
          <Image source={{uri: item.Anh}} style={styles.anh} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ViThongbao: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '7%',
    backgroundColor: '#B91313',
    fontSize: 20,
    color: '#FCF7F7',
  },
  txtThongbao: {
    fontSize: 18,
    color: '#FCFCFC',
  },
  txtxuat: {
    borderBottomWidth: 1,
    borderBottomColor: '#545454',
    paddingLeft: '3%',
  },
  txtNoidung1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtNoidung: {
    paddingLeft: '2%',
  },
  tbAnh: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  imgTim: {
    width: '10%',
    height: '95%',
  },
  tieude: {
    fontWeight: 'bold',
    marginTop: 15,
    color: '#545454',
    textTransform: 'uppercase',
  },
  noidung: {
    fontSize: 10,
    color: '#545454',
  },
  anh: {
    height: 150,
    width: width - 150,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    height: 50,
    width: width - 360,
  },
  ngaygio: {
    fontSize: 10,
    paddingLeft: 5,
    color: '#545454',
  },
});
