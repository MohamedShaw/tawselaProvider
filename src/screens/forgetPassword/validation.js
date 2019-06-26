import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchemaPasswords = values =>
  yup.object().shape({
    password: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
        I18n.t('signup-password-invalid'),
      ),

    confirmPassword: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .oneOf([values.password, ''], I18n.t('signup-confirmPassword-invalid')),
  });

export const validationSchemaEmail = values =>
  yup.object().shape({
    emailOrPassword: yup
      .string()
      .required(` ${I18n.t('signup-field-required')}`)
      .test('phone', I18n.t('signup-invalid-phone-error'), v => {
        if (v === '+') return true;

        if (!Number.isNaN(parseInt(v))) {
          if (!v.startsWith('+')) return false;
          if (v.length >= 12 && v.length <= 16) return true;
          return false;
        }
        return true;
      })
      .test('email', I18n.t('signup-email-invalid'), v => {
        if (!Number.isNaN(parseInt(v))) return true;

        return !(
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v,
          ) &&
          !/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(
            v,
          )
        );
      }),
  });
