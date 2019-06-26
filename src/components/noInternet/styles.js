import { StyleSheet, Dimensions, Platform } from 'react-native';

import colors from '../../common/defaults/colors';
import { responsiveWidth, responsiveHeight } from '../../common';

// let screenWidth = Dimensions.get("window").width / 2 - 200 / 2;
const screenHeight = Dimensions.get('window').height;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default StyleSheet.create({
  imageContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(40),
  },
});
