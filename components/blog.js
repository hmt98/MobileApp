import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
var {width, height} = Dimensions.get('window');
import {getBlogFromServer} from '../networking/Server';
import avatar from '../images/canhan.png';
import Item_blog from './item_blog';

export default class thongbao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      blogFromServer: [],
      readfull: false,
    };
  }
  componentDidMount() {
    this.refreshDataFromServer();
  }
  refreshDataFromServer = () => {
    this.setState({refreshing: true});
    getBlogFromServer()
      .then(blog => {
        this.setState({blogFromServer: blog});
        this.setState({refreshing: false});
      })
      .catch(error => {
        this.setState({blogFromServer: []});
        this.setState({refreshing: false});
      });
  };
  onRefresh = () => {
    this.refreshDataFromServer();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ViThongbao}>
          <Text style={styles.txtThongbao}>Tin Tức</Text>
        </View>
        <FlatList
          data={this.state.blogFromServer}
          renderItem={({item, index}) => <Item_blog item={item} />}
          keyExtractor={(item, index) => item.ID}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
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
});
