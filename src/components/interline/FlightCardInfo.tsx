
import React from 'react';
import { Check, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';

interface FlightCardInfoProps {
  flight: Flight;
  isSelected: boolean;
  showFlightDetails: boolean;
  onSelect: (flightId: string) => void;
  onToggleFlightDetails: () => void;
}

const FlightCardInfo: React.FC<FlightCardInfoProps> = ({
  flight,
  isSelected,
  showFlightDetails,
  onSelect,
  onToggleFlightDetails
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      {/* Flight information */}
      <div className="flex items-center text-xs text-gray-600 w-full md:w-auto">
        <Check className="h-3.5 w-3.5 text-green-600 mr-1" />
        <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
        <span className="mx-2">•</span>
        <span>{flight.seats} seats left</span>
      </div>
      
      {/* Center aligned Book Now button */}
      <div className="flex-grow flex justify-center">
        <Button 
          variant="default"
          className="bg-chamGold hover:bg-chamGold/90 text-sm px-6 py-2.5 h-auto font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 rounded-full"
          onClick={() => onSelect(flight.id)}
        >
          <Ticket className="h-4 w-4 mr-1.5" />
          Book Now
        </Button>
      </div>
      
      {/* View details text on the right */}
      <div className="text-right w-full md:w-auto">
        {isSelected ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleFlightDetails}
            className="text-chamBlue hover:text-chamBlue/80 p-0 h-auto font-medium"
          >
            {showFlightDetails ? "Hide Details" : "View Details"}
          </Button>
        ) : (
          <div className="text-xs text-chamBlue cursor-pointer hover:underline" onClick={() => onSelect(flight.id)}>
            View Details
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightCardInfo;
