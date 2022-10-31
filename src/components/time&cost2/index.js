/** @format */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  LogBox,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import NavBar from '../../containers/NavBar';

export default class TimeAndCost2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      fromZipCode: '',
      toZipCode: '',
      weightVar: '',
      lengthVar: '',
      widthVar: '',
      heightVar: '',

      fromCCode: this.props.route.params.fromCCode,
      fromSCode: this.props.route.params.fromSCode,
      fromCity: this.props.route.params.fromCity,
      fromPostalCode: this.props.route.params.fromPostalCode,

      toCCode: this.props.route.params.toCCode,
      toSCode: this.props.route.params.toSCode,
      toCity: this.props.route.params.toCity,
      toPostalCode: this.props.route.params.toPostalCode,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
     
    });
  }

  onClick_Continue() {
    if (this.state.weightVar == '') {
      alert('Please enter mandatory fields');
    } else {
      this.props.navigation.navigate('TimeAndCost3', {
        weightVar: this.state.weightVar,
        lengthVar: this.state.lengthVar,
        widthVar: this.state.widthVar,
        heightVar: this.state.heightVar,
        fromCity: this.state.fromCity,
        fromCCode: this.state.fromCCode,
        fromSCode: this.state.fromSCode,
        fromPostalCode: this.state.fromPostalCode,
        toCCode: this.state.toCCode,
        toSCode: this.state.toSCode,
        toPostalCode: this.state.toPostalCode,
        toCity: this.state.toCity,
      });
    }
  }

  render() {
    return (
      <>
        {/* Navigation bar  */}
        <NavBar detail={{flag: false, nav: this.props.navigation}} />

        {/*  */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.View1}>
            <View style={styles.View8}>
              <Text style={styles.Text1}>Enter the weight of your package</Text>
              <View style={styles.View6}>
                <View style={styles.View7}>
                  <Text style={styles.Text2}>
                    {' '}
                    <Text style={styles.text8}>* </Text>WEIGHT
                  </Text>
                  <TextInput
                    style={styles.Input_field1}
                    placeholder="Enter weight"
                    placeholderTextColor="#A3A3A3"
                    onChangeText={text => this.setState({weightVar: text})}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.View9}>
                  <Text style={styles.Text4}>LBS</Text>
                </View>
              </View>
              <Text style={styles.Text5}>OPTIONAL</Text>
              <View style={styles.View10}>
                <View style={styles.View11}>
                  <Text style={styles.Text2}>LENGHT</Text>
                  <TextInput
                    style={styles.Input_field1}
                    placeholderTextColor="#A3A3A3"
                    onChangeText={text => this.setState({lengthVar: text})}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.View11}>
                  <Text style={styles.Text2}>WIDTH</Text>
                  <TextInput
                    style={styles.Input_field1}
                    placeholderTextColor="#A3A3A3"
                    onChangeText={text => this.setState({widthVar: text})}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.View11}>
                  <Text style={styles.Text2}>HEIGHT</Text>
                  <TextInput
                    style={styles.Input_field1}
                    placeholderTextColor="#A3A3A3"
                    onChangeText={text => this.setState({heightVar: text})}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.View9}>
                  <Text style={styles.Text4}>IN</Text>
                </View>
              </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.Btn2}
              onPress={() => this.onClick_Continue()}>
              <LinearGradient
                colors={['#0BB5E5', '#20C8F8']}
                style={styles.Btn1}>
                <Text style={styles.Text6}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/*  */}
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
