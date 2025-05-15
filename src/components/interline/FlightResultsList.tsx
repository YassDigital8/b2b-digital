
import React, { useState, useEffect } from 'react';
import { Flight } from '@/types/flight';
import FlightCard from './FlightCard';
import { Search, Sliders, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/redux/useAppSelector';

interface FlightResultsListProps {
  flights: Flight[];
  selectedFlightId: string | null;
  onSelect: (flightId: string) => void;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
  onBook: () => void;
  isSubmitting: boolean;
  isSearching: boolean;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortType: 'price' | 'departure' | 'arrival') => void;
}

const FlightResultsList: React.FC<FlightResultsListProps> = ({
  flights,
  selectedFlightId,
  onSelect,
  totalPassengers,
  onBook,
  isSubmitting,
  sortBy,
  onSortChange
}) => {
  // Get selected flight data
  const selectedFlightData = selectedFlightId ? flights.find(f => f.id === selectedFlightId) : null;
  const {
    user,
    searchResults,
    selectedFlight,
    isSearching,
    passengers,
    lastSearchCriteria,
    setSelectedFlight,
    handleSearch,
    handleBooking,
    handleSortChange
  } = useInterlineBooking();

  const { flights: stateFlights } = useAppSelector(state => state.pos);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Show filters
  const [showFilters, setShowFilters] = useState(false);
  
  // Calculate what page items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col">
      <div className="p-6 bg-white">
        {Array.isArray(stateFlights) && stateFlights?.length > 0 ? (
          <div className="space-y-6 ">
            {Array.isArray(stateFlights) && stateFlights?.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                selectedFlightId={selectedFlightId}
                onSelect={onSelect}
                onBook={onBook}
                totalPassengers={totalPassengers}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Search className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">No flights found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResultsList;
