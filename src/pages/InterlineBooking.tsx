
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-full shadow-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">Interline Booking</h1>
            </div>
            <p className="text-gray-600 pl-12 relative">
              Book connecting flights with Cham Wings (6Q) and partner airlines
              <span className="absolute w-40 h-8 bg-gradient-to-r from-blue-300 to-purple-300 opacity-20 rounded-full blur-xl -z-10 left-8 top-0"></span>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <AccountBalance balance={user.balance} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border-none shadow-lg mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
              <CardContent className="pt-6 relative">
                <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-blue-200 to-purple-200 opacity-10 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-full shadow-sm">
                    <Search className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">Find Your Flight</h2>
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full shadow-sm">
                  <Info className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Booking Information</h2>
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
