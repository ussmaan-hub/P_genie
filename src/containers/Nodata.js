import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../global/ConstantsVar';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

const Nodata = props => {
  return (
    <View
      style={
        {
          // width: isTablet ? wp(8) : wp(12),
          // height: isTablet ? wp(30) : wp(12),
        }
      }>
      <Image
        style={{
          width: isTablet ? wp(10) : wp(14),
          height: isTablet ? wp(10) : wp(14),
          alignSelf: 'center',
          tintColor: '#BC8245',
        }}
        source={require('../utils/assets/noData.png')}
      />
      <Text
        style={{
          color: '#BC8245',
          fontSize: isTablet ? wp(3) : wp(4),
          marginTop: wp(3),
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {props.detail.alertText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Nodata;
