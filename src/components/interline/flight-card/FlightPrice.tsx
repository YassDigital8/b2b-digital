
import React from 'react';
import { Ticket } from 'lucide-react';
import { Flight } from '@/types/flight';

interface FlightPriceProps {
  flight: Flight;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
}

const FlightPrice: React.FC<FlightPriceProps> = ({ flight, totalPassengers }) => {
  return (
    <>
      <Ticket className="h-4 w-4 mr-1.5" />
      Book Now
      <div className="ml-2 text-white/90 text-xs font-semibold">
        ${flight.price.toLocaleString()}
        {totalPassengers.total > 1 && (
          <span className="opacity-80"> x{totalPassengers.total}</span>
        )}
      </div>
    </>
  );
};

export default FlightPrice;
