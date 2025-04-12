
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from './navData';
import { motion } from 'framer-motion';

interface MobileNavLinksProps {
  onLinkClick?: () => void;
}

export const MobileNavLinks = ({ onLinkClick }: MobileNavLinksProps) => {
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.ul 
      className="flex flex-col gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navLinks.map((link) => {
        // For service dropdown in mobile
        if (link.isDropdown && link.dropdownItems) {
          return (
            <motion.li key={link.path} className="mb-2" variants={itemVariants}>
              <div className="font-medium text-chamDarkBlue mb-3 flex items-center gap-2 text-lg">
                {link.icon && <link.icon size={20} />}
                {link.name}
              </div>
              <ul className="pl-6 space-y-3">
                {link.dropdownItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 py-2 text-chamDarkBlue/80 hover:text-chamGold active:text-chamGold touch-manipulation"
                      onClick={onLinkClick}
                    >
                      {item.icon && <item.icon size={18} />}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        }

        // Regular link for mobile
        return (
          <motion.li key={link.path} variants={itemVariants}>
            <Link
              to={link.path}
              className={`flex items-center gap-2 py-3 font-medium text-lg touch-manipulation ${
                location.pathname === link.path
                  ? 'text-chamGold'
                  : 'text-chamDarkBlue'
              }`}
              onClick={onLinkClick}
            >
              {link.icon && <link.icon size={20} />}
              {link.name}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};
