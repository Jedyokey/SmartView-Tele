import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

// Import your translation files directly
import enTranslation from "./locales/en/translation.json"
import frTranslation from "./locales/fr/translation.json"

// Configure i18next
i18n
  // Load translations from backend if needed
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Add resources directly to avoid loading issues
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    // Common namespace used around the full app
    ns: ["translation"],
    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    // Detection options
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    // React specific options
    react: {
      useSuspense: true,
      wait: true,
    },
  })

export default i18n
