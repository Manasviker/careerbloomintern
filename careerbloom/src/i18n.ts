// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// // import LanguageDetector from "i18next-browser-languagedetector";

// import en from "../public/locales/en/common.json";
// import es from "../public/locales/es/common.json";
// import hi from "../public/locales/hi/common.json";
// import pt from "../public/locales/pt/common.json";
// import zh from "../public/locales/zh/common.json";
// import fr from "../public/locales/fr/common.json";

// i18n
// //   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: en,
//       },
//       es: {
//         translation: es,
//       },
//       hi: {
//         translation: hi,
//       },
//       pt: {
//         translation: pt,
//       },
//       zh: {
//         translation: zh,
//       },
//       fr: {
//         translation: fr,
//       },
//     },

//     fallbackLng: "en",

//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en/common.json";
import es from "../public/locales/es/common.json";
import hi from "../public/locales/hi/common.json";
import pt from "../public/locales/pt/common.json";
import zh from "../public/locales/zh/common.json";
import fr from "../public/locales/fr/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    hi: { translation: hi },
    pt: { translation: pt },
    zh: { translation: zh },
    fr: { translation: fr },
  },

  lng: "en",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;