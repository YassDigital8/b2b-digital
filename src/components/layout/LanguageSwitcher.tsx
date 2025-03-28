
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage, dir } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-current hover:bg-black/10 flex items-center gap-1.5"
      aria-label="Switch language"
      dir="ltr" // Button always keeps its internal direction
    >
      <Languages className="h-5 w-5" />
      <span className="text-xs font-bold">
        {language === 'en' ? 'عربي' : 'English'}
      </span>
    </Button>
  );
};
