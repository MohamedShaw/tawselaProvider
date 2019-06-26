import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import {
  AppView,
  AppText,
  AppInput,
  AppInput2,
  AppScrollView,
  AppButton,
  AppForm,
  AppNavigation,
  AppIcon,
  AppImage,
} from '../../common';
import Colors from '../../common/defaults/colors';
import { AppErrorModal, LoadingOverlay } from '../../components';
import { validationSchema } from './validation';
import { signIn, resetLoginError } from '../../actions/AuthActions';

class SiginIn extends Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
  }

  state = {
    showInvalidUserModal: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        showInvalidUserModal: true,
      });
    }
  }

  renderForm = ({ injectFormProps, handleSubmit, isSubmitting }) => (
    <AppView stretch marginTop={50} marginBottom={10} marginHorizontal={10}>
      <AppInput
        label={I18n.t('email-or-phone')}
        {...injectFormProps('email')}
        email
        ref={this.email}
        nextInput={this.password}
        borderWidth={1}
        borderRadius={5}
        leftItems={<AppIcon name="person" type="material" />}
      />

      <AppInput
        label={I18n.t('password')}
        secure
        showSecureEye
        ref={this.password}
        {...injectFormProps('password')}
        leftItems={<AppIcon name="person" type="material" />}
      />

      <AppButton
        marginTop={5}
        stretch
        borderRadius={7}
        processing={isSubmitting}
        onPress={handleSubmit}
        title={I18n.t('login')}
        backgroundColor="#231F20"
      />
    </AppView>
  );

  renderSignUpButton = () => (
    <AppView row marginBottom={5} stretch spaceBetween>
      <AppView stretch row reverse>
        {/* <AppButton
          onPress={() => {
            AppNavigation.push({
              name: 'forgetPassword',
            });
          }}
          title={I18n.t('forgot-password')}
          size={5}
          color="button"
          transparent
        /> */}
      </AppView>
      <AppButton
        transparent
        onPress={() => {
          AppNavigation.push({
            name: 'signUp',
          });
        }}
      >
        <AppText size={5} bold color="button">
          {I18n.t('create-account')}
        </AppText>
      </AppButton>
    </AppView>
  );

  renderLogo = () => {
    const {} = this.props;
    return (
      <AppView
        elevation={5}
        circleRadius={35}
        center
        marginTop={20}
        backgroundColor="primary"
        padding={2}
      >
        <AppImage
          source={require('../../assets/imgs/tawsila.jpg')}
          circleRadius={34}
          resizeMode="contain"
        />
      </AppView>
    );
  };

  onSubmit = async (values, { setSubmitting }) => {
    this.props.onSignIn(values, setSubmitting);
  };

  render() {
    return (
      <>
        <SafeAreaView style={{ alignSelf: 'stretch', flex: 1 }}>
          <AppScrollView
            flex
            stretch
            center
            paddingTop={10}
            paddingHorizontal={7}
            flexGrow
            backgroundColor="primary"
          >
            {this.renderLogo()}

            <AppForm
              schema={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              render={this.renderForm}
              onSubmit={this.onSubmit}
            />
            <AppView flex />
            {this.renderSignUpButton()}
            <AppErrorModal
              visible={this.state.showInvalidUserModal}
              fromSignIn
              changeState={v => {
                this.props.onResetLoginError();
                this.setState({
                  showInvalidUserModal: v,
                });
              }}
              errorMessage={[this.props.error]}
              onConfirm={() => {
                this.props.onResetLoginError();
                this.setState({
                  showInvalidUserModal: false,
                });
              }}
            />
          </AppScrollView>
        </SafeAreaView>
        {this.props.loadingOverlay ? <LoadingOverlay /> : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loadingOverlay: state.loadingOverlay.socialSignin,
});
const mapDispatchToProps = dispatch => ({
  onSignIn: bindActionCreators(signIn, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SiginIn);
