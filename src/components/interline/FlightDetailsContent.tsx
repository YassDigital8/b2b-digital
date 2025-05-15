
import React from 'react';
import { format } from 'date-fns';
import { Clock, Info, Luggage, Users } from 'lucide-react';
import { Flight } from '@/types/flight';
import { formatISODuration } from '@/utils/formatDuration';

interface FlightDetailsContentProps {
  flight: Flight;
}

const FlightDetailsContent: React.FC<FlightDetailsContentProps> = ({ flight }) => {
  return (
    <div className="p-5 bg-gradient-to-br from-white to-blue-50/50">
      {/* Flight segment details */}
      {flight?.segments.map((segment, index) => (
        <div key={segment.id} className="mb-8 last:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-chamBlue to-chamBlue/80 text-white text-xs font-medium rounded-full shadow-sm">
              {index + 1}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
              <p className="font-medium text-base text-chamDarkBlue">{segment.airport} ({segment?.FlightNumber?.slice(0, 2) || ''})</p>
              <p className="text-sm text-gray-600">Flight {segment.FlightNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 ml-8 bg-white p-4 rounded-lg shadow-sm border border-blue-100/50">
            <div className="col-span-3">
              <p className="text-xl font-medium text-chamDarkBlue">{(segment?.departure_time)}</p>
              <p className="text-sm font-medium text-gray-600">{(segment?.departure_date)}</p>
              <p className="text-sm text-chamBlue font-medium mt-1">{segment?.origin_code}</p>
              <p className="text-xs text-gray-500">{segment?.origin_name}</p>
            </div>

            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-xs font-medium px-2 py-1 bg-chamBlue/10 text-chamBlue rounded-full">
                {segment?.Duration}
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-chamBlue to-transparent my-2 relative">
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-2 w-2 bg-chamBlue rounded-full animate-pulse"></div>
              </div>
              <div className="text-xs text-gray-500">Direct</div>
            </div>

            <div className="col-span-3 text-right">
              <p className="text-xl font-medium text-chamDarkBlue">{(segment.arrival_time)}</p>
              <p className="text-sm font-medium text-gray-600">{(segment.arrival_date)}</p>
              <p className="text-sm text-chamBlue font-medium mt-1">{segment.destination_code}</p>
              <p className="text-xs text-gray-500">{segment?.destination_name}</p>
            </div>
          </div>

          {index < flight.segments.length - 1 && flight.connection_time?.[index] &&(
            <div className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-md mt-4 mb-6 ml-8 border-l-4 border-orange-400 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-orange-700">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">
                  Connection Time: {flight.connection_time?.[index] || 'N/A'}
                </span>
              </div>
            </div>
          )}


        </div>
      ))}

      {/* Baggage info */}
      <div className="mt-6 pt-6 border-t border-dashed border-blue-200">
        <div className="flex flex-col gap-3 bg-gradient-to-r from-chamBlue/5 to-blue-50 p-5 rounded-lg shadow-sm border border-blue-100">
          <div className="flex items-center gap-2">
            <Luggage className="h-5 w-5 text-chamBlue" />
            <span className="font-medium text-chamDarkBlue">Baggage Allowance:</span>
            <span className="text-gray-700">30 kg per adult</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-chamBlue" />
            <span className="font-medium text-chamDarkBlue">Cabin:</span>
            <span className="px-2 py-0.5 bg-chamBlue/10 rounded text-sm text-chamBlue">
              {flight?.flight_class === 'Y' ? 'Economy Class' : 'Business Class'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsContent;
