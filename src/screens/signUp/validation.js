import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchemaEGY = values =>
  yup.object().shape({
    nameAr: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]*$/,
        I18n.t('signup-name-AR-invalid'),
      )
      .test('nameAr', I18n.t('signup-name-AR-invalid'), () =>
        isNaN(values.nameAr),
      )
      .min(2, I18n.t('field-must-be-larger-than-one-chars')),
    nameEn: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(/^[A-Za-z\s]+$/, I18n.t('signup-name-EN-invalid'))
      .test('nameEn', I18n.t('signup-name-EN-invalid'), () =>
        isNaN(values.nameEn),
      )
      .min(2, I18n.t('field-must-be-larger-than-one-chars')),
    email: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .email(I18n.t('signup-email-invalid')),
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
