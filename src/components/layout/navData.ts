
import { 
  Info, 
  Settings, 
  HelpCircle, 
  PhoneCall, 
  Plug, 
  Bus, 
  CreditCard, 
  Plane
} from 'lucide-react';

export interface NavLink {
  name: string;
  translationKey: string;
  path: string;
  icon?: React.ElementType;
  isDropdown?: boolean;
  dropdownItems?: {
    name: string;
    translationKey: string;
    path: string;
    description: string;
    icon?: React.ElementType;
  }[];
}

export const navLinks: NavLink[] = [
  { name: 'About Us', translationKey: 'nav.about', path: '/about', icon: Info },
  { 
    name: 'Services', 
    translationKey: 'nav.services',
    path: '/services', 
    icon: Settings,
    isDropdown: true,
    dropdownItems: [
      { 
        name: 'Transportation', 
        translationKey: 'nav.transportation',
        path: '/transportation', 
        description: 'Book transportation services for your journey',
        icon: Bus 
      },
      { 
        name: 'Top-Up', 
        translationKey: 'nav.topup',
        path: '/top-up', 
        description: 'Add funds to your account',
        icon: CreditCard 
      },
      { 
        name: 'Interline Booking', 
        translationKey: 'nav.interline',
        path: '/interline', 
        description: 'Book connected flights across multiple airlines',
        icon: Plane 
      },
      { 
        name: 'API Integration', 
        translationKey: 'nav.apiIntegration',
        path: '/api', 
        description: 'Connect your systems with our API',
        icon: Plug 
      },
    ]
  },
  { name: 'Support', translationKey: 'nav.support', path: '/support', icon: HelpCircle },
  { name: 'Contact Us', translationKey: 'nav.contact', path: '/contact', icon: PhoneCall },
  { name: 'API Integration', translationKey: 'nav.api', path: '/api', icon: Plug },
];
