/** @format */

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, LogBox} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import NavBar from '../../containers/NavBar';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* Navigation bar  */}
        <NavBar detail={{flag: true, nav: this.props.navigation}} />

        {/*  */}

        {/* Screen Detail  */}
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Text style={styles.Text1} adjustsFontSizeToFit>
              REGISTER NOW
            </Text>
            <View style={styles.view3}>
              <Text style={styles.Text2}>Email</Text>
              <TextInput
                style={styles.Input_field1}
                placeholder="Enter email"
                placeholderTextColor="#A3A3A3"
                onChangeText={text => (this.UserName = text)}
              />
            </View>
            <View style={styles.view3}>
              <Text style={styles.Text2}>Password</Text>
              <TextInput
                style={styles.Input_field1}
                placeholder="Enter password"
                placeholderTextColor="#A3A3A3"
                secureTextEntry
                onChangeText={text => (this.UserName = text)}
              />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.Btn2}>
              <LinearGradient
                colors={['#0BB5E5', '#20C8F8']}
                style={styles.Btn1}>
                <Text style={styles.Text3}>SUBMIT</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.Text4}>Why I need to register?</Text>
          </View>
        </View>
        {/*  */}
      </>
    );
  }
}
