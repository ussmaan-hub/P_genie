import {Dimensions} from 'react-native';

const ConstantsVar = {
  HomescreenRef: null,
  isPortrait: () => {
    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      return false;
    } else {
      return true;
    }
  },
};

export default ConstantsVar;
