
import { Link, useLocation } from 'react-router-dom';
import { 
  Info, 
  Settings, 
  HelpCircle, 
  PhoneCall, 
  Plug, 
  Bus, 
  CreditCard, 
  Plane, 
  UserCircle 
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
  { name: 'Home', path: '/' },
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

interface NavLinksProps {
  scrolled: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export const NavLinks = ({ scrolled, isMobile = false, onLinkClick }: NavLinksProps) => {
  const location = useLocation();

  if (isMobile) {
    return (
      <ul className="flex flex-col gap-4">
        {navLinks.map((link) => {
          // For service dropdown in mobile
          if (link.isDropdown && link.dropdownItems) {
            return (
              <li key={link.path} className="mb-2">
                <div className="font-medium text-chamDarkBlue mb-2 flex items-center gap-2">
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                </div>
                <ul className="pl-6 space-y-2">
                  {link.dropdownItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 py-1 text-chamDarkBlue/80 hover:text-chamGold"
                        onClick={onLinkClick}
                      >
                        {item.icon && <item.icon size={16} />}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          // Regular link for mobile
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-2 py-2 font-medium ${
                  location.pathname === link.path
                    ? 'text-chamGold'
                    : 'text-chamDarkBlue'
                }`}
                onClick={onLinkClick}
              >
                {link.icon && <link.icon size={18} />}
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  // Desktop navigation with dropdown
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-6">
        {navLinks.map((link) => {
          // Handle dropdown service menu
          if (link.isDropdown && link.dropdownItems) {
            return (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuTrigger 
                  className={`font-medium transition-colors duration-300 hover:text-chamGold ${
                    scrolled ? 'text-chamDarkBlue' : 'text-white'
                  } ${location.pathname.includes('/services') ? 'text-chamGold' : ''} bg-transparent hover:bg-transparent focus:bg-transparent`}
                >
                  <div className="flex items-center gap-1">
                    {link.icon && <link.icon size={16} />}
                    {link.name}
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {link.dropdownItems.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={onLinkClick}
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              {item.icon && <item.icon size={18} className="text-chamGold" />}
                              {item.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          // Regular menu items
          return (
            <NavigationMenuItem key={link.path}>
              <Link 
                to={link.path}
                className={`font-medium transition-colors duration-300 hover:text-chamGold flex items-center gap-1 ${
                  scrolled ? 'text-chamDarkBlue' : 'text-white'
                } ${location.pathname === link.path ? 'text-chamGold' : ''}`}
              >
                {link.icon && <link.icon size={16} />}
                {link.name}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
