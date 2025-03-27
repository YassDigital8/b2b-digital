
import { MobileNavLinks } from './MobileNavLinks';
import { DesktopNavLinks } from './DesktopNavLinks';
import { NavLink } from './navData';

interface NavLinksProps {
  scrolled: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export type { NavLink };

export const NavLinks = ({ scrolled, isMobile = false, onLinkClick }: NavLinksProps) => {
  if (isMobile) {
    return <MobileNavLinks onLinkClick={onLinkClick} />;
  }

  return <DesktopNavLinks scrolled={scrolled} onLinkClick={onLinkClick} />;
};
