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
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
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

const CustomSidebarMenu = props => {
  return (
    <View>
      {/*Top Large Image */}
      <Image
        source={require('../utils/assets/HeadLogo.png')}
        style={styles.sideMenuProfileIcon}
        resizeMode="contain"
      />
      <View style={styles.view1}>
        <DrawerItemList {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: '80%',
    height: isTablet ? wp(30) : wp(25),
    alignSelf: 'center',
  },
  view1: {
    paddingTop: wp(2),
    borderTopColor: '#00000029',
    borderTopWidth: 0.5,
    marginTop: wp(5),
  },
});

export default CustomSidebarMenu;
