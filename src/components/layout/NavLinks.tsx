
import { MobileNavLinks } from './MobileNavLinks';
import { DesktopNavLinks } from './DesktopNavLinks';
import { NavLink } from './navData';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

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

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="visible"
    >
      <DesktopNavLinks scrolled={scrolled} onLinkClick={onLinkClick} />
    </motion.div>
  );
};
