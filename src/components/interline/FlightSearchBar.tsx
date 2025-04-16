
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface FlightSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FlightSearchBar: React.FC<FlightSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1 mx-4 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        type="text"
        placeholder="Search by airline, airport or flight number..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 text-sm bg-gray-50 border-gray-200 focus-visible:ring-chamBlue"
      />
    </div>
  );
};

export default FlightSearchBar;
