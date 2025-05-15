
import { motion } from 'framer-motion';
import SearchResultsSection from '@/components/interline/SearchResultsSection';
import BookingInfo from '@/components/interline/BookingInfo';
import { Flight } from '@/types/flight';
import { PassengerCounts } from '@/hooks/useInterlineBooking';

interface BookResultsProps {
  searchResults: Flight[];
  selectedFlight: string | null;
  setSelectedFlight: (id: string | null) => void;
  passengers: PassengerCounts;
  onBook: () => void;
  isSubmitting: boolean;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortBy: 'price' | 'departure' | 'arrival') => void;
}

const BookResults = ({
  searchResults,
  selectedFlight,
  setSelectedFlight,
  passengers,
  onBook,
  isSubmitting,
  sortBy,
  onSortChange
}: BookResultsProps) => {
  return (
    <>
      {/* Flight Search Results */}
      <SearchResultsSection 
        searchResults={searchResults}
        selectedFlight={selectedFlight}
        setSelectedFlight={setSelectedFlight}
        passengers={passengers}
        onBook={onBook}
        isSubmitting={isSubmitting}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      
      {/* Only show the booking info if there are no search results */}
      {searchResults.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6"
        >
          <BookingInfo />
        </motion.div>
      )}
      
      {/* Additional booking info section with ID for scroll */}
      {searchResults.length > 0 && (
        <motion.div
          id="booking-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-6"
        >
          <BookingInfo />
        </motion.div>
      )}
    </>
  );
};

export default BookResults;
