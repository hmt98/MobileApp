import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import huyhieuVang from '../../images/huyhieuVang.png';
import huyhieuBac from '../../images/huyhieuBac.png';
import huyhieuDong from '../../images/huyhieuDong.png';
export default class Home_item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      huyhieu: null,
    };
  }
  render() {
    const item = this.props.item;

    if (item.SoTien >= 1000000) {
      this.state.huyhieu = huyhieuVang;
    } else if (item.SoTien >= 500000) {
      this.state.huyhieu = huyhieuBac;
    } else if (item.SoTien >= 100000) {
      this.state.huyhieu = huyhieuDong;
    }

    return (
      <View style={styles.colName}>
        <View style={styles.colNameLeft}>
          <Image style={styles.imgHuyHieu} source={this.state.huyhieu} />
        </View>
        <View style={styles.colNameBetween}>
          <Text
            eclipSizeMode={'tail'}
            numberOfLines={1}
            allowFontScaling={false}
            style={styles.txtColName}>
            {item.TenNguoiDung}
          </Text>
        </View>
        <View style={styles.colNameRight}>
          <Text style={styles.txtColName}>{item.SoTien}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  colName: {
    flexDirection: 'row',
    height: 30,
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
    fontSize: 15,
  },
  imgHuyHieu: {
    height: 20,
    width: 20,
  },
});
