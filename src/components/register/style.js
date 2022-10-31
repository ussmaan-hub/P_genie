import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
import color from '../../themes/Colors'

const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

export default StyleSheet.create({
  // View Section

  view1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  view2: {
    width: '80%',
    // backgroundColor:'red'
  },
  view3: {
    width: '100%',
    marginVertical: 10,
  },

  // Input Section
  Input_field1: {
    borderBottomColor: '#00000029',
    borderBottomWidth: 0.5,

    fontSize: wp(3.5),
    color: '#5A5C5E',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
  },

  // Text Section
  Text1: {
    // fontSize: 25,
    fontSize: wp('6%'),
    fontWeight: '800',
    color: '#5A5C5E',
    alignSelf: 'center',
    marginBottom: 20,
  },
  Text2: {
    color: color.pgColor,
    // fontSize: 16,
    fontWeight: '400',
    fontSize: wp(4),
  },
  Text3: {
    // fontSize: 16,
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  Text4: {
    // fontSize: 16,
    fontWeight: '500',
    color: '#5A5C5E',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: wp(3.5),
  },
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
});
