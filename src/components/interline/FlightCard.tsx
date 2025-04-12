
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Flight } from '@/types/flight';
import FlightSegment from './FlightSegment';
import AirlineDisplay from './AirlineDisplay';
import FlightCardInfo from './FlightCardInfo';
import FlightCardTabs from './FlightCardTabs';
import { Clock, Plane } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FlightCardProps {
  flight: Flight;
  selectedFlightId: string | null;
  onSelect: (flightId: string) => void;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
}

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  selectedFlightId,
  onSelect,
  totalPassengers
}) => {
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const isSelected = selectedFlightId === flight.id;
  
  const handleToggleFlightDetails = () => {
    setShowFlightDetails(!showFlightDetails);
  };

  return (
    <div
      className={cn(
        "border rounded-lg transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md",
        isSelected
          ? "border-chamBlue bg-chamBlue/5"
          : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50"
      )}
    >
      {/* Flight header with price */}
      <div 
        className={cn(
          "flex justify-between items-center p-4 cursor-pointer",
          isSelected ? "bg-chamBlue/10" : "bg-gray-50 hover:bg-chamBlue/5"
        )}
        onClick={() => {
          onSelect(flight.id);
          // Automatically show details when selecting a flight
          if (!isSelected) {
            setShowFlightDetails(true);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
            <Plane className="h-5 w-5 text-chamBlue" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-chamDarkBlue">Interline Flight</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                {flight.stops} stop
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Total journey: {
                (() => {
                  const startTime = flight.segments[0].departureTime;
                  const endTime = flight.segments[flight.segments.length - 1].arrivalTime;
                  const durationMs = endTime.getTime() - startTime.getTime();
                  const durationMins = Math.floor(durationMs / (1000 * 60));
                  return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
                })()
              }</span>
              <span>•</span>
              <span>{flight.cabin === 'business' ? 'Business' : 'Economy'}</span>
            </div>
          </div>
        </div>
        {/* Price moved to FlightResultsList component */}
        <div className="invisible">
          {/* This space is intentionally left empty */}
        </div>
      </div>
      
      {/* Flight segments - Simplified view */}
      <div className="p-4 pt-3 bg-white">
        {/* Flight segments grid */}
        <FlightSegment segments={flight.segments} />

        {/* Airlines operated by */}
        <AirlineDisplay segments={flight.segments} />
        
        {/* Additional info with Book Now button in the middle */}
        <FlightCardInfo 
          flight={flight} 
          isSelected={isSelected} 
          showFlightDetails={showFlightDetails}
          onSelect={onSelect}
          onToggleFlightDetails={handleToggleFlightDetails}
        />
      </div>

      {/* Detailed Flight Info - shown when a flight is selected */}
      {isSelected && showFlightDetails && (
        <div className="border-t border-gray-200">
          <FlightCardTabs flight={flight} totalPassengers={totalPassengers} />
        </div>
      )}
    </div>
  );
};

export default FlightCard;
