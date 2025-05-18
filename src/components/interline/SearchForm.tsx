
import { Form } from "@/components/ui/form";
import { SearchFormProps } from "./search-form/schema";
import { useSearchForm } from "./search-form/useSearchForm";
import TripTypeSelector from "./search-form/TripTypeSelector";
import CitySelector from "./search-form/CitySelector";
import DatePicker from "./search-form/DatePicker";
import CabinClassSelector from "./search-form/CabinClassSelector";
import PassengerSelector from "./search-form/PassengerSelector";
import SearchButton from "./search-form/SearchButton";

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isSearching, initialValues }) => {
  const { form, tripType, fromCity, handleSubmit } = useSearchForm(onSearch, initialValues);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TripTypeSelector form={form} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CitySelector 
            form={form}
            type="from"
            label="From"
            placeholder="Departure city"
          />
          
          <CitySelector 
            form={form}
            type="to"
            label="To"
            placeholder="Destination city"
            fromCity={fromCity}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker 
            form={form} 
            name="departureDate" 
            label="Departure Date" 
          />
          
          <DatePicker 
            form={form} 
            name="returnDate" 
            label="Return Date"
            disabled={tripType === 'one-way'}
            minDate={form.watch('departureDate')}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CabinClassSelector form={form} />
          <PassengerSelector form={form} />
        </div>
        
        <SearchButton isSearching={isSearching} />
      </form>
    </Form>
  );
};

export default SearchForm;
