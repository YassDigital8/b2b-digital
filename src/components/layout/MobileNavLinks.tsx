
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from './navData';
import { useLanguage } from '@/context/LanguageContext';

interface MobileNavLinksProps {
  onLinkClick?: () => void;
}

export const MobileNavLinks = ({ onLinkClick }: MobileNavLinksProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <ul className="flex flex-col gap-4">
      {navLinks.map((link) => {
        // For service dropdown in mobile
        if (link.isDropdown && link.dropdownItems) {
          return (
            <li key={link.path} className="mb-2">
              <div className="font-medium text-chamDarkBlue mb-2 flex items-center gap-2">
                {link.icon && <link.icon size={18} />}
                {t(link.translationKey)}
              </div>
              <ul className="pl-6 space-y-2">
                {link.dropdownItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 py-1 text-chamDarkBlue/80 hover:text-chamGold"
                      onClick={onLinkClick}
                    >
                      {item.icon && <item.icon size={16} />}
                      {t(item.translationKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        // Regular link for mobile
        return (
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
              {t(link.translationKey)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
