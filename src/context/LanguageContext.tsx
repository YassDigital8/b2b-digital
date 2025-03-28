
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Enhanced translations object with English and Arabic text for the entire website
export const translations = {
  // Navigation
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
  
  // Authentication
  'auth.signin': {
    en: 'Sign In',
    ar: 'تسجيل الدخول'
  },
  'auth.signup': {
    en: 'Sign Up',
    ar: 'إنشاء حساب'
  },
  'auth.email': {
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'auth.password': {
    en: 'Password',
    ar: 'كلمة المرور'
  },
  'auth.forgotPassword': {
    en: 'Forgot Password?',
    ar: 'نسيت كلمة المرور؟'
  },
  'auth.noAccount': {
    en: 'Don\'t have an account?',
    ar: 'ليس لديك حساب؟'
  },
  'auth.alreadyAccount': {
    en: 'Already have an account?',
    ar: 'لديك حساب بالفعل؟'
  },
  
  // User related
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
  'user.settings': {
    en: 'Settings',
    ar: 'الإعدادات'
  },
  
  // Brand
  'brand.name': {
    en: 'Travel Hub',
    ar: 'مركز السفر'
  },
  
  // Homepage
  'home.hero.title': {
    en: 'Streamline Your Travel Business',
    ar: 'تبسيط أعمال السفر الخاصة بك'
  },
  'home.hero.subtitle': {
    en: 'A comprehensive B2B platform for travel agents',
    ar: 'منصة شاملة للشركات لوكلاء السفر'
  },
  'home.hero.cta': {
    en: 'Get Started',
    ar: 'ابدأ الآن'
  },
  'home.features.title': {
    en: 'Why Choose Cham Wings Travel Hub',
    ar: 'لماذا تختار مركز سفر أجنحة الشام'
  },
  'home.features.subtitle': {
    en: 'A comprehensive platform designed to streamline travel management for agents',
    ar: 'منصة شاملة مصممة لتبسيط إدارة السفر للوكلاء'
  },
  
  // Features section
  'feature.globalCoverage': {
    en: 'Global Coverage',
    ar: 'تغطية عالمية'
  },
  'feature.globalCoverage.desc': {
    en: 'Operating across multiple countries with various POS systems',
    ar: 'العمل في العديد من البلدان مع أنظمة نقاط البيع المختلفة'
  },
  'feature.interline': {
    en: 'Interline Connections',
    ar: 'اتصالات الخطوط المشتركة'
  },
  'feature.interline.desc': {
    en: 'Partnership with Jazeera Airways, Air Arabia, and FlyDubai',
    ar: 'شراكة مع طيران الجزيرة وطيران العربية وفلاي دبي'
  },
  'feature.payment': {
    en: 'Multiple Payment Options',
    ar: 'خيارات دفع متعددة'
  },
  'feature.payment.desc': {
    en: 'Top up accounts through eCash, Haram, and Fouad',
    ar: 'شحن الحسابات من خلال النقد الإلكتروني وحرم وفؤاد'
  },
  'feature.b2b': {
    en: 'B2B Focused',
    ar: 'التركيز على الشركات'
  },
  'feature.b2b.desc': {
    en: 'Designed specifically for travel agent needs',
    ar: 'مصممة خصيصًا لاحتياجات وكلاء السفر'
  },
  'feature.international': {
    en: 'International Services',
    ar: 'خدمات دولية'
  },
  'feature.international.desc': {
    en: 'Transportation across Syrian cities and UAE limousine services',
    ar: 'النقل عبر المدن السورية وخدمات الليموزين في الإمارات'
  },
  'feature.secure': {
    en: 'Secure Platform',
    ar: 'منصة آمنة'
  },
  'feature.secure.desc': {
    en: 'Protected transactions and account management',
    ar: 'معاملات محمية وإدارة الحسابات'
  },
  
  // Partners section
  'partners.title': {
    en: 'Our Trusted Partners',
    ar: 'شركاؤنا الموثوقون'
  },
  
  // Footer
  'footer.services': {
    en: 'Services',
    ar: 'الخدمات'
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    ar: 'روابط سريعة'
  },
  'footer.contact': {
    en: 'Contact',
    ar: 'اتصل بنا'
  },
  'footer.home': {
    en: 'Home',
    ar: 'الرئيسية'
  },
  'footer.login': {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'footer.register': {
    en: 'Register',
    ar: 'التسجيل'
  },
  'footer.copyright': {
    en: 'Cham Wings Airlines Travel Hub. All rights reserved.',
    ar: 'مركز سفر أجنحة الشام للطيران. جميع الحقوق محفوظة.'
  },
  'footer.transportation': {
    en: 'Transportation',
    ar: 'المواصلات'
  },
  'footer.topup': {
    en: 'Account Top Up',
    ar: 'شحن الحساب'
  },
  'footer.interline': {
    en: 'Interline Booking',
    ar: 'حجز الخطوط المشتركة'
  },
  'footer.business': {
    en: 'Business Class Benefits',
    ar: 'مزايا درجة رجال الأعمال'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // Translation function
  const t = (key: string): string => {
    if (!translations[key as keyof typeof translations]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key as keyof typeof translations]?.[language] || key;
  };

  // Set dir attribute on document
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Add RTL class for Tailwind
    if (language === 'ar') {
      document.documentElement.classList.add('rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
      document.body.classList.remove('rtl');
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
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
