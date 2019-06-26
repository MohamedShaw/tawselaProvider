import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';

import axios from 'axios';
import { validationSchema } from './validate';
import { showError } from '../../common/utils/localNotifications';

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  AppInput,
  AppForm,
} from '../../common';
import { ItemMore, AppHeader, InfoModal } from '../../components';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';

class ChangePassword extends Component {
  // icon and text
  static propTypes = {
    currentUser: PropTypes.objectOf(PropTypes.any),
  };

  constructor(props) {
    super(props);
    this.currentPassword = React.createRef();
    this.newPassword = React.createRef();
    this.confrimPassword = React.createRef();
    this.state = {
      isInfoModalVisible: false,
    };
  }

  onSubmit = async (values, { setSubmitting, setErrors }) => {
    const userId = this.props.currentUser.user.id;
    try {
      const response = await axios.patch(
        `${API_ENDPOINT_GATEWAY}/users/${userId}/change-password`,
        {
          newPassword: values.newPassword,
          currentPassword: values.currentPassword,
        },
      );

      this.setState({
        isInfoModalVisible: true,
      });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);

      console.log(error);
      if (error[0].response.status === 400) {
        setErrors({
          currentPassword: I18n.t('invalid-password'),
        });
      } else {
        showError(error[1].message);
      }
    }
  };

  renderActionButton = (handleSubmit, isSubmitting) => (
    <AppButton
      onPress={handleSubmit}
      title={I18n.t('change-password')}
      size={5}
      stretch
      marginTop={7}
      processing={isSubmitting}
    />
  );

  renderInputForm = ({
    injectFormProps,
    handleSubmit,
    isSubmitting,
    setErrors,
    setFieldValue,
    validateField,
  }) => (
    <AppView stretch paddingHorizontal={8} marginTop={15}>
      <AppInput
        label={I18n.t('setting-current-password')}
        {...injectFormProps('currentPassword')}
        secure
        showSecureEye
        ref={this.currentPassword}
        nextInput={this.newPassword}
      />

      <AppInput
        label={I18n.t('setting-new-password')}
        secure
        showSecureEye
        {...injectFormProps('newPassword')}
        ref={this.newPassword}
        nextInput={this.confrimPassword}
        onChange={(n, v) => {
          setFieldValue(n, v);

          if (
            this.confrimPassword.current.getTouchedStatus() &&
            this.confrimPassword.current.getText() !== ''
          )
            validateField('confrimPassword');
        }}
      />
      <AppInput
        label={I18n.t('setting-new-confirm-password')}
        secure
        showSecureEye
        {...injectFormProps('confrimPassword')}
        ref={this.confrimPassword}
      />
      {this.renderActionButton(handleSubmit, isSubmitting, setErrors)}
    </AppView>
  );

  renderForm = () => (
    <AppForm
      schema={{
        currentPassword: '',
        newPassword: '',
        confrimPassword: '',
      }}
      validationSchema={validationSchema}
      render={this.renderInputForm}
      onSubmit={this.onSubmit}
    />
  );

  render() {
    const { currentUser } = this.props;
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('setting-change-password')} />
        {this.renderForm()}
        <InfoModal
          isVisible={this.state.isInfoModalVisible}
          message={I18n.t('password-change-correct')}
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
            AppNavigation.pop();
          }}
          changeState={v => {
            this.setState({
              isInfoModalVisible: v,
            });
          }}
          marginHorizontal={10}
          lineHeight={8}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
