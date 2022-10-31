/** @format */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  LogBox,
} from 'react-native';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import NavBar from '../../containers/NavBar';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Server_function from '../../global/Server_functions';
import Loader from '../../containers/Loader';

var monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default class TimeAndCost3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag2: true,
      loaderFlag: false,
      visibility: false,
      selectedValue: '',
      selectedDate: '',
      minDate: '',

      varWeight: this.props.route.params.weightVar,
      varLength: this.props.route.params.lengthVar,
      varWidth: this.props.route.params.widthVar,
      varHeight: this.props.route.params.heightVar,

      fromCCode: this.props.route.params.fromCCode,
      fromSCode: this.props.route.params.fromSCode,
      fromCity: this.props.route.params.fromCity,
      fromPostalCode: this.props.route.params.fromPostalCode,

      toCCode: this.props.route.params.toCCode,
      toSCode: this.props.route.params.toSCode,
      toCity: this.props.route.params.toCity,
      toPostalCode: this.props.route.params.toPostalCode,

      rateData: [],
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      var cDate = new Date().getDate();
      var cMonth = new Date().getMonth() + 1;
      var cYear = new Date().getFullYear();

      if (cDate.toString().length == 1) {
        cDate = '0' + cDate;
      }
      if (cMonth.toString().length == 1) {
        cMonth = '0' + cMonth;
      }
      this.setState({
        minDate: cYear + '-' + cMonth + '-' + cDate,
        selectedDate: cYear + '-' + cMonth + '-' + cDate,
        selectedValue:
          cDate + ' ' + monthNames[new Date().getMonth()] + ' ' + cYear,
      });
      this.setState({
        loaderFlag: true,
      });
      this.getData(cYear + '-' + cMonth + '-' + cDate);
    });
  }

  async getData(time) {
    this.setState({
      flag2: true,
    });

    var data = await Server_function.TrackGetRate(
      time,
      this.state.fromCCode,
      this.state.fromSCode,
      this.state.fromCity,
      this.state.toCCode,
      this.state.toSCode,
      this.state.toCity,
      this.state.toPostalCode,
      this.state.fromPostalCode,
      this.state.varWeight,
      this.state.varWidth,
      this.state.varHeight,
      this.state.varLength,
    );
    console.log(data)
    this.setState({
      rateData: data,
      flag2: false,
      loaderFlag: false,
    });
  }

  onSelect_Date(day) {
    this.setState({
      selectedDate: day.dateString,
      visibility: false,
      selectedValue: day.day + ' ' + monthNames[day.month - 1] + ' ' + day.year,
      rateData: [],
    });
    this.getData(day.dateString);
  }

  loaderFlag_func1() {
    if (this.state.flag2 == true) {
      this.setState({
        loaderFlag: true,
      });
    }
  }

  changeDate(dateVar) {
    var Year = dateVar.slice(0, 4);
    var month = dateVar.slice(4, 6);
    var date = dateVar.slice(6, 8);
    var getDay = new Date(Year + '/' + month + '/' + date).getDay();
    var getDate = new Date(Year + '/' + month + '/' + date).getDate();
    var getMonth = new Date(Year + '/' + month + '/' + date).getMonth();
    var printDate = `${days[getDay]}, ${getDate} ${monthNames[getMonth]}`;
    return printDate;
  }

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        {/* Navigation bar  */}
        <NavBar detail={{flag: false, nav: this.props.navigation}} />
        {/*  */}

        <View style={styles.View1}>
          <View style={styles.View2}>
            <View style={styles.View3}>
              <Text style={styles.Text1}>{this.state.selectedValue}</Text>
              <TouchableOpacity
                style={styles.View5}
                onPress={() => this.setState({visibility: true})}>
                <Text style={styles.Text2}>CHANGE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.View4}>
              <FlatList
                data={this.state.rateData}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.View6}>
                      <Text style={styles.Text3}>
                        {this.changeDate(item.Date)}
                      </Text>
                      <Text style={styles.Text4}>USD</Text>
                    </View>
                    <FlatList
                      data={item.ServiceRatelist}
                      renderItem={({item}) => (
                        <View style={styles.View7}>
                          <View style={styles.View8}>
                            <Text style={styles.Text5}>{item.Service}</Text>
                          </View>
                          <View style={styles.View9}>
                            <Text style={styles.Text6}>
                              {item.Time.substr(0, 4) + item.Time.substr(7, 4)}
                            </Text>
                          </View>
                          <View style={styles.View9}>
                            <Text style={styles.Text7}>
                              ${item.RateCharges}
                            </Text>
                          </View>
                        </View>
                      )}
                      keyExtractor={item => item._id}
                    />
                  </View>
                )}
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </View>

        {/* Date picker POPUP */}
        <Modal
          isVisible={this.state.visibility}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onModalHide={() => {
            this.loaderFlag_func1();
          }}
          onBackdropPress={() => {
            this.setState({visibility: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility: false});
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: wp('85%'),
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('5'),
            }}>
            <View style={styles.View10}>
              <TouchableOpacity
                style={styles.View11}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({visibility: false});
                }}>
                <Image
                  style={{
                    width: wp('5%'),
                    height: wp('5%'),
                    resizeMode: 'contain',
                  }}
                  source={require('../../utils/assets/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={day => {
                this.onSelect_Date(day);
              }}
              current={this.state.selectedDate}
              minDate={this.state.minDate}
              markedDates={{
                [this.state.selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#11B7E5',
                  selectedTextColor: 'white',
                },
              }}
            />
          </View>
        </Modal>
        {/*  */}
      </>
    );
  }
}
