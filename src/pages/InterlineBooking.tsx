
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Plane, Calendar as CalendarIcon, Users, MapPin, Check, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const InterlineBooking = () => {
  const { user, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('jazeera');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Common form state
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState('1');
  const [tripType, setTripType] = useState('one-way');
  const [cabinClass, setCabinClass] = useState('economy');
  
  // Flight search results state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromCity || !toCity || !departureDate) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    if (tripType === 'round-trip' && !returnDate) {
      toast.error('Please select a return date for round trip');
      return;
    }
    
    setIsSearching(true);
    setSearchResults([]);
    setSelectedFlight(null);
    
    // Simulate API call to search flights
    setTimeout(() => {
      const mockResults = generateMockFlights(
        fromCity,
        toCity,
        departureDate,
        activeTab,
        cabinClass
      );
      setSearchResults(mockResults);
      setIsSearching(false);
      
      if (mockResults.length === 0) {
        toast.error('No flights found for the selected criteria');
      } else {
        toast.success(`Found ${mockResults.length} flights for your search`);
      }
    }, 2000);
  };
  
  const handleBooking = () => {
    if (!selectedFlight) {
      toast.error('Please select a flight to book');
      return;
    }
    
    if (user.balance < 100) {
      toast.error('Insufficient balance. Please top up your account');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Flight booked successfully!');
      setIsSubmitting(false);
      // Reset form
      setFromCity('');
      setToCity('');
      setDepartureDate(undefined);
      setReturnDate(undefined);
      setPassengers('1');
      setTripType('one-way');
      setCabinClass('economy');
      setSearchResults([]);
      setSelectedFlight(null);
    }, 1500);
  };
  
  const airlines = [
    { id: 'jazeera', name: 'Jazeera Airways', code: 'J9' },
    { id: 'airarabia', name: 'Air Arabia', code: 'G9' },
    { id: 'flydubai', name: 'FlyDubai', code: 'FZ' }
  ];
  
  const cities = {
    jazeera: [
      'Damascus', 'Kuwait City', 'Cairo', 'Dubai', 'Abu Dhabi', 'Doha', 'Riyadh', 'Jeddah', 'Amman', 'Beirut'
    ],
    airarabia: [
      'Damascus', 'Sharjah', 'Cairo', 'Alexandria', 'Amman', 'Beirut', 'Kuwait City', 'Riyadh', 'Jeddah', 'Doha'
    ],
    flydubai: [
      'Damascus', 'Dubai', 'Beirut', 'Amman', 'Cairo', 'Baghdad', 'Basra', 'Kuwait City', 'Riyadh', 'Doha'
    ]
  };
  
  // Mock flight generation
  const generateMockFlights = (from: string, to: string, date: Date, airline: string, cabin: string) => {
    const flights = [];
    const airlineCode = airlines.find(a => a.id === airline)?.code || 'XX';
    const cabinPriceMultiplier = cabin === 'business' ? 3 : 1;
    
    const departureTimeBase = new Date(date);
    departureTimeBase.setHours(6, 0, 0, 0);
    
    // Generate 0-4 flights
    const numFlights = Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numFlights; i++) {
      const flightNumber = `${airlineCode}${100 + Math.floor(Math.random() * 900)}`;
      
      const departureTime = new Date(departureTimeBase);
      departureTime.setHours(departureTime.getHours() + (i * 4));
      
      const arrivalTime = new Date(departureTime);
      arrivalTime.setHours(arrivalTime.getHours() + 2 + Math.floor(Math.random() * 3));
      
      const price = Math.floor((200 + Math.random() * 300) * cabinPriceMultiplier);
      
      flights.push({
        id: `${airline}-${i}`,
        flightNumber,
        airline: airlines.find(a => a.id === airline)?.name || 'Unknown Airline',
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
          
          <Tabs defaultValue="jazeera" value={activeTab} onValueChange={setActiveTab}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <TabsList className="grid w-full max-w-md grid-cols-3">
                {airlines.map((airline) => (
                  <TabsTrigger key={airline.id} value={airline.id} className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    {airline.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="border-none shadow-soft mb-8">
                {airlines.map((airline) => (
                  <TabsContent key={airline.id} value={airline.id} className="mt-0">
                    <CardHeader>
                      <CardTitle className="text-2xl text-chamDarkBlue">{airline.name} Booking</CardTitle>
                      <CardDescription>Search and book {airline.name} flights using your Cham Wings account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSearch}>
                        <div className="mb-6">
                          <RadioGroup
                            value={tripType}
                            onValueChange={setTripType}
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
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="from-city">From *</Label>
                            <Select value={fromCity} onValueChange={setFromCity}>
                              <SelectTrigger id="from-city">
                                <SelectValue placeholder="Departure city" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities[airline.id as keyof typeof cities].map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="to-city">To *</Label>
                            <Select value={toCity} onValueChange={setToCity}>
                              <SelectTrigger id="to-city">
                                <SelectValue placeholder="Destination city" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities[airline.id as keyof typeof cities]
                                  .filter(city => city !== fromCity)
                                  .map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="departure-date">Departure Date *</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !departureDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {departureDate ? format(departureDate, "PPP") : <span>Select date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={departureDate}
                                  onSelect={setDepartureDate}
                                  initialFocus
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="return-date" className={tripType === 'one-way' ? 'text-gray-400' : ''}>
                              Return Date {tripType === 'round-trip' ? '*' : ''}
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !returnDate && "text-muted-foreground",
                                    tripType === 'one-way' && "opacity-50 cursor-not-allowed"
                                  )}
                                  disabled={tripType === 'one-way'}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={returnDate}
                                  onSelect={setReturnDate}
                                  initialFocus
                                  disabled={(date) => departureDate ? date < departureDate : date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                          <div className="space-y-2">
                            <Label htmlFor="passengers">Passengers</Label>
                            <Select value={passengers} onValueChange={setPassengers}>
                              <SelectTrigger id="passengers">
                                <SelectValue placeholder="Select passengers" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} {num === 1 ? 'passenger' : 'passengers'}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cabin-class">Cabin Class</Label>
                            <Select value={cabinClass} onValueChange={setCabinClass}>
                              <SelectTrigger id="cabin-class">
                                <SelectValue placeholder="Select cabin class" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="economy">Economy Class</SelectItem>
                                <SelectItem value="business">Business Class</SelectItem>
                              </SelectContent>
                            </Select>
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
                    </CardContent>
                  </TabsContent>
                ))}
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
                      <CardTitle className="text-xl text-chamDarkBlue">Available Flights</CardTitle>
                      <CardDescription>
                        {fromCity} to {toCity} on {departureDate ? format(departureDate, "MMMM d, yyyy") : ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {searchResults.map((flight) => (
                          <div
                            key={flight.id}
                            className={cn(
                              "p-4 rounded-lg border transition-all duration-300",
                              selectedFlight === flight.id
                                ? "border-chamBlue bg-chamBlue/5"
                                : "border-gray-200 hover:border-chamBlue/50 hover:bg-gray-50"
                            )}
                            onClick={() => setSelectedFlight(flight.id)}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                              <div>
                                <p className="font-bold text-chamDarkBlue">{flight.flightNumber}</p>
                                <p className="text-sm text-gray-600">{flight.airline}</p>
                              </div>
                              
                              <div className="text-center">
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
                                <p className="text-xs text-gray-500 mt-1">{flight.duration}</p>
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
                                Total: ${(searchResults.find(f => f.id === selectedFlight)?.price || 0) * parseInt(passengers)}
                              </p>
                              <p className="text-sm text-gray-600">
                                for {passengers} passenger{parseInt(passengers) !== 1 ? 's' : ''}
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
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBooking;
