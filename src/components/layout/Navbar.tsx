
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Info, Settings, HelpCircle, PhoneCall, Plug } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  const closeMenu = () => setIsOpen(false);
  
  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Settings },
    { name: 'Support', path: '/support', icon: HelpCircle },
    { name: 'Contact Us', path: '/contact', icon: PhoneCall },
    { name: 'API Integration', path: '/api', icon: Plug },
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png" 
            alt="Cham Wings Logo" 
            className="h-10 w-auto" 
          />
          <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-chamBlue' : 'text-white'}`}>
            Travel Hub
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
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
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chamBlue text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className={
                  scrolled ? 'border-chamBlue text-chamBlue hover:bg-chamBlue/10' : 'border-white text-white hover:bg-white/10'
                }>
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-chamGold hover:bg-chamGold/90 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-chamBlue p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
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
                      onClick={closeMenu}
                    >
                      {link.icon && <link.icon size={18} />}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {isAuthenticated ? (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link to="/dashboard" className="block py-2 text-chamDarkBlue" onClick={closeMenu}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block py-2 text-chamDarkBlue" onClick={closeMenu}>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="block w-full text-left py-2 text-red-500"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full border-chamBlue text-chamBlue">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMenu}>
                    <Button className="w-full bg-chamGold hover:bg-chamGold/90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
