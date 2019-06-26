import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppIcon, AppButton } from '../common';

class NotificationButton extends Component {
  render() {
    return (
      <AppButton onPress={() => alert('sss')} stretch>
        <AppIcon name="ios-notifications-outline" type="ion" size={12} />
      </AppButton>
    );
  }
}

export default NotificationButton;
