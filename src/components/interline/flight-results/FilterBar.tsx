
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
    <div className="bg-gradient-to-r from-blue-50 to-white border-b px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search flights, airlines, or airports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-400 bg-white rounded-full"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="hidden md:flex items-center gap-1 border-blue-200"
          >
            <Sliders className="h-3.5 w-3.5 text-chamBlue" />
            <span className="text-sm">{showFilters ? 'Hide filters' : 'Show filters'}</span>
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>Showing</span>
            <span className="font-semibold text-chamDarkBlue">{filteredFlightCount}</span>
            <span>of</span>
            <span className="font-semibold text-chamDarkBlue">{totalFlightCount}</span>
            <span>flights</span>
          </div>
          
          <div className="flex border divide-x rounded-lg overflow-hidden shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSortChange('price')}
              className={`px-3 py-1 text-xs font-medium rounded-none h-full ${
                sortBy === 'price' ? 'bg-blue-50 text-chamBlue' : 'bg-white text-gray-600'
              }`}
            >
              Price
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSortChange('departure')}
              className={`px-3 py-1 text-xs font-medium rounded-none h-full flex items-center gap-1 ${
                sortBy === 'departure' ? 'bg-blue-50 text-chamBlue' : 'bg-white text-gray-600'
              }`}
            >
              <Clock className="h-3 w-3" />
              Departure
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSortChange('arrival')}
              className={`px-3 py-1 text-xs font-medium rounded-none h-full flex items-center gap-1 ${
                sortBy === 'arrival' ? 'bg-blue-50 text-chamBlue' : 'bg-white text-gray-600'
              }`}
            >
              <Clock className="h-3 w-3" />
              Arrival
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1 border-blue-200"
          >
            <Sliders className="h-3.5 w-3.5 text-chamBlue" />
            <span className="text-sm">Filters</span>
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
