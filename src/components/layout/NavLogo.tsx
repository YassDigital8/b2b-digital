
import { Link } from 'react-router-dom';

interface NavLogoProps {
  scrolled: boolean;
}

export const NavLogo = ({ scrolled }: NavLogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/Fly-Cham-Logo.png" 
        alt="Cham Wings Logo" 
        className="h-10 w-auto" 
      />
      <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-chamBlue' : 'text-white'}`}>
        Travel Hub
      </span>
    </Link>
  );
};
