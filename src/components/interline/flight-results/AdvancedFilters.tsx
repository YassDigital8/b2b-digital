
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent
} from "@/components/ui/collapsible";

interface AdvancedFiltersProps {
  showFilters: boolean;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  resetFilters: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  showFilters,
  priceRange,
  setPriceRange,
  resetFilters
}) => {
  return (
    <Collapsible open={showFilters} className="bg-gray-50 border-b">
      <CollapsibleContent className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <Input 
              type="number"
              id="min-price"
              placeholder="Min"
              min={0}
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
              className="w-24 text-sm"
            />
            <span className="text-gray-500">to</span>
            <Input 
              type="number"
              id="max-price"
              placeholder="Max"
              min={0}
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 9999})}
              className="w-24 text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetFilters}
            className="ml-auto text-xs h-9 border-gray-300"
          >
            Reset Filters
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AdvancedFilters;
