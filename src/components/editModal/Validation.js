import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchemaPrice = values =>
  yup.object().shape({
    name: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .trim()
      .matches(
        /^(?!^[0-9\u0660-\u0669]+$)^.+$/,
        I18n.t('name-size-validation'),
      ),
    price: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(/^(\d)+$/, I18n.t('price-calories-valid')),

    calories: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(/^(\d)+$/, I18n.t('price-calories-valid')),
  });
export const validationSchemaType = values =>
  yup.object().shape({
    name: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .trim()
      .matches(
        /^(?!^[0-9\u0660-\u0669]+$)^.+$/,
        I18n.t('name-size-validation'),
      ),
    price: yup.string().matches(/^(\d)*$/, I18n.t('price-calories-valid')),
  });
