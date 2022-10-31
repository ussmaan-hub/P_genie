import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import color from '../../themes/Colors';

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet();

export default StyleSheet.create({
  // View section
  View1_1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View1: {flex: 1, backgroundColor: 'white'},
  View2: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
  },
  View3: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: wp('2'),
    paddingTop: wp('2'),
  },
  View4: {
    marginTop: 20,
  },
  View5: {
    position: 'absolute',
    right: 10,
  },
  View6: {
    width: '100%',
    backgroundColor: color.backGroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: wp('2'),
    paddingTop: wp('2'),
  },
  View7: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  View8: {
    width: '50%',
    height: '100%',
  },
  View9: {
    width: '25%',
    height: '100%',
  },
  View10: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  View11: {
    padding: wp('2%'),
  },

  // Text Section
  Text1: {
    color: '#000000',
    fontSize: isTablet ? wp(3.5) : wp(4.5),
    marginLeft: 10,
    fontWeight: '500',
  },
  Text2: {
    color: color.pgColor,
    fontSize: isTablet ? wp(3.5) : wp(4.5),
    fontWeight: '500',
  },
  Text3: {
    color: '#000000',
    // fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
    fontSize: isTablet ? wp(3) : wp(4),
  },
  Text4: {
    color: '#000000',
    fontSize: isTablet ? wp(3) : wp(4),
    fontWeight: '500',
    position: 'absolute',
    right: 10,
  },
  Text5: {
    color: '#828282',
    fontSize: isTablet ? wp(2) : wp(3),
    marginLeft: 10,
    paddingBottom: wp('1'),
    paddingTop: wp('1'),
  },
  Text6: {
    color: '#828282',
    fontSize: isTablet ? wp(2) : wp(3),
    paddingBottom: wp('1'),
    paddingTop: wp('1'),
  },
  Text7: {
    color: '#828282',
    fontSize: isTablet ? wp(2) : wp(3),
    paddingBottom: wp('1'),
    paddingTop: wp('1'),
    position: 'absolute',
    right: 10,
  },
  Text8: {},
  Text9: {},

  // Input Section
  Input_field1: {},
});
