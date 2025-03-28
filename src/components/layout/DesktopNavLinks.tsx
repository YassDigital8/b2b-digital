
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from './navData';
import { useLanguage } from '@/context/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DesktopNavLinksProps {
  scrolled: boolean;
  onLinkClick?: () => void;
}

export const DesktopNavLinks = ({ scrolled, onLinkClick }: DesktopNavLinksProps) => {
  const location = useLocation();
  const { t } = useLanguage();

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
                    {t(link.translationKey)}
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
                              {t(item.translationKey)}
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
                className={`font-medium transition-colors duration-300 hover:text-chamGold flex items-center gap-2 px-2 py-1.5 ${
                  scrolled ? 'text-chamDarkBlue' : 'text-white'
                } ${location.pathname === link.path ? 'text-chamGold' : ''}`}
                onClick={onLinkClick}
              >
                {link.icon && <link.icon size={16} />}
                {t(link.translationKey)}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
