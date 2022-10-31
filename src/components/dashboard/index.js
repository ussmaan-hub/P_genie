/** @format */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  LogBox,
  FlatList,
  Alert,
  Share,
} from 'react-native';
import styles from './style';
import BottomSheet from 'react-native-custom-bottom-sheet';
import call_DB from '../../global/db_functions';
// import CryptoJS from 'react-native-crypto-js';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
// import Api_url from '../../global/api_constraints';
import DeviceInfo from 'react-native-device-info';
import callGlobal_Func from '../../global/global_functions';
import Server_function from '../../global/Server_functions';
import Loader from '../../containers/Loader';
import NavBar from '../../containers/NavBar';
import {
  widthPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nodata from '../../containers/Nodata';
import {RNCamera} from 'react-native-camera';
const isTablet = DeviceInfo.isTablet();

const wp = ConstantsVar.isPortrait() ? widthPercentageToDP : hp;
LogBox.ignoreAllLogs(); //Ignore all log notifications

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

var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Flag: '',
      flag2: false,
      flag3: false,
      visibility: false,
      loaderFlag: false,
      editCaptionFlag: false,
      showCarrier_DropDown: false,
      showAddModal: false,

      Carrier_Value: 'Select Carrier',
      SelectedTNumber: '',
      SelectedCarrier: '',
      SelectedCaption: '',
      SelectedDescription: '',
      IDIdentifier: '',

      enteredTNumber: '',
      enteredCaption: '',
      updateEnteredCaption: '',
      scannedBarCodeValue: '',

      setFilteredDataSource: [],
      setMasterDataSource: [],
      packageArray: [],

      showCameraFlag: false,
    };
  }

  componentDidMount() {
    ConstantsVar.HomescreenRef = this;
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        loaderFlag: true,
      });
      this.get_DB_Data();

      // AsyncStorage.multiGet([
      //   'Caption',
      //   'Carrier',
      //   'TrackingNumber',
      //   'RecInBackground',
      // ]).then(data1 => {
      //   if (data1[3][1] == 'true') {
      //     this.setState({
      //       loaderFlag: true,
      //     });
      //     this.ForegroundNotifyHandlar();
      //   } else {
      //     this.get_DB_Data();
      //   }
      // });
    });
  }

  async ForegroundNotifyHandlar() {
    var Update_Res = await Server_function.get_Update_Package();

    for (let i = 0; i < Update_Res.Trackdatalist.length; i++) {
      var delete_Res = await this.delete_fromDB_Forupdate(
        Update_Res.Trackdatalist[i].PackageinfoMasterInfo.MasterTrackingNumber,
      );

      call_DB.insertData_PackageInfoMasterInfo(
        Update_Res.Trackdatalist[i].PackageinfoMasterInfo,
      );

      for (
        let j = 0;
        j < Update_Res.Trackdatalist[i].PackageInfoList.length;
        j++
      ) {
        call_DB.insertData_PackageInfoList(
          Update_Res.Trackdatalist[i].PackageInfoList[j],
        );
      }

      for (
        let k = 0;
        k < Update_Res.Trackdatalist[i].TimeinTransitInfoList.length;
        k++
      ) {
        call_DB.insertData_TimeinTransitInfoList(
          Update_Res.Trackdatalist[i].TimeinTransitInfoList[k],
        );
      }
    }
    AsyncStorage.setItem('RecInBackground', 'false');
    AsyncStorage.setItem('TrackingNumberList', '');
    this.get_DB_Data();
  }

  async BackgroundNotifyHandle(Ca, Cap, TNum) {
    this.setState({
      loaderFlag: true,
      enteredTNumber: TNum,
      Carrier_Value: Ca,
      enteredCaption: Cap,
      SelectedTNumber: TNum,
    });
    // var a = await this.Onclick_Delete2();
  }

  async get_DB_Data() {
    var Res = await call_DB.getData_DashboardData();
    console.log(Res);
    this.setState({
      loaderFlag: false,
      setFilteredDataSource: Res,
      setMasterDataSource: Res,
    });
  }

  handleVisibility = visibility => {
    this.setState({
      visibility,
    });
  };

  async Onclick_Search() {
    var checkNet;
    await NetInfo.fetch().then(state => {
      checkNet = state.isConnected;
    });
    if (checkNet == true) {
      if (this.state.enteredTNumber == '') {
        Alert.alert('Alert', 'Please Enter Tracking Number', [{text: 'OK'}]);
      } else {
        if (this.state.Carrier_Value == 'Select Carrier') {
          Alert.alert('Alert', 'Please Select Carrier', [{text: 'OK'}]);
        } else {
          var Res = await call_DB.Search_TrackingNumber(
            this.state.enteredTNumber,
          );
          if (Res[0].count == 1) {
            Alert.alert('Alert', 'Tracking Number Already Added', [
              {text: 'OK'},
            ]);
          } else {
            this.setState({
              showAddModal: false,
              flag3: true,
            });
            var a = await Server_function.get_Package(
              this.state.enteredTNumber,
              this.state.Carrier_Value,
              this.state.enteredCaption,
            );
            this.setState({
              loaderFlag: false,
              flag3: false,
              Flag: '',
              setFilteredDataSource: [],
              setMasterDataSource: [],
            });
            if (a.ResponseStatus == 'Success') {
              call_DB.insertData_PackageInfoMasterInfo(a.PackageinfoMasterInfo);

              for (let i = 0; i < a.PackageInfoList.length; i++) {
                call_DB.insertData_PackageInfoList(a.PackageInfoList[i]);
              }

              for (let i = 0; i < a.TimeinTransitInfoList.length; i++) {
                call_DB.insertData_TimeinTransitInfoList(
                  a.TimeinTransitInfoList[i],
                );
              }
              this.get_DB_Data();
            } else {
              Alert.alert(
                'Alert',
                'Package information not yet available by carrier or entered package information is not valid.',
                [{text: 'OK'}],
              );
              this.get_DB_Data();
            }
          }
        }
      }
    } else {
      Alert.alert('Alert', 'No Internet Connection Found', [{text: 'OK'}]);
    }
  }

  OnClick_CarrierField() {
    if (this.state.showCarrier_DropDown == true) {
      this.setState({
        showCarrier_DropDown: false,
      });
    } else {
      this.setState({
        showCarrier_DropDown: true,
      });
    }
  }

  async searchCarrier(a) {
    var Carrier = await callGlobal_Func.get_Carrier(a);
    this.setState({
      Carrier_Value: Carrier,
      enteredTNumber: a,
    });
  }

  getDateDifference(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var dateStr = strSplitDate[0];
    var timeStr = strSplitDate[1];
    var Year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var date = dateStr.slice(6, 8);

    var hours = timeStr.slice(0, 2);
    var min = timeStr.slice(2, 4);
    var sec = timeStr.slice(4, 6);
    var date1 = new Date(month + '/' + date + '/' + Year);
    var date2 = new Date();
    var Difference_In_Time = date2 - date1;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }

  flatList_Render(item) {
    let delivered_by = '';
    let show_Image;
    if (item.EstimatedDelivery == '') {
      if (
        (item.Carrier == 'UPS' && item.StatusType == 'D') ||
        item.StatusDescription == 'Delivered'
      ) {
        show_Image = 'ShowTick';
        if (item.SignedForByName != '') {
          delivered_by = 'Signed By: ' + item.SignedForByName;
        } else {
          delivered_by = '';
        }
      } else if (item.Carrier == 'FedEx' && item.StatusCode == 'DL') {
        show_Image = 'ShowTick';
        if (item.SignedForByName != '') {
          delivered_by = 'Signed By: ' + item.SignedForByName;
        } else {
          delivered_by = '';
        }
      } else if (
        item.Carrier == 'UPS' &&
        item.StatusDescription == 'Out For Delivery'
      ) {
        show_Image = 'ShowVan';
        delivered_by = '';
      } else if (item.Carrier == 'FedEx' && item.StatusCode == 'OD') {
        show_Image = 'ShowVan';
        delivered_by = '';
      } else {
        show_Image = 'ShowVan';
        delivered_by = '';
      }

      return (
        <TouchableOpacity
          style={styles.View7}
          activeOpacity={0.5}
          onPress={() =>
            this.props.navigation.navigate('Detail_Screen', {
              stNumber: item.MasterTrackingNumber,
            })
          }>
          <View style={styles.View9}>{this.renderImage(show_Image, '')}</View>
          <View style={styles.View10}>
            <View style={styles.View19}>
              {item.Pkgs > 1 ? (
                <View style={styles.View20}>
                  <Text style={styles.Text11}>1 of {item.Pkgs}</Text>
                </View>
              ) : null}

              <Text style={styles.Text2} numberOfLines={1}>
                {item.Caption}
              </Text>
            </View>

            <Text style={styles.Text3} numberOfLines={1}>
              {item.StatusDescription}
            </Text>
            <Text style={styles.Text4} numberOfLines={1}>
              {delivered_by}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.View11}
            activeOpacity={0.5}
            onPress={() => {
              this.setState({
                visibility: true,
                Flag: '',
                SelectedTNumber: item.MasterTrackingNumber,
                SelectedCarrier: item.Carrier,
                SelectedCaption: item.Caption,
                SelectedDescription: item.StatusDescription,
                updateEnteredCaption: item.Caption,
                IDIdentifier: item.IDIdentifier,
              });
            }}>
            <Image
              style={{
                width: isTablet ? '50%' : '60%',
                height: isTablet ? '50%' : '60%',
                resizeMode: 'contain',
              }}
              source={require('../../utils/assets/Three_Dots.png')}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else {
      var strSplitDate = String(item.EstimatedDelivery).split(' ');
      var dateStr = strSplitDate[0];
      var timeStr = strSplitDate[1];
      var Year = dateStr.slice(0, 4);
      var month = dateStr.slice(4, 6);
      var date = dateStr.slice(6, 8);

      var hours = timeStr.slice(0, 2);
      var min = timeStr.slice(2, 4);
      var sec = timeStr.slice(4, 6);

      let Difference = Math.floor(
        this.getDateDifference(item.EstimatedDelivery),
      );
      var date12 = new Date(Year + '/' + month + '/' + date).getDate();
      var currentmonth =
        monthNames[new Date(Year + '/' + month + '/' + date).getMonth()];
      var currentDay = days[new Date(Year + '/' + month + '/' + date).getDay()];

      if (
        (item.Carrier == 'UPS' && item.StatusCode == 'D') ||
        item.StatusDescription == 'Delivered'
      ) {
        show_Image = 'ShowTick';
        if (item.SignedForByName != '') {
          delivered_by = 'Signed By: ' + item.SignedForByName;
        } else {
          delivered_by = '';
        }
      } else if (item.Carrier == 'FedEx' && item.StatusCode == 'DL') {
        show_Image = 'ShowTick';
        if (item.SignedForByName != '') {
          delivered_by = 'Signed By: ' + item.SignedForByName;
        } else {
          delivered_by = '';
        }
      } else if (
        item.Carrier == 'UPS' &&
        item.StatusDescription == 'Out For Delivery'
      ) {
        show_Image = 'ShowVan';
        delivered_by = '';
      } else if (item.Carrier == 'FedEx' && item.StatusCode == 'OD') {
        show_Image = 'ShowVan';
        delivered_by = '';
      } else {
        if (Difference == 0) {
          show_Image = 'ShowVan';
          if (hours + '' + hours + '' + sec == '000000') {
            delivered_by = 'Delivered By: Today' + ' end of day';
          } else {
            if (hours == '' && min == '' && sec == '') {
              delivered_by = 'Delivered By: Today ';
            } else {
              delivered_by =
                'Delivered By: Today ' +
                new Date(
                  Year +
                    '/' +
                    month +
                    '/' +
                    date +
                    ' ' +
                    hours +
                    ':' +
                    min +
                    ':' +
                    sec,
                )
                  .toLocaleTimeString()
                  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
            }
          }
        } else if (Difference == -1) {
          show_Image = 'ShowCount';
          if (hours + '' + hours + '' + sec == '000000') {
            delivered_by = 'Delivered By: Tomorrow' + ' end of day';
          } else {
            if (hours == '' && min == '' && sec == '') {
              delivered_by = 'Delivered By: Tomorrow ';
            } else {
              delivered_by =
                'Delivered By: Tomorrow ' +
                new Date(
                  Year +
                    '/' +
                    month +
                    '/' +
                    date +
                    ' ' +
                    hours +
                    ':' +
                    min +
                    ':' +
                    sec,
                )
                  .toLocaleTimeString()
                  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
            }
          }
        } else {
          show_Image = 'ShowCount';

          if (hours + '' + hours + '' + sec == '000000') {
            delivered_by =
              'Delivered By: ' +
              currentDay +
              ' ' +
              currentmonth +
              ' ' +
              date +
              ' end of day';
          } else {
            if (hours + '' + hours + '' + sec == '000000') {
              delivered_by =
                'Delivered By: ' + currentDay + ' ' + currentmonth + ' ' + date;
            } else {
              delivered_by =
                'Delivered By: ' +
                currentDay +
                ' ' +
                currentmonth +
                ' ' +
                date +
                ' ' +
                new Date(
                  Year +
                    '/' +
                    month +
                    '/' +
                    date +
                    ' ' +
                    hours +
                    ':' +
                    min +
                    ':' +
                    sec,
                )
                  .toLocaleTimeString()
                  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
            }
          }
        }
      }

      return (
        <TouchableOpacity
          style={styles.View7}
          activeOpacity={0.5}
          onPress={() =>
            this.props.navigation.navigate('Detail_Screen', {
              stNumber: item.MasterTrackingNumber,
            })
          }>
          <View style={styles.View9}>
            {this.renderImage(show_Image, Difference)}
          </View>
          <View style={styles.View10}>
            <View style={styles.View19}>
              {item.Pkgs > 1 ? (
                <View style={styles.View20}>
                  <Text style={styles.Text11}>1 of {item.Pkgs}</Text>
                </View>
              ) : null}

              <Text style={styles.Text2} numberOfLines={1}>
                {item.Caption}
              </Text>
            </View>

            <Text style={styles.Text3} numberOfLines={1}>
              {item.StatusDescription}
            </Text>
            <Text style={styles.Text4} numberOfLines={1}>
              {delivered_by}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.View11}
            activeOpacity={0.5}
            onPress={() => {
              this.setState({
                visibility: true,
                Flag: '',
                SelectedTNumber: item.MasterTrackingNumber,
                SelectedCarrier: item.Carrier,
                SelectedCaption: item.Caption,
                SelectedDescription: item.StatusDescription,
                updateEnteredCaption: item.Caption,
                IDIdentifier: item.IDIdentifier,
              });
            }}>
            <Image
              style={{
                width: isTablet ? '50%' : '60%',
                height: isTablet ? '50%' : '60%',
                resizeMode: 'contain',
              }}
              source={require('../../utils/assets/Three_Dots.png')}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  }

  renderImage(show_Image, Difference) {
    if (show_Image == 'ShowTick') {
      return (
        <Image
          style={{
            width: isTablet ? wp(8) : wp(11),
            height: isTablet ? wp(8) : wp(11),
            resizeMode: 'contain',
            tintColor: '#11B7E5',
          }}
          source={require('../../utils/assets/Check.png')}
        />
      );
    } else if (show_Image == 'ShowVan') {
      return (
        <Image
          style={{
            width: isTablet ? wp(8) : wp(11),
            height: isTablet ? wp(8) : wp(11),
            resizeMode: 'contain',
            tintColor: '#11B7E5',
          }}
          source={require('../../utils/assets/delivery.png')}
        />
      );
    } else if (show_Image == 'ShowCount') {
      return (
        <View>
          <Text style={styles.Text10}>
            {Difference.toString().substring(1)}
          </Text>
        </View>
      );
    }
  }

  searchFilterFunction(text) {
    if (text) {
      const newData = this.state.setMasterDataSource.filter(function (item) {
        const itemData = item.MasterTrackingNumber
          ? item.MasterTrackingNumber.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        setFilteredDataSource: newData,
      });
    } else {
      this.setState({
        setFilteredDataSource: this.state.setMasterDataSource,
      });
    }
  }

  async Onclick_Delete() {
    var checkNet;
    await NetInfo.fetch().then(state => {
      checkNet = state.isConnected;
    });
    if (checkNet == true) {
      this.setState({
        visibility: false,
        Flag: 'delete',
      });
      var a = await Server_function.delete_Package(this.state.SelectedTNumber);
      this.setState({
        loaderFlag: false,
      });
      if (a.message == 'Deleted') {
        this.delete_fromDB();
      } else {
        Alert.alert('Alert', 'Something Went Wrong', [{text: 'OK'}]);
      }
    } else {
      Alert.alert('Alert', 'No Internet Connection Found', [{text: 'OK'}]);
    }
  }

  async delete_fromDB() {
    var R1 = await call_DB.delete_TimeinTransitInfoList(
      this.state.SelectedTNumber,
    );
    var R2 = await call_DB.Delete_PackageInfoMasterInfo(
      this.state.SelectedTNumber,
    );
    var R3 = await call_DB.Delete_PackageActivityInfoMaster(
      this.state.SelectedTNumber,
    );
    var R4 = await call_DB.Delete_PackageActivityInfoList(
      this.state.SelectedTNumber,
    );
    var R5 = await call_DB.Delete_PackageInfoList(this.state.SelectedTNumber);
    this.setState({
      visibility: false,
      SelectedTNumber: '',
      loaderFlag: false,
    });
    var a = await this.get_DB_Data();
  }

  async Onclick_Share() {
    try {
      const result = await Share.share({
        message:
          this.state.SelectedCaption +
          '\n' +
          this.state.SelectedTNumber +
          ' (' +
          this.state.SelectedCarrier +
          ').' +
          this.state.SelectedDescription +
          '\n' +
          'Your parcel link:' +
          '\n' +
          'https://kaizeninc.us/ParcelGenie/Track.html/?id=' +
          this.state.IDIdentifier,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          this.setState({
            visibility: false,
          });
          // shared with activity type of result.activityType
        } else {
          // shared
          this.setState({
            visibility: false,
          });
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async onClick_ConfirmEdit() {
    var checkNet;
    await NetInfo.fetch().then(state => {
      checkNet = state.isConnected;
    });
    if (checkNet == true) {
      if (
        this.state.updateEnteredCaption == '' ||
        this.state.updateEnteredCaption == undefined
      ) {
        Alert.alert('Alert', 'Please Enter Caption To Update', [{text: 'OK'}]);
      } else {
        this.setState({
          editCaptionFlag: false,
          flag2: true,
        });
        var a = await Server_function.edit_Caption(
          this.state.updateEnteredCaption,
          this.state.SelectedTNumber,
        );
        this.setState({
          Flag: '',
          loaderFlag: false,
          flag2: false,
        });
        if (a.message == 'Updated') {
          this.update_CaptionFromDB();
        } else {
          Alert.alert('Alert', 'error occurs', [{text: 'OK'}]);
        }
      }
    } else {
      Alert.alert('Alert', 'No Internet Connection Found', [{text: 'OK'}]);
    }
  }

  async update_CaptionFromDB() {
    var Res = await call_DB.Update_Caption(
      this.state.SelectedTNumber,
      this.state.updateEnteredCaption,
    );
    this.setState({
      SelectedTNumber: '',
      updateEnteredCaption: '',
    });
    this.get_DB_Data();
  }

  loaderFlag_func() {
    if (this.state.Flag == 'edit') {
      this.setState({
        editCaptionFlag: true,
      });
    } else if (this.state.Flag == 'delete') {
      this.setState({
        loaderFlag: true,
      });
    }
  }

  loaderFlag_func1() {
    if (this.state.flag2 == true) {
      this.setState({
        loaderFlag: true,
      });
    }
  }

  loaderFlag_func2() {
    global.scannedBarCode = undefined;
    this.setState({
      scannedBarCodeValue: '',
      enteredTNumber: '',
    });
    if (this.state.flag3 == true) {
      this.setState({
        loaderFlag: true,
      });
    }
  }

  async Onclick_Delete2() {
    var checkNet;
    await NetInfo.fetch().then(state => {
      checkNet = state.isConnected;
    });
    if (checkNet == true) {
      this.setState({
        // visibility: false,
        Flag: 'delete',
      });
      var a = await Server_function.delete_Package(this.state.SelectedTNumber);
      if (a.message == 'Deleted') {
        this.delete_fromDB2();
      } else {
        Alert.alert('Alert', 'Something Went Wrong', [{text: 'OK'}]);
      }
    } else {
      Alert.alert('Alert', 'No Internet Connection Found', [{text: 'OK'}]);
    }
  }

  async delete_fromDB2() {
    var R1 = await call_DB.delete_TimeinTransitInfoList(
      this.state.SelectedTNumber,
    );
    var R2 = await call_DB.Delete_PackageInfoMasterInfo(
      this.state.SelectedTNumber,
    );
    var R3 = await call_DB.Delete_PackageActivityInfoMaster(
      this.state.SelectedTNumber,
    );
    var R4 = await call_DB.Delete_PackageActivityInfoList(
      this.state.SelectedTNumber,
    );
    var R5 = await call_DB.Delete_PackageInfoList(this.state.SelectedTNumber);
    this.setState({
      // visibility: false,
      SelectedTNumber: '',
    });
    this.Onclick_Search();
  }

  async delete_fromDB_Forupdate(MTN) {
    var R1 = await call_DB.delete_TimeinTransitInfoList(MTN);
    var R2 = await call_DB.Delete_PackageInfoMasterInfo(MTN);
    var R3 = await call_DB.Delete_PackageActivityInfoMaster(MTN);
    var R4 = await call_DB.Delete_PackageActivityInfoList(MTN);
    var R5 = await call_DB.Delete_PackageInfoList(MTN);
  }

  onBarCodeRead = e => {
    var p_Carrier;
    var x = e.data;
    var Check_1Z = x.substring(0, 2);
    var check_Alpha = x.substring(0, 1);
    var Check_Length = x.length;
    var temp = e.data;

    if (Check_1Z == '1Z' || Check_1Z == '1z') {
      p_Carrier = 'UPS';
      temp = e.data;
    } else if (isNaN(check_Alpha) == true && Check_Length == 11) {
      p_Carrier = 'UPS';
      temp = e.data;
    } else if (Check_Length == 9 && isNaN(Check_Length) == false) {
      p_Carrier = 'UPS';
      temp = e.data;
    } else if (Check_Length == 16 && isNaN(Check_Length) == false) {
      p_Carrier = 'UPS';
      temp = e.data;
    } else if (
      Check_Length == 12 ||
      Check_Length == 15 ||
      Check_Length > 20 ||
      (Check_Length == 20 && isNaN(Check_Length) == false)
    ) {
      var a = e.data;
      temp = a.substring(a.length - 12);
      p_Carrier = 'FedEx';
    } else {
      temp = e.data;
      p_Carrier = 'Select Carrier';
    }

    this.setState({
      showCameraFlag: false,
      Carrier_Value: p_Carrier,
      scannedBarCodeValue: temp,
      enteredTNumber: temp,
      showAddModal: true,
    });
  };

  render() {
    return (
      <>
        {this.state.loaderFlag ? <Loader /> : null}

        {this.state.showCameraFlag ? (
          <View style={styles.container}>
            <RNCamera
              autoFocus={RNCamera.Constants.AutoFocus.on}
              style={styles.preview}
              onBarCodeRead={this.onBarCodeRead}
              ref={cam => (this.camera = cam)}
              aspect={1}>
              <TouchableOpacity
                style={styles.View21}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({showCameraFlag: false});
                }}>
                <Image
                  style={{
                    width: wp('8%'),
                    height: wp('8%'),
                    resizeMode: 'contain',
                  }}
                  source={require('../../utils/assets/cancel.png')}
                />
              </TouchableOpacity>
            </RNCamera>
          </View>
        ) : (
          <>
            {/* Navigation bar  */}
            <NavBar detail={{flag: true, nav: this.props.navigation}} />
            {/*  */}
            {/* Screen Detail  */}
            <View style={styles.View2}>
              <View style={styles.View3}>
                <View style={styles.View5}>
                  <Image
                    style={{
                      width: '45%',
                      height: '45%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/magnifying_glass.png')}
                  />
                </View>
                <View style={styles.View6}>
                  <TextInput
                    style={styles.Input_field2}
                    placeholder="Search.."
                    placeholderTextColor="#A3A3A3"
                    onChangeText={text => this.searchFilterFunction(text)}
                    onClear={text => searchFilterFunction('')}
                  />
                </View>
              </View>
              <View style={styles.View3_3}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.View4}
                  onPress={() => {
                    this.setState({
                      showAddModal: true,
                      enteredCaption: '',
                      enteredTNumber: '',
                      Carrier_Value: 'Select Carrier',
                      showCarrier_DropDown: false,
                    });
                  }}>
                  <Image
                    style={{
                      width: '45%',
                      height: '45%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/add.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.View4}
                  onPress={() => {
                    this.setState({
                      showCameraFlag: true,
                      enteredCaption: '',
                      enteredTNumber: '',
                      Carrier_Value: 'Select Carrier',
                      showCarrier_DropDown: false,
                    });
                  }}>
                  <Image
                    style={{
                      width: '45%',
                      height: '45%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../utils/assets/cameraLogo.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {(() => {
              if (this.state.setFilteredDataSource.length == 0) {
                return (
                  <View style={styles.View8_8}>
                    <Nodata detail={{alertText: 'No data found'}} />
                  </View>
                );
              } else {
                return (
                  <View style={styles.View8}>
                    <FlatList
                      data={this.state.setFilteredDataSource}
                      renderItem={({item}) => this.flatList_Render(item)}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                );
              }
            })()}
          </>
        )}
        {/*  */}

        {/* Edit caption modal */}
        <Modal
          isVisible={this.state.editCaptionFlag}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({
              editCaptionFlag: false,
              Flag: '',
            });
          }}
          onBackButtonPress={() => {
            this.setState({
              editCaptionFlag: false,
              Flag: '',
            });
          }}
          onModalHide={() => {
            this.loaderFlag_func1();
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              // height: hp('55%'),
              width: wp('80%'),
              backgroundColor: 'white',
              borderRadius: 15,
              paddingBottom: wp('10'),
            }}>
            <View style={styles.View13}>
              <TouchableOpacity
                style={styles.View14}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({editCaptionFlag: false, Flag: ''});
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

            <Text style={styles.Text12} selectable>
              {this.state.SelectedTNumber}
            </Text>

            <View style={styles.View15}>
              <Text style={styles.Text7}>Caption</Text>
              <TextInput
                style={styles.Input_field1}
                placeholder="Enter caption"
                placeholderTextColor="#A3A3A3"
                defaultValue={this.state.updateEnteredCaption}
                onChangeText={text =>
                  this.setState({updateEnteredCaption: text})
                }
              />
            </View>
            <TouchableOpacity
              style={styles.Btn2}
              activeOpacity={0.5}
              onPress={() => {
                this.onClick_ConfirmEdit();
              }}>
              <LinearGradient
                colors={['#0BB5E5', '#20C8F8']}
                style={styles.Btn1}>
                <Text style={styles.Text6}>CONFIRM</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Add tracking Number Modal */}
        <Modal
          isVisible={this.state.showAddModal}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({showAddModal: false});
          }}
          onBackButtonPress={() => {
            this.setState({showAddModal: false});
          }}
          onModalHide={() => {
            this.loaderFlag_func2();
            // this.setState({loaderFlag: true});
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: wp('80%'),
              backgroundColor: 'white',
              borderRadius: wp(2),
              paddingBottom: wp('10'),
            }}>
            <View style={styles.View13}>
              <TouchableOpacity
                style={styles.View14}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({showAddModal: false});
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
            <View style={styles.View15}>
              <Text style={styles.Text7}>
                <Text style={styles.Text13}>* </Text>Tracking Number
              </Text>
              <TextInput
                defaultValue={this.state.scannedBarCodeValue}
                style={styles.Input_field1}
                placeholder="Enter tracking number"
                placeholderTextColor="#A3A3A3"
                onChangeText={text => this.searchCarrier(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.View15}
              activeOpacity={0.5}
              onPress={() => this.OnClick_CarrierField()}>
              <Text style={styles.Text7}>
                <Text style={styles.Text13}>* </Text>Carrier
              </Text>
              <View style={styles.View18}>
                <Text style={styles.Text9}>{this.state.Carrier_Value}</Text>
                <Image
                  style={{
                    width: wp('3'),
                    height: wp('3'),
                    resizeMode: 'contain',
                    position: 'absolute',
                    right: 10,
                  }}
                  source={require('../../utils/assets/dropdown.png')}
                />
              </View>
              {this.state.showCarrier_DropDown ? (
                <View style={styles.View16}>
                  <FlatList
                    data={[{name: 'UPS'}, {name: 'FedEx'}]}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.View17}
                        activeOpacity={0.5}
                        onPress={() => {
                          this.setState({
                            Carrier_Value: item.name,
                            showCarrier_DropDown: false,
                          });
                        }}>
                        <Text style={styles.Text8}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              ) : (
                <></>
              )}
            </TouchableOpacity>

            <View style={styles.View15}>
              <Text style={styles.Text7}>Caption</Text>
              <TextInput
                style={styles.Input_field1}
                placeholder="Enter caption"
                placeholderTextColor="#A3A3A3"
                onChangeText={text => this.setState({enteredCaption: text})}
              />
            </View>
            <TouchableOpacity
              style={styles.Btn2}
              activeOpacity={0.5}
              onPress={() => this.Onclick_Search()}>
              <LinearGradient
                colors={['#0BB5E5', '#20C8F8']}
                style={styles.Btn1}>
                <Text style={styles.Text6}>ADD</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Bottom action sheet */}
        <Modal
          isVisible={this.state.visibility}
          animationOutTiming={1}
          animationInTiming={1}
          backdropOpacity={0.7}
          onBackdropPress={() => {
            this.setState({visibility: false, SelectedTNumber: ''});
          }}
          onBackButtonPress={() => {
            this.setState({visibility: false, SelectedTNumber: ''});
          }}
          onModalHide={() => {
            this.loaderFlag_func();
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
              style={styles.View12}
              activeOpacity={0.5}
              onPress={() => {
                {
                  this.setState({
                    visibility: false,
                    Flag: 'edit',
                  });
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
              <Text style={styles.Text5}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.View12}
              activeOpacity={0.5}
              onPress={() => this.Onclick_Share()}>
              <Image
                style={{
                  width: wp('4.5%'),
                  height: wp('4.5%'),
                  resizeMode: 'contain',
                  marginRight: wp(2),
                }}
                source={require('../../utils/assets/share.png')}
              />
              <Text style={styles.Text5}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.View12}
              activeOpacity={0.5}
              onPress={() => this.Onclick_Delete()}>
              <Image
                style={{
                  width: wp('4.5%'),
                  height: wp('4.5%'),
                  resizeMode: 'contain',
                  marginRight: wp(2),
                }}
                source={require('../../utils/assets/trash.png')}
              />
              <Text style={styles.Text5}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/*  */}
      </>
    );
  }
}
