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
  View1: {flex: 1, backgroundColor: 'white'},
  View2: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
  },
  View3: {
    width: '100%',
    marginTop: '5%',
    backgroundColor: color.backGroundColor,
  },
  View4: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'red',
  },
  View5: {
    width: '100%',
    height: 30,
    marginTop: 20,
    backgroundColor: 'red',
  },
  View6: {
    width: '100%',
    backgroundColor: color.backGroundColor,
    marginTop: 25,
    flexDirection: 'row',
  },
  View7: {
    width: '80%',
  },
  View8: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  View9: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: 'white',
    borderLeftWidth: 3,
  },
  View10: {
    width: '100%',
    backgroundColor: color.backGroundColor,
    marginTop: '2%',
    flexDirection: 'row',
  },
  View11: {
    width: '26.5%',
    borderLeftColor: 'white',
    borderLeftWidth: 3,
  },
  View12: {},
  View13: {},
  View14: {},

  // Text Section
  Text1: {
    // fontSize: 20,
    textAlign: 'center',
    color: '#5A5C5E',
    fontSize: isTablet ? wp(4.5) : wp(5.5),
  },
  Text2: {
    color: '#000000',
    // fontSize: 14,
    fontSize: isTablet ? wp(3) : wp(4),
    marginLeft: 10,
    marginTop: 5,
  },
  Text3: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  Text4: {
    color: color.pgColor,
    fontSize: isTablet ? wp(3) : wp(4),
  },
  Text5: {
    color: '#000000',
    // fontSize: 15,
    marginLeft: 10,
    marginTop: '3%',
    fontSize: isTablet ? wp(3) : wp(4),
  },
  Text6: {
    fontSize: isTablet ? wp(3) : wp(4),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  Text7: {},
  text8: {
    color: 'red',
  },
  Text9: {},
  Text10: {},
  Text11: {},

  // Input Section
  Input_field1: {
    fontSize: isTablet ? wp(3) : wp(4),
    color: '#5A5C5E',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    paddingLeft: 10,
    paddingRight: 5,
  },

  toggleBtn: {
    position: 'absolute',
    right: 0,
  },

  // Button Section
  Btn1: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    // marginTop: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  Btn2: {
    width: wp('50%'),
    height: wp('10%'),
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    alignSelf: 'center',
    marginTop: wp(10),
  },
});
