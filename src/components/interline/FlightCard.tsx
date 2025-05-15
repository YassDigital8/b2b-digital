
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Flight } from '@/types/flight';
import { Button } from '@/components/ui/button';
import FlightSegment from './FlightSegment';
import AirlineDisplay from './AirlineDisplay';
import FlightCardInfo from './FlightCardInfo';
import FlightCardTabs from './FlightCardTabs';
import { Clock, Plane, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/redux/useAppSelector';
import curr7encies from '@/utils/currencies';
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
  const { travelAgent } = useAppSelector(state => state.auth);
  const pos = travelAgent?.value?.pos

  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const isSelected = selectedFlightId === flight.id;

  const handleToggleFlightDetails = () => {
    setShowFlightDetails(!showFlightDetails);
  };

  const getCurrency = (pos) => {
    return (curr7encies?.find((c) => c.code === pos)?.symbol)
  }
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
      <div
        className={cn(
          "flex justify-between items-center p-5 cursor-pointer",
          isSelected ? "bg-chamBlue/10" : "bg-gray-50 hover:bg-chamBlue/5"
        )}
        onClick={() => {
          onSelect(flight?.id);
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
                {flight?.
                  segments
                  ?.length - 1} stop
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Total journey: {
                flight?.Duration
              }</span>
              <span>•</span>
              <span>{flight?.flight_class === 'C' ? 'Business Class' : 'Economy Class'}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          {flight?.total_fare_with_additional &&
            <p className="font-bold text-xl text-chamDarkBlue">{getCurrency(pos)} {flight?.total_fare_with_additional}</p>
          }
          {/* <p className="text-xs text-gray-500">per passenger</p> */}
          {totalPassengers.total > 1 && (
            <p className="text-xs font-medium text-chamBlue">${(flight?.price * totalPassengers?.total).toLocaleString()} total</p>
          )}
        </div>
      </div>

      {/* Flight segments - Simplified view */}
      <div className="p-5 pt-4 bg-white">
        {/* Flight segments grid */}
        <FlightSegment flight={flight} />

        {/* Airlines operated by */}
        {/* <AirlineDisplay segments={flight.segments} /> */}

        {/* Main content area with flight info and book now button */}
        <div className="flex items-center justify-between">
          <FlightCardInfo
            flight={flight}
            isSelected={isSelected}
            showFlightDetails={showFlightDetails}
            onSelect={onSelect}
            onToggleFlightDetails={handleToggleFlightDetails}
          />
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
