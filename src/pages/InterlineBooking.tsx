import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchForm from '@/components/interline/SearchForm';
import AccountBalance from '@/components/interline/AccountBalance';
import BookingInfo from '@/components/interline/BookingInfo';
import SearchResultsSection from '@/components/interline/SearchResultsSection';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InterlineBooking = () => {
  const navigate = useNavigate();
  const {
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
    handleSortChange,
    setIsSubmitting
  } = useInterlineBooking();
  
  if (!user) return null;
  
  // Handle booking button click - navigates to booking form
  const handleBooking = () => {
    if (!selectedFlight) {
      return;
    }
    
    const selectedFlightData = searchResults.find(f => f.id === selectedFlight);
    
    if (!selectedFlightData) {
      return;
    }
    
    // Set loading state while preparing navigation
    setIsSubmitting(true);
    
    // Navigate to booking form with flight and passenger data
    navigate('/interline-booking', {
      state: {
        flightData: selectedFlightData,
        passengers: passengers
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Simplified header */}
      <div className="h-48 bg-gradient-to-r from-chamDarkBlue to-chamBlue relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1">
              <Plane className="h-6 w-6" />
              <h1 className="text-2xl font-semibold">Interline Booking</h1>
            </div>
            <p className="text-white/80 text-sm max-w-xl">
              Book connecting flights with Cham Wings and partner airlines
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4 -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6"
          >
            <AccountBalance balance={user.balance} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card className="border-none shadow-md mb-6 overflow-visible">
              <CardContent className="pt-6">
                <SearchForm 
                  onSearch={handleSearch} 
                  isSearching={isSearching}
                  initialValues={lastSearchCriteria || undefined}
                />
              </CardContent>
            </Card>
            
            {/* Flight Search Results */}
            <SearchResultsSection 
              searchResults={searchResults}
              selectedFlight={selectedFlight}
              setSelectedFlight={setSelectedFlight}
              passengers={passengers}
              onBook={handleBooking}
              isSubmitting={isSubmitting}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
            
            {/* Only show the booking info if there are no search results */}
            {searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-6"
              >
                <BookingInfo />
              </motion.div>
            )}
            
            {/* Additional booking info section with ID for scroll */}
            {searchResults.length > 0 && (
              <motion.div
                id="booking-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6"
              >
                <BookingInfo />
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBooking;
