
import React from 'react';
import { Search } from 'lucide-react';

const NoFlightsFound: React.FC = () => {
  return (
    <div className="py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <Search className="mx-auto h-10 w-10 text-gray-400 mb-2" />
      <h3 className="text-lg font-medium text-gray-700">No flights found</h3>
      <p className="text-gray-500 mt-1">Try adjusting your search filters</p>
    </div>
  );
};

export default NoFlightsFound;
