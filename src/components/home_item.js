import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
      this.state.huyhieu = 'Vàng';
    } else if (item.SoTien >= 500000) {
      this.state.huyhieu = 'Bạc';
    } else if (item.SoTien >= 100000) {
      this.state.huyhieu = 'Đồng';
    }

    return (
      <View style={styles.colName}>
        <View style={styles.colNameLeft}>
          <Text style={styles.txtColName}>{this.state.huyhieu}</Text>
        </View>
        <View style={styles.colNameBetween}>
          <Text style={styles.txtColName}>{item.TenNguoiDung}</Text>
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
    flex: 3,
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
