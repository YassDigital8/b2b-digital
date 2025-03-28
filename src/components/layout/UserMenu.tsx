
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';

interface UserMenuProps {
  isMobile?: boolean;
  onLogout?: () => void;
}

export const UserMenu = ({ isMobile = false, onLogout }: UserMenuProps) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
  };

  if (isMobile) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link to="/dashboard" className="block py-2 text-chamDarkBlue" onClick={onLogout}>
          {t('user.dashboard')}
        </Link>
        <Link to="/profile" className="block py-2 text-chamDarkBlue" onClick={onLogout}>
          {t('user.profile')}
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left py-2 text-red-500"
        >
          {t('user.logout')}
        </button>
      </div>
    );
  }

  return (
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
            <span>{t('user.dashboard')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer w-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{t('user.profile')}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={logout}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('user.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
