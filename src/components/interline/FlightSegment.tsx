
import React from 'react';
import { format } from 'date-fns';
import { MapPin, Plane } from 'lucide-react';
import { Segment } from '@/types/flight';
import { formatTimeWithoutSeconds } from '@/utils/formatTime';

interface FlightSegmentProps {
  segments: Segment[];
}

const FlightSegment: React.FC<FlightSegmentProps> = ({ flight }) => {
  let segments = flight?.segments

  const StopsIndicator = ({ segments = [], flight }) => {
    const stops = segments.length - 1; // Calculate number of stops

    return (
      <div className="col-span-1 flex flex-col items-center">
        {/* Stop count label */}
        <div className="text-xs text-gray-500 w-full text-center mb-1">
          {stops === 0 ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`}
        </div>

        {/* Horizontal visual stop indicator */}
        <div className="relative flex items-center justify-center mb-1">
          <Plane className="h-4 w-4 text-chamBlue ml-2" />

          {/* Left part of the line before first stop */}
          <div className="h-px w-4 bg-gray-300" />

          {/* Render stop dots with lines between them */}
          {Array.from({ length: stops }).map((_, idx) => (
            <React.Fragment key={idx}>
              {/* Stop dot */}
              <div className="w-2 h-2 bg-chamBlue rounded-full mx-1" />
              {/* Line between stops (except after last dot) */}
              <div className="h-px w-4 bg-gray-300" />
            </React.Fragment>
          ))}

          {/* Plane icon at the end */}
          <MapPin className="h-4 w-4 text-green-600" />

          {/* <Plane className="h-4 w-4 text-chamBlue ml-2" /> */}
        </div>

        {/* Total duration */}
        <p className="text-xs text-gray-500 text-center">
          Total duration: {flight?.duration}
        </p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2 items-center mb-5">
      {/* Departure */}
      <div className="col-span-3">
        <p className="text-lg font-semibold text-chamDarkBlue">{formatTimeWithoutSeconds(flight?.departure_time)}</p>
        <p className="text-sm font-medium">{flight?.origin_code}</p>
        <p className="text-xs text-gray-500">{flight?.origin_name}</p>
      </div>

      {/* Duration line */}
      <StopsIndicator flight={flight} segments={flight?.segments} />

      {/* Arrival */}
      <div className="col-span-3 text-right">
        <p className="text-lg font-semibold text-chamDarkBlue">{formatTimeWithoutSeconds(flight?.arrival_time)}</p>
        <p className="text-sm font-medium">{flight?.destination_code}</p>
        <p className="text-xs text-gray-500">{flight?.destination_name}</p>
      </div>
    </div>
  );
};

export default FlightSegment;
