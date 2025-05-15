
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Flight } from '@/types/flight';
import { BookingFormValues } from '@/components/interline/search-form/schema';
import { generateInterlineFlights, getCityCodeFromName, sortFlights } from '@/utils/flightUtils';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getFlightsWithPriceService } from '@/redux/services/posService';
import { useAppSelector } from '@/redux/useAppSelector';
import { setSeachInfo } from '@/redux/slices/authSlice';

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
  const { travelAgent } = useAppSelector(state => state.auth);
  const dispatch = useDispatch();

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

  const formatDate = (date: Date) => {
    console.log('date From formatDate', date);

    if (date) {
      // Get the time zone offset in minutes
      const offset = date.getTimezoneOffset();

      // Adjust the date by the offset
      date.setMinutes(date.getMinutes() - offset);

      const formattedDate = `${date.toISOString().split('T')[0]}T00:00:00`;
      console.log("Formatted Date:", formattedDate);
      return formattedDate;
    }
    console.log("No date provided");
    return "";
  };


  const handleSearch = async (data: BookingFormValues) => {
    setIsSearching(true);
    setSearchResults([]);
    setSelectedFlight(null);
    const { fromCity, toCity, tripType, departureDate, infants, children, adults, cabinClass, returnDate } = data;
    console.log('data From handleSearch', departureDate);

    const token = localStorage.getItem("token");
    const pos = travelAgent && travelAgent.value ? travelAgent.value.pos : 'ae';

    const dataToSend = {
      origin: fromCity,
      destination: toCity,
      date: formatDate(departureDate),
      date_return: tripType === 'round-trip' ? formatDate(returnDate!) : "",
      adults,
      children,
      infants,
      flightclass: cabinClass === 'business' ? "C" : "Y",
      flighttype: tripType === 'one-way' ? 'OneWay' : 'Return',
      pos: pos,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0YXJlazNzaGVpa2hhbGFyZCIsImp0aSI6IjNjY2ZhMGI4LTZjYjQtNDQxYS1iNTg5LTVlMTljMjA0M2Q2OSIsImVtYWlsIjoidGFyZWszLmRvZUBleGFtcGxlLmNvbSIsInVzZXJDb2RlIjoiQ3VzdG9tZXItNWI5MTA1ODc3ZGRmNDY1YjljMjJiZjZjNmZmOGJjOWMiLCJtYW5hZ2VyQ29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3NDczMDg1NzIsImlzcyI6IlNlY3VyZUFwaSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.Oqy9gF0c44-1HydBebmNzJ54mNPg5_AmYQ5usFq2Qgo'
    };
    console.log('dataToSend', dataToSend);

    dispatch(setSeachInfo(dataToSend));
    
    try {
      dispatch(getFlightsWithPriceService({ data: dataToSend }));
    } catch (error) {
      console.error("Error searching flights:", error);
    } finally {
      setIsSearching(false);
    }
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
      toast.error('Insufficient balance', {
        description: 'Please top up your account to continue with this booking.'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with progress toast
    toast.loading('Processing your booking request...', {
      id: 'booking-process'
    });

    setTimeout(() => {
      toast.success('Flight booked successfully!', {
        description: 'Your ticket details have been sent to your email.',
        id: 'booking-process'
      });

      setIsSubmitting(false);
      setSearchResults([]);
      setSelectedFlight(null);

      // Reset form and redirect to confirmation page after short delay
      setTimeout(() => {
        // In a real app, this would navigate to a confirmation page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    }, 2500);
  };

  // Handle sorting change
  const handleSortChange = (newSortBy: 'price' | 'departure' | 'arrival') => {
    setSortBy(newSortBy);
    const sorted = sortFlights(searchResults, newSortBy);
    setSearchResults(sorted);

    const sortMessages = {
      price: 'Flights sorted by lowest price',
      departure: 'Flights sorted by earliest departure',
      arrival: 'Flights sorted by earliest arrival'
    };

    toast.info(sortMessages[newSortBy]);
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
    handleSortChange,
    setSearchResults
  };
};
