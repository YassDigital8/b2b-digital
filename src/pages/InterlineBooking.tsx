
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InterlineHeader from '@/components/interline/InterlineHeader';
import BookingSection from '@/components/interline/BookingSection';
import BookResults from '@/components/interline/BookResults';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { Plane, ChevronDown } from 'lucide-react';
import DateNavigator from '@/components/interline/DateNavigator';
import withGuard from '@/utils/withGaurd';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/interline/SearchForm';
import SearchResultsSection from '@/components/interline/SearchResultsSection';
import BookingInfo from '@/components/interline/BookingInfo';
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

  // if (!user) return null;
  const { handleBooking } = useBookNavigation(
    searchResults,
    selectedFlight,
    setIsSubmitting,
    passengers
  );
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/10">
      <Navbar />
      
      <InterlineHeader />
      
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4 -mt-24 sm:-mt-28 md:-mt-32 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6"
          >
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
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default withGuard(InterlineBooking);
