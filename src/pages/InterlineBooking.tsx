
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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

// Interfaces for flight data
interface Segment {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  airlineLogo?: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: string;
}

interface Flight {
  id: string;
  segments: Segment[];
  stops: number;
  price: number;
  seats: number;
  cabin: string;
  connectionTime?: string;
}

const InterlineBooking = () => {
  const { user, requireAuth } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Flight search results state
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'departure' | 'arrival'>('price');
  
  // Define available airlines
  const airlines = [
    { id: 'chamwings', name: 'Cham Wings Airlines', code: '6Q' },
    { id: 'jazeera', name: 'Jazeera Airways', code: 'J9' },
    { id: 'airarabia', name: 'Air Arabia', code: 'G9' },
    { id: 'flydubai', name: 'FlyDubai', code: 'FZ' },
    { id: 'kuwait', name: 'Kuwait Airways', code: 'KU' }
  ];
  
  // All available cities with airport codes
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

  // Helper function to get city name from code
  const getCityNameFromCode = (code: string): string => {
    const city = allCities.find(c => c.code === code);
    return city ? city.city : code;
  };

  // Helper function to get city code from name
  const getCityCodeFromName = (name: string): string => {
    const city = allCities.find(c => c.city === name);
    return city ? city.code : '';
  };
  
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
      // Get from and to city codes
      const fromCode = getCityCodeFromName(data.fromCity);
      const toCode = getCityCodeFromName(data.toCity);
      
      // Generate interline connection flights
      const results = generateInterlineFlights(
        data.fromCity,
        data.toCity,
        fromCode,
        toCode,
        data.departureDate,
        data.cabinClass,
      );
      
      // Sort results by price (lowest first) as default
      const sortedResults = sortFlights(results, 'price');
      
      setSearchResults(sortedResults);
      setIsSearching(false);
      
      if (sortedResults.length === 0) {
        toast.error('No flights found for the selected criteria');
      } else {
        toast.success(`Found ${sortedResults.length} interline flights for your search`);
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
    
    const totalPassengers = (type === 'adults' ? newValue : form.getValues('adults')) + 
                           (type === 'children' ? newValue : form.getValues('children')) + 
                           (type === 'infants' ? newValue : form.getValues('infants'));
    
    if (increment && totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    form.setValue(type, newValue);
  };

  // Function to sort flights
  const sortFlights = (flights: Flight[], sortType: 'price' | 'departure' | 'arrival') => {
    return [...flights].sort((a, b) => {
      if (sortType === 'price') {
        return a.price - b.price;
      } else if (sortType === 'departure') {
        return a.segments[0].departureTime.getTime() - b.segments[0].departureTime.getTime();
      } else if (sortType === 'arrival') {
        const aLastSegment = a.segments[a.segments.length - 1];
        const bLastSegment = b.segments[b.segments.length - 1];
        return aLastSegment.arrivalTime.getTime() - bLastSegment.arrivalTime.getTime();
      }
      return 0;
    });
  };

  // Handle sorting change
  const handleSortChange = (newSortBy: 'price' | 'departure' | 'arrival') => {
    setSortBy(newSortBy);
    setSearchResults(sortFlights(searchResults, newSortBy));
  };
  
  // Mock interline flight generation
  const generateInterlineFlights = (
    from: string, 
    to: string, 
    fromCode: string, 
    toCode: string,
    date: Date, 
    cabin: string
  ): Flight[] => {
    const flights: Flight[] = [];
    const cabinPriceMultiplier = cabin === 'business' ? 3 : 1;
    
    // Generate 5-10 interline flights
    const numFlights = 5 + Math.floor(Math.random() * 6);
    
    for (let i = 0; i < numFlights; i++) {
      // Ensure at least one segment is operated by Cham Wings (6Q)
      const chamWingsFirst = Math.random() > 0.5;
      const departureTimeBase = new Date(date);
      departureTimeBase.setHours(6 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60), 0, 0);
      
      // Select a connection city (different from origin and destination)
      const possibleConnections = allCities.filter(c => 
        c.city !== from && c.city !== to
      );
      const connectionCity = possibleConnections[Math.floor(Math.random() * possibleConnections.length)];
      
      // Create first segment
      const firstAirline = chamWingsFirst 
        ? airlines.find(a => a.code === '6Q') 
        : airlines[Math.floor(Math.random() * (airlines.length - 1)) + 1]; // Skip Cham Wings
      
      const segment1DepartureTime = new Date(departureTimeBase);
      const segment1Duration = 60 + Math.floor(Math.random() * 120); // 1-3 hours in minutes
      const segment1ArrivalTime = new Date(segment1DepartureTime);
      segment1ArrivalTime.setMinutes(segment1ArrivalTime.getMinutes() + segment1Duration);
      
      const firstSegment: Segment = {
        id: `seg1-${i}`,
        flightNumber: `${firstAirline?.code}${100 + Math.floor(Math.random() * 900)}`,
        airline: firstAirline?.name || 'Unknown Airline',
        airlineCode: firstAirline?.code || 'XX',
        from: from,
        fromCode: fromCode,
        to: connectionCity.city,
        toCode: connectionCity.code,
        departureTime: segment1DepartureTime,
        arrivalTime: segment1ArrivalTime,
        duration: `${Math.floor(segment1Duration / 60)}h ${segment1Duration % 60}m`,
      };
      
      // Create connection time
      const connectionDuration = 60 + Math.floor(Math.random() * 120); // 1-3 hours
      
      // Create second segment
      const secondAirline = chamWingsFirst 
        ? airlines[Math.floor(Math.random() * (airlines.length - 1)) + 1] // Skip Cham Wings
        : airlines.find(a => a.code === '6Q');
      
      const segment2DepartureTime = new Date(segment1ArrivalTime);
      segment2DepartureTime.setMinutes(segment2DepartureTime.getMinutes() + connectionDuration);
      
      const segment2Duration = 60 + Math.floor(Math.random() * 120); // 1-3 hours in minutes
      const segment2ArrivalTime = new Date(segment2DepartureTime);
      segment2ArrivalTime.setMinutes(segment2ArrivalTime.getMinutes() + segment2Duration);
      
      const secondSegment: Segment = {
        id: `seg2-${i}`,
        flightNumber: `${secondAirline?.code}${100 + Math.floor(Math.random() * 900)}`,
        airline: secondAirline?.name || 'Unknown Airline',
        airlineCode: secondAirline?.code || 'XX',
        from: connectionCity.city,
        fromCode: connectionCity.code,
        to: to,
        toCode: toCode,
        departureTime: segment2DepartureTime,
        arrivalTime: segment2ArrivalTime,
        duration: `${Math.floor(segment2Duration / 60)}h ${segment2Duration % 60}m`,
      };
      
      // Calculate total duration including connection
      const totalDurationMinutes = 
        segment1Duration + 
        connectionDuration + 
        segment2Duration;
      
      const totalDuration = `${Math.floor(totalDurationMinutes / 60)}h ${totalDurationMinutes % 60}m`;
      
      // Calculate price - more expensive for shorter connections
      const basePrice = 300 + Math.floor(Math.random() * 500);
      const connectionFactor = Math.max(0.8, 1 - (connectionDuration / 300)); // Higher for shorter connections
      const price = Math.floor(basePrice * cabinPriceMultiplier * connectionFactor);
      
      flights.push({
        id: `flight-${i}`,
        segments: [firstSegment, secondSegment],
        stops: 1,
        price: price,
        seats: Math.floor(Math.random() * 30) + 1,
        cabin: cabin,
        connectionTime: `${Math.floor(connectionDuration / 60)}h ${connectionDuration % 60}m`,
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
            <p className="text-gray-600">Book connecting flights with Cham Wings (6Q) and partner airlines</p>
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
                      Use your balance to book interline tickets with Cham Wings and partner airlines
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
                <CardDescription>Search for interline connecting flights</CardDescription>
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
                        <CardTitle className="text-xl text-chamDarkBlue">Available Interline Flights</CardTitle>
                        <CardDescription>
                          {form.getValues('fromCity')} ({getCityCodeFromName(form.getValues('fromCity'))}) to {form.getValues('toCity')} ({getCityCodeFromName(form.getValues('toCity'))}) on {format(form.getValues('departureDate'), "MMMM d, yyyy")}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {searchResults.length} flights found
                      </div>
                    </div>
                  </CardHeader>
                  
                  {/* Sorting options */}
                  <div className="px-6 pb-2 flex items-center border-b">
                    <span className="text-sm font-medium mr-2">Sort by:</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant={sortBy === 'price' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        onClick={() => handleSortChange('price')}
                        className="text-xs h-8"
                      >
                        Cheapest
                      </Button>
                      <Button 
                        variant={sortBy === 'departure' ? 'secondary' : 'ghost'} 
                        size="sm"
                        onClick={() => handleSortChange('departure')}
                        className="text-xs h-8"
                      >
                        Departure
                      </Button>
                      <Button 
                        variant={sortBy === 'arrival' ? 'secondary' : 'ghost'} 
                        size="sm"
                        onClick={() => handleSortChange('arrival')}
                        className="text-xs h-8"
                      >
                        Arrival
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <div className="space-y-6">
                      {searchResults.map((flight) => (
                        <div
                          key={flight.id}
                          className={cn(
                            "border rounded-lg transition-all duration-300 cursor-pointer overflow-hidden",
                            selectedFlight === flight.id
                              ? "border-chamBlue bg-chamBlue/5"
                              : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50"
                          )}
                          onClick={() => setSelectedFlight(flight.id)}
                        >
                          {/* Flight header with price */}
                          <div className="flex justify-between items-center p-3 bg-gray-50 border-b">
                            <div className="flex items-center gap-2">
                              <Plane className="h-4 w-4 text-chamBlue" />
                              <span className="font-medium">Interline Flight</span>
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                {flight.stops} stop
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-chamDarkBlue">${flight.price}</p>
                              <p className="text-xs text-gray-500">per passenger</p>
                            </div>
                          </div>
                          
                          {/* Flight segments */}
                          <div className="p-4">
                            {/* First segment */}
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">1</div>
                                <p className="font-medium">{flight.segments[0].airline} ({flight.segments[0].airlineCode})</p>
                                <p className="text-sm text-gray-600">Flight {flight.segments[0].flightNumber}</p>
                              </div>
                              
                              <div className="grid grid-cols-7 gap-2 items-center pl-8">
                                <div className="col-span-3">
                                  <p className="text-base font-semibold">{format(flight.segments[0].departureTime, "HH:mm")}</p>
                                  <p className="text-sm">{flight.segments[0].fromCode}</p>
                                  <p className="text-xs text-gray-500">{flight.segments[0].from}</p>
                                </div>
                                
                                <div className="col-span-1 flex flex-col items-center">
                                  <div className="text-xs text-gray-500">{flight.segments[0].duration}</div>
                                  <div className="w-full h-px bg-gray-300 my-1 relative">
                                    <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
                                  </div>
                                  <div className="text-xs text-gray-500">Direct</div>
                                </div>
                                
                                <div className="col-span-3 text-right">
                                  <p className="text-base font-semibold">{format(flight.segments[0].arrivalTime, "HH:mm")}</p>
                                  <p className="text-sm">{flight.segments[0].toCode}</p>
                                  <p className="text-xs text-gray-500">{flight.segments[0].to}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Connection information */}
                            <div className="flex items-center justify-center py-2 px-4 bg-orange-50 rounded-md mb-4">
                              <div className="flex items-center gap-2 text-sm text-orange-700">
                                <Info className="h-4 w-4" />
                                <span>Connection time: {flight.connectionTime} in {flight.segments[0].to} ({flight.segments[0].toCode})</span>
                              </div>
                            </div>
                            
                            {/* Second segment */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 flex items-center justify-center bg-chamBlue text-white text-xs rounded-full">2</div>
                                <p className="font-medium">{flight.segments[1].airline} ({flight.segments[1].airlineCode})</p>
                                <p className="text-sm text-gray-600">Flight {flight.segments[1].flightNumber}</p>
                              </div>
                              
                              <div className="grid grid-cols-7 gap-2 items-center pl-8">
                                <div className="col-span-3">
                                  <p className="text-base font-semibold">{format(flight.segments[1].departureTime, "HH:mm")}</p>
                                  <p className="text-sm">{flight.segments[1].fromCode}</p>
                                  <p className="text-xs text-gray-500">{flight.segments[1].from}</p>
                                </div>
                                
                                <div className="col-span-1 flex flex-col items-center">
                                  <div className="text-xs text-gray-500">{flight.segments[1].duration}</div>
                                  <div className="w-full h-px bg-gray-300 my-1 relative">
                                    <Plane className="absolute top-1/2 right-0 transform -translate-y-1/2 h-3 w-3 text-chamBlue" />
                                  </div>
                                  <div className="text-xs text-gray-500">Direct</div>
                                </div>
                                
                                <div className="col-span-3 text-right">
                                  <p className="text-base font-semibold">{format(flight.segments[1].arrivalTime, "HH:mm")}</p>
                                  <p className="text-sm">{flight.segments[1].toCode}</p>
                                  <p className="text-xs text-gray-500">{flight.segments[1].to}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Additional flight info */}
                            <div className="mt-4 pt-3 border-t border-dashed flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <Check className="h-4 w-4 text-green-600 mr-1" />
                                  <span>{flight.cabin === 'business' ? 'Business Class' : 'Economy Class'}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">{flight.seats} seats left</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-chamBlue" />
                                <span>Total journey time: {
                                  (() => {
                                    const startTime = flight.segments[0].departureTime;
                                    const endTime = flight.segments[1].arrivalTime;
                                    const durationMs = endTime.getTime() - startTime.getTime();
                                    const durationMins = Math.floor(durationMs / (1000 * 60));
                                    return `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;
                                  })()
                                }</span>
                              </div>
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
                      Cham Wings Airlines has partnered with several airlines to offer interline booking options.
                      This allows you to book flights where at least one segment is operated by Cham Wings (code 6Q),
                      with connecting flights on partner airlines, all in a single reservation.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-chamDarkBlue mb-2">Partner Airlines</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-chamDarkBlue">Cham Wings Airlines (6Q)</p>
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
                      <li className="flex items-start gap-2">
                        <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-chamDarkBlue">Kuwait Airways (KU)</p>
                          <p className="text-xs text-gray-600">Kuwait's national carrier with global connections</p>
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
                          <li>All interline bookings include at least one segment operated by Cham Wings Airlines (6Q)</li>
                          <li>Baggage policies follow the most restrictive rules of the operating airlines</li>
                          <li>For flight changes or cancellations, please contact Cham Wings customer service</li>
                          <li>Connection times shown are minimum required times at each airport</li>
                          <li>Visa requirements are the passenger's responsibility</li>
                          <li>E-tickets will be sent to your registered email address</li>
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
