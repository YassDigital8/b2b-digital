
import { motion } from 'framer-motion';
import { NavLinks } from './NavLinks';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  scrolled: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, isAuthenticated, scrolled, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden bg-white overflow-hidden shadow-md"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-chamBlue/5 to-chamGold/5 rounded-xl p-4 mb-4">
          <NavLinks scrolled={scrolled} isMobile={true} onLinkClick={onClose} />
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="p-2 rounded-lg bg-chamGray">
            {isAuthenticated ? (
              <UserMenu isMobile={true} onLogout={onClose} />
            ) : (
              <AuthButtons isMobile={true} onButtonClick={onClose} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
