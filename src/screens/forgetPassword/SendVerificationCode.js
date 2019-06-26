import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Keyboard } from 'react-native';
import axios from 'axios';

import {
  AppView,
  AppText,
  AppButton,
  AppSpinner,
  AppNavigation,
  AppInput2,
  AppScrollView,
  AppForm,
  showError,
  showSuccess,
  AppIcon,
} from '../../common';
import InputError from '../../common/micro/InputError';

import { AppHeader } from '../../components';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';

class SendVerificationCode extends Component {
  constructor(props) {
    super(props);

    this.verifyCode4 = React.createRef();
    this.verifyCode3 = React.createRef();
    this.verifyCode2 = React.createRef();
    this.verifyCode1 = React.createRef();

    this.state = {
      errorTxt: '',
      sendLoading: false,
    };
  }

  onSubmit = async (values, { setSubmitting }) => {
    const verifyCode =
      values.verifyCode1 +
      values.verifyCode2 +
      values.verifyCode3 +
      values.verifyCode4;

    if (verifyCode.length !== 4) {
      this.setState({ errorTxt: I18n.t('signup-field-required') });
      setSubmitting(false);
      return;
    }

    this.setState({ errorTxt: '' });
    try {
      const response = await axios.post(
        `${API_ENDPOINT_GATEWAY}/forget-password/verify-code`,
        {
          email: this.props.data,
          verifyCode,
        },
      );

      // setSubmitting(false);
      AppNavigation.push({
        name: 'resetPassword',
        passProps: {
          data: this.props.data,
        },
      });
    } catch (error) {
      this.setState({ errorTxt: error[1].message });
      setSubmitting(false);
    }
  };

