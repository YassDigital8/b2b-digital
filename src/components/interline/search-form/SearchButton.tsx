
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
        className="w-full bg-gradient-to-r from-chamBlue to-blue-500 hover:from-blue-600 hover:to-blue-500 relative overflow-hidden group text-base py-6 h-auto font-semibold rounded-xl shadow-lg"
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <Search className="mr-2 h-5 w-5 animate-pulse" />
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
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform-gpu group-hover:animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"/>
            <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="relative">
              Search Flights
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white/50 rounded"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default SearchButton;
