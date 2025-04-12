
import React from 'react';
import { Check, ChevronDown, ChevronRight, Eye } from 'lucide-react';
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
      
      {/* View details button - softened edges and improved style */}
      <div className="text-right">
        {isSelected ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleFlightDetails}
            className="text-chamBlue border-chamBlue/30 hover:bg-chamBlue/10 hover:text-chamBlue font-medium rounded-full px-4 shadow-sm transition-all duration-300"
          >
            {showFlightDetails ? (
              <>
                Hide Details <ChevronDown className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                View Details <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(flight.id)}
            className="text-chamBlue border-chamBlue/30 hover:bg-chamBlue/10 hover:text-chamBlue font-medium rounded-full px-4 shadow-sm transition-all duration-300"
          >
            <Eye className="mr-1 h-4 w-4" /> View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlightCardInfo;
