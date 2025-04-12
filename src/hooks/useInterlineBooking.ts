
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Flight } from '@/types/flight';
import { BookingFormValues } from '@/components/interline/SearchForm';
import { generateInterlineFlights, getCityCodeFromName, sortFlights } from '@/utils/flightUtils';
import { useAuth } from '@/hooks/useAuth';

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
  total: number;
}

export const useInterlineBooking = () => {
  const { user, requireAuth } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Flight search results state
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'departure' | 'arrival'>('price');
  
  // Search parameters for reuse
  const [lastSearchCriteria, setLastSearchCriteria] = useState<BookingFormValues | null>(null);
  
  // Passenger counts from search form
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
    total: 1
  });
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);

  const handleSearch = async (data: BookingFormValues) => {
    setIsSearching(true);
    setSearchResults([]);
    setSelectedFlight(null);
    
    // Store search criteria for potential reuse
    setLastSearchCriteria(data);
    
    // Update passengers state based on search form values
    setPassengers({
      adults: data.adults,
      children: data.children,
      infants: data.infants,
      total: data.adults + data.children + data.infants
    });
    
    // Simulate API call to search flights across all airlines
    setTimeout(() => {
      // Get from and to city codes
      const fromCode = getCityCodeFromName(data.fromCity);
      const toCode = getCityCodeFromName(data.toCity);
      
      // Generate interline connection flights
      const results = generateInterlineFlights(
        data.fromCity,
        data.toCity,
        fromCode,
        toCode,
        data.departureDate,
        data.cabinClass,
      );
      
      // Sort results by price (lowest first) as default
      const sortedResults = sortFlights(results, 'price');
      
      setSearchResults(sortedResults);
      setIsSearching(false);
      
      if (sortedResults.length === 0) {
        toast.error('No flights found for the selected criteria');
      } else {
        toast.success(`Found ${sortedResults.length} interline flights for your search`);
      }
    }, 2000);
  };
  
  const handleBooking = () => {
    if (!selectedFlight) {
      toast.error('Please select a flight to book');
      return;
    }
    
    const selectedFlightData = searchResults.find(f => f.id === selectedFlight);
    
    if (!selectedFlightData) {
      toast.error('Selected flight data not found');
      return;
    }
    
    // Calculate total price based on actual passenger counts
    const totalPrice = selectedFlightData.price * passengers.adults + 
      selectedFlightData.price * passengers.children + 
      (selectedFlightData.price * passengers.infants * 0.1);
    
    if (user.balance < totalPrice) {
      toast.error('Insufficient balance. Please top up your account');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Flight booked successfully!');
      setIsSubmitting(false);
      
      setSearchResults([]);
      setSelectedFlight(null);
    }, 1500);
  };

  // Handle sorting change
  const handleSortChange = (newSortBy: 'price' | 'departure' | 'arrival') => {
    setSortBy(newSortBy);
    setSearchResults(sortFlights(searchResults, newSortBy));
  };

  return {
    user,
    searchResults,
    selectedFlight,
    isSearching,
    isSubmitting,
    sortBy,
    passengers,
    lastSearchCriteria,
    setSelectedFlight,
    handleSearch,
    handleBooking,
    handleSortChange
  };
};
