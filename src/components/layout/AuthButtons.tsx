
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
          <Button variant="outline" className="w-full border-white text-white bg-chamDarkBlue/50 hover:bg-chamDarkBlue/70 py-6 h-auto font-medium text-base backdrop-blur-sm">
            Sign In
          </Button>
        </Link>
        <Link to="/signup" onClick={onButtonClick} className="w-full">
          <Button className="w-full bg-gradient-to-r from-chamGold to-chamGold/90 hover:bg-chamGold/90 py-6 h-auto font-medium text-base shadow-lg">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link to="/login">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Button variant="outline" className={
            scrolled 
              ? 'border-chamDarkBlue text-chamDarkBlue bg-white hover:bg-black/5 font-semibold shadow-sm' 
              : 'border-white text-white bg-white/20 hover:bg-white/30 font-semibold backdrop-blur-sm'
          }>
            Sign In
          </Button>
        </motion.div>
      </Link>
      <Link to="/signup">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Button className="bg-gradient-to-r from-chamGold to-chamGold/90 hover:opacity-90 text-white font-semibold shadow-md">
            Sign Up
          </Button>
        </motion.div>
      </Link>
    </div>
  );
};
