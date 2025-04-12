
import React from 'react';
import { format } from 'date-fns';
import { Info } from 'lucide-react';
import { Flight } from '@/types/flight';

interface FlightDetailsContentProps {
  flight: Flight;
}

const FlightDetailsContent: React.FC<FlightDetailsContentProps> = ({ flight }) => {
  return (
    <div className="p-5">
      {/* Flight segment details */}
      {flight.segments.map((segment, index) => (
        <div key={segment.id} className="mb-6 last:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">
              {index + 1}
            </div>
            <p className="font-medium text-base">{segment.airline} ({segment.airlineCode})</p>
            <p className="text-sm text-gray-600">Flight {segment.flightNumber}</p>
          </div>
          
          <div className="grid grid-cols-7 gap-4 ml-8">
            <div className="col-span-3">
              <p className="text-lg font-medium text-chamDarkBlue">{format(segment.departureTime, "HH:mm")}</p>
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
              <p className="text-lg font-medium text-chamDarkBlue">{format(segment.arrivalTime, "HH:mm")}</p>
              <p className="text-sm font-medium">{format(segment.arrivalTime, "dd MMM yyyy")}</p>
              <p className="text-sm">{segment.toCode}</p>
              <p className="text-xs text-gray-500">{segment.to}</p>
            </div>
          </div>

          {/* Connection info if not the last segment */}
          {index < flight.segments.length - 1 && (
            <div className="flex items-center justify-center py-3 px-4 bg-orange-50 rounded-md mt-4 mb-6 ml-8 border border-orange-100">
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
        <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Baggage Allowance:</span>
            <span className="text-sm text-gray-500">30 kg per adult</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Cabin:</span>
            <span className="text-sm text-gray-500">{flight.cabin === 'economy' ? 'Economy Class' : 'Business Class'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsContent;
