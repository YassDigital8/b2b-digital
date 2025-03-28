
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object with English and Arabic text
export const translations = {
  'nav.about': {
    en: 'About Us',
    ar: 'من نحن'
  },
  'nav.services': {
    en: 'Services',
    ar: 'الخدمات'
  },
  'nav.support': {
    en: 'Support',
    ar: 'الدعم'
  },
  'nav.contact': {
    en: 'Contact Us',
    ar: 'اتصل بنا'
  },
  'nav.api': {
    en: 'API Integration',
    ar: 'تكامل API'
  },
  'nav.transportation': {
    en: 'Transportation',
    ar: 'المواصلات'
  },
  'nav.topup': {
    en: 'Top-Up',
    ar: 'شحن الرصيد'
  },
  'nav.interline': {
    en: 'Interline Booking',
    ar: 'حجز الخطوط المشتركة'
  },
  'nav.apiIntegration': {
    en: 'API Integration',
    ar: 'تكامل API'
  },
  'auth.signin': {
    en: 'Sign In',
    ar: 'تسجيل الدخول'
  },
  'auth.signup': {
    en: 'Sign Up',
    ar: 'إنشاء حساب'
  },
  'user.dashboard': {
    en: 'Dashboard',
    ar: 'لوحة التحكم'
  },
  'user.profile': {
    en: 'Profile',
    ar: 'الملف الشخصي'
  },
  'user.logout': {
    en: 'Log out',
    ar: 'تسجيل الخروج'
  },
  'brand.name': {
    en: 'Travel Hub',
    ar: 'مركز السفر'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    return translations[key as keyof typeof translations]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
