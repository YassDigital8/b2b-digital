
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, ChevronUp, ChevronDown, Sliders } from 'lucide-react';

interface FlightSortControlsProps {
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortType: 'price' | 'departure' | 'arrival') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FlightSortControls: React.FC<FlightSortControlsProps> = ({
  sortBy,
  onSortChange,
  showFilters,
  setShowFilters
}) => {
  return (
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
  );
};

export default FlightSortControls;
