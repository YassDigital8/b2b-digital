
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
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <Link to="/login" onClick={onButtonClick}>
          <Button variant="outline" className="w-full border-chamBlue text-chamBlue">
            Sign In
          </Button>
        </Link>
        <Link to="/signup" onClick={onButtonClick}>
          <Button className="w-full bg-chamGold hover:bg-chamGold/90 relative overflow-hidden group">
            <span className="relative z-10">Sign Up</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-chamGold to-yellow-400 opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="outline" size="sm" className={
          scrolled 
            ? 'border-chamBlue text-chamBlue hover:bg-chamBlue/10' 
            : 'border-white hover:bg-white/10 backdrop-blur-sm'
        }>
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm" className="bg-chamGold hover:bg-chamGold/90 text-white relative overflow-hidden group">
          <span className="relative z-10">Sign Up</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-chamGold to-yellow-400 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4 }}
          />
        </Button>
      </Link>
    </div>
  );
};
