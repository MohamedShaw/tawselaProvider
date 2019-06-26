import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView } from 'react-native';

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
} from '../common';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 56;

export default class Header extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    showNotification: PropTypes.bool,
    showChat: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  };

  static defaultProps = {
    hideBack: false,
    showNotification: false,
    showChat: false,
    rowItems: [],
  };

  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  renderRight = () => {
    const { showChat, rowItems, showAlarm } = this.props;

    if (rowItems.length > 0) {
      return (
        <AppView row stretch>
          {rowItems.map(item =>
            React.cloneElement(item, {
              key: String(Math.random()),
            }),
          )}
        </AppView>
      );
    }

    if (showChat) {
      return (
        <AppButton
          leftIcon={<AppIcon name="chat-bubble" type="material" size={10} />}
          backgroundColor="transparent"
          size={9}
          onPress={() => {}}
          flex
        />
      );
    }
    if (showAlarm) {
      return (
        <AppButton
          leftIcon={<AppIcon name="bell-off" type="custom" size={10} />}
          backgroundColor="transparent"
          size={9}
          onPress={() => {}}
          flex
        />
      );
    }
    return <AppView stretch flex />;
  };

  renderLeft = () => {
    const { showNotification, hideBack, termsAndConditionClose } = this.props;

    if (showNotification)
      return (
        <AppButton
          leftIcon={<AppIcon name="ios-notifications" size={13} />}
          backgroundColor="transparent"
          size={8}
          ph={10}
          onPress={() => {}}
          flex
        />
      );

    if (termsAndConditionClose)
      return (
        <AppButton
          leftIcon={<AppIcon name="ios-close" size={13} color="black" />}
          backgroundColor="transparent"
          size={8}
          ph={10}
          onPress={() => {}}
          flex
        />
      );
    if (hideBack) {
      return <AppView stretch flex />;
    }

    return (
      <AppView flex>
        <AppButton
          flex
          color="foreground"
          leftIcon={<AppIcon flip name="ios-arrow-back" type="ion" size={12} />}
          onPress={this.goBack}
          paddingHorizontal={8}
          backgroundColor="transparent"
        />
      </AppView>
    );
  };

  render() {
    const { title, flat } = this.props;
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', alignSelf: 'stretch' }}>
        <AppView
          stretch
          backgroundColor={
            this.props.backgroundColor ? this.props.backgroundColor : '#fff'
          }
          style={{
            height: APPBAR_HEIGHT,
          }}
          row
          spaceBetween
          borderBottomColor={flat ? undefined : 'inputBorderColor'}
          borderBottomWidth={flat ? 0 : 0.5}
        >
          {this.renderLeft()}
          <AppView flex={3} center>
            <AppText size={6} bold numberOfLines={1}>
              {title}
            </AppText>
          </AppView>
          {this.renderRight()}
        </AppView>
      </SafeAreaView>
    );
  }
}
