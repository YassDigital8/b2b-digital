
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
      <div className="flex flex-col gap-3 w-full">
        <Link to="/login" onClick={onButtonClick} className="w-full">
          <Button variant="outline" className="w-full border-chamDarkBlue text-chamDarkBlue py-6 h-auto font-medium text-base">
            Sign In
          </Button>
        </Link>
        <Link to="/signup" onClick={onButtonClick} className="w-full">
          <Button className="w-full bg-chamGold hover:bg-chamGold/90 py-6 h-auto font-medium text-base">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link to="/login">
        <Button variant="outline" className={
          scrolled 
            ? 'border-chamDarkBlue text-chamDarkBlue hover:bg-black/10' 
            : 'border-white text-white bg-chamDarkBlue/30 hover:bg-chamDarkBlue/40'
        }>
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-chamGold hover:bg-chamGold/90 text-white">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
