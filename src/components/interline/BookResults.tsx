
import { motion } from 'framer-motion';
import SearchResultsSection from '@/components/interline/SearchResultsSection';
import BookingInfo from '@/components/interline/BookingInfo';
import AccountBalance from '@/components/interline/AccountBalance';
import { Flight } from '@/types/flight';
import { PassengerCounts } from '@/hooks/useInterlineBooking';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InfoIcon } from 'lucide-react';

interface BookResultsProps {
  searchResults: Flight[];
  selectedFlight: string | null;
  setSelectedFlight: (id: string | null) => void;
  passengers: PassengerCounts;
  onBook: () => void;
  isSubmitting: boolean;
  sortBy: 'price' | 'departure' | 'arrival';
  onSortChange: (sortBy: 'price' | 'departure' | 'arrival') => void;
}

const BookResults = ({
  searchResults,
  selectedFlight,
  setSelectedFlight,
  passengers,
  onBook,
  isSubmitting,
  sortBy,
  onSortChange
}: BookResultsProps) => {
  return (
    <div className="space-y-8">
      {/* Flight Search Results */}
      {searchResults.length > 0 && (
        <SearchResultsSection 
          searchResults={searchResults}
          selectedFlight={selectedFlight}
          setSelectedFlight={setSelectedFlight}
          passengers={passengers}
          onBook={onBook}
          isSubmitting={isSubmitting}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      )}
      
      {/* Account Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <AccountBalance balance={5000} />
      </motion.div>
      
      {/* Booking Info Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-6"
        id="booking-info"
      >
        {searchResults.length === 0 && (
          <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-white to-slate-50/50 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 text-chamBlue">
                <InfoIcon className="h-5 w-5 mt-0.5 text-chamBlue" />
                <div>
                  <h3 className="font-medium text-chamBlue mb-2">Search for Available Flights</h3>
                  <p className="text-gray-600 text-sm">
                    Use the search form above to find available interline connections with Cham Wings and our partner airlines.
                    You can search for one-way or round-trip flights to various destinations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="info">
              Booking Information
            </TabsTrigger>
            <TabsTrigger value="partners">
              Partner Airlines
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-2">
            <BookingInfo />
          </TabsContent>
          
          <TabsContent value="partners" className="mt-2">
            <Card className="border-none shadow-md overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Cham Wings (6Q)', 'Jazeera Airways (J9)', 'Air Arabia (G9)', 'FlyDubai (FZ)', 'Kuwait Airways (KU)', 'MEA (ME)'].map((airline, index) => (
                    <motion.div 
                      key={airline}
                      className="bg-white rounded-lg p-4 border border-chamBlue/20 flex items-center gap-3 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-chamBlue to-chamGold flex items-center justify-center text-white font-bold text-xs">
                        {airline.split(' ')[1].replace('(', '').replace(')', '')}
                      </div>
                      <span className="font-medium">{airline.split(' ')[0]}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default BookResults;
