
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage, dir } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="text-current hover:bg-black/10 rtl:flex-row-reverse"
      aria-label="Switch language"
      dir="ltr" // Button always keeps its internal direction
    >
      <Globe className="h-5 w-5" />
      <span className={`ml-1 rtl:mr-1 rtl:ml-0 text-xs font-bold`}>
        {language === 'en' ? 'عربي' : 'EN'}
      </span>
    </Button>
  );
};
