
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import FlightResultsList from '@/components/interline/FlightResultsList';
import { Flight } from '@/types/flight';
import { PassengerCounts } from '@/hooks/useInterlineBooking';
import DateNavigator from './DateNavigator';
import { useSelector } from 'react-redux';

interface SearchResultsSectionProps {
  searchResults: Flight[];
  selectedFlight: string | null;
  setSelectedFlight: (flightId: string) => void;
  passengers: PassengerCounts;
  onBook: () => void;
  isSubmitting: boolean;
  isSearching: boolean;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (newSortBy: 'price' | 'departure' | 'arrival') => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  searchResults,
  selectedFlight,
  setSelectedFlight,
  passengers,
  onBook,
  isSubmitting,
  sortBy,
  onSortChange, isSearching
}) => {
  const { isLoadingSrarchFlights } = useSelector(state => state.pos)
  const skeletonLoader = (
    <div className="space-y-6 p-2">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={idx} className="space-y-4">
          <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-full h-40 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  if (searchResults.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 search-results"
    >
      <Card className="border-none shadow-soft overflow-hidden " >
        <DateNavigator />
        {isLoadingSrarchFlights ? skeletonLoader :
          <CardContent className="p-0">
            <FlightResultsList
              flights={searchResults}
              selectedFlightId={selectedFlight}
              onSelect={setSelectedFlight}
              totalPassengers={passengers}
              onBook={onBook}
              isSubmitting={isSubmitting}
              sortBy={sortBy}
              onSortChange={onSortChange}
              isSearching={isSearching}
            />
          </CardContent>
        }
      </Card>
    </motion.div>
  );
};

export default SearchResultsSection;
