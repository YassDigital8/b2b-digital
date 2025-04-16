
import React, { useState, useEffect } from 'react';
import { Flight } from '@/types/flight';
import { Collapsible } from "@/components/ui/collapsible";
import FlightCard from './FlightCard';
import FlightSearchBar from './FlightSearchBar';
import FlightSortControls from './FlightSortControls';
import FlightFilterPanel from './FlightFilterPanel';
import NoFlightsFound from './NoFlightsFound';
import FlightPagination from './FlightPagination';
import FlightBookingSummary from './FlightBookingSummary';

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
  
  // Reset filters handler
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: 0, max: 9999 });
  };
  
  return (
    <div className="flex flex-col">
      {/* Header with sorting and filter options */}
      <div className="px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border-b sticky top-0 z-10 shadow-md rounded-t-lg">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Found {filteredFlights.length} flights
          </span>
          {filteredFlights.length !== flights.length && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Filtered
            </span>
          )}
        </div>
        
        {/* Search bar for quick filtering */}
        <FlightSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <FlightSortControls 
          sortBy={sortBy} 
          onSortChange={onSortChange} 
          showFilters={showFilters} 
          setShowFilters={setShowFilters} 
        />
      </div>
      
      {/* Advanced filters */}
      <Collapsible open={showFilters} className="bg-gray-50 border-b">
        <FlightFilterPanel 
          showFilters={showFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          resetFilters={resetFilters}
        />
      </Collapsible>
      
      <div className="p-6 bg-white">
        {currentFlights.length > 0 ? (
          <div className="space-y-6">
            {currentFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                selectedFlightId={selectedFlightId}
                onSelect={onSelectFlight}
                totalPassengers={totalPassengers}
              />
            ))}
          </div>
        ) : (
          <NoFlightsFound />
        )}
        
        {/* Pagination */}
        <FlightPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        
        {/* Selected flight summary */}
        <FlightBookingSummary 
          flight={selectedFlightData}
          passengers={totalPassengers}
          onBook={onBook}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default FlightResultsList;
