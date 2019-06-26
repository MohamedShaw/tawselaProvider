import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import axios from 'axios';
import { connect } from 'react-redux';
import { AppHeader } from '../../components';
import { validationSchemaEmail } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';

import {
  AppView,
  AppButton,
  AppInput2,
  AppForm,
  AppNavigation,
  AppImage,
  AppScrollView,
  AppText,
  AppIcon,
} from '../../common';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTxt: '',
    };
  }

  onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT_GATEWAY}/forget-password`,
        {
          email: values.emailOrPassword,
        },
      );

      if (response && response.status === 204) {
        AppNavigation.push({
          name: 'sendVerificationCode',
          passProps: { data: values.emailOrPassword },
        });
      }
      setSubmitting(false);
    } catch (error) {
      this.setState({ errorTxt: error[1].message });
      setSubmitting(false);
    }
  };

  renderButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('continue-button')}
      centerX
      processing={isSubmitting}
      onPress={handleSubmit}
      stretch
    />
  );

  renderFormInputs = ({
    injectFormProps,
    setFieldValue,
    isSubmitting,
    errors,
    handleSubmit,
  }) => (
    <React.Fragment>
      <AppInput2
        {...injectFormProps('emailOrPassword')}
        onChange={(name, v, noValidation) => {
          setFieldValue(name, v, noValidation);
          this.setState({
            errorTxt: '',
          });
        }}
        email
        error={this.state.errorTxt || errors.emailOrPassword}
        placeholder={I18n.t('email-or-phone')}
        paddingHorizontal={2}
        marginBottom={2}
      />
      {this.renderButton(isSubmitting, handleSubmit)}
    </React.Fragment>
  );

  renderForm = () => (
    <AppView stretch marginHorizontal={10} marginTop={5}>
      <AppForm
        schema={{
          emailOrPassword: '',
        }}
        validationSchema={validationSchemaEmail}
        render={this.renderFormInputs}
        onSubmit={this.onSubmit}
      />
    </AppView>
  );

  renderLogo = () => {
    const {} = this.props;
    return (
      <AppView flex={3} height={65}>
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
          <AppText> {I18n.t('enter-your-account')} </AppText>
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
)(ForgetPassword);
