import React, { createContext, useContext, useState, useEffect } from 'react';
import { languagesList, translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('site_language') || 'en';
  });

  const selectedLangObj = languagesList.find((l) => l.code === currentLang) || languagesList[0];
  const isRTL = selectedLangObj.dir === 'rtl';

  useEffect(() => {
    localStorage.setItem('site_language', currentLang);
    document.documentElement.lang = currentLang;
    document.documentElement.dir = selectedLangObj.dir || 'ltr';
  }, [currentLang, selectedLangObj]);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLang(langCode);
    }
  };

  // Helper t(path, fallback) e.g. t('nav.home') or t('hero.greeting')
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const keys = path.split('.');
    let result = translations[currentLang];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        result = undefined;
        break;
      }
    }
    if (result !== undefined) return result;

    // Fallback to English
    let enResult = translations.en;
    for (const key of keys) {
      if (enResult && enResult[key] !== undefined) {
        enResult = enResult[key];
      } else {
        enResult = undefined;
        break;
      }
    }
    return enResult !== undefined ? enResult : fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        changeLanguage,
        t,
        selectedLangObj,
        languagesList,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
