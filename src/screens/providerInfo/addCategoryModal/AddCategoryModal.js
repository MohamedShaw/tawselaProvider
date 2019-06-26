import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import {
  AppView,
  AppText,
  AppModal,
  AppButton,
  AppInput,
  AppForm,
} from '../../../common';

import { validationSchemaName } from './Validation';
import { API_ENDPOINT_FOOD_SERVICE } from '../../../utils/Config';
import { refreshList } from '../../../actions/list';
import { AppErrorModal } from '../../../components';

const { CancelToken } = Axios;

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.source = CancelToken.source();
    this.state = {
      showInvalidUserModal: false,
      error: '',
    };
  }

  componentWillUnmount() {
    this.source.cancel('Network Operation Canceled.');
  }

  onSubmitAddCategory = async (values, { setSubmitting, setErrors }) => {
    const providerId = this.props.data.user._id;
    try {
      const res = await Axios.post(
        `${API_ENDPOINT_FOOD_SERVICE}orders?providerId=${providerId}`,
        values,
        { cancelToken: this.source.token },
      );
      this.props.changeState(false);
      console.log('response ===>>', res);
    } catch (error) {
      console.log('response Error', error);

      if (!Axios.isCancel(error[1])) {
        if (!error[1].response) {
          this.setState({
            showInvalidUserModal: true,
            error: error[1].message,
          });
        }
        setErrors(error[2]);
        setSubmitting(false);
      }
    }
  };

  renderFormAddCategory = ({
    injectFormProps,
    handleSubmit,
    isSubmitting,
    errors,
    setFieldValue,
  }) => (
    <AppView stretch>
      <AppInput
        label={I18n.t('add-category-modal-inputLabel')}
        {...injectFormProps('order')}
        errorTextMarginBottom={2}
      />

      <AppView row spaceBetween stretch>
        <AppButton
          title={
            this.props.categoryData
              ? I18n.t('update-category-modal-add')
              : I18n.t('add-category-modal-add')
          }
          touchableOpacity
          onPress={handleSubmit}
          height={6}
          paddingHorizontal={13.5}
          processing={isSubmitting}
        />
        <AppButton
          backgroundColor="#ACB5BB"
          title={I18n.t('add-category-modal-cancel')}
          touchableOpacity
          onPress={() => this.props.changeState(false)}
          height={6}
          paddingHorizontal={13.5}
        />
      </AppView>
    </AppView>
  );

  render() {
    const { isVisible, type, categoryData, ...rest } = this.props;

    return (
      <>
        <AppModal
          animationIn="bounceIn"
          animationOut="bounceOut"
          isVisible={isVisible}
          {...rest}
        >
          <KeyboardAvoidingView behavior="position" enabled>
            <AppView
              width={70}
              backgroundColor="white"
              paddingVertical={6}
              paddingHorizontal={8}
              borderRadius={5}
              center
              style={{ marginBottom: 48 }}
            >
              <AppText bold center marginBottom={6}>
                {categoryData
                  ? I18n.t('update-category-modal-title')
                  : I18n.t('add-category-modal-title')}
              </AppText>
              <AppForm
                schema={{
                  order: '',
                }}
                validationSchema={validationSchemaName}
                render={this.renderFormAddCategory}
                onSubmit={this.onSubmitAddCategory}
              />
            </AppView>
          </KeyboardAvoidingView>
        </AppModal>
        <AppErrorModal
          visible={this.state.showInvalidUserModal}
          fromSignIn
          changeState={v => {
            this.setState({
              showInvalidUserModal: v,
            });
          }}
          errorMessage={[this.state.error]}
          onConfirm={() => {
            this.setState({
              showInvalidUserModal: false,
            });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddModal);
