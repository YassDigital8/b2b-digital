
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plane, Info, Check, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';
import FlightDetailsTabs from './FlightDetailsTabs';

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
        "border rounded-lg transition-all duration-300 overflow-hidden",
        isSelected
          ? "border-chamBlue bg-chamBlue/5"
          : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50"
      )}
    >
      {/* Flight header with price */}
      <div 
        className="flex justify-between items-center p-3 bg-gray-50 border-b cursor-pointer"
        onClick={() => onSelect(flight.id)}
      >
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-chamBlue" />
          <span className="font-medium">Interline Flight</span>
          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
            {flight.stops} stop
          </span>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-chamDarkBlue">${flight.price}</p>
          <p className="text-xs text-gray-500">per passenger</p>
        </div>
      </div>
      
      {/* Flight segments */}
      <div className="p-4">
        {/* First segment */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">1</div>
            <p className="font-medium">{flight.segments[0].airline} ({flight.segments[0].airlineCode})</p>
            <p className="text-sm text-gray-600">Flight {flight.segments[0].flightNumber}</p>
          </div>
          
          <div className="grid grid-cols-7 gap-2 items-center pl-8">
            <div className="col-span-3">
              <p className="text-base font-semibold">{format(flight.segments[0].departureTime, "HH:mm")}</p>
              <p className="text-sm">{flight.segments[0].fromCode}</p>
              <p className="text-xs text-gray-500">{flight.segments[0].from}</p>
            </div>
            
            <div className="col-span-1 flex flex-col items-center">
              <div className="text-xs text-gray-500">{flight.segments[0].duration}</div>
              <div className="w-full h-px bg-gray-300 my-1 relative">
                <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
              </div>
              <div className="text-xs text-gray-500">Direct</div>
            </div>
            
            <div className="col-span-3 text-right">
              <p className="text-base font-semibold">{format(flight.segments[0].arrivalTime, "HH:mm")}</p>
              <p className="text-sm">{flight.segments[0].toCode}</p>
              <p className="text-xs text-gray-500">{flight.segments[0].to}</p>
            </div>
          </div>
        </div>
        
        {/* Connection information */}
        <div className="flex items-center justify-center py-2 px-4 bg-orange-50 rounded-md mb-4">
          <div className="flex items-center gap-2 text-sm text-orange-700">
            <Info className="h-4 w-4" />
            <span>Connection time: {flight.connectionTime} in {flight.segments[0].to} ({flight.segments[0].toCode})</span>
          </div>
        </div>
        
        {/* Second segment */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">2</div>
            <p className="font-medium">{flight.segments[1].airline} ({flight.segments[1].airlineCode})</p>
            <p className="text-sm text-gray-600">Flight {flight.segments[1].flightNumber}</p>
          </div>
          
          <div className="grid grid-cols-7 gap-2 items-center pl-8">
            <div className="col-span-3">
              <p className="text-base font-semibold">{format(flight.segments[1].departureTime, "HH:mm")}</p>
              <p className="text-sm">{flight.segments[1].fromCode}</p>
              <p className="text-xs text-gray-500">{flight.segments[1].from}</p>
            </div>
            
            <div className="col-span-1 flex flex-col items-center">
              <div className="text-xs text-gray-500">{flight.segments[1].duration}</div>
              <div className="w-full h-px bg-gray-300 my-1 relative">
                <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
              </div>
              <div className="text-xs text-gray-500">Direct</div>
            </div>
            
            <div className="col-span-3 text-right">
              <p className="text-base font-semibold">{format(flight.segments[1].arrivalTime, "HH:mm")}</p>
              <p className="text-sm">{flight.segments[1].toCode}</p>
              <p className="text-xs text-gray-500">{flight.segments[1].to}</p>
            </div>
          </div>
        </div>
        
        {/* Additional flight info */}
        <div className="mt-4 pt-3 border-t border-dashed flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-1" />
              <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
            </div>
            <div>
              <span className="text-gray-600">{flight.seats} seats left</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-chamBlue" />
            <span>Total journey time: {
              (() => {
                const startTime = flight.segments[0].departureTime;
                const endTime = flight.segments[1].arrivalTime;
                const durationMs = endTime.getTime() - startTime.getTime();
                const durationMins = Math.floor(durationMs / (1000 * 60));
                return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
              })()
            }</span>
          </div>
        </div>

        {/* Flight details button */}
        {isSelected && (
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleToggleFlightDetails}
              className="text-chamBlue border-chamBlue/30"
            >
              {showFlightDetails ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Hide Flight Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> Show Flight Details
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Detailed Flight Info Tabs - shown when a flight is selected */}
      {isSelected && showFlightDetails && (
        <FlightDetailsTabs selectedFlight={flight} totalPassengers={totalPassengers} />
      )}
    </div>
  );
};

export default FlightCard;
