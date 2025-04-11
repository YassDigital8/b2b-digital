
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Flight } from '@/types/flight';
import SearchForm, { BookingFormValues } from '@/components/interline/SearchForm';
import FlightResultsList from '@/components/interline/FlightResultsList';
import AccountBalance from '@/components/interline/AccountBalance';
import BookingInfo from '@/components/interline/BookingInfo';
import { generateInterlineFlights, getCityCodeFromName, sortFlights } from '@/utils/flightUtils';

const InterlineBooking = () => {
  const { user, requireAuth } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Flight search results state
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'departure' | 'arrival'>('price');
  
  // Passenger counts from search form
  const [passengers, setPassengers] = useState({
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

  useEffect(() => {
    // Reset flight details view when a new flight is selected
    // This is now handled in the FlightCard component
  }, [selectedFlight]);

  const handleSearch = async (data: BookingFormValues) => {
    setIsSearching(true);
    setSearchResults([]);
    setSelectedFlight(null);
    
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
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 bg-gradient-to-b from-chamGray/50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-chamDarkBlue">Interline Booking</h1>
            <p className="text-gray-600">Book connecting flights with Cham Wings (6Q) and partner airlines</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <AccountBalance balance={user.balance} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-none shadow-soft mb-8">
              <CardContent className="pt-6">
                <SearchForm 
                  onSearch={handleSearch} 
                  isSearching={isSearching} 
                />
              </CardContent>
            </Card>
            
            {/* Flight Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Card className="border-none shadow-soft">
                  <CardContent className="p-0">
                    <FlightResultsList 
                      flights={searchResults}
                      selectedFlightId={selectedFlight}
                      onSelectFlight={setSelectedFlight}
                      totalPassengers={passengers}
                      onBook={handleBooking}
                      isSubmitting={isSubmitting}
                      sortBy={sortBy}
                      onSortChange={handleSortChange}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <BookingInfo />
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBooking;
