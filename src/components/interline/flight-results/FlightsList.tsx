
import React from 'react';
import { Search } from 'lucide-react';
import FlightCard from '../FlightCard';
import { Flight } from '@/types/flight';

interface FlightsListProps {
  flights: Flight[];
  selectedFlightId: string | null;
  onSelectFlight: (flightId: string) => void;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
  onBook: () => void;
}

const FlightsList: React.FC<FlightsListProps> = ({
  flights,
  selectedFlightId,
  onSelectFlight,
  totalPassengers,
  onBook
}) => {
  if (flights.length === 0) {
    return (
      <div className="py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Search className="mx-auto h-10 w-10 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium text-gray-700">No flights found</h3>
        <p className="text-gray-500 mt-1">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          selectedFlightId={selectedFlightId}
          onSelect={onSelectFlight}
          totalPassengers={totalPassengers}
          onBook={onBook}
        />
      ))}
    </div>
  );
};

export default FlightsList;
