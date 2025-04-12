
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
    <div className="flex flex-wrap items-center justify-between text-xs text-gray-600">
      <div className="flex items-center">
        <Check className="h-3.5 w-3.5 text-green-600 mr-1" />
        <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
        <span className="mx-2">•</span>
        <span>{flight.seats} seats left</span>
      </div>
      
      {/* Book Now button in the middle */}
      <Button 
        variant="default"
        className="bg-chamGold hover:bg-chamGold/90 text-xs h-7 px-3"
        size="sm"
        onClick={() => onSelect(flight.id)}
      >
        <Ticket className="h-3.5 w-3.5 mr-1" />
        Book Now
      </Button>
      
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
          Select This Flight
        </div>
      )}
    </div>
  );
};

export default FlightCardInfo;
