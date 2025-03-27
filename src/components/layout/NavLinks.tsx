
import { Link, useLocation } from 'react-router-dom';
import { Info, Settings, HelpCircle, PhoneCall, Plug } from 'lucide-react';

export interface NavLink {
  name: string;
  path: string;
  icon?: React.ElementType;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about', icon: Info },
  { name: 'Services', path: '/services', icon: Settings },
  { name: 'Support', path: '/support', icon: HelpCircle },
  { name: 'Contact Us', path: '/contact', icon: PhoneCall },
  { name: 'API Integration', path: '/api', icon: Plug },
];

interface NavLinksProps {
  scrolled: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export const NavLinks = ({ scrolled, isMobile = false, onLinkClick }: NavLinksProps) => {
  const location = useLocation();

  if (isMobile) {
    return (
      <ul className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`flex items-center gap-2 py-2 font-medium ${
                location.pathname === link.path
                  ? 'text-chamGold'
                  : 'text-chamDarkBlue'
              }`}
              onClick={onLinkClick}
            >
              {link.icon && <link.icon size={18} />}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex gap-6">
      {navLinks.map((link) => (
        <li key={link.path}>
          <Link 
            to={link.path}
            className={`font-medium transition-colors duration-300 hover:text-chamGold flex items-center gap-1 ${
              scrolled ? 'text-chamDarkBlue' : 'text-white'
            } ${location.pathname === link.path ? 'text-chamGold' : ''}`}
          >
            {link.icon && <link.icon size={16} />}
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
