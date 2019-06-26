import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import axios from 'axios';
import { Switch } from 'react-native';
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
  AppWheelPicker,
} from '../../common';
import {
  AppHeader,
  AvatarPicker,
  NoInternet,
  ItemMore,
} from '../../components';
import LoadingOverlay from '../../components/loadingOverlay/LoadingOverlay';
import { validationSchema } from './validation';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
import { showError } from '../../common/utils/localNotifications';
import { signUp } from '../../actions/AuthActions';
import colors from '../../common/defaults/colors';

class AddPlan extends Component {
  constructor(props) {
    super(props);

    this.nameArRef = React.createRef();
    this.nameEnRef = React.createRef();
    this.description = React.createRef();
    this.price = React.createRef();
    this.duration = React.createRef();
  }

  state = {
    free: false,
  };

  onSubmit = async (values, { setSubmitting }) => {
    const value = { ...values };

    value.free = this.state.free;
    console.log('VALUES', value);
    try {
      const response = await axios.post(`${API_ENDPOINT_GATEWAY}plans`, value, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSubmitting(false);
      AppNavigation.pop();
    } catch (error) {
      setSubmitting(false);

      showError(`${I18n.t('ui-error-happened')}`);
      console.log('error====>>', error);
    }
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
      nextInput={this.description}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('signup-nameEn')}
    />
  );

  renderDescriptionInput = injectFormProps => (
    <AppInput
      {...injectFormProps('description')}
      ref={this.description}
      nextInput={this.price}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('description')}
    />
  );

  renderPriceInput = injectFormProps => (
    <AppInput
      {...injectFormProps('price')}
      ref={this.price}
      nextInput={this.duration}
      borderWidth={1}
      borderRadius={5}
      label={I18n.t('price')}
    />
  );

  renderSubmitButton = (isSubmitting, handleSubmit) => (
    <AppButton
      title={I18n.t('post_plan')}
      stretch
      height={7}
      onPress={handleSubmit}
      processing={isSubmitting}
    />
  );

  renderSwitch = () => {
    const { data } = this.props;
    return (
      <>
        <AppView stretch paddingVertical={5} paddingHorizontal={5}>
          <ItemMore
            leftItem={
              <Switch
                trackColor={{
                  true: '#4CD964',
                }}
                ios_backgroundColor="#ccc"
                thumbColor="white"
                value={this.state.free}
                onValueChange={v => {
                  this.setState({
                    free: v,
                  });
                }}
              />
            }
            rightItem={
              <AppText size={5.5} paddingHorizontal={4}>
                {I18n.t('free')}
              </AppText>
            }
          />
        </AppView>
      </>
    );
  };

  renderDuration = injectFormProps => {
    const {} = this.props;
    return (
      <AppInput
        {...injectFormProps('duration')}
        ref={this.duration}
        borderWidth={1}
        borderRadius={5}
        label={I18n.t('duration')}
      />
    );
  };

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    validateField,
  }) => (
    <AppScrollView flex stretch paddingBottom={10}>
      <AppView flex center stretch paddingHorizontal={10} marginTop={10}>
        {this.renderNameArInput(injectFormProps)}
        {this.renderNameEnInput(injectFormProps)}
        {this.renderDescriptionInput(injectFormProps)}
        {this.renderPriceInput(injectFormProps)}
        {this.renderDuration(injectFormProps)}

        {this.renderSwitch()}
        {this.renderSubmitButton(isSubmitting, handleSubmit)}
      </AppView>
    </AppScrollView>
  );

  render() {
    return (
      <>
        <AppView flex stretch>
          <AppHeader title={I18n.t('post_plan')} />

          <AppForm
            schema={{
              nameAr: '',
              nameEn: '',
              description: '',
              duration: '',
              durationTimeUnit: 'MONTH',
              free: '',
              price: '',
            }}
            validationSchema={validationSchema}
            render={this.renderForm}
            onSubmit={this.onSubmit}
          />
        </AppView>
        {this.props.loadingOverlay ? <LoadingOverlay /> : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  loadingOverlay: state.loadingOverlay.socialSignin,
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPlan);
