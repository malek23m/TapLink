import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-gray-600 dark:text-gray-400"
    >
      <Languages className="w-4 h-4" />
      {i18n.language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};
