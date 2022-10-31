import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import color from '../../themes/Colors';
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

export default StyleSheet.create({
  // View section
  View1: {
    flex: 1,
    backgroundColor: 'white',
  },
  View2: {
    // height: '50%',
    width: '100%',
  },
  View3: {
    flex: 1,
    backgroundColor: 'white',
  },
  View4: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 20,
  },
  View5: {
    marginTop: 20,
  },
  View6: {
    width: '100%',
    height: 50,
    marginVertical: 2,
    flexDirection: 'row',
  },
  View7: {
    width: '25%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  View8: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  View9: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  View10: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View11: {
    // height:100,
  },
  View12: {
    width: wp('100%'),
    marginBottom: 20,
  },

  // Text Section
  Text1: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('3.5%') : wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  Text1_1: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('3.3%') : wp('4.3%'),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  Text2: {
    color: '#B5B5B5',
    marginBottom: 5,
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
  },
  Text3: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
    fontWeight: '500',
  },
  Text4: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
  },
  Text5: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('2.3%') : wp('3.3%'),
  },
  Text6: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  Text7: {
    color: color.pgColor,
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },

  Text8: {
    color: color.pgColor,
    fontSize: isTablet ? wp('2.5%') : wp('4%'),
    fontWeight: 'bold',
    
  },
});
