import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView, Keyboard } from 'react-native';

import {
  AppView,
  AppInput,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
} from '../common';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 56;

export default class SearchHeader extends Component {
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

  renderSearchInput = () => (
    <AppView
      stretch
      paddingHorizontal={5}
      marginTop={2}
      flex={3}
      style={{ zIndex: 10000 }}
    >
      <AppInput
        stretch
        noValidation
        placeholder="search..."
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        borderRadius={25}
        height={7}
      />
      {this.renderSEarchIcon()}
    </AppView>
  );

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

  renderSEarchIcon = () => (
    <AppView
      stretch
      style={{
        position: 'absolute',
        right: 5,
        top: 0,
        bottom: 0,
      }}
      backgroundColor="grey"
      circleRadius={12.5}
      center
      elevation={5}
    >
      <AppView circleRadius={10.5} backgroundColor="white" center>
        <AppIcon name="ios-notifications" size={13} color="primary" />
      </AppView>
    </AppView>
  );

  renderLeft = () => {
    const { showNotification, hideBack, termsAndConditionClose } = this.props;

    if (showNotification)
      return (
        <AppButton
          leftIcon={
            <AppIcon name="ios-notifications" size={13} color="primary" />
          }
          backgroundColor="transparent"
          size={8}
          ph={10}
          onPress={() => {}}
          stretch
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
      <SafeAreaView style={{ backgroundColor: 'grey', alignSelf: 'stretch' }}>
        <AppView
          stretch
          backgroundColor="grey"
          style={{
            height: APPBAR_HEIGHT,
          }}
          row
          spaceBetween
          borderBottomColor={flat ? undefined : 'inputBorderColor'}
          borderBottomWidth={flat ? 0 : 0.5}
        >
          {/*  <AppView  center>
            <AppText size={6} bold numberOfLines={1}>
              {title}
            </AppText>
          </AppView>
          {this.renderRight()} */}
          {this.renderSearchInput()}

          {this.renderLeft()}
        </AppView>
      </SafeAreaView>
    );
  }
}
