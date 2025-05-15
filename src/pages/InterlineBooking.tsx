
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccountBalance from '@/components/interline/AccountBalance';
import InterlineHeader from '@/components/interline/InterlineHeader';
import BookingSection from '@/components/interline/BookingSection';
import BookResults from '@/components/interline/BookResults';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { Plane, ChevronDown } from 'lucide-react';
import DateNavigator from '@/components/interline/DateNavigator';
import withGuard from '@/utils/withGaurd';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/interline/SearchForm';
import SearchResultsSection from '@/components/interline/SearchResultsSection';
import BookingInfo from '@/components/interline/BookingInfo';
import { useBookNavigation } from '@/hooks/useBookNavigation';

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
    handleSortChange,
    setIsSubmitting
  } = useInterlineBooking();

  // if (!user) return null;
  const { handleBooking } = useBookNavigation(
    searchResults,
    selectedFlight,
    setIsSubmitting,
    passengers
  );
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Enhanced header background */}
      <div className="h-56 bg-gradient-to-r from-chamDarkBlue to-chamBlue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-2">
              <Plane className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Interline Booking</h1>
            </div>
            <p className="text-white/80 max-w-xl">
              Book connecting flights with Cham Wings (6Q) and partner airlines for seamless travel experiences across our network
            </p>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white pb-12">
        <div className="container mx-auto px-4 -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6"
          >
            <AccountBalance balance={5000} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >

            <Card className="border-none shadow-soft mb-8 overflow-visible">
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
              isSearching={isSearching}
            />

            {/* Only show the booking info if there are no search results */}
            {searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <BookingInfo />
              </motion.div>
            )}

            {/* Scroll down indicator when there are search results */}
            {/* {searchResults.length > 0 && (
              <motion.div
                className="flex justify-center mt-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <a
                  href="#booking-info"
                  className="flex flex-col items-center text-chamBlue/60 hover:text-chamBlue transition-colors"
                >
                  <span className="text-sm mb-1">More Information</span>
                  <ChevronDown className="h-5 w-5 animate-bounce" />
                </a>
              </motion.div>
            )} */}

            {/* Additional booking info section with ID for scroll */}
            {searchResults.length > 0 && (
              <motion.div
                id="booking-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4"
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

export default withGuard(InterlineBooking);
