import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import AppHeader from '../../components/Header';
import { validationSchemaEGY, validationSchemaSAUDIA } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
import { setCurrentUser } from '../../actions/AuthActions';
import {
  AppView,
  AppText,
  AppButton,
  AppInput,
  AppForm,
  AppNavigation,
} from '../../common';
import { showError, showSuccess } from '../../common/utils/localNotifications';

class ChangePhone extends Component {
  onSubmit = async (values, { setSubmitting }) => {
    const dailCode = this.props.currentUser.user.city.country.dialCode;
    let phone = '';
    if (dailCode === '+20' && values.phone.startsWith('0')) {
      phone = dailCode + values.phone.slice(1);
    } else {
      phone = dailCode + values.phone;
    }

    try {
      await axios.put(`${API_ENDPOINT_GATEWAY}auth/signup/new-phone`, {
        phone,
      });

      const userAfterUpdatePhone = this.props.currentUser;

      const user = {
        ...userAfterUpdatePhone,
        user: {
          ...userAfterUpdatePhone.user,
          phone,
        },
      };
      this.props.setCurrentUser(user);
      setSubmitting(false);
      if (this.props.onChange) {
        this.props.onChange();
      }
      showSuccess(I18n.t('otp-screen-phone-changed'));

      AppNavigation.pop();
    } catch (error) {
      setSubmitting(false);
      showError(error[1].message);
    }
  };

  renderPhoneInput = injectFormProps => {
    const { currentUser } = this.props;

    return (
      <AppView row spaceBetween>
        <AppView flex={3.5}>
          <AppInput
            {...injectFormProps('phone')}
            phone
            borderWidth={1}
            borderRadius={5}
            label={I18n.t('signup-phone')}
            asyncDataResolver={value => ({
              url: `${API_ENDPOINT_GATEWAY}auth/check-phone`,
              data: {
                phone: value,
                country: currentUser.user.city.country.id,
              },
            })}
            asyncErrorResolver={res => {
              if (res.data.found) {
                return I18n.t('signup-phone-exists-error');
              }
              if (res.data.invalidPhone) {
                return I18n.t('signup-invalid-phone-error');
              }
              return '';
            }}
          />
        </AppView>
        <AppView
          height={7.5}
          style={{ alignSelf: 'flex-start' }}
          flex
          center
          borderColor="#8A8A8A"
          borderWidth={1}
          marginLeft={5}
          borderRadius={5}
        >
          <AppText color="#8A8A8A" size={5.5}>
            {currentUser && currentUser.user.city.country.dialCode}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderFormInputs = ({ injectFormProps, isSubmitting, handleSubmit }) => (
    <React.Fragment>
      <AppView stretch marginHorizontal={8}>
        {this.renderPhoneInput(injectFormProps)}
      </AppView>
      {this.renderChangeButton(isSubmitting, handleSubmit)}
    </React.Fragment>
  );

  renderChangeButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('change-phone-resend-code')}
      centerX
      processing={isSubmitting}
      onPress={handleSubmit}
      stretch
      marginTop={8}
      marginBottom={3}
      marginHorizontal={8}
      height={6}
    />
  );

  renderForm = () => (
    <AppView stretch flex centerX>
      <AppForm
        schema={{
          phone: '',
        }}
        validationSchema={
          this.props.currentUser.user.city.country.dialCode === '+20'
            ? validationSchemaEGY
            : validationSchemaSAUDIA
        }
        render={this.renderFormInputs}
        onSubmit={this.onSubmit}
      />
    </AppView>
  );

  render() {
    return (
      <AppView flex>
        <AppHeader title={I18n.t('change-phone')} />
        <AppView
          centerX
          stretch
          marginHorizontal={23}
          marginVertical={13}
          paddingBottom={5}
        >
          <AppText bold size={5} color="grey">
            {I18n.t('otpScreen-change-phone-text')}
          </AppText>
        </AppView>

        {this.renderForm()}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePhone);
