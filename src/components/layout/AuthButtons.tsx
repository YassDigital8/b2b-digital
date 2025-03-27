
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  scrolled?: boolean;
  isMobile?: boolean;
  onButtonClick?: () => void;
}

export const AuthButtons = ({ scrolled = false, isMobile = false, onButtonClick }: AuthButtonsProps) => {
  if (isMobile) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <Link to="/login" onClick={onButtonClick}>
          <Button variant="outline" className="w-full border-black text-black">
            Sign In
          </Button>
        </Link>
        <Link to="/signup" onClick={onButtonClick}>
          <Button className="w-full bg-chamGold hover:bg-chamGold/90">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 ml-2">
      <Link to="/login">
        <Button variant="outline" size="sm" className={
          scrolled 
            ? 'border-black text-black hover:bg-black/10' 
            : 'border-black text-black hover:bg-white/10'
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
  );
};
