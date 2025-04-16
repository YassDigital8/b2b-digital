
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
          <Button variant="outline" className="w-full border-white text-white bg-chamDarkBlue/50 hover:bg-chamDarkBlue/70 py-6 h-auto font-medium text-base">
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
            ? 'border-chamDarkBlue text-chamDarkBlue bg-white hover:bg-black/5 font-semibold' 
            : 'border-white text-white bg-white/20 hover:bg-white/30 font-semibold'
        }>
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-chamGold hover:bg-chamGold/90 text-white font-semibold">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
