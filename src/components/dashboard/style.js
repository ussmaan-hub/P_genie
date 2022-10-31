import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';
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
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  View1: {
    flex: 1,
    backgroundColor: 'white',
  },
  View2: {
    height: isTablet ? wp(8) : wp(12),
    width: '100%',
    backgroundColor: color.backGroundColor,
    flexDirection: 'row',
  },
  View3: {
    height: '100%',
    width: isTablet ? '80%' : '70%',
    flexDirection: 'row',
  },
  View3_3: {
    height: '100%',
    width: isTablet ? '20%' : '30%',
    flexDirection: 'row',
  },
  View4: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: 'white',
    borderLeftWidth: 3,
  },

  View5: {
    height: '100%',
    width: isTablet ? '10%' : '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View6: {
    height: '100%',
    width: isTablet ? '90%' : '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View7: {
    width: '100%',
    paddingTop: isTablet ? 8 : 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  View8: {
    flex: 1,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
  View8_8: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View9: {
    width: isTablet ? '15%' : '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View10: {
    height: '100%',
    width: isTablet ? '75%' : '70%',
    paddingBottom: 5,
    paddingTop: 5,
  },
  View11: {
    height: '100%',
    width: '10%',
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View12: {
    width: '100%',
    flexDirection: 'row',
    padding: wp(4),
  },

  View13: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'flex-end',
  },
  View14: {
    padding: wp('2%'),
  },

  View15: {
    width: '95%',
    marginVertical: 5,
    alignSelf: 'center',
  },
  View16: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 5,
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  View17: {
    padding: wp('2'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },

  View18: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#8A8A8E',
    height: wp('10%'),
    color: '#5A5C5E',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },

  View19: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View20: {
    backgroundColor: color.pgColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: '1%',
    padding: '1%',
  },

  View21: {
    position: 'absolute',
    top: wp(2),
    right: wp(2),
  },

  // Text Section
  Text1: {
    color: '#5A5C5E',
    fontSize: 15,
  },
  Text2: {
    color: '#242424',
    fontSize: isTablet ? wp('3%') : wp('4.5%'),
    fontWeight: 'bold',
  },
  Text3: {
    color: '#8A8A8E',
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
    marginTop: 5,
  },
  Text4: {
    color: '#8A8A8E',
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
    marginTop: 5,
  },
  Text5: {
    color: '#8A8A8E',
    fontSize: wp('3%'),
  },
  Text6: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
  },
  Text7: {
    color: color.pgColor,
    // fontSize: wp('4%'),
    fontWeight: '400',
    marginLeft: 10,
    fontSize: isTablet ? wp('3.5%') : wp('4.5%'),
  },

  Text8: {
    color: '#8A8A8E',
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    fontWeight: '400',
    marginLeft: 10,
  },
  Text9: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#959798',
  },

  Text10: {
    color: color.pgColor,
    fontSize: wp('9%'),
    fontWeight: '800',
  },

  Text11: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: isTablet ? wp('2%') : wp('3%'),
  },

  Text12: {
    color: color.pgColor,
    fontSize: wp('5%'),
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },

  Text13: {
    color: 'red',
  },

  // Nav Bar section
  NavbarView1: {
    height: isTablet ? wp(7) : wp(10),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#00000029',
    // backgroundColor: 'red',
  },
  NavbarView2: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    width: isTablet ? wp(8) : wp(10),
  },
  NavbarView3: {
    width: isTablet ? wp(35) : wp(40),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavbarView4: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: isTablet ? wp(8) : wp(10),
  },

  // buttons section
  // Button Section
  Btn1: {
    width: wp('50%'),
    height: wp('10%'),
    alignSelf: 'center',
    borderRadius: wp(2),
    marginTop: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  Btn2: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  // Input Section
  Input_field1: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#8A8A8E',
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#5A5C5E',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    paddingLeft: 10,
    paddingRight: 5,
  },
  Input_field2: {
    width: '95%',
    fontSize: isTablet ? wp('3%') : wp('4.5%'),
    height: '90%',
    color: '#5A5C5E',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
});
