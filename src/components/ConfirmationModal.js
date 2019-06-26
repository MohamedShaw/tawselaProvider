import React, { Component } from 'react';
import { AppView, AppText, AppModal, AppButton } from '../common';

class ConfirmationModal extends Component {
  render() {
    const { isVisible, ...rest } = this.props;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        lock
        {...rest}
      >
        <AppView
          width={75}
          backgroundColor="white"
          padding={6}
          borderRadius={5}
          center
          touchableOpacity
        >
          <AppText center color="foreground" bold>
            {this.props.title}
          </AppText>

          <AppView stretch center marginVertical={7}>
            {this.props.note ? (
              <AppText center color="#5F5F5F" size={5.5} marginBottom={4}>
                {this.props.note}
              </AppText>
            ) : null}
            <AppText center color="#5F5F5F" size={5.5}>
              {this.props.desc}
            </AppText>
          </AppView>

          <AppView stretch row height={8}>
            <AppButton
              title={this.props.yesLabel}
              backgroundColor="primary"
              flex
              stretch
              paddingVertical={0}
              margin={3}
              touchableOpacity
              onPress={this.props.onConfirm}
            />

            <AppButton
              title={this.props.noLabel}
              backgroundColor="grey"
              flex
              stretch
              paddingVertical={0}
              margin={3}
              touchableOpacity
              onPress={this.props.onCancel}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  }
}

export default ConfirmationModal;
