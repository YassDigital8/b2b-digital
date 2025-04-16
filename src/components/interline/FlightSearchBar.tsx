
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
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 flex items-center justify-center">
        <Search className="h-4 w-4 text-blue-500" />
      </div>
      <Input 
        type="text"
        placeholder="Search by airline, airport or flight number..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 text-sm bg-white/70 backdrop-blur-sm border-blue-200/50 focus-visible:ring-blue-500/60 rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300/70"
      />
    </div>
  );
};

export default FlightSearchBar;
