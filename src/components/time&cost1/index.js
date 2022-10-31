/** @format */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView,
  LogBox,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import NavBar from '../../containers/NavBar';
import Modal from 'react-native-modal';
import Nodata from '../../containers/Nodata';
import call_DB from '../../global/db_functions';
import Server_function from '../../global/Server_functions';
import Loader from '../../containers/Loader';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderFlag: false,
      visibility: false,
      visibility1: false,
      visibility2: false,
      visibility3: false,
      visibility4: false,
      fromData: [],
      toData: [],

      fromCountry: 'Select Country',
      fromState: 'Select State',
      fromCity: 'Select City',
      fromPostalCode: '',
      fromCCode: '',
      fromSCode: '',

      toCountry: 'Select Country',
      toState: 'Select State',
      toCity: 'Select City',
      toPostalCode: '',
      toCCode: '',
      toSCode: '',

      setFilteredDataSource_Country: [],
      setMasterDataSource_Country: [],

      setFilteredDataSource_States: [],
      setMasterDataSource_States: [],

      setFilteredDataSource_Cities: [],
      setMasterDataSource_Cities: [],

      selectedCountryName: '',
      selectedCountryCode: '',

      selectedStateCode: '',

      selectedSource: '',
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        loaderFlag: true,
      });
      this.getAddressList_Func();
    });
  }

  async getCountry_Data(source) {
    if (source == 'From') {
      this.setState({
        loaderFlag: true,
      });
      var countryData = await Server_function.get_TrackGetCountry();
      this.setState({
        setFilteredDataSource_Country: countryData,
        setMasterDataSource_Country: countryData,
      });
      this.setState({
        loaderFlag: false,
        visibility: true,
        selectedSource: 'From',
      });
    } else if (source == 'To') {
      this.setState({
        loaderFlag: true,
      });
      var countryData = await Server_function.get_TrackGetCountry();
      this.setState({
        setFilteredDataSource_Country: countryData,
        setMasterDataSource_Country: countryData,
      });
      this.setState({
        loaderFlag: false,
        visibility: true,
        selectedSource: 'To',
      });
    }
  }

  async getState_Data(source) {
    if (source == 'From') {
      if (this.state.fromCountry == 'Select Country') {
        alert('Please From Select Country');
      } else {
        this.setState({
          loaderFlag: true,
        });
        var statesData = await Server_function.get_TrackGetStates(
          this.state.fromCountry,
          this.state.fromCCode,
        );
        this.setState({
          loaderFlag: false,
          setFilteredDataSource_States: statesData,
          setMasterDataSource_States: statesData,
          visibility1: true,
          selectedSource: 'From',
        });
      }
    } else if (source == 'To') {
      if (this.state.toCountry == 'Select Country') {
        alert('Please To Select Country');
      } else {
        this.setState({
          loaderFlag: true,
        });
        var statesData = await Server_function.get_TrackGetStates(
          this.state.toCountry,
          this.state.toCCode,
        );
        this.setState({
          loaderFlag: false,
          setFilteredDataSource_States: statesData,
          setMasterDataSource_States: statesData,
          visibility1: true,
          selectedSource: 'To',
        });
      }
    }
  }

  async getCity_Data(source) {
    if (source == 'From') {
      if (this.state.fromSCode == '') {
        alert('Please Select From State');
      } else {
        this.setState({
          loaderFlag: true,
        });

        var cityData = await Server_function.get_TrackGetCities(
          this.state.fromCCode,
          this.state.fromCountry,
          this.state.fromSCode,
        );
        this.setState({
          loaderFlag: false,
          setFilteredDataSource_Cities: cityData,
          setMasterDataSource_Cities: cityData,
          visibility2: true,
        });
      }
    } else if (source == 'To') {
      if (this.state.toSCode == '') {
        alert('Please Select To State');
      } else {
        this.setState({
          loaderFlag: true,
        });

        var cityData = await Server_function.get_TrackGetCities(
          this.state.toCCode,
          this.state.toCountry,
          this.state.toSCode,
        );
        this.setState({
          loaderFlag: false,
          setFilteredDataSource_Cities: cityData,
          setMasterDataSource_Cities: cityData,
          visibility2: true,
        });
      }
    }
  }

  async getAddressList_Func() {
    var temp1 = [];
    var temp2 = [];

    var data = await call_DB.getData_AddressBook();
    for (let i = 0; i < data.length; i++) {
      if (data[i].addressType == 'Recipient') {
        temp1.push(data[i]);
      } else if (data[i].addressType == 'Sender') {
        temp2.push(data[i]);
      } else if (data[i].addressType == 'Both') {
        temp1.push(data[i]);
        temp2.push(data[i]);
      }
    }
    this.setState({
      fromData: temp2,
      toData: temp1,
      loaderFlag: false,
    });
  }

  onClick_Continue() {
    if (
      this.state.fromCountry == 'Select Country' ||
      this.state.fromState == 'Select State' ||
      this.state.fromCity == 'Select City' ||
      this.state.fromPostalCode == '' ||
      this.state.toCountry == 'Select Country' ||
      this.state.toState == 'Select State' ||
      this.state.toCity == 'Select City' ||
      this.state.toPostalCode == ''
    ) {
      alert('Please fill all mandatory fields');
    } else {
      this.props.navigation.navigate('TimeAndCost2', {
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

  searchFilterFunction_Country(text) {
    if (text) {
      const newData = this.state.setMasterDataSource_Country.filter(function(
        item,
      ) {
        const itemData = item.Country
          ? item.Country.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        setFilteredDataSource_Country: newData,
      });
    } else {
      this.setState({
        setFilteredDataSource_Country: this.state.setMasterDataSource_Country,
      });
    }
  }

  searchFilterFunction_States(text) {
    if (text) {
      const newData = this.state.setMasterDataSource_States.filter(function(
        item,
      ) {
        const itemData = item.State
          ? item.State.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        setFilteredDataSource_States: newData,
      });
    } else {
      this.setState({
        setFilteredDataSource_States: this.state.setMasterDataSource_States,
      });
    }
  }

  searchFilterFunction_Cities(text) {
    if (text) {
      const newData = this.state.setMasterDataSource_Cities.filter(function(
        item,
      ) {
        const itemData = item.City ? item.City.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        setFilteredDataSource_Cities: newData,
      });
    } else {
      this.setState({
        setFilteredDataSource_Cities: this.state.setMasterDataSource_Cities,
      });
    }
  }

  flatList_RenderFor_To(item) {
    var address =
      item.address1 +
      ', ' +
      item.address2 +
      ', ' +
      item.addressCity +
      ', ' +
      item.addressState +
      ', ' +
      item.addressZip;

    let Verified;
    if (item.addressVarifiedFlag == 'Yes') {
      Verified = 'Verified';
    } else {
      Verified = '';
    }

    return (
      <TouchableOpacity
        style={styles.View7}
        activeOpacity={0.5}
        onPress={() => this.onClick_ToAddress(item)}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: wp('4'),
              height: wp('4'),
            }}
            source={require('../../utils/assets/pin.png')}
          />
          <Text style={styles.Text7}>{item.addressID}</Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
              paddingBottom: wp(2),
            }}>
            <Text
              style={{
                fontSize: wp(3),
                color: 'green',
              }}>
              {Verified}
            </Text>
          </View>
        </View>

        <View style={styles.View15}>
          <Text style={styles.Text9}>{address}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  flatList_RenderFor_From(item) {
    var address =
      item.address1 +
      ', ' +
      item.address2 +
      ', ' +
      item.addressCity +
      ', ' +
      item.addressState +
      ', ' +
      item.addressZip;

    let Verified;
    if (item.addressVarifiedFlag == 'Yes') {
      Verified = 'Verified';
    } else {
      Verified = '';
    }

    return (
      <TouchableOpacity
        style={styles.View7}
        activeOpacity={0.5}
        onPress={() => this.onClick_FromAddress(item)}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: wp('4'),
              height: wp('4'),
            }}
            source={require('../../utils/assets/pin.png')}
          />
          <Text style={styles.Text7}>{item.addressID}</Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
              paddingBottom: wp(2),
            }}>
            <Text
              style={{
                fontSize: isTablet ? wp(2.5) : wp(3.5),
                color: 'green',
              }}>
              {Verified}
            </Text>
          </View>
        </View>

        <View style={styles.View15}>
          <Text style={styles.Text9}>{address}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  onClick_FromAddress(item) {
    this.setState({
      visibility4: false,
      fromCity: item.addressCity,
      fromCountry: item.countryName,
      fromState: item.addressState,
      fromCCode: item.countryCode,
      fromSCode: item.addressStateCode,
      fromPostalCode: item.addressZip,
    });
  }

  onClick_ToAddress(item) {
    this.setState({
      visibility3: false,
      toCity: item.addressCity,
      toCountry: item.countryName,
      toState: item.addressState,
      toCCode: item.countryCode,
      toSCode: item.addressStateCode,
      toPostalCode: item.addressZip,
    });
  }

  onClick_Country(item) {
    if (this.state.selectedSource == 'From') {
      this.setState({
        visibility: false,
        fromCountry: item.Country,
        fromCCode: item.CountryCode,
        fromState: 'Select State',
        fromSCode: '',
        fromCity: 'Select City',
      });
    } else if (this.state.selectedSource == 'To') {
      this.setState({
        visibility: false,
        toCountry: item.Country,
        toCCode: item.CountryCode,
        toState: 'Select State',
        toSCode: '',
        toCity: 'Select City',
      });
    }
  }

  onClick_State(item) {
    if (this.state.selectedSource == 'From') {
      this.setState({
        visibility1: false,
        fromSCode: item.StateCode,
        fromState: item.State,
        fromCity: 'Select City',
      });
    } else if (this.state.selectedSource == 'To') {
      this.setState({
        visibility1: false,
        toSCode: item.StateCode,
        toState: item.State,
        toCity: 'Select City',
      });
    }
  }

  onClick_City(item) {
    if (this.state.selectedSource == 'From') {
      this.setState({
        visibility2: false,
        fromCity: item.City,
      });
    } else if (this.state.selectedSource == 'To') {
      this.setState({
        visibility2: false,
        toCity: item.City,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        {/* Navigation bar  */}
        <NavBar detail={{flag: true, nav: this.props.navigation}} />
        {/*  */}

        {/* Screen Detail  */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.View1}>
            <View style={styles.View2}>
              <Text style={styles.Text1}>Where are you shipping from?</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View4}
                onPress={() => this.setState({visibility4: true})}>
                <Text style={styles.Text4}>Address Book</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View3}
                onPress={() => this.getCountry_Data('From')}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>Country
                </Text>
                <Text style={styles.Text5}>{this.state.fromCountry}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View3}
                onPress={() => this.getState_Data('From')}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>State
                </Text>
                <Text style={styles.Text5}>{this.state.fromState}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View3}
                onPress={() => this.getCity_Data('From')}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>City
                </Text>
                <Text style={styles.Text5}>{this.state.fromCity}</Text>
              </TouchableOpacity>
              <View style={styles.View3}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>Postal Code
                </Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter Postal Code"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.fromPostalCode}
                  onChangeText={text => this.setState({fromPostalCode: text})}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>
            <View style={styles.View2}>
              <Text style={styles.Text1}>Where are you shipping to?</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View4}
                onPress={() => this.setState({visibility3: true})}>
                <Text style={styles.Text4}>Address Book</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View3}
                onPress={() => this.getCountry_Data('To')}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>Country
                </Text>
                <Text style={styles.Text5}>{this.state.toCountry}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View3}
                onPress={() => this.getState_Data('To')}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>State
                </Text>
                <Text style={styles.Text5}>{this.state.toState}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.View3}
                onPress={() => this.getCity_Data('To')}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>City
                </Text>
                <Text style={styles.Text5}>{this.state.toCity}</Text>
              </TouchableOpacity>
              <View style={styles.View3}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text3}>* </Text>Postal Code
                </Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter Postal Code"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.toPostalCode}
                  onChangeText={text => this.setState({toPostalCode: text})}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
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
        {/*  */}

        {/* country Popup */}
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
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: '80%',
              width: wp('85%'),
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('5'),
            }}>
            <View style={styles.View13}>
              <TouchableOpacity
                style={styles.View14}
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
            <View style={styles.View10}>
              <View style={styles.View11}>
                <Image
                  style={{
                    width: '45%',
                    height: '45%',
                    resizeMode: 'contain',
                  }}
                  source={require('../../utils/assets/magnifying_glass.png')}
                />
              </View>
              <View style={styles.View12}>
                <TextInput
                  style={styles.Input_field2}
                  placeholder="Search.."
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => this.searchFilterFunction_Country(text)}
                  onClear={text => searchFilterFunction_Country('')}
                />
              </View>
            </View>

            <FlatList
              data={this.state.setFilteredDataSource_Country}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.View9}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.onClick_Country(item);
                  }}>
                  <Text style={styles.Text8}>{item.Country}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
        {/*  */}

        {/* States Popup */}
        <Modal
          isVisible={this.state.visibility1}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility1: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility1: false});
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: '80%',
              width: wp('85%'),
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('5'),
            }}>
            <View style={styles.View13}>
              <TouchableOpacity
                style={styles.View14}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({visibility1: false});
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
            <View style={styles.View10}>
              <View style={styles.View11}>
                <Image
                  style={{
                    width: '45%',
                    height: '45%',
                    resizeMode: 'contain',
                  }}
                  source={require('../../utils/assets/magnifying_glass.png')}
                />
              </View>
              <View style={styles.View12}>
                <TextInput
                  style={styles.Input_field2}
                  placeholder="Search.."
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => this.searchFilterFunction_States(text)}
                  onClear={text => searchFilterFunction_States('')}
                />
              </View>
            </View>

            <FlatList
              data={this.state.setFilteredDataSource_States}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.View9}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.setState({
                      address_State: item.State,
                      visibility1: false,
                      address_StateCode: item.StateCode,
                    });
                    this.onClick_State(item);
                  }}>
                  <Text style={styles.Text8}>{item.State}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
        {/*  */}

        {/* Cities Popup */}
        <Modal
          isVisible={this.state.visibility2}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility2: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility2: false});
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: '80%',
              width: wp('85%'),
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('5'),
            }}>
            <View style={styles.View13}>
              <TouchableOpacity
                style={styles.View14}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({visibility2: false});
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
            <View style={styles.View10}>
              <View style={styles.View11}>
                <Image
                  style={{
                    width: '45%',
                    height: '45%',
                    resizeMode: 'contain',
                  }}
                  source={require('../../utils/assets/magnifying_glass.png')}
                />
              </View>
              <View style={styles.View12}>
                <TextInput
                  style={styles.Input_field2}
                  placeholder="Search.."
                  placeholderTextColor="#A3A3A3"
                  onChangeText={text => this.searchFilterFunction_Cities(text)}
                  onClear={text => searchFilterFunction_Cities('')}
                />
              </View>
            </View>

            <FlatList
              data={this.state.setFilteredDataSource_Cities}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.View9}
                  activeOpacity={0.5}
                  onPress={() => this.onClick_City(item)}>
                  <Text style={styles.Text8}>{item.City}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
        {/*  */}

        {/* TO Address POPUP */}
        <Modal
          isVisible={this.state.visibility3}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility3: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility3: false});
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '95%',
              height: '85%',
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('5'),
            }}>
            <View style={styles.View5}>
              <TouchableOpacity
                style={styles.View6}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({visibility3: false});
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
            {(() => {
              if (this.state.toData.length == 0) {
                return (
                  <View style={styles.View1_1}>
                    <Nodata detail={{alertText: 'No data found'}} />
                  </View>
                );
              } else {
                return (
                  <FlatList
                    data={this.state.toData}
                    renderItem={({item}) => this.flatList_RenderFor_To(item)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                );
              }
            })()}
          </View>
        </Modal>
        {/*  */}

        {/* From Address POPUP */}
        <Modal
          isVisible={this.state.visibility4}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility4: false});
          }}
          onBackButtonPress={() => {
            this.setState({visibility4: false});
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '95%',
              height: '85%',
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('5'),
            }}>
            <View style={styles.View5}>
              <TouchableOpacity
                style={styles.View6}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({visibility4: false});
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
            {(() => {
              if (this.state.fromData.length == 0) {
                return (
                  <View style={styles.View1_1}>
                    <Nodata detail={{alertText: 'No data found'}} />
                  </View>
                );
              } else {
                return (
                  <FlatList
                    data={this.state.fromData}
                    renderItem={({item}) => this.flatList_RenderFor_From(item)}
                    keyExtractor={(item, index) => index.toString()}
                  />
                );
              }
            })()}
          </View>
        </Modal>
      </>
    );
  }
}
