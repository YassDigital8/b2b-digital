
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/interline/SearchForm';
import { BookingFormValues } from '@/components/interline/search-form/schema';
import { Plane } from 'lucide-react';

interface BookingSectionProps {
  onSearch: (data: BookingFormValues) => void;
  isSearching: boolean;
  lastSearchCriteria: BookingFormValues | null;
}

const BookingSection = ({
  onSearch,
  isSearching,
  lastSearchCriteria
}: BookingSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <Card className="border-none shadow-2xl mb-6 overflow-visible bg-white rounded-xl">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-chamBlue via-blue-500 to-chamBlue text-white px-6 py-2 rounded-full shadow-lg flex items-center">
          <Plane className="h-4 w-4 mr-2 text-chamGold" />
          <span className="font-medium">Find Your Flight</span>
        </div>
        
        <CardContent className="pt-10 px-4 md:px-8 lg:px-10">
          <SearchForm 
            onSearch={onSearch} 
            isSearching={isSearching} 
            initialValues={lastSearchCriteria || undefined} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookingSection;
