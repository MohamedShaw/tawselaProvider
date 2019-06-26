import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values =>
  yup.object().shape({
    nameAr: yup.string().required(I18n.t('signup-field-required')),
    nameEn: yup.string().required(I18n.t('signup-field-required')),
    description: yup.string().required(I18n.t('signup-field-required')),
    duration: yup.string().required(I18n.t('signup-field-required')),
    price: yup.string().required(I18n.t('signup-field-required')),
  });
