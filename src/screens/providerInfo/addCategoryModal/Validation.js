import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchemaName = values =>
  yup.object().shape({
    order: yup.string().required(I18n.t('signup-field-required')),
  });
