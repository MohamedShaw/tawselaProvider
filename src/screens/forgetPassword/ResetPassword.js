import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import axios from 'axios';
import { AppHeader, InfoModal } from '../../components';
import { validationSchemaPasswords } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';

import {
  AppView,
  AppButton,
  AppInput,
  AppForm,
  AppNavigation,
  showError,
  AppScrollView,
} from '../../common';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfoModalVisible: false,
    };

    this.confirmPasswordRef = React.createRef();
  }

  onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${API_ENDPOINT_GATEWAY}/forget-password/new-password`, {
        email: this.props.data,
        newPassword: values.password,
      });
      setSubmitting(false);
      this.setState({
        isInfoModalVisible: true,
      });
    } catch (error) {
      setSubmitting(false);
      showError(error[1].message);
    }
  };

  renderButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('resetPassword-change-button')}
      marginVertical={15}
      paddingVertical={6}
      processing={isSubmitting}
      onPress={handleSubmit}
      stretch
    />
  );

  renderFormInputs = ({
    injectFormProps,
    isSubmitting,
    errors,
    handleSubmit,
    setFieldValue,
    validateField,
  }) => (
    <React.Fragment>
      <AppInput
        {...injectFormProps('password')}
        nextInput={this.confirmPasswordRef}
        password
        secure
        showSecureEye
        label={I18n.t('new-password')}
        onChange={(n, v) => {
          setFieldValue(n, v);

          if (
            this.confirmPasswordRef.current.getTouchedStatus() &&
            this.confirmPasswordRef.current.getText() !== ''
          )
            validateField('confirmPassword');
        }}
      />
      <AppInput
        {...injectFormProps('confirmPassword')}
        ref={this.confirmPasswordRef}
        password
        secure
        showSecureEye
        label={I18n.t('confirm-new-password')}
      />

      {this.renderButton(isSubmitting, handleSubmit)}
    </React.Fragment>
  );

  renderForm = () => (
    <AppView stretch marginHorizontal={6} marginTop={20}>
      <AppForm
        schema={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchemaPasswords}
        render={this.renderFormInputs}
        onSubmit={this.onSubmit}
      />
    </AppView>
  );

  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('restore-password')} />
        <AppScrollView stretch centerX>
          {this.renderForm()}
        </AppScrollView>

        <InfoModal
          isVisible={this.state.isInfoModalVisible}
          message={I18n.t('password-changed-success')}
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
            AppNavigation.setStackRoot({ name: 'signIn' });
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

export default ResetPassword;
