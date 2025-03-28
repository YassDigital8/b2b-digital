
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="text-current hover:bg-black/10"
      aria-label="Switch language"
    >
      <Globe className="h-5 w-5" />
      <span className="ml-1 text-xs font-bold">{language === 'en' ? 'عربي' : 'EN'}</span>
    </Button>
  );
};
