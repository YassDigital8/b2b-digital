
import React from 'react';
import { Search, Sliders, ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortType: 'price' | 'departure' | 'arrival') => void;
  filteredFlightCount: number;
  totalFlightCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  sortBy,
  onSortChange,
  filteredFlightCount,
  totalFlightCount
}) => {
  return (
    <div className="px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border-b sticky top-0 z-10 shadow-md rounded-t-lg">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-2">
          Found {filteredFlightCount} flights
        </span>
        {filteredFlightCount !== totalFlightCount && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            Filtered
          </span>
        )}
      </div>
      
      {/* Search bar for quick filtering */}
      <div className="flex-1 mx-4 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search by airline, airport or flight number..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm bg-gray-50 border-gray-200 focus-visible:ring-chamBlue"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 mr-1 whitespace-nowrap">Sort by:</span>
        <div className="flex bg-gray-100 rounded-md p-0.5">
          <Button 
            variant={sortBy === 'price' ? 'secondary' : 'ghost'} 
            size="sm" 
            onClick={() => onSortChange('price')}
            className={`text-xs h-7 px-3 rounded-md ${sortBy === 'price' ? 'bg-white shadow-sm' : ''}`}
          >
            Price
          </Button>
          <Button 
            variant={sortBy === 'departure' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => onSortChange('departure')}
            className={`text-xs h-7 px-3 rounded-md ${sortBy === 'departure' ? 'bg-white shadow-sm' : ''}`}
          >
            <Clock className="h-3 w-3 mr-1" /> Departure
          </Button>
          <Button 
            variant={sortBy === 'arrival' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => onSortChange('arrival')}
            className={`text-xs h-7 px-3 rounded-md ${sortBy === 'arrival' ? 'bg-white shadow-sm' : ''}`}
          >
            Arrival
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          className="ml-1 flex items-center gap-1 h-7 text-xs border-gray-200 hover:bg-gray-50"
        >
          <Sliders className="h-3 w-3" />
          Filters
          {showFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
