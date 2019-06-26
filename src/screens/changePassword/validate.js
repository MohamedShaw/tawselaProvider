import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values =>
  yup.object().shape({
    currentPassword: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
        I18n.t('signup-password-invalid'),
      ),
    newPassword: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
        I18n.t('signup-password-invalid'),
      ),

    confrimPassword: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .oneOf(
        [values.newPassword, ''],
        I18n.t('signup-confirmPassword-invalid'),
      ),
  });
