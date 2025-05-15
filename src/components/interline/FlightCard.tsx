
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Flight } from '@/types/flight';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FlightSegment from './FlightSegment';
import AirlineDisplay from './AirlineDisplay';
import FlightCardInfo from './FlightCardInfo';
import FlightCardTabs from './FlightCardTabs';
import FlightHeader from './flight-card/FlightHeader';
import FlightPrice from './flight-card/FlightPrice';

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
  onBook?: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  selectedFlightId,
  onSelect,
  totalPassengers,
  onBook
}) => {
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const isSelected = selectedFlightId === flight.id;
  
  const handleToggleFlightDetails = () => {
    setShowFlightDetails(!showFlightDetails);
  };

  const handleBookNow = () => {
    // First ensure this flight is selected
    onSelect(flight.id);
    
    // If there's an onBook handler, call it to proceed with booking
    if (onBook) {
      onBook();
    }
  };
  
  return (
    <div className={cn("border rounded-lg transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md", 
      isSelected ? "border-chamBlue bg-chamBlue/5" : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50")}>
      
      {/* Flight header with price */}
      <FlightHeader 
        flight={flight}
        isSelected={isSelected}
        onSelect={onSelect}
        setShowFlightDetails={setShowFlightDetails}
      />
      
      {/* Flight details section */}
      <div className="p-5 pt-4 bg-white">
        {/* Flight segments grid */}
        <FlightSegment segments={flight.segments} />

        {/* Airlines operated by */}
        <AirlineDisplay segments={flight.segments} />
        
        {/* Main content area with flight info and book now button */}
        <div className="flex items-center justify-between">
          {/* Left side - Flight info */}
          <FlightCardInfo 
            flight={flight} 
            isSelected={isSelected} 
            showFlightDetails={showFlightDetails} 
            onSelect={onSelect} 
            onToggleFlightDetails={handleToggleFlightDetails} 
          />
          
          {/* Right side - Book Now button */}
          <Button 
            variant="default" 
            className="bg-chamGold hover:bg-chamGold/90 text-sm px-8 py-5 h-auto font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 rounded-full" 
            onClick={handleBookNow}
          >
            <FlightPrice flight={flight} totalPassengers={totalPassengers} />
          </Button>
        </div>
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
