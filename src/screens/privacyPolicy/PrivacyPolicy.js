import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import {
  AppView,
  AppText,
  getColors,
  AppButton,
  AppIcon,
  AppImage,
  AppScrollView,
} from '../../common';
import { AppHeader, NoInternet } from '../../components';
import colors from '../../common/defaults/colors';

class PrivacyPolicy extends Component {
  renderDescription = () => {
    return (
      <AppView marginVertical={5} paddingHorizontal={10} center stretch>
        <AppText lineHeight={10} color="#000" center>
          {I18n.t('privacy-policy-description')}
        </AppText>
      </AppView>
    );
  };

  render() {
    return (
      <AppView flex stretch backgroundColor="#F8F8F8">
        <AppHeader title={I18n.t('privacy-policy-header')} />
        <AppScrollView stretch center>
          {this.renderDescription()}
        </AppScrollView>
      </AppView>
    );
  }
}

export default connect()(PrivacyPolicy);
