
import React from 'react';
import { Flight } from '@/types/flight';
import { Calculator, CreditCard, User, Users, Baby } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  // Base fare amounts (simplified for demo purposes)
  const baseFare = flight.price * 0.4; // 40% of total price
  const taxes = flight.price * 0.15; // 15% of total price
  const fees = flight.price * 0.45; // 45% of total price

  // Calculate total price
  const calculateTotalPrice = () => {
    const adultTotal = (baseFare + taxes + fees) * totalPassengers.adults;
    const childTotal = (baseFare + taxes + fees) * totalPassengers.children;
    const infantTotal = ((baseFare * 0.1) + (taxes * 0.1)) * totalPassengers.infants; // Infants pay 10% of base fare and taxes, no fees
    
    return adultTotal + childTotal + infantTotal;
  };

  return (
    <div className="p-5 bg-white">
      <div className="mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-chamGold" />
        <h3 className="text-lg font-medium text-chamDarkBlue">Price Summary</h3>
      </div>

      <div className="rounded-lg border border-chamGold/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-chamGold/10 to-amber-50">
            <TableRow className="border-b border-chamGold/20 hover:bg-transparent">
              <TableHead className="text-left py-3 px-4 text-sm font-medium text-chamDarkBlue">Passenger Type</TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-medium text-chamDarkBlue">Base Fare</TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-medium text-chamDarkBlue">Taxes</TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-medium text-chamDarkBlue">Fees</TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-medium text-chamDarkBlue">Total Fare</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalPassengers.adults > 0 && (
              <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-chamDarkBlue/70" />
                    <span>Adult{totalPassengers.adults > 1 ? "s" : ""} ({totalPassengers.adults})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(baseFare * totalPassengers.adults).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(taxes * totalPassengers.adults).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(fees * totalPassengers.adults).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {((baseFare + taxes + fees) * totalPassengers.adults).toFixed(2)}</TableCell>
              </TableRow>
            )}
            
            {totalPassengers.children > 0 && (
              <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-chamDarkBlue/70" />
                    <span>Child{totalPassengers.children > 1 ? "ren" : ""} ({totalPassengers.children})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(baseFare * totalPassengers.children).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(taxes * totalPassengers.children).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(fees * totalPassengers.children).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {((baseFare + taxes + fees) * totalPassengers.children).toFixed(2)}</TableCell>
              </TableRow>
            )}
            
            {totalPassengers.infants > 0 && (
              <TableRow className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Baby className="h-4 w-4 text-chamDarkBlue/70" />
                    <span>Infant{totalPassengers.infants > 1 ? "s" : ""} ({totalPassengers.infants})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(baseFare * 0.1 * totalPassengers.infants).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(taxes * 0.1 * totalPassengers.infants).toFixed(2)}</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ 0.00</TableCell>
                <TableCell className="text-right py-3 px-4 text-sm font-medium">$ {(((baseFare * 0.1) + (taxes * 0.1)) * totalPassengers.infants).toFixed(2)}</TableCell>
              </TableRow>
            )}
            
            <TableRow className="bg-gradient-to-r from-chamGold/5 to-amber-50 font-medium">
              <TableCell colSpan={4} className="py-3 px-4 text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4 text-chamGold" />
                Total
              </TableCell>
              <TableCell className="text-right py-3 px-4 font-bold text-chamDarkBlue">$ {calculateTotalPrice().toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-5 p-4 rounded-md bg-gradient-to-r from-chamGold/10 to-amber-50 border-l-4 border-chamGold text-sm text-gray-700">
        <p>All prices are in USD and include standard taxes and fees. Additional charges may apply for extra baggage or services.</p>
      </div>
    </div>
  );
};

export default PriceBreakdownContent;
