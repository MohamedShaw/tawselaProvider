import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { KeyboardAvoidingView } from 'react-native';
import {
  AppView,
  AppText,
  AppModal,
  AppIcon,
  AppButton,
  AppInput,
  AppScrollView,
  AppForm,
} from '../../common';
import {
  validationSchemaPrice,
  validationSchemaType,
  validationSchemaAddPrice,
} from './Validation';

class EditModal extends Component {
  static propTypes = {
    type: PropsTypes.string,
  };

  static defaultProps = {
    type: 'success',
  };

  onSubmitEditPrice = async (values, { setSubmitting }) => {
    this.props.onConfirm(values);
  };

  onSubmitEditType = async (values, { setSubmitting }) => {
    this.props.onConfirm(values);
  };

  renderFormEditPrice = ({ injectFormProps, handleSubmit, isSubmitting }) => {
    const { onDelete } = this.props;
    return (
      <AppView stretch>
        <AppView stretch paddingHorizontal={8}>
          <AppInput
            label={I18n.t('add-category-price-size-modal-size-label')}
            {...injectFormProps('name')}
          />
          <AppInput
            label={I18n.t('add-category-price-size-modal-price-label')}
            {...injectFormProps('price')}
            number
          />
          <AppInput
            label={I18n.t('add-category-price-size-modal-calories-label')}
            {...injectFormProps('calories')}
            number
          />
        </AppView>
        <AppView row spaceBetween stretch paddingHorizontal={4}>
          <AppButton
            title={I18n.t('add-category-edit-modal-save')}
            touchableOpacity
            onPress={handleSubmit}
            height={6}
            flex
            marginHorizontal={4}
            size={5}
          />
          <AppButton
            backgroundColor="#ACB5BB"
            title={I18n.t('add-category-edit-modal-delete')}
            touchableOpacity
            onPress={onDelete}
            height={6}
            flex
            marginHorizontal={4}
            size={5}
          />
        </AppView>
      </AppView>
    );
  };

  renderEditPriceSize = () => {
    const { isVisible, type, data, ...rest } = this.props;
    return (
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
            borderRadius={5}
            center
            // height={30}
            style={{ marginBottom: 48 }}
          >
            <AppText center marginBottom={6}>
              {this.props.message}
            </AppText>
            <AppForm
              schema={{
                name: data ? data.name : '',
                price: data ? `${data.price}` : '',
                calories: data ? `${data.calories}` : '',
              }}
              validationSchema={validationSchemaPrice}
              render={this.renderFormEditPrice}
              onSubmit={this.onSubmitEditPrice}
            />
          </AppView>
        </KeyboardAvoidingView>
      </AppModal>
    );
  };

  renderFormEditType = ({ injectFormProps, handleSubmit, isSubmitting }) => {
    const { onDelete, editCategory } = this.props;
    return (
      <AppView stretch>
        <AppView stretch paddingHorizontal={8}>
          <AppInput
            label={
              editCategory
                ? I18n.t('add-category-add-type-modal-add-type-label')
                : I18n.t('add-category-add')
            }
            {...injectFormProps('name')}
          />
          <AppInput
            label={I18n.t('add-category-add-type-modal-add-cost-label')}
            {...injectFormProps('price')}
            number
          />
        </AppView>
        <AppView row spaceBetween stretch paddingHorizontal={4}>
          <AppButton
            title={
              editCategory
                ? I18n.t('add-category-edit-modal-save')
                : I18n.t('add-category-edit-modal-edit-addition')
            }
            touchableOpacity
            onPress={handleSubmit}
            height={6}
            marginHorizontal={4}
            flex
            size={5}
          />
          <AppButton
            backgroundColor="#ACB5BB"
            title={
              editCategory
                ? I18n.t('add-category-edit-modal-delete-type')
                : I18n.t('add-category-edit-modal-delete-addition')
            }
            touchableOpacity
            onPress={onDelete}
            height={6}
            marginHorizontal={4}
            flex
            size={5}
          />
        </AppView>
      </AppView>
    );
  };

  renderEditType = () => {
    const { isVisible, data, ...rest } = this.props;
    return (
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
            borderRadius={5}
            center
            style={{ marginBottom: 48 }}
          >
            <AppText center marginBottom={6}>
              {this.props.message}
            </AppText>
            <AppForm
              schema={{
                name: data ? `${data.name}` : '',
                price: data.price !== null ? `${data.price}` : '',
              }}
              validationSchema={validationSchemaType}
              render={this.renderFormEditType}
              onSubmit={this.onSubmitEditType}
            />
          </AppView>
        </KeyboardAvoidingView>
      </AppModal>
    );
  };

  render() {
    const {
      isVisible,
      type,
      editPrice,
      editTypeCost,
      addPrice,
      ...rest
    } = this.props;

    return (
      <>
        {editPrice
          ? this.renderEditPriceSize()
          : editTypeCost
          ? this.renderEditType()
          : null}
      </>
    );
  }
}

export default EditModal;
