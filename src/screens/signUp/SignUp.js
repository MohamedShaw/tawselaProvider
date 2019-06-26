import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import {
  AppView,
  AppButton,
  AppScrollView,
  AppInput,
  AppText,
  AppForm,
  AppPicker,
  AppInput2,
  AppNavigation,
  AppFormLocation,
  AppIcon,
} from '../../common';
import { AppHeader, AvatarPicker, NoInternet } from '../../components';
import LoadingOverlay from '../../components/loadingOverlay/LoadingOverlay';
import { validationSchemaEGY } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
import { showError } from '../../common/utils/localNotifications';
import { signUp } from '../../actions/AuthActions';
import colors from '../../common/defaults/colors';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.nameArRef = React.createRef();
    this.nameEnRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
  }

  state = {
    dialCode: '',
    selectedCountryId: null,
  };

  onSubmit = async (values, { setSubmitting }) => {
    // if (values.profileImg === '') {
    //   return;
    // }
    this.props.signUp(values, setSubmitting, this.state.dialCode);
  };

  renderNameArInput = injectFormProps => (
    <AppInput
      {...injectFormProps('nameAr')}
      ref={this.nameArRef}
      nextInput={this.nameEnRef}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-nameAr')}
    />
  );

  renderNameEnInput = injectFormProps => (
    <AppInput
      {...injectFormProps('nameEn')}
      ref={this.nameEnRef}
      nextInput={this.emailRef}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-nameEn')}
    />
  );

  renderEmailInput = injectFormProps => (
    <AppInput
      {...injectFormProps('email')}
      ref={this.emailRef}
      nextInput={this.passwordRef}
      email
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-email')}
    />
  );

  renderPasswordInput = ({ injectFormProps, setFieldValue, validateField }) => (
    <AppInput
      {...injectFormProps('password')}
      onChange={(n, v) => {
        setFieldValue(n, v);
        validateField(n);
        if (
          this.confirmPasswordRef.current.getTouchedStatus() &&
          this.confirmPasswordRef.current.getText() !== ''
        )
          validateField('confirmPassword');
      }}
      secure
      showSecureEye
      ref={this.passwordRef}
      nextInput={this.confirmPasswordRef}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-password')}
    />
  );

  renderConfirmPassInput = injectFormProps => (
    <AppInput
      {...injectFormProps('confirmPassword')}
      secure
      showSecureEye
      ref={this.confirmPasswordRef}
      nextInput={this.phoneRef}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-confirmPassword')}
    />
  );

  renderSubmitButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('continue')}
      stretch
      height={6}
      onPress={handleSubmit}
      processing={isSubmitting}
    />
  );

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    validateField,
  }) => (
    <AppScrollView flex stretch paddingBottom={10}>
      <AppView
        flex
        center
        stretch
        paddingHorizontal={10}
        paddingTop={15}
        marginHorizontal={10}
      >
        <AvatarPicker
          onChange={uri => {
            setFieldValue('profileImg', uri);
          }}
        />
        {this.renderNameArInput(injectFormProps)}
        {this.renderNameEnInput(injectFormProps)}
        {this.renderEmailInput(injectFormProps)}
        {this.renderPasswordInput({
          injectFormProps,
          setFieldValue,
          validateField,
        })}
        {this.renderConfirmPassInput(injectFormProps, validateField)}
        {this.renderSubmitButton(isSubmitting, handleSubmit)}
      </AppView>
    </AppScrollView>
  );

  render() {
    const { connected } = this.props;
    if (!connected) {
      return (
        <AppView flex stretch>
          <AppHeader title={I18n.t('signup-title')} />
          <NoInternet />
        </AppView>
      );
    }

    return (
      <>
        <AppView flex stretch backgroundColor="primary">
          <AppForm
            schema={{
              profileImg: '',
              nameAr: '',
              nameEn: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchemaEGY}
            render={this.renderForm}
            onSubmit={this.onSubmit}
          />
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
        {this.props.loadingOverlay ? <LoadingOverlay /> : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  loadingOverlay: state.loadingOverlay.socialSignin,
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
