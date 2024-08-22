import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from '../../public/locales/ru/translation.json';
import translationEN from '../../public/locales/en/translation.json';
const resources = {
  en: {
    translation: translationRU,
  },
  ru: {
    translation: translationEN,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
