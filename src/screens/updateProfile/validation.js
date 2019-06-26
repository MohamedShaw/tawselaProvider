import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values =>
  yup.object().shape({
    nameAr: yup
      .string()
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
      .matches(/^[A-Za-z\s]+$/, I18n.t('signup-name-EN-invalid'))
      .test('nameEn', I18n.t('signup-name-EN-invalid'), () =>
        isNaN(values.nameEn),
      )
      .min(2, I18n.t('field-must-be-larger-than-one-chars')),
    email: yup.string().email(I18n.t('signup-email-invalid')),
  });
