import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../themes/Colors';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';
const windowWidth = Dimensions.get('window').width;
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
  View1_1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View2: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#8A8A8E',
    padding: wp(2),
    marginTop: wp(2),
  },
  View3: {
    width: '100%',
    marginTop: wp(1),
  },
  View4: {
    height: '100%',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  View5: {
    width: isTablet ? wp(10) : wp(14),
    height: isTablet ? wp(10) : wp(14),
    backgroundColor: color.pgColor,
    position: 'absolute',
    bottom: wp(8),
    right: wp(8),
    borderRadius: wp(100),
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  View6: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    padding: isTablet ? wp(3) : wp(4),
  },
  text1: {
    fontSize: isTablet ? wp(3) : wp(4),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  text2: {
    fontSize: isTablet ? wp(2.5) : wp(3.5),
    color: '#5A5C5E',
    width: '80%',
  },
  Text3: {
    color: '#8A8A8E',
    fontSize: isTablet ? wp(3) : wp(3.5),
  },
});
