
import React from 'react';
import { cn } from '@/lib/utils';
import { Flight } from '@/types/flight';
import { Badge } from '@/components/ui/badge';
import { Clock, Plane } from 'lucide-react';

interface FlightHeaderProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: (flightId: string) => void;
  setShowFlightDetails: (show: boolean) => void;
}

const FlightHeader: React.FC<FlightHeaderProps> = ({ 
  flight, 
  isSelected, 
  onSelect, 
  setShowFlightDetails 
}) => {
  const calculateDuration = () => {
    const startTime = flight.segments[0].departureTime;
    const endTime = flight.segments[flight.segments.length - 1].arrivalTime;
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMins = Math.floor(durationMs / (1000 * 60));
    return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
  };
  
  return (
    <div 
      className={cn(
        "flex justify-between items-center p-5 cursor-pointer", 
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
        <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm">
          <Plane className="h-5 w-5 text-chamBlue" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-chamDarkBlue text-base">Interline Flight</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
              {flight.stops} stop
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Total journey: {calculateDuration()}</span>
            <span>•</span>
            <span>{flight.cabin === 'business' ? 'Business' : 'Economy'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;
