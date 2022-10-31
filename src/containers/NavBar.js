import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../components/dashboard/style';
import {
  widthPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ConstantsVar from '../global/ConstantsVar';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

const wp = ConstantsVar.isPortrait() ? widthPercentageToDP : hp;

const NavBar = props => {
  if (props.detail.flag == true) {
    return (
      <View style={styles.NavbarView1}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.NavbarView2}
          onPress={() => props.detail.nav.openDrawer()}>
          <Image
            style={{
              width: '60%',
              height: '60%',
              resizeMode: 'contain',
            }}
            source={require('../utils/assets/MenuIcon.png')}
          />
        </TouchableOpacity>
        <View style={styles.NavbarView3}>
          <Image
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
            source={require('../utils/assets/NewLogo.png')}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.NavbarView4}
          onPress={() => props.detail.nav.navigate('Dashboard_Screen')}>
          <Image
            style={{
              width: '60%',
              height: '60%',
              resizeMode: 'contain',
            }}
            source={require('../utils/assets/HomeIcon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.NavbarView1}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.NavbarView2}
          onPress={() => props.detail.nav.goBack()}>
          <Image
            style={{
              width: '60%',
              height: '60%',
              resizeMode: 'contain',
            }}
            source={require('../utils/assets/backArrow.png')}
          />
        </TouchableOpacity>
        <View style={styles.NavbarView3}>
          <Image
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
            source={require('../utils/assets/NewLogo.png')}
          />
        </View>
      </View>
    );
  }
};

export default NavBar;
