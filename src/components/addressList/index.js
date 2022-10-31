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
import Modal from 'react-native-modal';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import Loader from '../../containers/Loader';
const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();
LogBox.ignoreAllLogs(); //Ignore all log notifications
import NavBar from '../../containers/NavBar';
import call_DB from '../../global/db_functions';
import Nodata from '../../containers/Nodata';

export default class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      addressesData: [],
      selectedRowIndex: '',
      selectedItem: [],
      loaderFlag: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getAddressList_Func();
    });
  }

  async getAddressList_Func() {
    this.setState({
      loaderFlag: true,
    });
    var data = await call_DB.getData_AddressBook();
    this.setState({
      addressesData: data,
      loaderFlag: false,
    });
  }

  flatList_Render(item) {
    var address = `${item.address1}, ${item.address2}, ${item.addressCity}, ${item.addressState}, ${item.addressZip}`;

    let Verified;
    if (item.addressVarifiedFlag == 'Yes') {
      Verified = 'Verified';
    } else {
      Verified = '';
    }

    return (
      <View style={styles.View2}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: isTablet ? wp('4') : wp('4.5'),
              height: isTablet ? wp('4') : wp('4.5'),
            }}
            source={require('../../utils/assets/pin.png')}
          />
          <Text style={styles.text1}>{item.addressID}</Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
            }}>
            <Text
              style={{
                fontSize: isTablet ? wp(2) : wp(3),
                color: 'green',
              }}>
              {Verified}
            </Text>
          </View>
        </View>

        <View style={styles.View3}>
          <Text style={styles.text2}>{address}</Text>
          <TouchableOpacity
            style={styles.View4}
            onPress={() => {
              this.setState({
                visibility: true,
                selectedRowIndex: item.ID,
                selectedItem: item,
              });
            }}>
            <Image
              style={{
                width: isTablet ? wp(3) : wp(4),
                height: isTablet ? wp(3) : wp(4),
              }}
              source={require('../../utils/assets/Three_Dots.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async deleteAddress_Func() {
    this.setState({
      loaderFlag: true,
    });
    var data = await call_DB.Delete_Address(this.state.selectedRowIndex);
    this.setState({
      loaderFlag: false,
    });
    if (data.rowsAffected > 0) {
      this.setState({visibility: false});
      this.getAddressList_Func();
    } else alert('No record found');
  }

  editAddress_Func() {
    this.setState({
      visibility: false,
    });
    this.props.navigation.navigate('AddressBook', {
      varRoute: 'Old',
      itemDetail: this.state.selectedItem,
    });
  }

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        {/* Navigation bar  */}
        <NavBar detail={{flag: true, nav: this.props.navigation}} />

        {(() => {
          if (this.state.addressesData.length == 0) {
            return (
              <View style={styles.View1_1}>
                <Nodata detail={{alertText: 'No data found'}} />
                <TouchableOpacity
                  style={styles.View5}
                  activeOpacity={0.5}
                  onPress={() =>
                    this.props.navigation.navigate('AddressBook', {
                      varRoute: 'New',
                    })
                  }>
                  <Image
                    style={{
                      width: '50%',
                      height: '50%',
                      tintColor: 'white',
                    }}
                    source={require('../../utils/assets/add.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.View1}>
                <FlatList
                  data={this.state.addressesData}
                  renderItem={({item}) => this.flatList_Render(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                  style={styles.View5}
                  activeOpacity={0.5}
                  onPress={() =>
                    this.props.navigation.navigate('AddressBook', {
                      varRoute: 'New',
                    })
                  }>
                  <Image
                    style={{
                      width: '50%',
                      height: '50%',
                      tintColor: 'white',
                    }}
                    source={require('../../utils/assets/add.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          }
        })()}

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
            this.setState({selectedRowIndex: ''});
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
              backgroundColor: '#F8F8F8',
              borderTopLeftRadius: wp(5),
              borderTopRightRadius: wp(5),
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: wp(2),
              paddingBottom: wp(5),
            }}>
            <TouchableOpacity
              style={styles.View6}
              activeOpacity={0.5}
              onPress={() => {
                {
                  this.editAddress_Func();
                }
              }}>
              <Image
                style={{
                  width: wp('4.5%'),
                  height: wp('4.5%'),
                  resizeMode: 'contain',
                  marginRight: wp(2),
                }}
                source={require('../../utils/assets/edit_button.png')}
              />
              <Text style={styles.Text3}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.View6}
              activeOpacity={0.5}
              // onPress={() => this.Onclick_Share()}
            >
              <Image
                style={{
                  width: wp('4.5%'),
                  height: wp('4.5%'),
                  resizeMode: 'contain',
                  marginRight: wp(2),
                  tintColor: '#00000029',
                }}
                source={require('../../utils/assets/pin.png')}
              />
              <Text style={styles.Text3}>Open In Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.View6}
              activeOpacity={0.5}
              onPress={() => this.deleteAddress_Func()}>
              <Image
                style={{
                  width: wp('4.5%'),
                  height: wp('4.5%'),
                  resizeMode: 'contain',
                  marginRight: wp(2),
                }}
                source={require('../../utils/assets/trash.png')}
              />
              <Text style={styles.Text3}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/*  */}
      </>
    );
  }
}
