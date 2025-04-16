
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchForm from '@/components/interline/SearchForm';
import AccountBalance from '@/components/interline/AccountBalance';
import BookingInfo from '@/components/interline/BookingInfo';
import SearchResultsSection from '@/components/interline/SearchResultsSection';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { useIsMobile } from '@/hooks/use-mobile';
import { Plane, Search, Info } from 'lucide-react';

const InterlineBooking = () => {
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
    handleBooking,
    handleSortChange
  } = useInterlineBooking();
  
  const isMobile = useIsMobile();
  
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
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-chamDarkBlue to-chamBlue p-2.5 rounded-full shadow-md">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-chamDarkBlue">Interline Booking</h1>
            </div>
            <p className="text-gray-600 pl-11">Book connecting flights with Cham Wings (6Q) and partner airlines</p>
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
            <Card className="border-none shadow-soft mb-8 overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-chamBlue/20 to-chamGold/20 p-2 rounded-full">
                    <Search className="h-5 w-5 text-chamBlue" />
                  </div>
                  <h2 className="text-xl font-bold text-chamDarkBlue">Find Your Flight</h2>
                </div>
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-chamGold/20 to-chamBlue/20 p-2 rounded-full">
                  <Info className="h-5 w-5 text-chamGold" />
                </div>
                <h2 className="text-xl font-bold text-chamDarkBlue">Booking Information</h2>
              </div>
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
