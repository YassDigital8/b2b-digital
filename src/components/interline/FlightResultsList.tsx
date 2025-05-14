
import React, { useState, useEffect } from 'react';
import { Flight } from '@/types/flight';
import { Clock } from 'lucide-react';
import {
  FilterBar,
  AdvancedFilters,
  FlightsList,
  ResultsPagination,
  BookingSummary
} from './flight-results';

interface FlightResultsListProps {
  flights: Flight[];
  selectedFlightId: string | null;
  onSelectFlight: (flightId: string) => void;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
  onBook: () => void;
  isSubmitting: boolean;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortType: 'price' | 'departure' | 'arrival') => void;
}

const FlightResultsList: React.FC<FlightResultsListProps> = ({
  flights,
  selectedFlightId,
  onSelectFlight,
  totalPassengers,
  onBook,
  isSubmitting,
  sortBy,
  onSortChange
}) => {
  // Get selected flight data
  const selectedFlightData = selectedFlightId ? flights.find(f => f.id === selectedFlightId) : null;
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filtering
  const [showFilters, setShowFilters] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({
    min: 0,
    max: 9999
  });
  
  // Calculate available pages
  useEffect(() => {
    setTotalPages(Math.ceil(filteredFlights.length / itemsPerPage));
  }, [filteredFlights, itemsPerPage]);
  
  // Apply filters
  useEffect(() => {
    let results = [...flights];
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
      results = results.filter(flight => 
        flight.segments.some(segment => 
          segment.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          segment.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          segment.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          segment.fromCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          segment.toCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          segment.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply price range filter
    results = results.filter(flight => 
      flight.price >= priceRange.min && flight.price <= priceRange.max
    );
    
    setFilteredFlights(results);
    
    // Reset to first page when filters change
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [flights, searchTerm, priceRange]);
  
  // Calculate what page items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange({min: 0, max: 9999});
  };

  return (
    <div className="flex flex-col">
      {/* Header with sorting and filter options */}
      <FilterBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        sortBy={sortBy}
        onSortChange={onSortChange}
        filteredFlightCount={filteredFlights.length}
        totalFlightCount={flights.length}
      />
      
      {/* Advanced filters */}
      <AdvancedFilters 
        showFilters={showFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        resetFilters={resetFilters}
      />
      
      <div className="p-6 bg-white">
        {/* Flight list */}
        <FlightsList 
          flights={currentFlights}
          selectedFlightId={selectedFlightId}
          onSelectFlight={onSelectFlight}
          totalPassengers={totalPassengers}
          onBook={onBook}
        />
        
        {/* Pagination */}
        <ResultsPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        
        {/* Selected flight summary */}
        <BookingSummary
          selectedFlight={selectedFlightData}
          totalPassengers={totalPassengers}
          onBook={onBook}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default FlightResultsList;
