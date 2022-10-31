/** @format */

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  LogBox,
  ScrollView,
} from 'react-native';
import styles from './style';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
const {width, height} = Dimensions.get('window');
import call_DB from '../../global/db_functions';
import Loader from '../../containers/Loader';
import NavBar from '../../containers/NavBar';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

LogBox.ignoreAllLogs(); //Ignore all log notifications
let flatListColors = ['#F8F8F8', '#FFFFFF'];
var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderFlag: false,
      listFlag: false,
      pCaption: '',
      pCarrier: '',
      count_Tnumber: '',
      Delivered_By: '',
      Delivered_day: '',
      pageNumber: 1,
      place_Coordinate: [],
      markers: [],
      trackingNumber: [],
      showLessList: [],
      showFullList: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getTNumber();
    });
  }

  async get_DB_Data(tNumber) {
    this.setState({
      loaderFlag: true,
    });
    var Res_DB = await call_DB.getData_DetailData(tNumber);
    // console.log(Res_DB)

    var Res2 = Res_DB.sort(
      (a, b) =>
        this.get_convertedDate(b.ActivityDate) -
        this.get_convertedDate(a.ActivityDate),
    );

    var temp2 = [];
    for (let i = 0; i < Res2.length; i++) {
      console.log(Res2[i]);
      if (Res2[i].StatusDescription == 'Delivered') {
        if (
          Number(Res2[i].Latitude) != 0 &&
          Number(Res2[i].Longitude != 0) &&
          Res2[i].City != ''
        ) {
          console.log(Res2[i].Latitude);
          console.log(Res2[i].Longitude);
          var cData = {
            latitude: Number(Res2[i].Latitude),
            longitude: Number(Res2[i].Longitude),
            markerTag: 'E',
          };
        }
      } else if (i == Res2.length - 1) {
        let a = Res2.length - 1;

        for (let j = a; j > 0; j--) {
          console.log(j);
          if (
            Number(Res2[j].Latitude) != 0 &&
            Number(Res2[j].Longitude != 0) &&
            Res2[j].City != ''
          ) {
            console.log(Res2[j].Latitude);
            console.log(Res2[j].Longitude);
            var cData = {
              latitude: Number(Res2[j].Latitude),
              longitude: Number(Res2[j].Longitude),
              markerTag: 'S',
            };
            break;
          }
        }
      } else {
        if (
          Number(Res2[i].Latitude) != 0 &&
          Number(Res2[i].Longitude != 0) &&
          Res2[i].City != ''
        ) {
          var cData = {
            latitude: Number(Res2[i].Latitude),
            longitude: Number(Res2[i].Longitude),
            markerTag: '',
          };
        }
      }

      temp2.push(cData);
      // }
    }
    this.setState({
      markers: temp2,
    });

    this.mapRef.fitToCoordinates(temp2, {
      edgePadding: {top: 30, right: 30, bottom: 30, left: 30},
      animated: true,
    });

    if (this.state.listFlag == false) {
      var temp = [];
      if (Res2.length < 4) {
        for (let i = 0; i < Res2.length; i++) {
          temp.push(Res2[i]);
        }
      } else {
        for (let i = 0; i < 4; i++) {
          temp.push(Res2[i]);
        }
      }
      this.setState({
        showLessList: temp,
      });
    } else {
      this.setState({
        showLessList: Res2,
      });
    }

    if (
      (Res2[0].Carrier == 'UPS' && Res2[0].LastStatusCode == 'D') ||
      Res2[0].LastStatusDescription == 'Delivered'
    ) {
      this.setState({
        Delivered_day: 'Status: Delivered',
      });
      if (Res2[0].DeliveryDate == '') {
        this.setState({
          Delivered_By: '',
        });
      } else {
        if (Res2[0].DlDate == '') {
          let Difference = Math.floor(
            this.getDateDifference1(
              Res2[0].LastActivityDate,
              Res2[0].DeliveryDate,
            ),
          );
          if (Difference > 0) {
            this.setState({
              Delivered_By: '| ON TIME',
            });
          } else {
            this.setState({
              Delivered_By: '| LATE',
            });
          }
        } else {
          let Difference = Math.floor(
            this.getDateDifference1(Res2[0].DlDate, Res2[0].DeliveryDate),
          );
          if (Difference > 0) {
            this.setState({
              Delivered_By: '| ON TIME',
            });
          } else {
            this.setState({
              Delivered_By: '| LATE',
            });
          }
        }
      }
    } else if (
      (Res2[0].Carrier == 'FedEx' && Res2[0].LastStatusCode == 'DL') ||
      Res2[0].LastStatusDescription == 'Delivered'
    ) {
      this.setState({
        Delivered_day: 'Status: Delivered',
      });
      if (Res2[0].DeliveryDate == '') {
        this.setState({
          Delivered_By: '',
        });
      } else {
        if (Res2[0].DlDate == '') {
          let Difference = Math.floor(
            this.getDateDifference1(
              Res2[0].LastActivityDate,
              Res2[0].DeliveryDate,
            ),
          );
          if (Difference > 0) {
            this.setState({
              Delivered_By: '| ON TIME',
            });
          } else {
            this.setState({
              Delivered_By: '| LATE',
            });
          }
        } else {
          let Difference = Math.floor(
            this.getDateDifference1(Res2[0].DlDate, Res2[0].DeliveryDate),
          );
          if (Difference > 0) {
            this.setState({
              Delivered_By: '| ON TIME',
            });
          } else {
            this.setState({
              Delivered_By: '| LATE',
            });
          }
        }
      }
    } else if (
      (Res2[0].Carrier == 'FedEx' && Res2[0].LastStatusCode != 'DL') ||
      Res2[0].LastStatusDescription != 'Delivered'
    ) {
      if (Res2[0].DeliveryDate == '') {
        this.setState({
          Delivered_day: 'Status: ' + Res2[0].LastStatusDescription,
          Delivered_By: '',
        });
      } else {
        let Difference = Math.floor(
          this.getDateDifference3(Res2[0].DeliveryDate),
        );
        if (Difference > 0) {
          this.setState({
            Delivered_day: 'Status: ' + Res2[0].LastStatusDescription,
            Delivered_By: '| LATE',
          });
        } else {
          this.setState({
            Delivered_day: 'Status: ' + Res2[0].LastStatusDescription,
            Delivered_By: '| ON TIME',
          });
        }
      }
    } else if (
      (Res2[0].Carrier == 'UPS' && Res2[0].LastStatusCode != 'D') ||
      Res2[0].LastStatusDescription != 'Delivered'
    ) {
      if (Res2[0].DeliveryDate == '') {
        this.setState({
          Delivered_day: 'Status: ' + Res2[0].LastStatusDescription,
          Delivered_By: '',
        });
      } else {
        let Difference = Math.floor(
          this.getDateDifference3(Res2[0].DeliveryDate),
        );
        if (Difference > 0) {
          this.setState({
            Delivered_day: 'Status: ' + Res2[0].LastStatusDescription,
            Delivered_By: '| LATE',
          });
        } else {
          this.setState({
            Delivered_day: 'Status: ' + Res2[0].LastStatusDescription,
            Delivered_By: '| ON TIME',
          });
        }
      }
    }

    this.setState({
      showFullList: Res2,
      pCaption: Res2[0].Caption,
      pCarrier: Res2[0].Carrier,
    });
    this.setState({
      loaderFlag: false,
    });
  }

  get_convertedDate(strDate1) {
    var strSplitDate1 = String(strDate1).split(' ');
    var dateStr = strSplitDate1[0];
    var timeStr = strSplitDate1[1];

    var Year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var date = dateStr.slice(6, 8);

    var hours = timeStr.slice(0, 2);
    var min = timeStr.slice(2, 4);
    var sec = timeStr.slice(4, 6);

    return new Date(
      month + '/' + date + '/' + Year + ' ' + hours + ':' + min + ':' + sec,
    );
  }

  async getTNumber() {
    var num = this.props.route.params.stNumber;
    var Res1 = await call_DB.getData_TrackingNumbers(num);
    this.get_DB_Data(Res1[0].TrackingNumber);
    this.setState({
      count_Tnumber: Res1.length,
      trackingNumber: Res1,
    });
  }

  onScrollEnd = e => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    this.setState({
      pageNumber: pageNum + 1,
    });
    this.get_DB_Data(this.state.trackingNumber[pageNum].TrackingNumber);
  };

  getDateDifference1(strDate1, strDate2) {
    var strSplitDate1 = String(strDate1).split(' ');
    var dateStr = strSplitDate1[0];
    var Year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var date = dateStr.slice(6, 8);

    var strSplitDate2 = String(strDate2).split(' ');
    var dateStr2 = strSplitDate2[0];
    var Year2 = dateStr2.slice(0, 4);
    var month2 = dateStr2.slice(4, 6);

    var date2 = dateStr2.slice(6, 8);
    var date1 = new Date(month + '/' + date + '/' + Year);
    var date2 = new Date(month2 + '/' + date2 + '/' + Year2);
    var Difference_In_Time = date2 - date1;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
  }

  getDateDifference3(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var dateStr = strSplitDate[0];
    var Year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var date = dateStr.slice(6, 8);

    var date1 = new Date(month + '/' + date + '/' + Year);
    var date2 = new Date();
    var Difference_In_Time = date2 - date1;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    var currentDay = days[new Date(Year + '/' + month + '/' + date).getDay()];
    this.setState({
      Delivered_day: 'Delivered By: ' + currentDay,
    });

    return Difference_In_Days;
  }

  getDateDifference(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var dateStr = strSplitDate[0];
    var timeStr = strSplitDate[1];
    var Year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var date = dateStr.slice(6, 8);

    var date1 = new Date(month + '/' + date + '/' + Year);
    var date2 = new Date();
    var Difference_In_Time = date2 - date1;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  }

  flatList_Render(act_DataTime) {
    var Temp = '';

    var strSplitDate = String(act_DataTime).split(' ');
    var dateStr = strSplitDate[0];
    var Year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var date = dateStr.slice(6, 8);

    let Difference = Math.floor(this.getDateDifference(act_DataTime));
    var currentmonth =
      monthNames[new Date(Year + '/' + month + '/' + date).getMonth()];

    if (Difference == 0) {
      Temp = 'Today';
    } else if (Difference == 1) {
      Temp = 'Yesterday';
    } else {
      Temp = currentmonth + ' ' + date;
    }

    return (
      <Text style={styles.Text3} numberOfLines={1}>
        {Temp}
      </Text>
    );
  }

  MoreBtn() {
    if (this.state.listFlag == false) {
      return (
        <TouchableOpacity onPress={() => this.onClickMoreBtn('More')}>
          <Text style={styles.Text7}>SHOW MORE</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.onClickMoreBtn('Less')}>
          <Text style={styles.Text7}>SHOW LESS</Text>
        </TouchableOpacity>
      );
    }
  }

  onClickMoreBtn(temp) {
    if (temp == 'More') {
      this.setState({
        showLessList: this.state.showFullList,
        listFlag: true,
      });
    } else {
      var temp1 = [];
      if (this.state.showFullList.length < 4) {
        for (let i = 0; i < this.state.showFullList.length; i++) {
          temp1.push(this.state.showFullList[i]);
        }
      } else {
        for (let i = 0; i < 4; i++) {
          temp1.push(this.state.showFullList[i]);
        }
      }

      this.setState({
        showLessList: temp1,
      });
      this.setState({
        listFlag: false,
      });
    }
  }

  render() {
    return (
      <View style={styles.View1}>
        {this.state.loaderFlag ? <Loader /> : null}

        {/* Navigation bar  */}
        <NavBar detail={{flag: false, nav: this.props.navigation}} />

        {/*  */}
        <ScrollView showsHorizontalScrollIndicator={false}>
          {/* map Section */}
          <View style={styles.View2}>
            <MapView
              // provider={PROVIDER_GOOGLE}
              ref={ref => {
                this.mapRef = ref;
              }}
              // onLayout={() =>
              //   this.mapRef.fitToCoordinates(this.state.markers, {
              //     edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
              //     animated: true,
              //   })
              // }
              style={{height: wp('50'), width: '100%'}}>
              {this.state.markers.map((marker, index) => {
                if (marker.markerTag == 'S') {
                  return (
                    <MapView.Marker key={index} coordinate={marker}>
                      <Text style={styles.Text8}>S</Text>
                      <Image
                        source={require('../../utils/assets/pin.png')}
                        style={{width: wp(6), height: wp(6)}}
                      />
                    </MapView.Marker>
                  );
                } else if (marker.markerTag == 'E') {
                  return (
                    <MapView.Marker key={index} coordinate={marker}>
                      <Text style={styles.Text8}>E</Text>
                      <Image
                        source={require('../../utils/assets/pin.png')}
                        style={{width: wp(6), height: wp(6)}}
                      />
                    </MapView.Marker>
                  );
                } else if (marker.markerTag == '') {
                  return (
                    <MapView.Marker key={index} coordinate={marker}>
                      <Text style={styles.Text8}></Text>
                      <Image
                        source={require('../../utils/assets/pin.png')}
                        style={{width: wp(6), height: wp(6)}}
                      />
                    </MapView.Marker>
                  );
                }
              })}

              <Polyline
                coordinates={this.state.markers}
                strokeColor="#073C49"
                strokeColors={['#073C49']}
                strokeWidth={2}
              />
            </MapView>
          </View>
          {/*  */}

          {/* Detail Section */}
          <View style={styles.View3}>
            <View style={styles.View4}>
              <Text style={styles.Text1}>{this.state.pCaption}</Text>
              <Text style={styles.Text2}>
                {this.state.Delivered_day} {this.state.Delivered_By}
              </Text>
              <Text style={styles.Text2}>Carrier: {this.state.pCarrier}</Text>
            </View>
            <View style={styles.View10}>
              <Text style={styles.Text6}>
                {this.state.pageNumber} OF {this.state.count_Tnumber}
              </Text>
            </View>

            <View style={styles.View5}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this.onScrollEnd}
                pagingEnabled={true}
                data={this.state.trackingNumber}
                renderItem={({item, index}) => (
                  <View style={styles.View12}>
                    <FlatList
                      initialNumToRender={2}
                      maxToRenderPerBatch={2}
                      windowSize={2}
                      scrollEnabled={false}
                      data={this.state.showLessList}
                      renderItem={({item, index}) => (
                        <View
                          style={{
                            backgroundColor:
                              flatListColors[index % flatListColors.length],
                            width: '100%',
                            flexDirection: 'row',
                            borderColor: '#E6E6E6',
                            borderWidth: 0.5,
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}>
                          <View style={styles.View7}>
                            {this.flatList_Render(item.ActivityDate)}
                          </View>
                          <View style={styles.View8}>
                            <Text style={styles.Text4} numberOfLines={2}>
                              {item.StatusDescription}
                            </Text>
                          </View>
                          <View style={styles.View9}>
                            {(() => {
                              if (item.City == '') {
                                return (
                                  <Text
                                    style={styles.Text4}
                                    numberOfLines={2}></Text>
                                );
                              } else {
                                return (
                                  <Text style={styles.Text4} numberOfLines={2}>
                                    {item.City}, {item.StateProvinceCode},{' '}
                                    {item.CountryCode}
                                  </Text>
                                );
                              }
                            })()}
                          </View>
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />

                    {this.MoreBtn()}
                    <View style={styles.View4}>
                      <Text style={styles.Text1_1}>Tracking Number</Text>
                      <Text style={styles.Text5}>{item.TrackingNumber}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          {/*  */}
        </ScrollView>
      </View>
    );
  }
}
