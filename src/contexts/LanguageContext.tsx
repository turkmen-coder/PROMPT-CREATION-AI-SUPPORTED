import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TranslationKeys, translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
  translations: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // localStorage'dan dil ayarını yükle
    const savedLanguage = localStorage.getItem('nexus-language') as Language;
    return savedLanguage && ['tr', 'en'].includes(savedLanguage) ? savedLanguage : 'tr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nexus-language', lang);
  };

  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    // Dil değiştiğinde document title'ı güncelle
    document.title = t('heroTitle');
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};