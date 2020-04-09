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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image source={avatar} style={styles.imgAvatar} />
          </View>
          <View style={styles.tieude}>
            <Text
              style={styles.tentin}
              eclipSizeMode={'tail'}
              numberOfLines={1}
              allowFontScaling={false}>
              {item.TenTin}
            </Text>
            <Text style={styles.ngaygio}> {item.ThoiGian}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.mainWidth}>
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
          </View>
        </View>
        <View style={styles.footer}>
          <Image source={{uri: item.Anh}} style={styles.anh} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#545454',
  },
  header: {
    flex: 2,
    flexDirection: 'row',
  },
  main: {
    flex: 3,
  },
  footer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderEndWidth: 2,
    borderEndColor: '#545454',
  },
  avatar: {
    flex: 1.5,
  },
  tieude: {
    flex: 8.5,
  },
  imgAvatar: {
    height: height * 0.1,
    width: width / 8,
    margin: '5%',
  },
  tentin: {
    fontWeight: 'bold',
    marginTop: '5%',
    color: '#545454',
    textTransform: 'uppercase',
  },
  mainWidth: {
    width: width - 10,
    paddingLeft: '3%',
  },
  noidung: {
    textAlign: 'justify',
  },
  anh: {
    height: height / 4,
    width: width / 1.5,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
