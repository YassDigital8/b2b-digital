
import React from 'react';
import { Check } from 'lucide-react';
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
    <div className="flex flex-col gap-4">
      {/* Flight information */}
      <div className="flex items-center text-xs text-gray-600">
        <Check className="h-3.5 w-3.5 text-green-600 mr-1" />
        <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
        <span className="mx-2">•</span>
        <span>{flight.seats} seats left</span>
      </div>
      
      {/* View details text */}
      <div className="text-right">
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