  reSendCode = async () => {
    if (this.state.sendLoading) return;

    this.setState({ errorTxt: '', sendLoading: true });

    try {
      await axios.post(`${API_ENDPOINT_GATEWAY}/forget-password`, {
        email: this.props.data,
      });
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
          paddingHorizontal={0.5}
          paddingVertical={2}
        />
      </AppView>
      {this.state.sendLoading ? <AppSpinner marginVertical={10} /> : null}
    </>
  );

  renderContinueButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('verify')}
      centerX
      processing={isSubmitting}
      onPress={handleSubmit}
      stretch
      marginTop={5}
      marginBottom={7}
      marginHorizontal={8}
    />
  );

  renderFormInput = ({
    injectFormProps,
    isSubmitting,
    setFieldValue,
    errors,
    handleSubmit,
  }) => (
    <React.Fragment>
      <AppView
        stretch
        borderWidth={1}
        borderColor="inputBorderColor"
        borderRadius={12}
        height={6.5}
        paddingHorizontal={5}
        marginHorizontal={10}
        backgroundColor="white"
        elevation={3}
      >
        <AppView
          stretch
          marginHorizontal={20}
          style={{
            flexDirection: 'row',
          }}
          centerX
        >
          <AppView
            width={10}
            centerX
            borderBottomColor="inputBorderColor"
            borderBottomWidth={1}
            onFocusBorderHighlight={{
              borderBottomColor: '#484848',
            }}
            marginTop={1}
          >
            <AppInput2
              ref={this.verifyCode1}
              nextInput={this.verifyCode2}
              {...injectFormProps('verifyCode1')}
              // width={15}
              paddingHorizontal={1}
              onChange={(name, text) => {
                setFieldValue(name, text);
                if (text) {
                  this.verifyCode2.current.focus();
                }
              }}
              number
              noValidation
              selectTextOnFocus
              maxLength={1}
              center
              size={8}
              bold
              borderTopColor="white"
              borderLeftColor="white"
              borderRightColor="white"
              borderBottomColor="white"
              // borderBottomWidth={1}
              // borderRadius={5}
              borderColor="white"
              onFocusBorderHighlight={{
                borderBottomColor: '#484848',
              }}
              height={5}
              elevation={0}
              noBorder
            />
          </AppView>
          <AppView
            width={10}
            centerX
            borderBottomColor="inputBorderColor"
            borderBottomWidth={1}
            onFocusBorderHighlight={{
              borderBottomColor: '#484848',
            }}
            marginTop={1}
            marginHorizontal={2}
          >
            <AppInput2
              {...injectFormProps('verifyCode2')}
              ref={this.verifyCode2}
              nextInput={this.verifyCode3}
              onChange={(name, text) => {
                setFieldValue(name, text);
                if (text) {
                  this.verifyCode3.current.focus();
                }
              }}
              number
              noValidation
              maxLength={1}
              selectTextOnFocus
              center
              size={8}
              bold
              borderTopColor="white"
              borderLeftColor="white"
              borderRightColor="white"
              borderBottomColor="white"
              borderRadius={0}
              onFocusBorderHighlight={{
                borderBottomColor: '#484848',
              }}
              height={5}
              elevation={0}
              noBorder
            />
          </AppView>
          <AppView
            width={10}
            centerX
            borderBottomColor="inputBorderColor"
            borderBottomWidth={1}
            onFocusBorderHighlight={{
              borderBottomColor: '#484848',
            }}
            marginTop={1}
          >
            <AppInput2
              {...injectFormProps('verifyCode3')}
              ref={this.verifyCode3}
              nextInput={this.verifyCode4}
              onChange={(name, text) => {
                setFieldValue(name, text);
                if (text) {
                  this.verifyCode4.current.focus();
                }
              }}
              number
              noValidation
              maxLength={1}
              selectTextOnFocus
              center
              size={8}
              bold
              borderTopColor="white"
              borderLeftColor="white"
              borderRightColor="white"
              borderBottomColor="white"
              borderRadius={0}
              onFocusBorderHighlight={{
                borderBottomColor: '#484848',
              }}
              height={5}
              elevation={0}
              noBorder
            />
          </AppView>
          <AppView
            width={10}
            centerX
            borderBottomColor="inputBorderColor"
            borderBottomWidth={1}
            onFocusBorderHighlight={{
              borderBottomColor: '#484848',
            }}
            marginTop={1}
            marginHorizontal={2}
          >
            <AppInput2
              {...injectFormProps('verifyCode4')}
              ref={this.verifyCode4}
              onChange={(name, text) => {
                if (text) {
                  Keyboard.dismiss();
                }
              }}
              number
              noValidation
              maxLength={1}
              selectTextOnFocus
              center
              size={8}
              bold
              borderTopColor="white"
              borderLeftColor="white"
              borderRightColor="white"
              borderBottomColor="white"
              borderRadius={0}
              onFocusBorderHighlight={{
                borderBottomColor: '#484848',
              }}
              height={5}
              elevation={0}
              noBorder
            />
          </AppView>
        </AppView>
      </AppView>

      <AppView stretch center height={5} marginVertical={2}>
        {this.state.errorTxt ? (
          <InputError
            error={this.state.errorTxt}
            errorTextMarginHorizontal={2}
            size={5}
          />
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

  renderLogo = () => {
    const {} = this.props;
    return (
      <AppView flex={3} height={60}>
        <AppView
          circleRadius={30}
          elevation={5}
          backgroundColor="button"
          center
          marginTop={30}
        >
          <AppText color="white">LOGO</AppText>
        </AppView>
      </AppView>
    );
  };

  render() {
    return (
      <AppView flex stretch backgroundColor="primary">
        <AppScrollView stretch centerX paddingHorizontal={7}>
          {this.renderLogo()}
          <AppText
            color="white"
            lineHeight={7.5}
            style={{ textAlign: 'center' }}
            size={6.5}
            marginBottom={8}
          >
            {I18n.t('verify-code-was-send-on')}
          </AppText>

          {this.renderForm()}
        </AppScrollView>
        <AppView
          circleRadius={10}
          center
          backgroundColor="button"
          onPress={() => {
            AppNavigation.pop();
          }}
          style={{
            position: 'absolute',
            bottom: 10,
            right: this.props.rtl ? 5 : undefined,
            left: this.props.rtl ? undefined : 5,
          }}
        >
          <AppIcon
            name="md-arrow-round-back"
            type="ion"
            size={10}
            flip
            color="white"
          />
        </AppView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  connected: state.network.isConnected,
  loadingOverlay: state.loadingOverlay.socialSignin,
  rtl: state.lang.rtl,
});
export default connect(
  mapStateToProps,
  null,
)(SendVerificationCode);
