
import React from 'react';
import { Segment } from '@/types/flight';

interface AirlineDisplayProps {
  segments: Segment[];
}

const AirlineDisplay: React.FC<AirlineDisplayProps> = ({ segments }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center pb-4 mb-4 border-b">
      {segments.map((segment, index) => (
        <div key={segment.id} className="flex items-center">
          {index > 0 && <span className="text-blue-300 mx-1">→</span>}
          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-blue-100 px-2 py-1 rounded-md border border-blue-200">
            <span className="text-sm font-medium text-chamBlue">{segment.airlineCode}</span>
            <span className="text-xs text-gray-500">{segment.flightNumber}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AirlineDisplay;
