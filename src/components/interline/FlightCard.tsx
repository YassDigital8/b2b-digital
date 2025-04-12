
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plane, Info, Check, MapPin, ChevronDown, ChevronUp, Clock, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';
import FlightDetailsTabs from './FlightDetailsTabs';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  // Calculate total price
  const calculateTotalPrice = () => {
    return flight.price * totalPassengers.adults + 
      flight.price * totalPassengers.children + 
      (flight.price * totalPassengers.infants * 0.1);
  };

  return (
    <div
      className={cn(
        "border rounded-lg transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md",
        isSelected
          ? "border-chamBlue bg-chamBlue/5"
          : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50"
      )}
    >
      {/* Flight header with price */}
      <div 
        className={cn(
          "flex justify-between items-center p-4 cursor-pointer",
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
          <div className="p-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
            <Plane className="h-5 w-5 text-chamBlue" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-chamDarkBlue">Interline Flight</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                {flight.stops} stop
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Clock className="h-3.5 w-3.5" /> 
              <span>Total journey: {
                (() => {
                  const startTime = flight.segments[0].departureTime;
                  const endTime = flight.segments[flight.segments.length - 1].arrivalTime;
                  const durationMs = endTime.getTime() - startTime.getTime();
                  const durationMins = Math.floor(durationMs / (1000 * 60));
                  return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
                })()
              }</span>
              <span>•</span>
              <span>{flight.cabin === 'business' ? 'Business' : 'Economy'}</span>
            </div>
          </div>
        </div>
        {/* Price moved to FlightResultsList component */}
        <div className="invisible">
          {/* This space is intentionally left empty */}
        </div>
      </div>
      
      {/* Flight segments - Simplified view */}
      <div className="p-4 pt-3 bg-white">
        {/* Flight segments grid */}
        <div className="grid grid-cols-7 gap-2 items-center mb-4">
          {/* Departure */}
          <div className="col-span-3">
            <p className="text-base font-semibold">{format(flight.segments[0].departureTime, "HH:mm")}</p>
            <p className="text-sm font-medium">{flight.segments[0].fromCode}</p>
            <p className="text-xs text-gray-500">{flight.segments[0].from}</p>
          </div>
          
          {/* Duration line */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="text-xs text-gray-500 w-full text-center mb-1">
              {flight.stops} stop
            </div>
            <div className="w-full h-px bg-gray-300 my-1 relative">
              <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-chamBlue rounded-full"></div>
              <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
            </div>
            <div className="text-xs text-gray-500 w-full text-center mt-1">
              {
                (() => {
                  const startTime = flight.segments[0].departureTime;
                  const endTime = flight.segments[flight.segments.length - 1].arrivalTime;
                  const durationMs = endTime.getTime() - startTime.getTime();
                  const durationMins = Math.floor(durationMs / (1000 * 60));
                  return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
                })()
              }
            </div>
          </div>
          
          {/* Arrival */}
          <div className="col-span-3 text-right">
            <p className="text-base font-semibold">{format(flight.segments[flight.segments.length - 1].arrivalTime, "HH:mm")}</p>
            <p className="text-sm font-medium">{flight.segments[flight.segments.length - 1].toCode}</p>
            <p className="text-xs text-gray-500">{flight.segments[flight.segments.length - 1].to}</p>
          </div>
        </div>

        {/* Airlines operated by */}
        <div className="flex flex-wrap gap-3 items-center pb-3 mb-3 border-b border-dashed">
          {flight.segments.map((segment, index) => (
            <div key={segment.id} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-300">→</span>}
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium">{segment.airlineCode}</span>
                <span className="text-xs text-gray-500">{segment.flightNumber}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional info with Book Now button in the middle */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-600">
          <div className="flex items-center">
            <Check className="h-3.5 w-3.5 text-green-600 mr-1" />
            <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
            <span className="mx-2">•</span>
            <span>{flight.seats} seats left</span>
          </div>
          
          {/* Book Now button in the middle */}
          <Button 
            variant="default"
            className="bg-chamGold hover:bg-chamGold/90 text-xs h-7 px-3"
            size="sm"
            onClick={() => onSelect(flight.id)}
          >
            <Ticket className="h-3.5 w-3.5 mr-1" />
            Book Now
          </Button>
          
          {isSelected ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleToggleFlightDetails}
              className="text-chamBlue hover:text-chamBlue/80 p-0 h-auto font-medium"
            >
              {showFlightDetails ? (
                <>
                  Hide Details <ChevronUp className="h-3.5 w-3.5 ml-1" />
                </>
              ) : (
                <>
                  View Details <ChevronDown className="h-3.5 w-3.5 ml-1" />
                </>
              )}
            </Button>
          ) : (
            <div className="text-xs text-chamBlue cursor-pointer hover:underline" onClick={() => onSelect(flight.id)}>
              Select This Flight
            </div>
          )}
        </div>
      </div>

      {/* Detailed Flight Info - shown when a flight is selected */}
      {isSelected && showFlightDetails && (
        <div className="border-t border-gray-200">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-none border-b">
              <TabsTrigger value="details" className="text-sm">Flight Details</TabsTrigger>
              <TabsTrigger value="price" className="text-sm">Price Breakdown</TabsTrigger>
              <TabsTrigger value="rules" className="text-sm">Fare Rules</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4">
              {/* Flight segment details */}
              {flight.segments.map((segment, index) => (
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
                  {index < flight.segments.length - 1 && (
                    <div className="flex items-center justify-center py-2 px-4 bg-orange-50 rounded-md mt-4 mb-6 ml-8">
                      <div className="flex items-center gap-2 text-sm text-orange-700">
                        <Info className="h-4 w-4" />
                        <span>Connection Time: {flight.connectionTime} in {segment.to} ({segment.toCode})</span>
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
                    <span className="text-sm text-gray-600">{flight.cabin === 'economy' ? 'Economy Class' : 'Business Class'}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="price" className="p-4">
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
            </TabsContent>
            
            <TabsContent value="rules" className="p-4">
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
