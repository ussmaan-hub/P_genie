/** @format */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
  FlatList,
  ScrollView,
  LogBox,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import Modal from 'react-native-modal';
const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;
import countriesData from '../../global/Countries.json';
LogBox.ignoreAllLogs(); //Ignore all log notifications
import NavBar from '../../containers/NavBar';
import call_DB from '../../global/db_functions';
import Server_function from '../../global/Server_functions';
import Loader from '../../containers/Loader';

export default class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderFlag: false,
      IsCheckBox_Checked: false,
      showAddressType_DropDown: false,
      AddressType_Value: 'Select Type',
      selectedCountry_Value: 'Select Country',
      selectedCountryCode: '',
      address_ID: '',
      address_Company: '',
      contact_Name: '',
      address_1: '',
      address_2: '',
      address_Zip: '',
      address_City: 'Select City',
      address_State: 'Select State',
      address_StateCode: '',
      address_No: '',
      isVerified: 'No',
      autoID: '',
      addressFieldChangeFlag: true,
      visibility: false,
      visibility1: false,
      visibility2: false,
      setFilteredDataSource_Country: [],
      setMasterDataSource_Country: [],

      setFilteredDataSource_States: [],
      setMasterDataSource_States: [],

      setFilteredDataSource_Cities: [],
      setMasterDataSource_Cities: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCountry_Data();
      if (this.props.route.params.varRoute == 'Old') {
        this.setState({
          AddressType_Value: this.props.route.params.itemDetail.addressType,
          address_ID: this.props.route.params.itemDetail.addressID,
          address_Company: this.props.route.params.itemDetail.addressCompany,
          contact_Name: this.props.route.params.itemDetail.contactName,
          address_1: this.props.route.params.itemDetail.address1,
          address_2: this.props.route.params.itemDetail.address2,
          address_Zip: this.props.route.params.itemDetail.addressZip,
          address_City: this.props.route.params.itemDetail.addressCity,
          address_State: this.props.route.params.itemDetail.addressState,
          address_No: this.props.route.params.itemDetail.addressPhoneNo,
          isVerified: this.props.route.params.itemDetail.addressVarifiedFlag,
          autoID: this.props.route.params.itemDetail.ID,
          selectedCountry_Value: this.props.route.params.itemDetail.countryName,
          selectedCountryCode: this.props.route.params.itemDetail.countryCode,
          address_StateCode: this.props.route.params.itemDetail
            .addressStateCode,
        });
        this.onClick_Country2(
          this.props.route.params.itemDetail.countryName,
          this.props.route.params.itemDetail.countryCode,
        );
        this.onClick_State2(
          this.props.route.params.itemDetail.countryName,
          this.props.route.params.itemDetail.countryCode,
          this.props.route.params.itemDetail.addressStateCode,
        );
        if (this.props.route.params.itemDetail.addressVarifiedFlag == 'Yes') {
          this.setState({
            IsCheckBox_Checked: true,
          });
        }
      }
    });
  }

  async getCountry_Data() {
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
    });
  }

  OnClick_AddressType_field() {
    if (this.state.showAddressType_DropDown == true) {
      this.setState({
        showAddressType_DropDown: false,
      });
    } else {
      this.setState({
        showAddressType_DropDown: true,
      });
    }
  }

  Button_Render() {
    let button;
    let vButton;
    if (this.props.route.params.varRoute == 'New') {
      button = (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.Btn2}
          onPress={() => this.handleSaveClick()}>
          <LinearGradient colors={['#0BE593', '#02D284']} style={styles.Btn1}>
            <Text style={styles.Text5}>SAVE</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    } else {
      button = (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.Btn2}
          onPress={() => this.handleUpdateClick()}>
          <LinearGradient colors={['#0BE593', '#02D284']} style={styles.Btn1}>
            <Text style={styles.Text5}>UPDATE</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    if (this.state.isVerified == 'No') {
      vButton = (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.Btn2}
          onPress={() => this.handleVerifiedClick()}>
          <LinearGradient colors={['#0BB5E5', '#20C8F8']} style={styles.Btn1}>
            <Text style={styles.Text5}>VERIFY</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
      return (
        <View style={styles.View7}>
          {button}
          {vButton}
        </View>
      );
    } else {
      return <View style={styles.View7}>{button}</View>;
    }
  }

  async handleSaveClick() {
    if (
      this.state.address_ID == '' ||
      this.state.AddressType_Value == 'Select Type' ||
      this.state.address_1 == '' ||
      this.state.address_Zip == '' ||
      this.state.address_City == '' ||
      this.state.address_State == '' ||
      this.state.selectedCountryCode == ''
    ) {
      alert('Please enter mandatory fields');
    } else {
      this.setState({
        loaderFlag: true,
      });
      var sAddress = await Server_function.save_Address(
        this.state.AddressType_Value,
        this.state.address_ID,
        this.state.address_Company,
        this.state.contact_Name,
        this.state.address_1,
        this.state.address_2,
        this.state.address_Zip,
        this.state.address_City,
        this.state.address_State,
        this.state.address_No,
        this.state.isVerified,
        this.state.selectedCountry_Value,
        this.state.selectedCountryCode,
      );
      this.setState({
        loaderFlag: false,
      });
      if (sAddress.message == 'Save Successfully') {
        call_DB.insertData_AddressBook(
          this.state.AddressType_Value,
          this.state.address_ID,
          this.state.address_Company,
          this.state.contact_Name,
          this.state.address_1,
          this.state.address_2,
          this.state.address_Zip,
          this.state.address_City,
          this.state.address_State,
          this.state.address_No,
          this.state.isVerified,
          this.state.selectedCountry_Value,
          this.state.selectedCountryCode,
          this.state.address_StateCode,
        );
        Alert.alert('Address', 'Save Successfully', [
          {text: 'OK', onPress: () => this.props.navigation.goBack()},
        ]);
      } else {
        alert('Some thing went wrong please try again');
      }
    }
  }

  handleUpdateClick() {
    call_DB.Update_Address(
      this.state.AddressType_Value,
      this.state.address_ID,
      this.state.address_Company,
      this.state.contact_Name,
      this.state.address_1,
      this.state.address_2,
      this.state.address_Zip,
      this.state.address_City,
      this.state.address_State,
      this.state.address_No,
      this.state.isVerified,
      this.state.selectedCountry_Value,
      this.state.selectedCountryCode,
      this.state.address_StateCode,
      this.state.autoID,
    );
    Alert.alert('Address', 'Update Successfully', [
      {text: 'OK', onPress: () => this.props.navigation.goBack()},
    ]);
  }

  async handleVerifiedClick() {
    if (
      this.state.address_ID == '' ||
      this.state.AddressType_Value == 'Select Type' ||
      this.state.address_1 == '' ||
      this.state.address_2 == '' ||
      this.state.address_Zip == '' ||
      this.state.address_City == '' ||
      this.state.address_State == '' ||
      this.state.selectedCountryCode == ''
    ) {
      alert('Please enter mandatory fields');
    } else {
      this.setState({
        loaderFlag: true,
      });
      var vAddress = await Server_function.verify_Address();
      console.log(vAddress);
      this.setState({
        loaderFlag: false,
      });
      if (
        vAddress.responseField.responseStatusField.descriptionField == 'Success'
      ) {
        this.setState({
          isVerified: 'Yes',
          IsCheckBox_Checked: true,
        });
      } else {
        alert('Address not valid');
      }
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

  async onClick_Country(Country, CountryCode) {
    this.setState({
      loaderFlag: true,
    });
    var statesData = await Server_function.get_TrackGetStates(
      Country,
      CountryCode,
    );
    this.setState({
      loaderFlag: false,
      isVerified: 'No',
      IsCheckBox_Checked: false,
      address_State: 'Select State',
      address_Zip: '',
      address_City: 'Select City',
      setFilteredDataSource_States: statesData,
      setMasterDataSource_States: statesData,
    });
  }

  async onClick_Country2(Country, CountryCode) {
    var statesData = await Server_function.get_TrackGetStates(
      Country,
      CountryCode,
    );
    this.setState({
      setFilteredDataSource_States: statesData,
      setMasterDataSource_States: statesData,
    });
  }

  async onClick_State(State, StateCode) {
    this.setState({
      loaderFlag: true,
    });
    var statesData = await Server_function.get_TrackGetCities(
      this.state.selectedCountryCode,
      this.state.selectedCountry_Value,
      StateCode,
    );
    this.setState({
      loaderFlag: false,
      IsCheckBox_Checked: false,
      isVerified: 'No',
      address_Zip: '',
      address_City: 'Select City',
      setFilteredDataSource_Cities: statesData,
      setMasterDataSource_Cities: statesData,
    });
  }

  async onClick_State2(cName, cCode, StateCode) {
    var statesData = await Server_function.get_TrackGetCities(
      cCode,
      cName,
      StateCode,
    );
    this.setState({
      setFilteredDataSource_Cities: statesData,
      setMasterDataSource_Cities: statesData,
    });
  }

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        {/* Navigation bar  */}
        <NavBar detail={{flag: false, nav: this.props.navigation}} />

        {/*  */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView style={styles.View1}>
            <View style={styles.View2}>
              <View style={styles.View3}>
                <Text style={styles.Text2}>
                  <Text style={styles.Text6}>* </Text>ADDRESS ID
                </Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter address ID"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.address_ID}
                  onChangeText={text => this.setState({address_ID: text})}
                />
              </View>

              <Text style={styles.Text1}>Contact Information</Text>

              <View style={styles.View3}>
                <Text style={styles.Text2}>COMPANY</Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter company"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.address_Company}
                  onChangeText={text => this.setState({address_Company: text})}
                />
              </View>

              <View style={styles.View3}>
                <Text style={styles.Text2}>CONTACT NAME</Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter contact name"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.contact_Name}
                  onChangeText={text => this.setState({contact_Name: text})}
                />
              </View>

              <View style={styles.View3}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text6}>* </Text>ADDRESS 1
                </Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter address1"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.address_1}
                  onChangeText={text =>
                    this.setState({
                      address_1: text,
                      isVerified: 'No',
                      IsCheckBox_Checked: false,
                    })
                  }
                />
              </View>

              <View style={styles.View3}>
                <Text style={styles.Text2}> ADDRESS 2</Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter address2"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.address_2}
                  onChangeText={text =>
                    this.setState({
                      address_2: text,
                      isVerified: 'No',
                      IsCheckBox_Checked: false,
                    })
                  }
                />
              </View>

              <TouchableOpacity
                style={styles.View4}
                activeOpacity={0.8}
                onPress={() => this.setState({visibility: true})}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text6}>* </Text>Country
                </Text>
                <View style={styles.View5}>
                  <Text style={styles.Text3}>
                    {this.state.selectedCountry_Value}
                  </Text>
                  <Image
                    style={{
                      width: wp('4'),
                      height: wp('4'),
                      position: 'absolute',
                      right: 10,
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/dropdown.png')}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.View4}
                activeOpacity={0.8}
                onPress={() => this.setState({visibility1: true})}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text6}>* </Text>STATE
                </Text>
                <View style={styles.View5}>
                  <Text style={styles.Text3}>{this.state.address_State}</Text>
                  <Image
                    style={{
                      width: wp('4'),
                      height: wp('4'),
                      position: 'absolute',
                      right: 10,
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/dropdown.png')}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.View4}
                activeOpacity={0.8}
                onPress={() => this.setState({visibility2: true})}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text6}>* </Text>CITY
                </Text>
                <View style={styles.View5}>
                  <Text style={styles.Text3}>{this.state.address_City}</Text>
                  <Image
                    style={{
                      width: wp('4'),
                      height: wp('4'),
                      position: 'absolute',
                      right: 10,
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/dropdown.png')}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.View3}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text6}>* </Text>ZIP
                </Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter zip"
                  placeholderTextColor="#A3A3A3"
                  defaultValue={this.state.address_Zip}
                  onChangeText={text =>
                    this.setState({
                      address_Zip: text,
                      isVerified: 'No',
                      IsCheckBox_Checked: false,
                    })
                  }
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>

              <View style={styles.View3}>
                <Text style={styles.Text2}>PHONE NO</Text>
                <TextInput
                  style={styles.Input_field1}
                  placeholder="Enter phone no"
                  placeholderTextColor="#A3A3A3"
                  keyboardType="numeric"
                  returnKeyType="done"
                  defaultValue={this.state.address_No}
                  onChangeText={text => this.setState({address_No: text})}
                />
              </View>

              <TouchableOpacity
                style={styles.View4}
                activeOpacity={0.8}
                onPress={() => this.OnClick_AddressType_field()}>
                <Text style={styles.Text2}>
                  {' '}
                  <Text style={styles.Text6}>* </Text>ADDRESS TYPE
                </Text>
                <View style={styles.View5}>
                  <Text style={styles.Text3}>
                    {this.state.AddressType_Value}
                  </Text>
                  <Image
                    style={{
                      width: wp('4'),
                      height: wp('4'),
                      position: 'absolute',
                      right: 10,
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/dropdown.png')}
                  />
                </View>
                {this.state.showAddressType_DropDown ? (
                  <View style={styles.View8}>
                    <FlatList
                      data={[
                        {type: 'Recipient'},
                        {type: 'Sender'},
                        {type: 'Both'},
                      ]}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={styles.View9}
                          activeOpacity={0.5}
                          onPress={() => {
                            this.setState({
                              AddressType_Value: item.type,
                              showAddressType_DropDown: false,
                            });
                          }}>
                          <Text style={styles.Text8}>{item.type}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <View style={styles.View6}>
                <Text style={styles.Text4}>Address Verified</Text>
                <CheckBox
                  style={{
                    width: wp('5'),
                    height: wp('5'),
                    marginLeft: 10,
                  }}
                  disabled={true}
                  onFillColor="#0BE593"
                  boxType="square"
                  onTintColor="#0BE593"
                  onCheckColor="white"
                  tintColor="#0BE593"
                  value={this.state.IsCheckBox_Checked}
                  onValueChange={() =>
                    this.setState({checked: !this.state.IsCheckBox_Checked})
                  }
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {this.Button_Render()}

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
                    this.onClick_Country(item.Country, item.CountryCode);
                    this.setState({
                      selectedCountry_Value: item.Country,
                      visibility: false,
                      selectedCountryCode: item.CountryCode,
                    });
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
                    this.onClick_State(item.State, item.StateCode);
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
                  onPress={() => {
                    this.setState({
                      address_City: item.City,
                      visibility2: false,
                      address_Zip: item.ZipCode,
                      isVerified: 'No',
                    });
                  }}>
                  <Text style={styles.Text8}>{item.City}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
        {/*  */}
      </>
    );
  }
}
