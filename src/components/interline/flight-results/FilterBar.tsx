
import { Search, SlidersHorizontal } from 'lucide-react';
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

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  sortBy,
  onSortChange,
  filteredFlightCount,
  totalFlightCount
}: FilterBarProps) => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by airline, airport or flight number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-white text-gray-900 border-0 rounded-full shadow-inner"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="text-sm text-violet-100">
            <span className="font-medium">{filteredFlightCount}</span> flights found
            {filteredFlightCount !== totalFlightCount && (
              <> (filtered from <span className="font-medium">{totalFlightCount}</span>)</>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
            Filters
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="text-sm font-medium">Sort by:</div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="ghost"
            className={`rounded-full px-3 py-1 text-xs ${sortBy === 'price' ? 'bg-white text-violet-700' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            onClick={() => onSortChange('price')}
          >
            Price
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            className={`rounded-full px-3 py-1 text-xs ${sortBy === 'departure' ? 'bg-white text-violet-700' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            onClick={() => onSortChange('departure')}
          >
            Departure Time
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            className={`rounded-full px-3 py-1 text-xs ${sortBy === 'arrival' ? 'bg-white text-violet-700' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            onClick={() => onSortChange('arrival')}
          >
            Arrival Time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
