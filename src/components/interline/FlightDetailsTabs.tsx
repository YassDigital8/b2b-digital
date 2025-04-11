
import React, { useState } from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { ChevronUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Flight } from '@/types/flight';
import { getAirlineLogo } from '@/utils/airlineLogos';

interface FlightDetailsTabsProps {
  selectedFlight: Flight;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
  };
}

const FlightDetailsTabs: React.FC<FlightDetailsTabsProps> = ({
  selectedFlight,
  totalPassengers
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'price' | 'rules'>('details');
  
  // Calculate total price
  const totalPrice = selectedFlight.price * 
    (totalPassengers.adults + totalPassengers.children + (totalPassengers.infants * 0.1));

  return (
    <div className="mt-6 bg-white rounded-md overflow-hidden shadow-sm border border-gray-200">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('details')}
          className={cn(
            "px-6 py-3 text-sm font-medium",
            activeTab === 'details'
              ? "border-b-2 border-chamBlue text-chamBlue"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Flight Details
        </button>
        <button
          onClick={() => setActiveTab('price')}
          className={cn(
            "px-6 py-3 text-sm font-medium",
            activeTab === 'price'
              ? "border-b-2 border-chamBlue text-chamBlue"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Price Breakdown
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={cn(
            "px-6 py-3 text-sm font-medium",
            activeTab === 'rules'
              ? "border-b-2 border-chamBlue text-chamBlue"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Fare Rules
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* First segment */}
            {selectedFlight.segments.map((segment, index) => (
              <div key={segment.id} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    {getAirlineLogo(segment.airlineCode) ? (
                      <img 
                        src={getAirlineLogo(segment.airlineCode)} 
                        alt={segment.airline}
                        className="h-5 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-xs px-1 py-0.5 bg-gray-100 rounded font-mono">{segment.airlineCode}</span>
                    )}
                    <p className="font-medium">{segment.airline} ({segment.airlineCode})</p>
                    <p className="text-sm text-gray-600">Flight {segment.flightNumber}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-4 ml-8">
                  <div className="col-span-3">
                    <p className="text-lg font-medium">
                      {format(segment.departureTime, "HH:mm")}
                    </p>
                    <p className="text-sm font-medium">{format(segment.departureTime, "dd MMM yyyy")}</p>
                    <p className="text-sm">{segment.fromCode}</p>
                    <p className="text-xs text-gray-500">{segment.from}</p>
                  </div>
                  
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-500">{segment.duration}</div>
                    <div className="w-full h-px bg-gray-300 my-2 relative">
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-2 w-2 rounded-full bg-chamBlue"></div>
                    </div>
                    <div className="text-xs text-gray-500">Direct</div>
                  </div>
                  
                  <div className="col-span-3 text-right">
                    <p className="text-lg font-medium">
                      {format(segment.arrivalTime, "HH:mm")}
                    </p>
                    <p className="text-sm font-medium">{format(segment.arrivalTime, "dd MMM yyyy")}</p>
                    <p className="text-sm">{segment.toCode}</p>
                    <p className="text-xs text-gray-500">{segment.to}</p>
                  </div>
                </div>

                {/* Connection info if not the last segment */}
                {index < selectedFlight.segments.length - 1 && (
                  <div className="flex items-center justify-center py-2 px-4 bg-orange-50 rounded-md mt-4 ml-8">
                    <span className="text-sm text-orange-700">
                      Transit Time: {selectedFlight.connectionTime}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Additional flight info */}
            <div className="mt-4 pt-4 border-t border-dashed">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Baggage Allowance:</span>
                  <span className="text-sm text-gray-600">30 kg per adult</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Cabin:</span>
                  <span className="text-sm text-gray-600">{selectedFlight.cabin === 'economy' ? 'Economy Class' : 'Business Class'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">Available Seats:</span>
                  <span className="text-sm text-gray-600">{selectedFlight.seats}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'price' && (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pax Type</TableHead>
                  <TableHead>Pax</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totalPassengers.adults > 0 && (
                  <TableRow>
                    <TableCell>Adult</TableCell>
                    <TableCell>{totalPassengers.adults}</TableCell>
                    <TableCell className="text-right">$ {(selectedFlight.price * totalPassengers.adults).toLocaleString()}</TableCell>
                  </TableRow>
                )}
                {totalPassengers.children > 0 && (
                  <TableRow>
                    <TableCell>Child</TableCell>
                    <TableCell>{totalPassengers.children}</TableCell>
                    <TableCell className="text-right">$ {(selectedFlight.price * totalPassengers.children).toLocaleString()}</TableCell>
                  </TableRow>
                )}
                {totalPassengers.infants > 0 && (
                  <TableRow>
                    <TableCell>Infant</TableCell>
                    <TableCell>{totalPassengers.infants}</TableCell>
                    <TableCell className="text-right">$ {(selectedFlight.price * totalPassengers.infants * 0.1).toLocaleString()}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">$ {totalPrice.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="text-sm text-gray-600 space-y-3">
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
            <p>
              <strong>Transit Requirements:</strong> Min transit time at KWI airport 8 Hours, otherwise PAX need to issue hotel accommodation at KWI airport before departure.
            </p>
            <p>
              <strong>Excess Baggage:</strong> PER 1KG DAM/KWI 55000 SYP, KWI/SHJ or AUH or G9 4.75 KD + 2 KD service charge. To be paid separately at DAM & KWI Airport.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetailsTabs;
