
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Globe, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chamDarkBlue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png" 
                alt="Cham Wings Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">Travel Hub</span>
            </div>
            <p className="text-gray-300 mt-4">
              A premium B2B platform for Cham Wings travel agents to enhance travel experiences
              and manage bookings seamlessly.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Website">
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/transportation" className="text-gray-300 hover:text-chamGold transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link to="/top-up" className="text-gray-300 hover:text-chamGold transition-colors">
                  Account Top Up
                </Link>
              </li>
              <li>
                <Link to="/interline" className="text-gray-300 hover:text-chamGold transition-colors">
                  Interline Booking
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-chamGold transition-colors">
                  Business Class Benefits
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-chamGold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-chamGold transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-chamGold transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-chamGold transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={20} className="text-chamGold shrink-0 mt-1" />
                <span className="text-gray-300">
                  Cham Wings Airlines Headquarters,<br />
                  Damascus, Syria
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={20} className="text-chamGold shrink-0" />
                <span className="text-gray-300">+963 11 2335030</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={20} className="text-chamGold shrink-0" />
                <span className="text-gray-300">info@chamwings.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Cham Wings Airlines Travel Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
