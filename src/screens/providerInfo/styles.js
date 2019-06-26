import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

import { responsiveWidth, responsiveHeight } from '../../common';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const radius = responsiveHeight(1.4);
export default StyleSheet.create({
  dotStyles: {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    backgroundColor: '#EDD5B2',
    bottom: -15,
  },
  activeDotStyles: {
    backgroundColor: 'white',
  },
  swiper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  navContainer: {
    height: HEADER_HEIGHT,
  },
  headerTitle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: statusBarHeight,
    left: 0,
    right: 0,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
