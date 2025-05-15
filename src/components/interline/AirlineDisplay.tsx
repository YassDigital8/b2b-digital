
import React from 'react';
import { Segment } from '@/types/flight';

interface AirlineDisplayProps {
  segments: Segment[];
}

const AirlineDisplay: React.FC<AirlineDisplayProps> = ({ segments }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center pb-4 mb-4 border-b">
      {segments.map((segment, index) => (
        <div key={segment.id} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-gray-300">→</span>}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">airlineCode</span>
            <span className="text-xs text-gray-500">flightNumber</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AirlineDisplay;
