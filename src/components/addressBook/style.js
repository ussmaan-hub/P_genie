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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  View1: {
    flex: 1,
    backgroundColor: 'white',
  },
  View2: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: wp(20),
  },
  View3: {
    width: '100%',
    marginVertical: 5,
    backgroundColor: color.backGroundColor,
  },
  View4: {
    width: '100%',
    marginVertical: 5,
    backgroundColor: color.backGroundColor,
  },
  View5: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
  },
  View6: {
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
  },
  View7: {
    // marginBottom: 20,
    // marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: wp(4),
    width: '100%',
  },
  View8: {
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
    elevation: 8,

  },

  View9: {
    padding: wp('2'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  View10: {
    height: wp(10),
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    // backgroundColor: color.backGroundColor,
  },
  View11: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View12: {
    height: '100%',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
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

  // Text Section
  Text1: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp('3.5%') : wp('4.5%'),
    marginLeft: '2%',
    marginTop: '2%',
    marginBottom: '2%',
  },
  Text2: {
    color: '#000000',
    // fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
    fontSize: isTablet ? wp('3%') : wp('4%'),
  },
  Text3: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#5A5C5E',
    marginLeft: 10,
  },
  Text4: {
    color: '#000000',
    fontSize: isTablet ? wp('3%') : wp('4%'),
    marginLeft: 10,
    fontWeight: '600',
  },
  Text5: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: isTablet ? wp('3%') : wp('4%'),
  },
  Text6: {
    color: 'red',
  },
  Text8: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#5A5C5E',
  },

  // Input Section
  Input_field1: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#5A5C5E',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    paddingLeft: 10,
    paddingRight: 5,
  },
  Input_field2: {
    width: '95%',
    fontSize: isTablet ? wp('3%') : wp('4%'),
    height: '90%',
    color: '#5A5C5E',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
  },

  // Button Section
  Btn1: {
    width: wp('40%'),
    height: wp('10%'),
    alignSelf: 'center',
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '3%',
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
});
