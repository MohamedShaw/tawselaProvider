import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchemaEGY = values =>
  yup.object().shape({
    phone: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /^^0?1([0-2]|5){1}[0-9]{8}$/,
        I18n.t('signup-invalid-phone-error'),
      ),
  });

export const validationSchemaSAUDIA = values =>
  yup.object().shape({
    phone: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /^0?5(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
        I18n.t('signup-invalid-phone-error'),
      ),
  });
