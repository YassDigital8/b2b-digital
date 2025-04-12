
import { MobileNavLinks } from './MobileNavLinks';
import { DesktopNavLinks } from './DesktopNavLinks';
import { NavLink } from './navData';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLinksProps {
  scrolled: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export type { NavLink };

export const NavLinks = ({ scrolled, isMobile = false, onLinkClick }: NavLinksProps) => {
  const isAutomaticallyMobile = useIsMobile();
  
  // Use explicit isMobile prop if provided, otherwise use the hook value
  const renderMobile = isMobile !== undefined ? isMobile : isAutomaticallyMobile;
  
  if (renderMobile) {
    return <MobileNavLinks onLinkClick={onLinkClick} />;
  }

  return <DesktopNavLinks scrolled={scrolled} onLinkClick={onLinkClick} />;
};
