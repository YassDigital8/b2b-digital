
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountBalance from '@/components/interline/AccountBalance';
import InterlineHeader from '@/components/interline/InterlineHeader';
import BookingSection from '@/components/interline/BookingSection';
import BookResults from '@/components/interline/BookResults';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { useBookNavigation } from '@/hooks/useBookNavigation';

const InterlineBooking = () => {
  const {
    user,
    searchResults,
    selectedFlight,
    isSearching,
    isSubmitting,
    sortBy,
    passengers,
    lastSearchCriteria,
    setSelectedFlight,
    handleSearch,
    handleSortChange,
    setIsSubmitting
  } = useInterlineBooking();
  
  const { handleBooking } = useBookNavigation(
    searchResults, 
    selectedFlight, 
    setIsSubmitting, 
    passengers
  );
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <InterlineHeader />
      
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4 -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6"
          >
            <AccountBalance balance={user.balance} />
          </motion.div>
          
          <BookingSection 
            onSearch={handleSearch}
            isSearching={isSearching}
            lastSearchCriteria={lastSearchCriteria}
          />
          
          <BookResults
            searchResults={searchResults}
            selectedFlight={selectedFlight}
            setSelectedFlight={setSelectedFlight}
            passengers={passengers}
            onBook={handleBooking}
            isSubmitting={isSubmitting}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBooking;
