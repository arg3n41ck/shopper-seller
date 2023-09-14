import ru from './ru.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

let language = 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { ...ru },
    },
  },
  lng: language,
  fallbackLng: 'ru',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
