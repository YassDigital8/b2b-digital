
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';
import FlightCard from './FlightCard';

interface FlightResultsListProps {
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
  isSubmitting: boolean;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortType: 'price' | 'departure' | 'arrival') => void;
}

const FlightResultsList: React.FC<FlightResultsListProps> = ({
  flights,
  selectedFlightId,
  onSelectFlight,
  totalPassengers,
  onBook,
  isSubmitting,
  sortBy,
  onSortChange
}) => {
  // Get selected flight data
  const selectedFlightData = selectedFlightId ? flights.find(f => f.id === selectedFlightId) : null;

  return (
    <div>
      {/* Sorting options */}
      <div className="px-6 pb-2 flex items-center border-b">
        <span className="text-sm font-medium mr-2">Sort by:</span>
        <div className="flex space-x-2">
          <Button 
            variant={sortBy === 'price' ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => onSortChange('price')}
            className="text-xs h-8"
          >
            Cheapest
          </Button>
          <Button 
            variant={sortBy === 'departure' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => onSortChange('departure')}
            className="text-xs h-8"
          >
            Departure
          </Button>
          <Button 
            variant={sortBy === 'arrival' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => onSortChange('arrival')}
            className="text-xs h-8"
          >
            Arrival
          </Button>
        </div>
      </div>
      
      <div className="pt-4">
        <div className="space-y-6">
          {flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              selectedFlightId={selectedFlightId}
              onSelect={onSelectFlight}
              totalPassengers={totalPassengers}
            />
          ))}
        </div>
        
        {selectedFlightData && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-lg font-bold text-chamDarkBlue">
                  Total: ${(selectedFlightData.price * totalPassengers.total).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  for {totalPassengers.total} passenger{totalPassengers.total !== 1 ? 's' : ''}
                  {totalPassengers.adults > 0 && ` (${totalPassengers.adults} adult${totalPassengers.adults !== 1 ? 's' : ''}${totalPassengers.children > 0 ? `, ${totalPassengers.children} child${totalPassengers.children !== 1 ? 'ren' : ''}` : ''}${totalPassengers.infants > 0 ? `, ${totalPassengers.infants} infant${totalPassengers.infants !== 1 ? 's' : ''}` : ''})`}
                </p>
              </div>
              
              <Button
                onClick={onBook}
                className="bg-chamGold hover:bg-chamGold/90 min-w-[140px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Book Now'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResultsList;
