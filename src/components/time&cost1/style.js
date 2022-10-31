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
  // View Section

  View1: {flex: 1, backgroundColor: 'white'},
  View1_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  View2: {
    width: '90%',
    alignSelf: 'center',
    marginTop: wp('5'),
  },
  View3: {
    width: '100%',
    backgroundColor: color.backGroundColor,
    marginTop: wp('2'),
  },
  View4: {
    alignSelf: 'flex-end',
    marginTop: wp(4),
    borderRadius: 1,
    borderBottomColor: color.pgColor,
    borderBottomWidth: 1,
  },
  View5: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  View6: {
    padding: wp('2%'),
  },
  View7: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#8A8A8E',
    padding: wp(2),
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
  View15: {
    width: '100%',
    marginTop: wp(1),
  },

  // Text Section
  Text1: {
    color: '#5A5C5E',
    textAlign: 'center',
    fontSize: isTablet ? wp(4.5) : wp(5.5),
  },
  Text2: {
    color: '#000000',
    marginLeft: 10,
    marginTop: 5,
    fontSize: isTablet ? wp(3) : wp(4),
  },
  Text3: {
    color: 'red',
  },
  Text4: {
    color: color.pgColor,
    fontSize: isTablet ? wp(3) : wp(4),
    alignSelf: 'flex-end',
  },

  Text5: {
    color: '#5A5C5E',
    fontSize: isTablet ? wp(3) : wp(4),
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    paddingLeft: 10,
    paddingRight: 5,
    width: '100%',
  },
  Text6: {
    fontWeight: 'bold',
    color: color.backGroundColor,
    fontSize: isTablet ? wp(3) : wp(4),
  },
  Text7: {
    fontSize: isTablet ? wp(3) : wp(4),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  Text8: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#5A5C5E',
  },
  Text9: {
    fontSize: isTablet ? wp(2.5) : wp(3.5),
    color: '#5A5C5E',
    width: '80%',
  },

  Input_field1: {
    fontSize: isTablet ? wp(3) : wp(4),
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
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 5,
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
    marginBottom: wp(10),
  },
});
