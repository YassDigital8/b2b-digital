
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

interface NavLogoProps {
  scrolled: boolean;
}

export const NavLogo = ({ scrolled }: NavLogoProps) => {
  const { t } = useLanguage();
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png" 
        alt="Cham Wings Logo" 
        className="h-10 w-auto" 
      />
      <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-chamBlue' : 'text-white'}`}>
        {t('brand.name')}
      </span>
    </Link>
  );
};
