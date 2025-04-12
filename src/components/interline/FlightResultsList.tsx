
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';
import FlightCard from './FlightCard';
import { CheckCircle2, Ticket } from 'lucide-react';

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

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedFlightData) return 0;
    
    return selectedFlightData.price * totalPassengers.adults + 
      selectedFlightData.price * totalPassengers.children + 
      (selectedFlightData.price * totalPassengers.infants * 0.1);
  };

  return (
    <div>
      {/* Header with sorting options */}
      <div className="px-6 py-4 flex items-center justify-between bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Found {flights.length} flights</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 mr-1">Sort by:</span>
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <Button 
              variant={sortBy === 'price' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => onSortChange('price')}
              className={`text-xs h-7 px-3 rounded-md ${sortBy === 'price' ? 'bg-white shadow-sm' : ''}`}
            >
              Price
            </Button>
            <Button 
              variant={sortBy === 'departure' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onSortChange('departure')}
              className={`text-xs h-7 px-3 rounded-md ${sortBy === 'departure' ? 'bg-white shadow-sm' : ''}`}
            >
              Departure
            </Button>
            <Button 
              variant={sortBy === 'arrival' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onSortChange('arrival')}
              className={`text-xs h-7 px-3 rounded-md ${sortBy === 'arrival' ? 'bg-white shadow-sm' : ''}`}
            >
              Arrival
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
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
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-chamBlue/10 to-chamGold/10 p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <p className="text-xl font-bold text-chamDarkBlue">
                    Total: ${calculateTotalPrice().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    for {totalPassengers.total} passenger{totalPassengers.total !== 1 ? 's' : ''}
                    {totalPassengers.adults > 0 && ` (${totalPassengers.adults} adult${totalPassengers.adults !== 1 ? 's' : ''}${totalPassengers.children > 0 ? `, ${totalPassengers.children} child${totalPassengers.children !== 1 ? 'ren' : ''}` : ''}${totalPassengers.infants > 0 ? `, ${totalPassengers.infants} infant${totalPassengers.infants !== 1 ? 's' : ''}` : ''})`}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={onBook}
                className="bg-chamGold hover:bg-chamGold/90 text-white text-base px-10 py-6 h-auto font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-w-[200px] rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : (
                  <div className="flex items-center justify-center gap-2">
                    <Ticket className="h-5 w-5" />
                    <span>Book Now</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResultsList;
