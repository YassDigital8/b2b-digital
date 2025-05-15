
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';
import FlightCard from './FlightCard';
import { CheckCircle2, Ticket, Search, Filter, Clock, ChevronUp, ChevronDown, Sliders } from 'lucide-react';
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

  const { filghts } = useSelector(state => state.pos)
  console.log('filghts', filghts);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Filtering
  const [showFilters, setShowFilters] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({
    min: 0,
    max: 9999
  });

  // Calculate available pages
  // useEffect(() => {
  //   setTotalPages(Math.ceil(filteredFlights.length / itemsPerPage));
  // }, [filteredFlights, itemsPerPage]);

  // Apply filters
  // useEffect(() => {
  //   let results = [...flights];

  //   // Apply search term filter
  //   if (searchTerm.trim() !== '') {
  //     results = results.filter(flight =>
  //       flight.segments.some(segment =>
  //         segment.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         segment.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         segment.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         segment.fromCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         segment.toCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         segment.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   }

  //   // Apply price range filter
  //   results = results.filter(flight =>
  //     flight.price >= priceRange.min && flight.price <= priceRange.max
  //   );

  //   setFilteredFlights(results);

  //   // Reset to first page when filters change
  //   if (currentPage !== 1) {
  //     setCurrentPage(1);
  //   }
  // }, [flights, searchTerm, priceRange]);

  // Calculate what page items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentFlights = filteredFlights?.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedFlightData) return 0;

    return selectedFlightData.price * totalPassengers.adults +
      selectedFlightData.price * totalPassengers.children +
      (selectedFlightData.price * totalPassengers.infants * 0.1);
  };

  return (
    <div className="flex flex-col">
      {/* Header with sorting and filter options */}
      {/* <div className="px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border-b sticky top-0 z-10 shadow-md rounded-t-lg">
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
      </div> */}

      {/* Advanced filters */}
      {/* <Collapsible open={showFilters} className="bg-gray-50 border-b">
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
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className="w-24 text-sm"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                id="max-price"
                placeholder="Max"
                min={0}
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 9999 })}
                className="w-24 text-sm"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setPriceRange({ min: 0, max: 9999 });
              }}
              className="ml-auto text-xs h-9 border-gray-300"
            >
              Reset Filters
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible> */}

      <div className="p-6 bg-white">
        {Array.isArray(filghts) && filghts?.length > 0 ? (
          <div className="space-y-6 ">
            {Array.isArray(filghts) && filghts?.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                selectedFlightId={selectedFlightId}
                onSelect={onSelect}
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
