import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { SafeAreaView, Platform, Switch } from 'react-native';

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
  AppIcon,
} from '../../common';
import {
  AppHeader,
  AvatarPicker,
  ImagePicker,
  AppErrorModal,
  ItemMore,
  ProviderGenderType,
} from '../../components';
import { validationSchema } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
import { showError } from '../../common/utils/localNotifications';
import colors from '../../common/defaults/colors';
import { clientCheck, resetLoginError } from '../../actions/AuthActions';

class CompleteData extends Component {
  state = {
    showInvalidUserModal: false,
    isBusy: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        showInvalidUserModal: true,
      });
    }
  }

  onSubmit = async (values, { setSubmitting }) => {
    const value = { ...values };
    value.busy = this.state.isBusy;

    this.props.clientCheck(value, setSubmitting, this.props.data);
  };

  renderSwitch = () => {
    const { data } = this.props;
    return (
      <>
        <AppView stretch paddingVertical={5}>
          <ItemMore
            leftItem={
              <Switch
                trackColor={{
                  true: '#4CD964',
                }}
                ios_backgroundColor="#ccc"
                thumbColor="white"
                value={this.state.isBusy}
                onValueChange={v => {
                  this.setState({
                    isBusy: v,
                  });
                }}
              />
            }
            rightItem={
              <AppView row paddingHorizontal={2}>
                <AppText size={5.5}>{I18n.t('busy')}</AppText>
              </AppView>
            }
          />
        </AppView>
      </>
    );
  };

  renderTransferFeesInput = injectFormProps => (
    <AppInput
      {...injectFormProps('transferFees')}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('transferFees')}
    />
  );

  renderSubmitButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('save')}
      stretch
      height={7}
      onPress={handleSubmit}
      // linear
      processing={isSubmitting}
      marginTop={10}
    />
  );

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  }) => (
    <AppScrollView flex stretch paddingBottom={10} center>
      <AppView flex center stretch paddingHorizontal={10} marginTop={20}>
        <ProviderGenderType
          paddingVertical={8}
          // paddingHorizontal={4}
          borderBottomColor="grey"
          borderBottomWidth={1}
          {...injectFormProps('gender', 'onSelect')}
        />
        <AppView stretch>
          <AppText marginVertical={4}>{I18n.t('choose-image')} :</AppText>
          <ImagePicker
            maxImages={1}
            errorTextMarginHorizontal
            {...injectFormProps('identityCard')}
          />
        </AppView>

        {this.renderTransferFeesInput(injectFormProps)}
        {this.renderSwitch()}

        <AppView flexGrow />
        {this.renderSubmitButton(isSubmitting, handleSubmit)}
      </AppView>
    </AppScrollView>
  );

  render() {
    const { currentUser } = this.props;

    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('completeData-header-title')} />

        <AppForm
          schema={{
            gender: 'MALE',
            identityCard: '',
            transferFees: '',
            busy: '',
          }}
          validationSchema={validationSchema}
          render={this.renderForm}
          onSubmit={this.onSubmit}
        />
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
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  currentUser: state.auth.currentUser,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  clientCheck: bindActionCreators(clientCheck, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompleteData);
