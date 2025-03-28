
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLogo } from './NavLogo';
import { NavLinks } from './NavLinks';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';
import { MobileMenu } from './MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const closeMenu = () => setIsOpen(false);
  
  // Check if the current path is a light background page
  const isLightBackgroundPage = () => {
    const lightBackgroundPaths = ['/login', '/signup'];
    return lightBackgroundPaths.includes(location.pathname);
  };
  
  // Set initial scrolled state based on the page path
  useEffect(() => {
    setScrolled(isLightBackgroundPage());
  }, [location.pathname]);
  
  // Handle scroll event for navbar styling
  useEffect(() => {
    if (isLightBackgroundPage()) {
      setScrolled(true);
      return;
    }
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  
  // Close menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <NavLogo scrolled={scrolled} />
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLinks scrolled={scrolled} />
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <AuthButtons scrolled={scrolled} />
          )}
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 ${scrolled ? 'text-chamBlue' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu 
            isOpen={isOpen}
            isAuthenticated={isAuthenticated}
            scrolled={scrolled}
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
