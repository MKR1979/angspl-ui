import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.translation.json';
import hi from './locales/hi.translation.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi }
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language in case a translation is missing
  interpolation: {
    escapeValue: false // React already handles escaping
  },
  debug: false,
  
});

export default i18n;
