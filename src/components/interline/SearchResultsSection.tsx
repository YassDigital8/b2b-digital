
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import FlightResultsList from '@/components/interline/FlightResultsList';
import { Flight } from '@/types/flight';
import { PassengerCounts } from '@/hooks/useInterlineBooking';

interface SearchResultsSectionProps {
  searchResults: Flight[];
  selectedFlight: string | null;
  setSelectedFlight: (flightId: string) => void;
  passengers: PassengerCounts;
  onBook: () => void;
  isSubmitting: boolean;
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
  onSortChange
}) => {
  if (searchResults.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="border-none shadow-soft overflow-hidden">
        <CardContent className="p-0">
          <FlightResultsList 
            flights={searchResults}
            selectedFlightId={selectedFlight}
            onSelectFlight={setSelectedFlight}
            totalPassengers={passengers}
            onBook={onBook}
            isSubmitting={isSubmitting}
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchResultsSection;
