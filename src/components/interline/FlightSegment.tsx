
import React from 'react';
import { format } from 'date-fns';
import { Plane } from 'lucide-react';
import { Segment } from '@/types/flight';

interface FlightSegmentProps {
  segments: Segment[];
}

const FlightSegment: React.FC<FlightSegmentProps> = ({ segments }) => {
  return (
    <div className="grid grid-cols-7 gap-2 items-center mb-5">
      {/* Departure */}
      <div className="col-span-3">
        <p className="text-lg font-semibold text-chamDarkBlue">{format(segments[0].departureTime, "HH:mm")}</p>
        <p className="text-sm font-medium">{segments[0].fromCode}</p>
        <p className="text-xs text-gray-500">{segments[0].from}</p>
      </div>
      
      {/* Duration line */}
      <div className="col-span-1 flex flex-col items-center">
        <div className="text-xs text-gray-500 w-full text-center mb-1">
          {segments.length - 1} stop
        </div>
        <div className="w-full h-px bg-gray-300 my-1 relative">
          <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-chamBlue rounded-full"></div>
          <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
        </div>
        <div className="text-xs text-gray-500 w-full text-center mt-1">
          {
            (() => {
              const startTime = segments[0].departureTime;
              const endTime = segments[segments.length - 1].arrivalTime;
              const durationMs = endTime.getTime() - startTime.getTime();
              const durationMins = Math.floor(durationMs / (1000 * 60));
              return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
            })()
          }
        </div>
      </div>
      
      {/* Arrival */}
      <div className="col-span-3 text-right">
        <p className="text-lg font-semibold text-chamDarkBlue">{format(segments[segments.length - 1].arrivalTime, "HH:mm")}</p>
        <p className="text-sm font-medium">{segments[segments.length - 1].toCode}</p>
        <p className="text-xs text-gray-500">{segments[segments.length - 1].to}</p>
      </div>
    </div>
  );
};

export default FlightSegment;
