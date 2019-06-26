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

class Plan extends Component {
  state = {
    isFavorite: false,
  };

  renderPrice = price => {
    const { data } = this.props;
    return (
      <AppView row marginRight={2}>
        <AppText size={5} color="primary">
          {price}
        </AppText>
        <AppText size={4.5} color="primary">
          {I18n.t('currency')}
        </AppText>
      </AppView>
    );
  };

  renderTags = () => {
    const { data } = this.props;
    return (
      <AppView stretch row marginLeft={2}>
        <AppView
          borderColor="grey"
          borderRadius={3}
          paddingVertical={0.5}
          borderWidth={1}
          row
          paddingHorizontal={2}
        >
          <AppText size={4.5}>{I18n.t('listCardProvider-min')}</AppText>
        </AppView>
      </AppView>
    );
  };

  renderProviderInfo = () => {
    const { data, rtl } = this.props;

    return (
      <AppView stretch flex>
        <AppText marginLeft={2}>{rtl ? data.name.ar : data.name.en}</AppText>

        <AppText marginLeft={2} marginVertical={3}>
          {data.description}
        </AppText>
        <AppText marginLeft={2}>{data.transferFees}</AppText>

        <AppView row flex stretch marginLeft={2} marginTop={3} />
      </AppView>
    );
  };

  renderProviderImg = () => {
    const { data } = this.props;
    return (
      <AppView row stretch height={10} paddingHorizontal={7}>
        <AppView flex stretch paddingLeft={7}>
          {this.renderProviderInfo()}
        </AppView>
        <AppView
          borderRadius={20}
          marginHorizontal={2}
          width={20}
          height={3}
          backgroundColor="grey"
          center
        >
          <AppText>{data.price}</AppText>
        </AppView>
        <AppView
          circleRadius={5}
          backgroundColor={data.active ? 'green' : 'red'}
        />
      </AppView>
    );
  };

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
        {this.renderProviderImg()}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Plan);
