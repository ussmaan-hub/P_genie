import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './style';
import NavBar from '../../containers/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class barCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet([
      'Caption',
      'Carrier',
      'TrackingNumber',
      'RecInBackground',
      'Way',
    ]).then(data1 => {
      this.setState({
        a: data1[3][1],
        b: data1[4][1],
      });
    });
  }

  onBarCodeRead = e => {
    // global.scannedBarCode = '903133646658';
    global.scannedBarCode = e.data;
    // this.props.navigation.goBack();
    this.props.navigation.navigate('Dashboard_Screen');
  };
  
  render() {
    return (
      <>
        <NavBar detail={{flag: false, nav: this.props.navigation}} />

        <View style={styles.container}>
          <Text>{this.state.a}</Text>
          <Text>{this.state.b}</Text>

          <RNCamera
            autoFocus={RNCamera.Constants.AutoFocus.on}
            style={styles.preview}
            onBarCodeRead={this.onBarCodeRead}
            ref={cam => (this.camera = cam)}
            aspect={1}></RNCamera>
        </View>
      </>
    );
  }
}
