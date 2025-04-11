
import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Flight } from '@/types/flight';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FlightDetailsTabsProps {
  selectedFlight: Flight;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
}

const FlightDetailsTabs: React.FC<FlightDetailsTabsProps> = ({
  selectedFlight,
  totalPassengers
}) => {
  // Calculate total price
  const totalPrice = selectedFlight.price * 
    (totalPassengers.adults + totalPassengers.children + (totalPassengers.infants * 0.1));

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Flight Details</TabsTrigger>
        <TabsTrigger value="price">Price Breakdown</TabsTrigger>
        <TabsTrigger value="rules">Fare Rules</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="p-4">
        {selectedFlight.segments.map((segment, index) => (
          <div key={segment.id} className="mb-6 last:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">
                {index + 1}
              </div>
              <p className="font-medium">{segment.airline} ({segment.airlineCode})</p>
              <p className="text-sm text-gray-600">Flight {segment.flightNumber}</p>
            </div>
            
            <div className="grid grid-cols-7 gap-4 ml-8">
              <div className="col-span-3">
                <p className="text-lg font-medium">{format(segment.departureTime, "HH:mm")}</p>
                <p className="text-sm font-medium">{format(segment.departureTime, "dd MMM yyyy")}</p>
                <p className="text-sm">{segment.fromCode}</p>
                <p className="text-xs text-gray-500">{segment.from}</p>
              </div>
              
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="text-xs text-gray-500">{segment.duration}</div>
                <div className="w-full h-px bg-gray-300 my-2 relative">
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-2 w-2 bg-chamBlue rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500">Direct</div>
              </div>
              
              <div className="col-span-3 text-right">
                <p className="text-lg font-medium">{format(segment.arrivalTime, "HH:mm")}</p>
                <p className="text-sm font-medium">{format(segment.arrivalTime, "dd MMM yyyy")}</p>
                <p className="text-sm">{segment.toCode}</p>
                <p className="text-xs text-gray-500">{segment.to}</p>
              </div>
            </div>

            {/* Connection info if not the last segment */}
            {index < selectedFlight.segments.length - 1 && (
              <div className="flex items-center justify-center py-2 px-4 bg-orange-50 rounded-md mt-4 mb-6 ml-8">
                <div className="flex items-center gap-2 text-sm text-orange-700">
                  <span>Connection Time: {selectedFlight.connectionTime} in {segment.to} ({segment.toCode})</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Baggage info */}
        <div className="mt-4 pt-4 border-t border-dashed">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Baggage Allowance:</span>
              <span className="text-sm text-gray-600">30 kg per adult</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Cabin:</span>
              <span className="text-sm text-gray-600">
                {selectedFlight.cabin === 'economy' ? 'Economy Class' : 'Business Class'}
              </span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="price">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Passenger Type</TableHead>
              <TableHead className="text-center">Count</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalPassengers.adults > 0 && (
              <TableRow>
                <TableCell>Adult</TableCell>
                <TableCell className="text-center">{totalPassengers.adults}</TableCell>
                <TableCell className="text-right">$ {(selectedFlight.price * totalPassengers.adults).toLocaleString()}</TableCell>
              </TableRow>
            )}
            {totalPassengers.children > 0 && (
              <TableRow>
                <TableCell>Child</TableCell>
                <TableCell className="text-center">{totalPassengers.children}</TableCell>
                <TableCell className="text-right">$ {(selectedFlight.price * totalPassengers.children).toLocaleString()}</TableCell>
              </TableRow>
            )}
            {totalPassengers.infants > 0 && (
              <TableRow>
                <TableCell>Infant</TableCell>
                <TableCell className="text-center">{totalPassengers.infants}</TableCell>
                <TableCell className="text-right">$ {(selectedFlight.price * totalPassengers.infants * 0.1).toLocaleString()}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={2} className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">$ {totalPrice.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>

      <TabsContent value="rules">
        <div className="p-4 text-sm text-gray-600 space-y-3">
          <p>
            <strong>Penalties (Per leg):</strong> Modification before 24 hours: USD 75 + Any fare difference. Refund before departure: USD 170. After departure Non Refundable No Show: USD 210.
          </p>
          <p>
            <strong>Changes:</strong> Changes or refund within 24H not permitted and will consider as No Show.
          </p>
          <p>
            <strong>Infant Policy:</strong> INF fare Non Refundable
          </p>
          <p>
            <strong>Stop over:</strong> Not permitted. Void not permitted on B2B TKT.
          </p>
          <p>
            <strong>Baggage:</strong> Baggage allowance 30 kg // Baggage Allowance for INF 10 kgs on 6Q sector
          </p>
          <p>
            <strong>Connection Requirements:</strong> Connecting airline ticket is required to reconfirm with Cham Wings office for a confirmed segment status. Passengers are required to carry connecting airline confirmed ticket.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FlightDetailsTabs;
