import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uzLatinTranslations from './locales/uz-latin.json';
import uzCyrillicTranslations from './locales/uz-cyrillic.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

const resources = {
  'uz-latin': {
    translation: uzLatinTranslations,
  },
  'uz-cyrillic': {
    translation: uzCyrillicTranslations,
  },
  en: {
    translation: enTranslations,
  },
  ru: {
    translation: ruTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'uz-latin',
    fallbackLng: 'uz-latin',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
