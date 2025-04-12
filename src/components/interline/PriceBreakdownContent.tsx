
import React from 'react';
import { Flight } from '@/types/flight';
import { Calculator, CreditCard, User, Users, Baby } from 'lucide-react';

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
    <div className="p-5 bg-gradient-to-br from-white to-chamGold/5">
      <div className="mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-chamGold" />
        <h3 className="text-lg font-medium text-chamDarkBlue">Price Summary</h3>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-chamGold/20 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-chamGold/10 to-amber-50 border-b border-chamGold/20">
              <th className="text-left py-3 px-4 text-sm font-medium text-chamDarkBlue">Passenger Type</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-chamDarkBlue">Count</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-chamDarkBlue">Price</th>
            </tr>
          </thead>
          <tbody>
            {totalPassengers.adults > 0 && (
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm flex items-center gap-2">
                  <User className="h-4 w-4 text-chamDarkBlue/70" />
                  <span>Adult</span>
                </td>
                <td className="text-center py-3 px-4 text-sm">{totalPassengers.adults}</td>
                <td className="text-right py-3 px-4 text-sm font-medium">$ {(flight.price * totalPassengers.adults).toLocaleString()}</td>
              </tr>
            )}
            {totalPassengers.children > 0 && (
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-chamDarkBlue/70" />
                  <span>Child</span>
                </td>
                <td className="text-center py-3 px-4 text-sm">{totalPassengers.children}</td>
                <td className="text-right py-3 px-4 text-sm font-medium">$ {(flight.price * totalPassengers.children).toLocaleString()}</td>
              </tr>
            )}
            {totalPassengers.infants > 0 && (
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm flex items-center gap-2">
                  <Baby className="h-4 w-4 text-chamDarkBlue/70" />
                  <span>Infant</span>
                </td>
                <td className="text-center py-3 px-4 text-sm">{totalPassengers.infants}</td>
                <td className="text-right py-3 px-4 text-sm font-medium">$ {(flight.price * totalPassengers.infants * 0.1).toLocaleString()}</td>
              </tr>
            )}
            <tr className="bg-gradient-to-r from-chamGold/5 to-amber-50">
              <td colSpan={2} className="py-3 px-4 font-bold text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4 text-chamGold" />
                Total
              </td>
              <td className="text-right py-3 px-4 font-bold text-chamDarkBlue">$ {calculateTotalPrice().toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 p-4 rounded-md bg-gradient-to-r from-chamGold/10 to-amber-50 border-l-4 border-chamGold text-sm text-gray-700">
        <p>All prices are in USD and include standard taxes and fees. Additional charges may apply for extra baggage or services.</p>
      </div>
    </div>
  );
};

export default PriceBreakdownContent;
