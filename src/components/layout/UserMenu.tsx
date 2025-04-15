
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
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { setToken } from '@/redux/slices/authSlice';

interface UserMenuProps {
  isMobile?: boolean;
  onLogout?: () => void;
}

export const UserMenu = ({ isMobile = false, onLogout }: UserMenuProps) => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(setToken(null));
    // localStorage.removeItem('token');
    // logout();
    // if (onLogout) onLogout();
  };

  if (isMobile) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link to="/dashboard" className="block py-2 text-chamDarkBlue" onClick={onLogout}>
          Dashboard
        </Link>
        <Link to="/profile" className="block py-2 text-chamDarkBlue" onClick={onLogout}>
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full text-left py-2 text-red-500"
        >
          Log out
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
          onClick={handleLogout}

          // onClick={logout}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
