
import React from 'react';
import { Segment } from '@/types/flight';

interface AirlineDisplayProps {
  segments: Segment[];
}

const AirlineDisplay: React.FC<AirlineDisplayProps> = ({ segments }) => {
  return (
    <div className="flex flex-wrap gap-3 items-center pb-4 mb-4 border-b border-dashed">
      {segments.map((segment, index) => (
        <div key={segment.id} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">→</span>}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">{segment.airlineCode}</span>
            <span className="text-xs text-gray-500">{segment.flightNumber}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AirlineDisplay;
