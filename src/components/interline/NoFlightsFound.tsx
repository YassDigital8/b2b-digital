
import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NoFlightsFound: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10 text-center rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 border border-dashed border-blue-200 shadow-inner"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-blue-300/5 to-purple-400/5 animate-pulse rounded-full blur-3xl"></div>
        <Search className="mx-auto h-12 w-12 text-blue-400 mb-3 p-2 bg-white/70 rounded-full shadow-sm" />
      </div>
      <h3 className="text-xl font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">No flights found</h3>
      <p className="text-gray-600 mt-2">Try adjusting your search filters or dates</p>
    </motion.div>
  );
};

export default NoFlightsFound;
