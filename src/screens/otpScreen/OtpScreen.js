import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Keyboard } from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import {
  AppView,
  AppText,
  AppButton,
  AppSpinner,
  AppNavigation,
  AppInput,
  AppScrollView,
  AppForm,
  showError,
  showSuccess,
} from '../../common';

import { AppHeader, InfoModal } from '../../components';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
import { clientCheck } from '../../actions/AuthActions';

class OtpScreen extends Component {
  constructor(props) {
    super(props);

    this.verifyCode4 = React.createRef();
    this.verifyCode3 = React.createRef();
    this.verifyCode2 = React.createRef();
    this.verifyCode1 = React.createRef();

    this.state = {
      errorTxt: '',
      sendLoading: false,
      isInfoModalVisible: false,
    };
  }

  onSubmit = async (values, { setSubmitting }) => {
    const verifyCode =
      values.verifyCode1 +
      values.verifyCode2 +
      values.verifyCode3 +
      values.verifyCode4;

    if (verifyCode.length !== 4) {
      this.setState({ errorTxt: I18n.t('input-allFields-required-error') });
      setSubmitting(false);
      return;
    }

    this.setState({ errorTxt: '' });
    try {
      await axios.post(`${API_ENDPOINT_GATEWAY}auth/signup/verify-code`, {
        verifyCode,
      });

      this.setState({
        isInfoModalVisible: true,
      });
      // setSubmitting(false);
    } catch (error) {
      this.setState({ errorTxt: error[1].message });
      setSubmitting(false);
    }
  };

  reSendCode = async () => {
    if (this.state.sendLoading) return;

    this.setState({ errorTxt: '', sendLoading: true });
    const { phone } = this.props.currentUser.user;

    try {
      await axios.post(
        `${API_ENDPOINT_GATEWAY}auth/signup/verify-code/resend`,
        { phone },
      );
      showSuccess(I18n.t('new-verify-code-sent'));
      this.setState({
        sendLoading: false,
      });
    } catch (error) {
      showError(error[1].message);
      this.setState({
        sendLoading: false,
      });
    }
  };

  renderResend = () => (
    <>
      <AppView row stretch center paddingVertical={5}>
        <AppText size={5}>{I18n.t('verify-code-not-recieved')}</AppText>
        <AppButton
          onPress={this.reSendCode}
          backgroundColor="transparent"
          color="primary"
          title={I18n.t('resend-verify-code')}
          size={5}
          paddingHorizontal={0.7}
          paddingVertical={2}
        />
      </AppView>
      {this.state.sendLoading ? <AppSpinner marginVertical={10} /> : null}
    </>
  );

  renderContinueButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('continue-button')}
      centerX
      paddingVertical={5}
      processing={isSubmitting}
      onPress={handleSubmit}
      stretch
      marginTop={3}
      marginBottom={3}
      marginHorizontal={8}
    />
  );

  renderFormInput = ({
    injectFormProps,
    isSubmitting,
    setFieldValue,
    errors,
    handleSubmit,
    resetForm,
  }) => (
    <React.Fragment>
      {this.renderChangePhone(resetForm)}
      <AppText bold color="#C0C7CC" marginTop={8} marginBottom={3}>
        {I18n.t('enter-verify-code')}
      </AppText>

      <AppView
        stretch
        marginHorizontal={8}
        style={{
          flexDirection: 'row',
        }}
      >
        <AppInput
          ref={this.verifyCode1}
          nextInput={this.verifyCode2}
          {...injectFormProps('verifyCode1')}
          flex
          onChange={(name, text) => {
            setFieldValue(name, text);
            if (text) {
              this.verifyCode2.current.focus();
            }
          }}
          number
          noValidation
          marginHorizontal={5}
          selectTextOnFocus
          maxLength={1}
          center
          size={8}
          bold
          borderTopColor="white"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottomColor="grey"
          borderBottomWidth={2}
          borderRadius={0}
          onFocusBorderHighlight={{
            borderBottomColor: '#484848',
          }}
        />

        <AppInput
          {...injectFormProps('verifyCode2')}
          ref={this.verifyCode2}
          nextInput={this.verifyCode3}
          flex
          onChange={(name, text) => {
            setFieldValue(name, text);
            if (text) {
              this.verifyCode3.current.focus();
            }
          }}
          number
          noValidation
          marginHorizontal={5}
          maxLength={1}
          selectTextOnFocus
          center
          size={8}
          bold
          borderTopColor="white"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottomColor="grey"
          borderBottomWidth={2}
          borderRadius={0}
          onFocusBorderHighlight={{
            borderBottomColor: '#484848',
          }}
        />
        <AppInput
          {...injectFormProps('verifyCode3')}
          ref={this.verifyCode3}
          nextInput={this.verifyCode4}
          flex
          onChange={(name, text) => {
            setFieldValue(name, text);
            if (text) {
              this.verifyCode4.current.focus();
            }
          }}
          number
          noValidation
          marginHorizontal={5}
          maxLength={1}
          selectTextOnFocus
          center
          size={8}
          bold
          borderTopColor="white"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottomColor="grey"
          borderBottomWidth={2}
          borderRadius={0}
          onFocusBorderHighlight={{
            borderBottomColor: '#484848',
          }}
        />
        <AppInput
          {...injectFormProps('verifyCode4')}
          ref={this.verifyCode4}
          flex
          onChange={(name, text) => {
            if (text) {
              Keyboard.dismiss();
            }
          }}
          number
          noValidation
          marginHorizontal={5}
          maxLength={1}
          selectTextOnFocus
          center
          size={8}
          bold
          borderTopColor="white"
          borderLeftColor="white"
          borderRightColor="white"
          borderBottomColor="grey"
          borderBottomWidth={2}
          borderRadius={0}
          onFocusBorderHighlight={{
            borderBottomColor: '#484848',
          }}
        />
      </AppView>

      <AppView stretch center height={5}>
        {this.state.errorTxt ? (
          <AppText color="error" marginVertical={2} size={5}>
            {this.state.errorTxt}
          </AppText>
        ) : null}
      </AppView>

      {this.renderContinueButton(isSubmitting, handleSubmit)}
    </React.Fragment>
  );

  renderForm = () => (
    <AppForm
      schema={{
        verifyCode1: '',
        verifyCode2: '',
        verifyCode3: '',
        verifyCode4: '',
      }}
      render={this.renderFormInput}
      onSubmit={this.onSubmit}
    />
  );

  renderChangePhone = resetForm => (
    <AppButton
      title={I18n.t('otp-screen-change-phone')}
      transparent
      height={5}
      marginTop={2}
      onPress={() => {
        AppNavigation.push({
          name: 'changePhone',
          passProps: {
            onChange: () => {
              resetForm();
              this.setState({
                errorTxt: '',
              });
            },
          },
        });
      }}
    />
  );

  render() {
    if (!this.props.currentUser) return null;
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('otp-screen-create-account')} hideBack />
        <AppScrollView stretch centerX>
          <AppText bold color="darkgrey" marginTop={7} marginBottom={1}>
            {I18n.t('verify-code-was-send-on-number')}
          </AppText>

          <AppText bold color="darkgrey">
            {this.props.currentUser.user.phone}
          </AppText>

          {this.renderForm()}
          {this.renderResend()}
        </AppScrollView>

        <InfoModal
          isVisible={this.state.isInfoModalVisible}
          message={I18n.t('account-created-success')}
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
            this.props.clientCheck(this.props.currentUser, () => {});
          }}
          changeState={v => {
            this.setState({
              isInfoModalVisible: v,
            });
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  clientCheck: bindActionCreators(clientCheck, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtpScreen);
