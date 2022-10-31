import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../global/ConstantsVar';
import color from '../themes/Colors';

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;
import Modal from 'react-native-modal';

const Loader = props => {
  return (
    <Modal
      isVisible={true}
      animationOutTiming={1}
      animationInTiming={1}
      backdropOpacity={0.7}
      onBackButtonPress={() => this.OnClickClosePOPUP()}
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          // width:  wp('25'),
          // height:  wp('25'),
          // backgroundColor: 'white',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          padding: wp('5'),
        }}>
        {/* <Image
            source={require('../../utils/assets/loading.gif')}
            style={{height: 100, width: 100}}
          /> */}
        <ActivityIndicator size="large" color={color.pgColor} />
        <Text
          style={{
            fontSize: wp(4),
            color: color.pgColor,
            marginTop: 10,
            fontWeight: '600',
          }}>
          Loading...
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
  },
  view1: {
    paddingTop: 20,
    borderTopColor: '#00000029',
    borderTopWidth: 0.5,
    marginTop: 10,
  },
});

export default Loader;
