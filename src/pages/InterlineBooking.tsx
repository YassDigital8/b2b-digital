
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Plane, Calendar as CalendarIcon, Users, MapPin, Check, Info, Search, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema for the booking form
const bookingFormSchema = z.object({
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

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const InterlineBooking = () => {
  const { user, requireAuth } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Flight search results state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  
  // Define available airlines and cities
  const airlines = [
    { id: 'chamwings', name: 'Cham Wings Airlines', code: 'SAW' },
    { id: 'jazeera', name: 'Jazeera Airways', code: 'J9' },
    { id: 'airarabia', name: 'Air Arabia', code: 'G9' },
    { id: 'flydubai', name: 'FlyDubai', code: 'FZ' }
  ];
  
  // All available cities across all airlines (deduplicated)
  const allCities = Array.from(new Set([
    'Damascus', 'Aleppo', 'Latakia', 'Beirut', 'Dubai', 'Abu Dhabi', 'Cairo', 
    'Alexandria', 'Baghdad', 'Tehran', 'Khartoum', 'Kuwait City', 'Doha', 'Riyadh', 
    'Jeddah', 'Amman', 'Sharjah', 'Basra'
  ])).sort();
  
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
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
  // Watch for trip type changes to validate return date requirement
  const tripType = form.watch('tripType');
  const fromCity = form.watch('fromCity');
  
  // Adjust validation for return date based on trip type
  useEffect(() => {
    if (tripType === 'round-trip') {
      form.register('returnDate', { required: "Return date is required for round trips" });
    } else {
      form.setValue('returnDate', null);
    }
  }, [tripType, form]);
  
  const handleSearch = async (data: BookingFormValues) => {
    // Validate that cities are not the same
    if (data.fromCity === data.toCity) {
      toast.error('Departure and destination cities cannot be the same');
      return;
    }
    
    // For round-trip, ensure return date is after departure date
    if (data.tripType === 'round-trip' && data.returnDate && data.departureDate > data.returnDate) {
      toast.error('Return date must be after departure date');
      return;
    }
    
    // Validate passenger count
    const totalPassengers = data.adults + data.children + data.infants;
    if (totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    if (data.infants > data.adults) {
      toast.error('Number of infants cannot exceed number of adults');
      return;
    }
    
    setIsSearching(true);
    setSearchResults([]);
    setSelectedFlight(null);
    
    // Simulate API call to search flights across all airlines
    setTimeout(() => {
      const allResults = [];
      
      // Generate mock results for each airline
      for (const airline of airlines) {
        const airlineResults = generateMockFlights(
          data.fromCity,
          data.toCity,
          data.departureDate,
          airline.id,
          data.cabinClass,
        );
        
        allResults.push(...airlineResults);
      }
      
      // Sort results by price (lowest first) as default
      const sortedResults = allResults.sort((a, b) => a.price - b.price);
      
      setSearchResults(sortedResults);
      setIsSearching(false);
      
      if (sortedResults.length === 0) {
        toast.error('No flights found for the selected criteria');
      } else {
        toast.success(`Found ${sortedResults.length} flights for your search`);
      }
    }, 2000);
  };
  
  const handleBooking = () => {
    if (!selectedFlight) {
      toast.error('Please select a flight to book');
      return;
    }
    
    const selectedFlightData = searchResults.find(f => f.id === selectedFlight);
    
    if (!selectedFlightData) {
      toast.error('Selected flight data not found');
      return;
    }
    
    const formValues = form.getValues();
    const totalPassengers = formValues.adults + formValues.children + formValues.infants;
    const totalPrice = selectedFlightData.price * totalPassengers;
    
    if (user.balance < totalPrice) {
      toast.error('Insufficient balance. Please top up your account');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Flight booked successfully!');
      setIsSubmitting(false);
      
      // Reset form
      form.reset({
        tripType: 'one-way',
        fromCity: '',
        toCity: '',
        departureDate: undefined,
        returnDate: undefined,
        cabinClass: 'economy',
        adults: 1,
        children: 0,
        infants: 0,
      });
      
      setSearchResults([]);
      setSelectedFlight(null);
    }, 1500);
  };
  
  // Helper function to adjust passenger count
  const adjustPassenger = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    const currentValue = form.getValues(type);
    const newValue = increment ? currentValue + 1 : Math.max(type === 'adults' ? 1 : 0, currentValue - 1);
    
    // Apply business rules
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
    
    const totalPassengers = form.getValues('adults') + form.getValues('children') + form.getValues('infants');
    if (increment && totalPassengers >= 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    form.setValue(type, newValue);
  };
  
  // Mock flight generation
  const generateMockFlights = (from: string, to: string, date: Date, airline: string, cabin: string) => {
    const flights = [];
    const airlineData = airlines.find(a => a.id === airline);
    const airlineCode = airlineData?.code || 'XX';
    const cabinPriceMultiplier = cabin === 'business' ? 3 : 1;
    
    const departureTimeBase = new Date(date);
    departureTimeBase.setHours(6, 0, 0, 0);
    
    // Generate 0-4 flights per airline
    const numFlights = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numFlights; i++) {
      const flightNumber = `${airlineCode}${100 + Math.floor(Math.random() * 900)}`;
      
      const departureTime = new Date(departureTimeBase);
      departureTime.setHours(departureTime.getHours() + (i * 3));
      
      const arrivalTime = new Date(departureTime);
      arrivalTime.setHours(arrivalTime.getHours() + 2 + Math.floor(Math.random() * 3));
      
      const price = Math.floor((200 + Math.random() * 300) * cabinPriceMultiplier);
      
      flights.push({
        id: `${airline}-${i}`,
        flightNumber,
        airline: airlineData?.name || 'Unknown Airline',
        airlineCode: airlineCode,
        from,
        to,
        departureTime,
        arrivalTime,
        duration: Math.floor((arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60)) + ' mins',
        price,
        seats: Math.floor(Math.random() * 30) + 1,
        cabin
      });
    }
    
    return flights;
  };
  
  if (!user) return null;
  
  // Calculate total passengers
  const totalPassengers = form.watch('adults') + form.watch('children') + form.watch('infants');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 bg-gradient-to-b from-chamGray/50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-chamDarkBlue">Interline Booking</h1>
            <p className="text-gray-600">Book partner airline tickets using your Cham Wings account</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <Card className="border-none shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-chamDarkBlue">Account Balance</CardTitle>
                <CardDescription>Available funds for interline bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Available Balance</p>
                    <p className="text-2xl font-bold text-chamDarkBlue">${user.balance.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-chamGold/10 px-4 py-2 rounded-lg">
                    <p className="text-sm text-chamGold font-medium">
                      Use your balance to book tickets with partner airlines
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-none shadow-soft mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-chamDarkBlue">Flight Search</CardTitle>
                <CardDescription>Search for flights across all partner airlines</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
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
                                  <SelectItem key={city} value={city}>
                                    {city}
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
                                  .filter(city => city !== fromCity)
                                  .map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
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
                            <Popover>
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
                                  onSelect={field.onChange}
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
                            <Popover>
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
                                  onSelect={field.onChange}
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
                        {totalPassengers > 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Total passengers: {totalPassengers}
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
              </CardContent>
            </Card>
            
            {/* Flight Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Card className="border-none shadow-soft">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-chamDarkBlue">Available Flights</CardTitle>
                        <CardDescription>
                          {form.getValues('fromCity')} to {form.getValues('toCity')} on {format(form.getValues('departureDate'), "MMMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {searchResults.length} flights found
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {searchResults.map((flight) => (
                        <div
                          key={flight.id}
                          className={cn(
                            "p-4 rounded-lg border transition-all duration-300 cursor-pointer",
                            selectedFlight === flight.id
                              ? "border-chamBlue bg-chamBlue/5"
                              : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50"
                          )}
                          onClick={() => setSelectedFlight(flight.id)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-chamDarkBlue">{flight.flightNumber}</p>
                                <span className="bg-gray-100 text-xs px-2 py-0.5 rounded">
                                  {flight.airlineCode}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{flight.airline}</p>
                            </div>
                            
                            <div className="col-span-2">
                              <div className="flex items-center justify-center gap-3">
                                <div className="text-right">
                                  <p className="font-bold text-chamDarkBlue">
                                    {format(flight.departureTime, "HH:mm")}
                                  </p>
                                  <p className="text-xs text-gray-500">{flight.from}</p>
                                </div>
                                <div className="w-16 h-px bg-gray-300 relative">
                                  <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-chamDarkBlue">
                                    {format(flight.arrivalTime, "HH:mm")}
                                  </p>
                                  <p className="text-xs text-gray-500">{flight.to}</p>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 text-center">{flight.duration}</p>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-sm text-gray-600">
                                {flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}
                              </p>
                              <p className="text-xs text-gray-500">{flight.seats} seats available</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-xl text-chamDarkBlue">${flight.price}</p>
                              <p className="text-xs text-gray-500">per passenger</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedFlight && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <p className="text-lg font-bold text-chamDarkBlue">
                              Total: ${(searchResults.find(f => f.id === selectedFlight)?.price || 0) * totalPassengers}
                            </p>
                            <p className="text-sm text-gray-600">
                              for {totalPassengers} passenger{totalPassengers !== 1 ? 's' : ''}
                              {form.watch('adults') > 0 && ` (${form.watch('adults')} adult${form.watch('adults') !== 1 ? 's' : ''}${form.watch('children') > 0 ? `, ${form.watch('children')} child${form.watch('children') !== 1 ? 'ren' : ''}` : ''}${form.watch('infants') > 0 ? `, ${form.watch('infants')} infant${form.watch('infants') !== 1 ? 's' : ''}` : ''})`}
                            </p>
                          </div>
                          
                          <Button
                            onClick={handleBooking}
                            className="bg-chamGold hover:bg-chamGold/90 min-w-[140px]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Book Now'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl text-chamDarkBlue">Interline Booking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-chamDarkBlue mb-2">About Interline Booking</h3>
                    <p className="text-gray-600 text-sm">
                      Cham Wings Airlines has partnered with Jazeera Airways, Air Arabia, and FlyDubai
                      to offer convenient interline booking options. Book tickets with our partner airlines
                      using your Cham Wings account balance.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-chamDarkBlue mb-2">Partner Airlines</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-chamDarkBlue">Cham Wings Airlines (SAW)</p>
                          <p className="text-xs text-gray-600">Syria's leading private carrier</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-chamDarkBlue">Jazeera Airways (J9)</p>
                          <p className="text-xs text-gray-600">Kuwait-based airline with extensive Middle East network</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-chamDarkBlue">Air Arabia (G9)</p>
                          <p className="text-xs text-gray-600">UAE's first and largest low-cost carrier</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-chamDarkBlue">FlyDubai (FZ)</p>
                          <p className="text-xs text-gray-600">Dubai-based carrier serving the Middle East, Africa, and Asia</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-chamBlue font-medium mb-1">Important Information:</p>
                        <ul className="list-disc list-inside text-xs text-chamBlue/80 space-y-1">
                          <li>Bookings are subject to availability and partner airline policies</li>
                          <li>Your Cham Wings account will be debited at the time of booking</li>
                          <li>Changes and cancellations are subject to partner airline policies</li>
                          <li>E-tickets will be sent to your registered email address</li>
                          <li>For assistance, please contact Cham Wings customer service</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBooking;
