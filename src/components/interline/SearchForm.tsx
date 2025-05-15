
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Map, Plane, Search, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { addDays } from 'date-fns';
import { toast } from 'sonner';

// Define the schema for the form
const searchFormSchema = z.object({
  fromCity: z.string().min(1, { message: 'Please select a departure city' }),
  toCity: z.string().min(1, { message: 'Please select a destination city' }),
  tripType: z.enum(['one-way', 'round-trip']),
  departureDate: z.date({
    required_error: 'Please select a departure date',
  }),
  returnDate: z.date().optional(),
  adults: z.number().min(1),
  children: z.number().min(0),
  infants: z.number().min(0),
  cabinClass: z.enum(['economy', 'business']),
});

// Derive the TypeScript type from the schema
export type BookingFormValues = z.infer<typeof searchFormSchema>;

// Define airport options
const airports = [
  { value: 'DAM', label: 'Damascus (DAM)' },
  { value: 'SHJ', label: 'Sharjah (SHJ)' },
  { value: 'BEY', label: 'Beirut (BEY)' },
  { value: 'CAI', label: 'Cairo (CAI)' },
];

interface SearchFormProps {
  onSearch: (data: BookingFormValues) => void;
  isSearching?: boolean;
  initialValues?: BookingFormValues;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isSearching = false,
  initialValues
}) => {
  const defaultValues: BookingFormValues = initialValues || {
    fromCity: 'DAM',
    toCity: 'SHJ',
    tripType: 'one-way',
    departureDate: new Date(),
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'economy',
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  const tripType = form.watch('tripType');

  function onSubmit(data: BookingFormValues) {
    if (data.fromCity === data.toCity) {
      toast.error('Departure and destination cannot be the same');
      return;
    }

    // Validate the return date if it's a round trip
    if (data.tripType === 'round-trip' && data.returnDate) {
      if (data.returnDate < data.departureDate) {
        toast.error('Return date cannot be before departure date');
        return;
      }
    }

    // Validate the total number of passengers
    const totalPassengers = data.adults + data.children + data.infants;
    if (totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }

    if (data.infants > data.adults) {
      toast.error('Number of infants cannot exceed number of adults');
      return;
    }

    console.log('Form submitted:', data);
    onSearch(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium mb-1">Trip Type</legend>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="one-way"
                  checked={tripType === 'one-way'}
                  {...form.register('tripType')}
                  className="rounded-full text-chamBlue focus:ring-chamBlue"
                />
                <span className="text-sm">One Way</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="round-trip"
                  checked={tripType === 'round-trip'}
                  {...form.register('tripType')}
                  className="rounded-full text-chamBlue focus:ring-chamBlue"
                />
                <span className="text-sm">Round Trip</span>
              </label>
            </div>
          </fieldset>

          <FormField
            control={form.control}
            name="cabinClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Cabin Class</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value as "economy" | "business")}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select cabin class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* City selections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="fromCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5">
                  <Map className="h-3.5 w-3.5 text-chamBlue" />
                  From
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.value} value={airport.value}>
                        {airport.label}
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
                <FormLabel className="flex items-center gap-1.5">
                  <Plane className="h-3.5 w-3.5 text-chamBlue" />
                  To
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.value} value={airport.value}>
                        {airport.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date selections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-chamBlue" />
                  Departure Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {tripType === 'round-trip' && (
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5 text-chamBlue" />
                    Return Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date < form.getValues('departureDate') ||
                          date < new Date()
                        }
                        defaultMonth={form.getValues('departureDate')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Passenger selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-chamBlue" />
                  Adults (12+)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="9"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Children (2-11)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="8"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="infants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Infants (< 2)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max={form.getValues('adults')}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        {/* Submit button */}
        <div className="text-center mt-6">
          <Button 
            type="submit" 
            className="bg-chamBlue hover:bg-chamBlue/90 px-10 py-6 h-auto text-base rounded-full shadow-md"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Search className="mr-2 h-4 w-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                <span>Search Flights</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
