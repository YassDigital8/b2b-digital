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
  return;
};
export default FilterBar;