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

class ProviderCard extends Component {
  state = {
    isFavorite: false,
  };

  componentDidMount() {
    console.log('isFavorite', this.props.data);
  }

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
        <AppText marginLeft={2}>
          {rtl ? data.user.name.ar : data.user.name.en}
        </AppText>

        <AppText marginLeft={2} marginVertical={3}>
          {data.gender}
        </AppText>
        <AppText marginLeft={2}>{data.transferFees}</AppText>

        <AppView row flex stretch marginLeft={2} marginTop={3}>
          <AppStarRating
            rate={data.rating}
            size={6}
            emptyStar="star"
            emptyStarColor="#E6E8EA"
            starPaddingHorizontal={1}
          />
        </AppView>
      </AppView>
    );
  };

  renderProviderImg = () => {
    const { data } = this.props;
    return (
      <AppView row stretch height={15} paddingHorizontal={7}>
        <AppImage
          stretch
          source={{ uri: data.user.profileImage }}
          resizeMode="cover"
          width={20}
          height={15}
          borderRadius={15}
        />

        <AppView flex stretch paddingLeft={7}>
          {this.renderProviderInfo()}
        </AppView>
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
        onPress={() => {
          AppNavigation.push({
            name: 'providerInfo',
            passProps: {
              data,
            },
          });
        }}
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

export default connect(mapStateToProps)(ProviderCard);
