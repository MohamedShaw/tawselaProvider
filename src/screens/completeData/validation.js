import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values =>
  yup.object().shape({
    transferFees: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(/^\d{0,10}(\.\d{1,2})?$/, I18n.t('must-be-num-with-two-digits'))
      .matches(
        /^((?!0*(\.0+)?$)(\d+|\d*\.\d+)$)*$/,
        I18n.t('not-zero-validation'),
      ),
    identityCard: yup.string().required(I18n.t('signup-field-required')),
    gender: yup.string().required(I18n.t('signup-field-required')),
  });
