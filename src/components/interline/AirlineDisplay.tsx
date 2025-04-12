
import React from 'react';
import { Segment } from '@/types/flight';

interface AirlineDisplayProps {
  segments: Segment[];
}

const AirlineDisplay: React.FC<AirlineDisplayProps> = ({ segments }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center pb-3 mb-3 border-b border-dashed">
      {segments.map((segment, index) => (
        <div key={segment.id} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-gray-300">→</span>}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{segment.airlineCode}</span>
            <span className="text-xs text-gray-500">{segment.flightNumber}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AirlineDisplay;
