import { StyleSheet } from 'react-native';

import {
  responsiveHeight,
  moderateScale,
} from '../../common/utils/responsiveDimensions';
import { getColors } from '../../common';
import { getTopSpace } from '../../utils/iphoneHelper';

export default StyleSheet.create({
  dotStyles: {
    width: responsiveHeight(3.5),
    height: responsiveHeight(0.8),
    borderRadius: responsiveHeight(2) / 2,

    backgroundColor: 'grey',
    // marginTop: responsiveHeight(13),
    position: 'relative',
    bottom: moderateScale(6),
  },
  activeDotStyles: {
    width: responsiveHeight(3.5),
    height: responsiveHeight(0.8),
    borderRadius: responsiveHeight(2) / 2,

    // marginTop: responsiveHeight(13),
    backgroundColor: getColors().primary,
    position: 'relative',
    bottom: moderateScale(6),
  },
  button: {
    position: 'absolute',
    top: getTopSpace(),
    left: 0,
  },
});
