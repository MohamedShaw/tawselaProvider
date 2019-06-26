import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppModal, AppIcon, AppButton } from '../common';

class InfoModal extends Component {
  static propTypes = {
    type: PropsTypes.string,
  };

  static defaultProps = {
    type: 'success',
  };

  render() {
    const {
      isVisible,
      type,
      noConfirmButton,
      marginHorizontal,
      lineHeight,
      ...rest
    } = this.props;

    let iconName;
    let iconSize;
    let iconType;
    let iconColor;

    switch (type) {
      case 'success':
        iconName = 'checkbox-marked-circle-outline';
        iconType = 'material-community';
        iconColor = 'primary';
        iconSize = 40;

        break;
      case 'error':
        iconName = 'warning';
        iconType = 'font-awesome';
        iconColor = '#4A4A4A';
        iconSize = 25;
        break;
      default:
        iconName = '';
        iconSize = 40;
    }

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        {...rest}
      >
        <AppView
          width={65}
          backgroundColor="white"
          padding={6}
          borderRadius={5}
          center
          touchableOpacity
          onPress={this.props.onPress}
        >
          <AppIcon
            name={iconName}
            type={iconType}
            size={iconSize}
            color={iconColor}
            mb={4}
          />
          <AppText center lineHeight={8} marginHorizontal={marginHorizontal}>
            {this.props.message}
          </AppText>
          {!noConfirmButton && (
            <AppButton
              title={this.props.buttonLabel || I18n.t('ok')}
              marginVertical={6}
              paddingHorizontal={15}
              touchableOpacity
              onPress={this.props.onConfirm}
            />
          )}
        </AppView>
      </AppModal>
    );
  }
}

export default InfoModal;
