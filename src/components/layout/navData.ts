
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
  path: string;
  icon?: React.ElementType;
  isDropdown?: boolean;
  dropdownItems?: {
    name: string;
    path: string;
    description: string;
    icon?: React.ElementType;
  }[];
}

export const navLinks: NavLink[] = [
  { name: 'About Us', path: '/about', icon: Info },
  { 
    name: 'Services', 
    path: '/services', 
    icon: Settings,
    isDropdown: true,
    dropdownItems: [
      { 
        name: 'Transportation', 
        path: '/transportation', 
        description: 'Book transportation services for your journey',
        icon: Bus 
      },
      { 
        name: 'Top-Up', 
        path: '/top-up', 
        description: 'Add funds to your account',
        icon: CreditCard 
      },
      { 
        name: 'Interline Booking', 
        path: '/interline', 
        description: 'Book connected flights across multiple airlines',
        icon: Plane 
      },
      { 
        name: 'API Integration', 
        path: '/api', 
        description: 'Connect your systems with our API',
        icon: Plug 
      },
    ]
  },
  { name: 'Support', path: '/support', icon: HelpCircle },
  { name: 'Contact Us', path: '/contact', icon: PhoneCall },
  { name: 'API Integration', path: '/api', icon: Plug },
];
