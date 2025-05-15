
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ModernFlightSearch from '@/components/flight-search/ModernFlightSearch';

const FlightSearch = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-10">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Find Your Perfect Flight
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Search across multiple airlines and find the best deals on your next journey
            </motion.p>
          </div>
          
          <ModernFlightSearch />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FlightSearch;
