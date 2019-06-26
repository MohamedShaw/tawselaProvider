import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchemaWithOrder = () =>
  yup.object().shape({
    order: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(/^(\d)*$/,I18n.t('condition-number')),
      messages: yup
      .string()
      .required(I18n.t('signup-field-required'))
  })

  export const validationSchemaWithoutOrder = () =>
  yup.object().shape({
      messages: yup
      .string()
      .required(I18n.t('signup-field-required'))
  })