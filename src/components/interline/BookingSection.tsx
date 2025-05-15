import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import SearchForm from '@/components/interline/SearchForm';
import { BookingFormValues } from '@/components/interline/search-form/schema';
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
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.2,
    duration: 0.4
  }}>
      <Card className="border-none shadow-lg mb-6 overflow-visible bg-white rounded-xl">
        <CardContent className="pt-6">
          <SearchForm onSearch={onSearch} isSearching={isSearching} initialValues={lastSearchCriteria || undefined} />
        </CardContent>
      </Card>
    </motion.div>;
};
export default BookingSection;