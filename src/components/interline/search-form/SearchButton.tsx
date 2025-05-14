
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SearchButtonProps {
  isSearching: boolean;
}

const SearchButton = ({ isSearching }: SearchButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        type="submit"
        className="w-full bg-chamBlue hover:bg-chamBlue/90 relative overflow-hidden group"
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <Search className="mr-2 h-4 w-4 animate-pulse" />
            Searching Flights...
            <motion.div 
              className="absolute inset-0 bg-white/10"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="relative">
              Search Flights
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50 rounded"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <motion.div 
              className="absolute top-0 right-0 w-12 h-full bg-gradient-to-r from-transparent to-white/10 skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 1 }}
            />
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default SearchButton;
