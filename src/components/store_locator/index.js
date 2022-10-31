/** @format */

import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  SafeAreaView,
  Keyboard,
  AppState,
  FlatList,
  Linking,
  Platform,
  LogBox,
  ScrollView,
} from 'react-native';
import styles from './style';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import Server_function from '../../global/Server_functions';
import Loader from '../../containers/Loader';
import callGlobal_Func from '../../global/global_functions';
import call from 'react-native-phone-call';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

import NavBar from '../../containers/NavBar';

export default class StoreLocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: '',
      loaderFlag: false,
      mapHeight: '100%',
      detailViewHeight: '0%',
      ShowFilterBtn: true,
      visibility: false,
      SelectedType: 'Show All',
      markers: [],
      Types: [
        {title: 'Show All', IsChecked: true},
        {title: 'Show Open Store Only', IsChecked: false},
        {title: 'Open On Sunday', IsChecked: false},
        {title: 'Open On Saturday', IsChecked: false},
      ],

      caption: '',
      description: '',
      phoneNumber: '',
      address: '',
      miles: '',
      services_List: [],
      shopHours_Array: [],
      airHours_Array: [],
      groundHours_Array: [],
      storeFlagVar: '',
      withoutFilterArray: '',
      currentLat: '',
      currentLong: '',
      desLat: '',
      desLong: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        mapHeight: '100%',
        detailViewHeight: '0%',
        ShowFilterBtn: true,
        visibility: false,
        SelectedType: 'Show All',
        Types: [
          {title: 'Show All', IsChecked: true},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
      this.requestLocationPermission();
    });
  }

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          this.getOneTimeLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  getOneTimeLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
      
        this.setState({
          currentLat: currentLatitude,
          currentLong: currentLongitude,
        });
        this.get_Near_Store(currentLatitude, currentLongitude);
      },
      error => Alert.alert('Please Enable Location'),
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  }

  async get_Near_Store(lat, long) {
    
    this.setState({
      loaderFlag: true,
    });
    var a = await Server_function.get_Track_Data(lat, long);
    this.setState({
      loaderFlag: false,
    });
    if (a.ResponseStatus == 'Success') {
      var markers_Data = await callGlobal_Func.getStoreLocatorData(a);
      this.setState({
        markers: markers_Data,
        withoutFilterArray: markers_Data,
      });
      this.mapRef.fitToCoordinates(markers_Data, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
    } else {
      alert('Data Not Found');
    }
  }

  onPressHideDetailView() {
    this.setState({
      mapHeight: '100%',
      detailViewHeight: '0%',
      ShowFilterBtn: true,
    });
  }

  onPressShowDetailView(index) {
    this.setState({
      caption: this.state.markers[index].title,
      description: '',
      phoneNumber: this.state.markers[index].phoneNumber,
      address: this.state.markers[index].address,
      miles: this.state.markers[index].miles,
      services_List: this.state.markers[index].serviceList,
      shopHours_Array: this.state.markers[index].store_Shop_Hours,
      airHours_Array: this.state.markers[index].air_PickupHours,
      groundHours_Array: this.state.markers[index].ground_PickupHours,
      storeFlagVar: this.state.markers[index].storeWorkingFlag,
      desLat: this.state.markers[index].latitude,
      desLong: this.state.markers[index].longitude,
    });
    this.setState({
      mapHeight: '30%',
      detailViewHeight: '70%',
      ShowFilterBtn: false,
    });
  }

  handleCheckBoxChange = (index, item) => {
    var temp = [];
    if (index == 0) {
      this.mapRef.fitToCoordinates(this.state.withoutFilterArray, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      if(this.state.withoutFilterArray.length!=0){
        this.setState({
          markers: this.state.withoutFilterArray,
        });
      }
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: true},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
    } else if (index == 1) {
      for (let i = 0; i < this.state.withoutFilterArray.length; i++) {
        if (this.state.withoutFilterArray[i].storeWorkingFlag == 'Open') {
          temp.push(this.state.withoutFilterArray[i]);
        }
      }
      this.mapRef.fitToCoordinates(temp, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      this.setState({
        markers: temp,
      });
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: false},
          {title: 'Show Open Store Only', IsChecked: true},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
    } else if (index == 2) {
      for (let i = 0; i < this.state.withoutFilterArray.length; i++) {
        if (this.state.withoutFilterArray[i].sunClosedVar == 'Open') {
          temp.push(this.state.withoutFilterArray[i]);
        }
      }
      this.mapRef.fitToCoordinates(temp, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      this.setState({
        markers: temp,
      });
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: false},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: true},
          {title: 'Open On Saturday', IsChecked: false},
        ],
      });
    } else if (index == 3) {
      for (let i = 0; i < this.state.withoutFilterArray.length; i++) {
        if (this.state.withoutFilterArray[i].satClosedVar == 'Open') {
          temp.push(this.state.withoutFilterArray[i]);
        }
      }
      this.mapRef.fitToCoordinates(temp, {
        edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
        animated: true,
      });
      this.setState({
        markers: temp,
      });
      this.setState({
        Types: [
          {title: 'Show All', IsChecked: false},
          {title: 'Show Open Store Only', IsChecked: false},
          {title: 'Open On Sunday', IsChecked: false},
          {title: 'Open On Saturday', IsChecked: true},
        ],
      });
    }
    this.setState({
      SelectedType: item.title,
      visibility: false,
    });
  };

  onClickFilterBtn() {
    this.setState({
      visibility: true,
    });
  }

  DrawMarker(marker, index) {

    if (marker.Car == 'UPS') {
      return (
        <MapView.Marker
          key={index}
          onPress={() => this.onPressShowDetailView(index)}
          coordinate={marker}>
          <Image
            source={require('../../utils/assets/pin.png')}
            style={{width: wp(8), height: wp(8), tintColor: '#fc8f00'}}
          />
        </MapView.Marker>
      );
    } else if (marker.Car == 'FedEx') {
      return (
        <MapView.Marker
          key={index}
          onPress={() => this.onPressShowDetailView()}
          coordinate={marker}>
          <Image
            source={require('../../utils/assets/pin.png')}
            style={{width: wp(8), height: wp(8), tintColor: '#4D148C'}}
          />
        </MapView.Marker>
      );
    }
  }

  triggerCall(num) {
    // if (inputValue.length != 10) {
    //   alert('Please insert correct contact number');
    //   return;
    // }

    const args = {
      number: num,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  }

  goToYosemite() {
    // openMap({latitude: 24.851935, longitude: 67.065901});
    // const yosemite = { latitude: 37.865101, longitude: -119.538330 };

    // createMapLink({ provider: 'apple', start: yosemite, end: '1600 Amphitheatre Pkwy, Mountain View, CA',zoom: 40 })
    Linking.openURL(
      'maps://app?saddr=' +
        this.state.currentLat +
        '+' +
        this.state.currentLong +
        '&daddr=' +
        this.state.desLat +
        '+' +
        this.state.desLong,
    );
  }

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        <NavBar detail={{flag: true, nav: this.props.navigation}} />

        {this.state.ShowFilterBtn ? (
          <TouchableOpacity
            style={styles.View12}
            activeOpacity={0.5}
            onPress={() => this.onClickFilterBtn()}>
            <Text style={styles.text10}>{this.state.SelectedType}</Text>
            <Image
              source={require('../../utils/assets/dropdown.png')}
              style={{
                width: isTablet ? wp(3) : wp(4),
                height: isTablet ? wp(3) : wp(4),
                alignSelf: 'flex-end',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            ref={ref => {
              this.mapRef = ref;
            }}
            onLayout={() =>
              this.mapRef.fitToCoordinates(this.state.markers, {
                edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
                animated: true,
              })
            }
            style={{height: this.state.mapHeight, width: '100%'}}>
            {this.state.markers.map((marker, index) =>
              this.DrawMarker(marker, index),
            )}
          </MapView>
          <TouchableOpacity
            style={styles.View1}
            activeOpacity={0.5}
            onPress={() => this.onPressHideDetailView()}>
            <Image
              source={require('../../utils/assets/dropdown.png')}
              style={{width: '50%', height: '50%', tintColor: 'white'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ScrollView
            style={{
              height: this.state.detailViewHeight,
              width: '100%',
              backgroundColor: 'white',
            }}>
            <View style={styles.View2}>
              <Text style={styles.text1} numberOfLines={1}>
                {this.state.caption}
              </Text>
              <View style={styles.View3}>
                <View style={styles.View5}>
                  {/* <Text style={styles.text2} numberOfLines={1}>
                    FedEx Express Ship Center
                  </Text> */}
                  <Text style={styles.text3} numberOfLines={2}>
                    {this.state.address}
                  </Text>
                </View>

                <View style={styles.View4}>
                  <Text style={styles.text4}>{this.state.storeFlagVar}</Text>
                  <Text style={styles.text5}>{this.state.miles}</Text>
                </View>
              </View>

              <Text style={styles.text12}>Air</Text>
              <View style={styles.View6}>
                <View style={styles.View7}>
                  <Text style={styles.text6}></Text>
                </View>
                <View style={styles.View8}>
                  <Text style={styles.text6}>Shop Hours</Text>
                </View>
                <View style={styles.View9}>
                  <Text style={styles.text6}>Last Pickup</Text>
                </View>
              </View>
              <FlatList
                data={this.state.groundHours_Array}
                style={{paddingBottom: wp(3)}}
                renderItem={({item, key}) => (
                  <View style={styles.View6}>
                    <View style={styles.View7}>
                      <Text style={styles.text6}>{item.Day}</Text>
                    </View>
                    <View style={styles.View8}>
                      <Text style={styles.text6}>{item.ShopHouseTiming}</Text>
                    </View>
                    <View style={styles.View9}>
                      <Text style={styles.text6}>{item.LastHours}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />

              <Text style={styles.text12}>Ground</Text>
              <View style={styles.View6}>
                <View style={styles.View7}>
                  <Text style={styles.text6}></Text>
                </View>
                <View style={styles.View8}>
                  <Text style={styles.text6}>Shop Hours</Text>
                </View>
                <View style={styles.View9}>
                  <Text style={styles.text6}>Last Pickup</Text>
                </View>
              </View>
              <FlatList
                style={{paddingBottom: wp(3)}}
                data={this.state.airHours_Array}
                renderItem={({item, key}) => (
                  <View style={styles.View6}>
                    <View style={styles.View7}>
                      <Text style={styles.text6}>{item.Day}</Text>
                    </View>
                    <View style={styles.View8}>
                      <Text style={styles.text6}>{item.ShopHouseTiming}</Text>
                    </View>
                    <View style={styles.View9}>
                      <Text style={styles.text6}>{item.LastHours}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />

              <Text style={styles.text7}>Service At this location</Text>
              <FlatList
                data={this.state.services_List}
                renderItem={({item, key}) => (
                  <Text style={styles.text8}>{item.descriptionField}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />

              <View style={styles.View10}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.Btn2}
                  onPress={() => this.triggerCall(this.state.phoneNumber)}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={styles.Btn1}>
                    <Image
                      source={require('../../utils/assets/telephone.png')}
                      style={{width: wp(4), height: wp(4)}}
                      resizeMode="contain"
                    />
                    <Text style={styles.text9}>
                      Call {this.state.phoneNumber}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.Btn2}
                  onPress={() => this.goToYosemite()}>
                  <LinearGradient
                    colors={['#0BB5E5', '#20C8F8']}
                    style={styles.Btn1}>
                    <Image
                      source={require('../../utils/assets/right-arrow.png')}
                      style={{width: wp(4), height: wp(4)}}
                      resizeMode="contain"
                    />
                    <Text style={styles.text9}>Get Direction</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Bottom action sheet */}
        <Modal
          isVisible={this.state.visibility}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility: false});
          }}
          onModalHide={() => {
            // this.loaderFlag_func();
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: 0,
            bottom: 0,
          }}>
          <View
            style={{
              width: '100%',
              // height: wp(100),
              paddingBottom: wp(10),
              backgroundColor: '#F8F8F8',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingTop: wp(2),
            }}>
            <FlatList
              style={styles.view13}
              showsVerticalScrollIndicator={false}
              data={this.state.Types}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={styles.view14}>
                  <CheckBox
                    style={{
                      width: wp('5'),
                      height: wp('5'),
                    }}
                    // isChecked={item.IsChecked}
                    onFillColor="#0BE593"
                    boxType="square"
                    onTintColor="#0BE593"
                    onCheckColor="white"
                    tintColor="#0BE593"
                    onClick={() => {
                      this.handleCheckBoxChange(index, item);
                    }}
                    value={item.IsChecked}
                    onValueChange={() => this.handleCheckBoxChange(index, item)}
                  />
                  <Text style={styles.text11}>{item.title}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </>
    );
  }
}
