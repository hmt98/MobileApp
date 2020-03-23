import React, {Component} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-looped-carousel';

const {width, height} = Dimensions.get('window');

export default class CarouselExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Width: width,
      Height: height,
    };
  }

  // _onLayoutDidChange = e => {
  //   const layout = e.nativeEvent.layout;
  //   this.setState({size: {width: layout.width, height: layout.height}});
  // };

  render(item) {
    return (
      <View style={{flex: 1}}>
        <Carousel
          // delay={2000}
          style={{width: this.Width, height: 200}}
          autoplay={false}
          pageInfo
          onAnimateNextPage={p => console.log(p)}>
          <View
            style={{
              backgroundColor: '#BADA55',
              width: this.state.Width,
              height: 200,
            }}>
            <Text>1</Text>
            <TouchableOpacity>
              <Text>Chuyển</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'red',
              width: this.state.Width,
              height: 200,
            }}>
            <Text>2</Text>
          </View>
          <View
            style={{
              backgroundColor: 'blue',
              width: this.state.Width,
              height: 200,
            }}>
            <Text>3</Text>
          </View>
        </Carousel>
        <View>
          <Text>1</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Signin');
            }}>
            <Text>Đây Là Button</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
