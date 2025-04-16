
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import FlightResultsList from '@/components/interline/FlightResultsList';
import { Flight } from '@/types/flight';
import { PassengerCounts } from '@/hooks/useInterlineBooking';
import { useIsMobile } from '@/hooks/use-mobile';
import { Plane, Filter } from 'lucide-react';

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
  const isMobile = useIsMobile();
  
  if (searchResults.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      {/* Header section with count and animation */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full shadow-sm">
          <Plane className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Available Flights</h2>
          <p className="text-sm text-gray-600">
            Found {searchResults.length} interline flights for your search
          </p>
        </div>
      </div>
      
      <Card className="border-none shadow-lg overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
        <CardContent className="p-0 relative">
          <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-br from-purple-200 to-blue-200 opacity-10 rounded-full blur-3xl -z-10"></div>
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
