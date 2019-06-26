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
  AppNavigation,
  AppFormLocation,
} from '../../common';
import { AppHeader, AvatarPicker } from '../../components';
import { validationSchema } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
import { showError } from '../../common/utils/localNotifications';
import colors from '../../common/defaults/colors';
import { updateProfile } from '../../actions/UpdateProfileActions';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.nameArRef = React.createRef();
    this.nameEnRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.phoneRef = React.createRef();
    this.country = React.createRef();
    this.city = React.createRef();
    console.log('current User', props.currentUser);

    this.state = {
      selectedCountryId: null,
    };
  }

  onSubmit = async (values, { setSubmitting }) => {
    const { currentUser } = this.props;

    this.props.updateProfile(values, setSubmitting);
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
      email
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-email')}
    />
  );

  renderSubmitButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('profileUpdate-save-updates')}
      stretch
      height={7}
      onPress={handleSubmit}
      // linear
      processing={isSubmitting}
    />
  );

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  }) => (
    <AppScrollView flex stretch paddingBottom={10}>
      <AppView
        flex
        center
        stretch
        paddingHorizontal={10}
        borderTopWidth={1}
        borderTopColor="grey"
      >
        <AvatarPicker
          initialUriValue={this.props.currentUser.user.profileImage}
          onChange={uri => {
            setFieldValue('profileImg', uri);
          }}
        />

        {this.renderNameArInput(injectFormProps)}
        {this.renderNameEnInput(injectFormProps)}
        {this.renderEmailInput(injectFormProps)}

        {this.renderSubmitButton(isSubmitting, handleSubmit)}
      </AppView>
    </AppScrollView>
  );

  render() {
    const { currentUser } = this.props;
    console.log('current User', currentUser);

    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('profileUpdate-title')} />

        <AppForm
          schema={{
            profileImg: currentUser.user.profileImage,
            nameAr: currentUser.user.name.ar,
            nameEn: currentUser.user.name.en,
            email: currentUser.user.email,
          }}
          validationSchema={validationSchema}
          render={this.renderForm}
          onSubmit={this.onSubmit}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: bindActionCreators(updateProfile, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfile);
