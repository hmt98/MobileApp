import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class intro extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../images/logo.png')}></Image>
        </View>
        <View>
          <Text style={styles.title}>Small Giving</Text>
          <Text style={styles.titleMini}>small giving - big meaning</Text>
          <Text style={styles.titleMini1}>Việc làm nhỏ - Ý nghĩa lớn</Text>
          <Text style={styles.titleMini2}>
            Cùng chung tay giúp những hoàn cảnh khó khăn
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('Login');
            }}
            style={styles.buttonContainer}>
            <Text style={styles.textButton}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#AE1F17',
  },
  logo: {
    width: 190,
    height: 209,
    padding: 110,
    paddingTop: 70,
  },
  title: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    paddingTop: 80,
  },
  titleMini: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingTop: 5,
  },
  titleMini1: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    paddingTop: 40,
  },
  titleMini2: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 40,
  },
  buttonContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 100,
    borderRadius: 20,
  },
  textButton: {
    fontSize: 30,
  },
});
