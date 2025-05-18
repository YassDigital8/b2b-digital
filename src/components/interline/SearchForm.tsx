
import React from 'react';
import { FormikProps } from 'formik';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import TripTypeSelector from './search-form/TripTypeSelector';
import CitySelector from './search-form/CitySelector';
import DatePicker from './search-form/DatePicker';
import CabinClassSelector from './search-form/CabinClassSelector';
import PassengerSelector from './search-form/PassengerSelector';
import { allCities } from './search-form/schema';

interface SearchFormProps {
  formik: FormikProps<any>;
  isSearching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  formik,
  isSearching
}) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Trip Type */}
      <TripTypeSelector 
        value={formik.values.tripType}
        onChange={(value) => formik.setFieldValue('tripType', value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* From City */}
        <CitySelector
          label="From"
          name="fromCity"
          value={formik.values.fromCity}
          onChange={(value) => formik.setFieldValue('fromCity', value)}
          onBlur={() => formik.setFieldTouched('fromCity', true)}
          error={formik.touched.fromCity && formik.errors.fromCity ? String(formik.errors.fromCity) : undefined}
          cities={allCities}
        />
        
        {/* To City */}
        <CitySelector
          label="To"
          name="toCity"
          value={formik.values.toCity}
          onChange={(value) => formik.setFieldValue('toCity', value)}
          onBlur={() => formik.setFieldTouched('toCity', true)}
          error={formik.touched.toCity && formik.errors.toCity ? String(formik.errors.toCity) : undefined}
          cities={allCities}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Departure Date */}
        <DatePicker
          label="Departure Date"
          date={formik.values.departureDate}
          onSelect={(date) => formik.setFieldValue('departureDate', date)}
          error={formik.touched.departureDate && formik.errors.departureDate ? String(formik.errors.departureDate) : undefined}
        />
        
        {/* Return Date - Only show if round trip is selected */}
        {formik.values.tripType === 'round-trip' && (
          <DatePicker
            label="Return Date"
            date={formik.values.returnDate}
            onSelect={(date) => formik.setFieldValue('returnDate', date)}
            error={formik.touched.returnDate && formik.errors.returnDate ? String(formik.errors.returnDate) : undefined}
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Cabin Class */}
        <CabinClassSelector 
          value={formik.values.cabinClass}
          onChange={(value) => formik.setFieldValue('cabinClass', value)}
          error={formik.touched.cabinClass && formik.errors.cabinClass ? String(formik.errors.cabinClass) : undefined}
        />
        
        {/* Passengers */}
        <PassengerSelector
          adults={formik.values.adults}
          children={formik.values.children}
          infants={formik.values.infants}
          onChangeAdults={(value) => formik.setFieldValue('adults', value)}
          onChangeChildren={(value) => formik.setFieldValue('children', value)}
          onChangeInfants={(value) => formik.setFieldValue('infants', value)}
          error={formik.errors.adults || formik.errors.children || formik.errors.infants ? 
                String(formik.errors.adults || formik.errors.children || formik.errors.infants) : undefined}
        />
      </div>
      
      <div className="flex justify-center pt-4">
        <Button 
          type="submit"
          className="bg-gradient-to-r from-chamGold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          disabled={isSearching}
        >
          <Search className="mr-2 h-5 w-5" />
          {isSearching ? 'Searching...' : 'Search Flights'}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
