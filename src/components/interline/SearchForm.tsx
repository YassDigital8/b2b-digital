import { useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Search, Plus, Minus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const bookingFormSchema = z.object({
  tripType: z.enum(['one-way', 'round-trip']),
  fromCity: z.string().min(1, { message: "Please select a departure city" }),
  toCity: z.string().min(1, { message: "Please select a destination city" }),
  departureDate: z.date({ required_error: "Please select a departure date" }),
  returnDate: z.date().optional().nullable(),
  cabinClass: z.enum(['economy', 'business'], { required_error: "Please select a cabin class" }),
  adults: z.number().int().min(1, { message: "At least 1 adult is required" }).max(9),
  children: z.number().int().min(0).max(9),
  infants: z.number().int().min(0).max(9),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export interface SearchFormProps {
  onSearch: (data: BookingFormValues) => void;
  isSearching: boolean;
  initialValues?: BookingFormValues;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isSearching, initialValues }) => {
  const allCities = [
    { city: 'Damascus', code: 'DAM' },
    { city: 'Aleppo', code: 'ALP' },
    { city: 'Latakia', code: 'LTK' },
    { city: 'Beirut', code: 'BEY' },
    { city: 'Dubai', code: 'DXB' },
    { city: 'Abu Dhabi', code: 'AUH' },
    { city: 'Cairo', code: 'CAI' }, 
    { city: 'Alexandria', code: 'ALY' },
    { city: 'Baghdad', code: 'BGW' },
    { city: 'Tehran', code: 'IKA' },
    { city: 'Khartoum', code: 'KRT' },
    { city: 'Kuwait City', code: 'KWI' },
    { city: 'Doha', code: 'DOH' },
    { city: 'Riyadh', code: 'RUH' }, 
    { city: 'Jeddah', code: 'JED' },
    { city: 'Amman', code: 'AMM' },
    { city: 'Sharjah', code: 'SHJ' },
    { city: 'Basra', code: 'BSR' }
  ];
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      tripType: 'one-way',
      fromCity: '',
      toCity: '',
      departureDate: undefined,
      returnDate: undefined,
      cabinClass: 'economy',
      adults: 1,
      children: 0,
      infants: 0,
    },
  });
  
  const tripType = form.watch('tripType');
  const fromCity = form.watch('fromCity');
  
  const [departureDateOpen, setDepartureDateOpen] = React.useState(false);
  const [returnDateOpen, setReturnDateOpen] = React.useState(false);
  
  useEffect(() => {
    if (tripType === 'round-trip') {
      form.register('returnDate', { required: "Return date is required for round trips" });
    } else {
      form.setValue('returnDate', null);
    }
  }, [tripType, form]);
  
  useEffect(() => {
    if (initialValues) {
      form.setValue('fromCity', initialValues.fromCity);
      form.setValue('toCity', initialValues.toCity);
      form.setValue('departureDate', initialValues.departureDate);
      form.setValue('cabinClass', initialValues.cabinClass);
      form.setValue('adults', initialValues.adults);
      form.setValue('children', initialValues.children);
      form.setValue('infants', initialValues.infants);
    }
  }, [initialValues, form.setValue]);
  
  const adjustPassenger = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    const currentValue = form.getValues(type);
    const newValue = increment ? currentValue + 1 : Math.max(type === 'adults' ? 1 : 0, currentValue - 1);
    
    if (type === 'adults' && newValue > 9) {
      toast.error('Maximum 9 adults allowed per booking');
      return;
    }
    
    if (type === 'children' && newValue > 9) {
      toast.error('Maximum 9 children allowed per booking');
      return;
    }
    
    if (type === 'infants' && newValue > form.getValues('adults')) {
      toast.error('Number of infants cannot exceed number of adults');
      return;
    }
    
    const totalPassengers = (type === 'adults' ? newValue : form.getValues('adults')) + 
                           (type === 'children' ? newValue : form.getValues('children')) + 
                           (type === 'infants' ? newValue : form.getValues('infants'));
    
    if (increment && totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    form.setValue(type, newValue);
  };

  const handleSubmit = (data: BookingFormValues) => {
    if (data.fromCity === data.toCity) {
      toast.error('Departure and destination cities cannot be the same');
      return;
    }
    
    if (data.tripType === 'round-trip' && data.returnDate && data.departureDate > data.returnDate) {
      toast.error('Return date must be after departure date');
      return;
    }
    
    const totalPassengers = data.adults + data.children + data.infants;
    if (totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    if (data.infants > data.adults) {
      toast.error('Number of infants cannot exceed number of adults');
      return;
    }
    
    onSearch(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="mb-6">
          <FormField
            control={form.control}
            name="tripType"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-way" id="one-way" />
                      <Label htmlFor="one-way">One Way</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="round-trip" id="round-trip" />
                      <Label htmlFor="round-trip">Round Trip</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fromCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Departure city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent enableSearch>
                    {allCities.map((city) => (
                      <SelectItem key={city.code} value={city.city}>
                        {city.city} ({city.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="toCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Destination city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent enableSearch>
                    {allCities
                      .filter(city => city.city !== fromCity)
                      .map((city) => (
                        <SelectItem key={city.code} value={city.city}>
                          {city.city} ({city.code})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Departure Date *</FormLabel>
                <Popover open={departureDateOpen} onOpenChange={setDepartureDateOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setDepartureDateOpen(false);
                      }}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className={tripType === 'one-way' ? 'text-gray-400' : ''}>
                  Return Date {tripType === 'round-trip' ? '*' : ''}
                </FormLabel>
                <Popover open={returnDateOpen} onOpenChange={setReturnDateOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          tripType === 'one-way' && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={tripType === 'one-way'}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                        setReturnDateOpen(false);
                      }}
                      initialFocus
                      disabled={(date) => {
                        const departureDate = form.getValues("departureDate");
                        return !departureDate || date < departureDate;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cabinClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cabin class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="economy">Economy Class</SelectItem>
                    <SelectItem value="business">Business Class</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <Label>Passengers</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="border rounded-md p-3 relative">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Adults</p>
                    <p className="text-xs text-muted-foreground">12+ years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => adjustPassenger('adults', false)}
                      disabled={form.watch('adults') <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center">{form.watch('adults')}</span>
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => adjustPassenger('adults', true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Children</p>
                    <p className="text-xs text-muted-foreground">2-11 years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => adjustPassenger('children', false)}
                      disabled={form.watch('children') <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center">{form.watch('children')}</span>
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => adjustPassenger('children', true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Infants</p>
                    <p className="text-xs text-muted-foreground">0-23 months</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => adjustPassenger('infants', false)}
                      disabled={form.watch('infants') <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center">{form.watch('infants')}</span>
                    <Button 
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => adjustPassenger('infants', true)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {(form.watch('adults') + form.watch('children') + form.watch('infants')) > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Total passengers: {form.watch('adults') + form.watch('children') + form.watch('infants')}
              </p>
            )}
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-chamBlue hover:bg-chamBlue/90"
          disabled={isSearching}
        >
          {isSearching ? (
            <>
              <Search className="mr-2 h-4 w-4 animate-pulse" />
              Searching Flights...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Flights
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
