import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import {
  AppScrollView,
  AppView,
  AppImage,
  AppText,
  AppButton,
  AppIcon,
  AppStarRating,
  AppNavigation,
} from '../common';
import colors from '../common/defaults/colors';

import avatar from '../assets/imgs/avatar.png';

class OrderItem extends Component {
  render() {
    const { style, data, ...rest } = this.props;
    return (
      <AppView
        style={style}
        backgroundColor="white"
        borderColor={colors.darkgrey}
        borderWidth={0.5}
        borderRadius={5}
        paddingHorizontal={4}
        paddingVertical={5}
        marginHorizontal={8}
        marginBottom={5}
        stretch
        elevation={5}
        {...rest}
      >
        <AppView>
          <AppText>{data.order}</AppText>
        </AppView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(OrderItem);
