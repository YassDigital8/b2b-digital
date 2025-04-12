
import React from 'react';
import { Flight } from '@/types/flight';

interface PriceBreakdownContentProps {
  flight: Flight;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
}

const PriceBreakdownContent: React.FC<PriceBreakdownContentProps> = ({ flight, totalPassengers }) => {
  // Calculate total price
  const calculateTotalPrice = () => {
    return flight.price * totalPassengers.adults + 
      flight.price * totalPassengers.children + 
      (flight.price * totalPassengers.infants * 0.1);
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-sm font-medium">Passenger Type</th>
            <th className="text-center py-2 text-sm font-medium">Count</th>
            <th className="text-right py-2 text-sm font-medium">Price</th>
          </tr>
        </thead>
        <tbody>
          {totalPassengers.adults > 0 && (
            <tr className="border-b">
              <td className="py-2 text-sm">Adult</td>
              <td className="text-center py-2 text-sm">{totalPassengers.adults}</td>
              <td className="text-right py-2 text-sm">$ {(flight.price * totalPassengers.adults).toLocaleString()}</td>
            </tr>
          )}
          {totalPassengers.children > 0 && (
            <tr className="border-b">
              <td className="py-2 text-sm">Child</td>
              <td className="text-center py-2 text-sm">{totalPassengers.children}</td>
              <td className="text-right py-2 text-sm">$ {(flight.price * totalPassengers.children).toLocaleString()}</td>
            </tr>
          )}
          {totalPassengers.infants > 0 && (
            <tr className="border-b">
              <td className="py-2 text-sm">Infant</td>
              <td className="text-center py-2 text-sm">{totalPassengers.infants}</td>
              <td className="text-right py-2 text-sm">$ {(flight.price * totalPassengers.infants * 0.1).toLocaleString()}</td>
            </tr>
          )}
          <tr>
            <td colSpan={2} className="py-3 font-bold text-sm">Total</td>
            <td className="text-right py-3 font-bold text-sm">$ {calculateTotalPrice().toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceBreakdownContent;
