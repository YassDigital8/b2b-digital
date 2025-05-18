
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InterlineHeader from '@/components/interline/InterlineHeader';
import BookingSection from '@/components/interline/BookingSection';
import BookResults from '@/components/interline/BookResults';
import { useInterlineBooking } from '@/hooks/useInterlineBooking';
import { useBookNavigation } from '@/hooks/useBookNavigation';
import { toast } from 'sonner';

// Validation schema for the search form
const searchFormSchema = Yup.object().shape({
  tripType: Yup.string().oneOf(['one-way', 'round-trip']).required('Trip type is required'),
  fromCity: Yup.string().required('Departure city is required'),
  toCity: Yup.string().required('Destination city is required'),
  departureDate: Yup.date().required('Departure date is required'),
  returnDate: Yup.date().when('tripType', {
    is: 'round-trip',
    then: (schema) => schema.required('Return date is required for round trips'),
    otherwise: (schema) => schema.nullable(),
  }),
  cabinClass: Yup.string().oneOf(['economy', 'business']).required('Cabin class is required'),
  adults: Yup.number().min(1, 'At least 1 adult is required').max(9, 'Maximum 9 passengers allowed').required(),
  children: Yup.number().min(0).max(9, 'Maximum 9 children allowed').required(),
  infants: Yup.number().min(0).max(9, 'Maximum 9 infants allowed').required(),
});

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
    handleSortChange,
    setIsSubmitting
  } = useInterlineBooking();
  
  const { handleBooking } = useBookNavigation(
    searchResults, 
    selectedFlight, 
    setIsSubmitting, 
    passengers
  );
  
  const formik = useFormik({
    initialValues: lastSearchCriteria || {
      tripType: 'one-way',
      fromCity: '',
      toCity: '',
      departureDate: new Date(),
      returnDate: null,
      cabinClass: 'economy',
      adults: 1,
      children: 0,
      infants: 0,
    },
    validationSchema: searchFormSchema,
    onSubmit: (values) => {
      // Validate that fromCity and toCity are not the same
      if (values.fromCity === values.toCity) {
        toast.error('Departure and destination cities cannot be the same');
        return;
      }
      
      // Validate return date is after departure date for round trips
      if (values.tripType === 'round-trip' && values.returnDate && values.departureDate > values.returnDate) {
        toast.error('Return date must be after departure date');
        return;
      }
      
      // Validate total passengers doesn't exceed 9
      const totalPassengers = values.adults + values.children + values.infants;
      if (totalPassengers > 9) {
        toast.error('Maximum 9 passengers allowed per booking');
        return;
      }
      
      // Validate infants don't exceed adults
      if (values.infants > values.adults) {
        toast.error('Number of infants cannot exceed number of adults');
        return;
      }
      
      console.log('Form submitted with values:', values);
      handleSearch(values);
    },
  });
  
  const handleSearch = (values) => {
    console.log('Searching with values:', values);
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real application, this would be an actual API call
      // For demo purposes, we'll just log the values and reset isSubmitting
      console.log('Search completed with values:', values);
      setIsSubmitting(false);
    }, 1500);
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/10">
      <Navbar />
      
      <InterlineHeader />
      
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4 -mt-24 sm:-mt-28 md:-mt-32 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6"
          >
            <BookingSection 
              formik={formik}
              isSearching={isSearching}
              lastSearchCriteria={lastSearchCriteria}
            />
            
            <BookResults
              searchResults={searchResults}
              selectedFlight={selectedFlight}
              setSelectedFlight={setSelectedFlight}
              passengers={passengers}
              onBook={handleBooking}
              isSubmitting={isSubmitting}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBooking;
