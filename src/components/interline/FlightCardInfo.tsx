
import React from 'react';
import { Check, Ticket, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="flex items-center justify-between">
      <div className="flex items-center text-xs text-gray-600">
        <Check className="h-3.5 w-3.5 text-green-600 mr-1" />
        <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
        <span className="mx-2">•</span>
        <span>{flight.seats} seats left</span>
      </div>
      
      {/* Enhanced and more prominent Book Now button */}
      <Button 
        variant="default"
        className="bg-chamGold hover:bg-chamGold/90 text-sm px-5 py-2 h-auto font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        onClick={() => onSelect(flight.id)}
      >
        <Ticket className="h-4 w-4 mr-1.5" />
        Book Now
      </Button>
      
      {/* View/Hide Details button moved to right */}
      <div>
        {isSelected ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleFlightDetails}
            className="text-chamBlue hover:text-chamBlue/80 p-0 h-auto font-medium"
          >
            {showFlightDetails ? (
              <>
                Hide Details <ChevronUp className="h-3.5 w-3.5 ml-1" />
              </>
            ) : (
              <>
                View Details <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </>
            )}
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
