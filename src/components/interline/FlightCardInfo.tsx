
import React from 'react';
import { Check, ChevronDown, Eye } from 'lucide-react';
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
        <span className="font-medium">{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
        <span className="mx-2">•</span>
        <span>{flight.seats} seats left</span>
      </div>
      
      {/* View details button - softened edges and improved style */}
      <div className="text-right">
        {isSelected && showFlightDetails ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleFlightDetails}
            className="text-violet-700 border-violet-300 hover:bg-violet-50 hover:text-violet-800 font-medium rounded-full px-4 shadow-sm transition-all duration-300"
          >
            Hide Details <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={isSelected ? onToggleFlightDetails : () => onSelect(flight.id)}
            className="text-violet-700 border-violet-300 hover:bg-violet-50 hover:text-violet-800 font-medium rounded-full px-4 shadow-sm transition-all duration-300"
          >
            <Eye className="mr-1 h-4 w-4" /> View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlightCardInfo;
