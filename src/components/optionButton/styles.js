import { StyleSheet } from 'react-native';
import { getColors } from '../../common';;
import {
  responsiveHeight,
  responsiveWidth,
  moderateScale,
} from '../../common/utils/responsiveDimensions';

export default StyleSheet.create({
  radius: {
    // borderRadius: responsiveHeight(3),
    height: responsiveHeight(6),

    alignItems: 'center',
    justifyContent: 'center',
  },
});
