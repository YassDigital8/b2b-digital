import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Car, Calendar as CalendarIcon, Users, MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TransportationBooking = () => {
  const { user, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('ya-marhaba');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ya Marhaba form state
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState('1');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Limousine form state
  const [flightNumber, setFlightNumber] = useState('');
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(undefined);
  const [pickupLocation, setPickupLocation] = useState('Dubai International Airport');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [businessClass, setBusinessClass] = useState(false);
  
  // Add state for controlling popover open/close
  const [travelDateOpen, setTravelDateOpen] = useState(false);
  const [arrivalDateOpen, setArrivalDateOpen] = useState(false);
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
  const handleYaMarhabaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromCity || !toCity || !travelDate) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Transportation booking submitted successfully');
      setIsSubmitting(false);
      // Reset form
      setFromCity('');
      setToCity('');
      setTravelDate(undefined);
      setPassengers('1');
      setSpecialRequests('');
    }, 1500);
  };
  
  const handleLimousineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flightNumber || !arrivalDate || !dropoffLocation || !contactNumber) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    if (!businessClass) {
      toast.error('This service is only available for Business Class passengers');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Limousine service booking submitted successfully');
      setIsSubmitting(false);
      // Reset form
      setFlightNumber('');
      setArrivalDate(undefined);
      setDropoffLocation('');
      setContactNumber('');
    }, 1500);
  };
  
  const syriaCities = [
    'Damascus',
    'Aleppo',
    'Homs',
    'Latakia',
    'Tartus',
    'Hama',
    'Deir ez-Zor',
    'Al-Hasakah',
    'Raqqa',
    'Daraa',
    'As-Suwayda',
    'Idlib',
    'Quneitra'
  ];
  
  const uaeCities = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain'
  ];
  
  // if (!user) return null;
  
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
            <h1 className="text-3xl font-bold text-chamDarkBlue">Transportation Services</h1>
            <p className="text-gray-600">Book transportation services for travelers across Syria and UAE</p>
          </motion.div>
          
          <Tabs defaultValue="ya-marhaba" value={activeTab} onValueChange={setActiveTab}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8"
            >
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="ya-marhaba" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Ya Marhaba
                </TabsTrigger>
                <TabsTrigger value="limousine" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Limousine
                </TabsTrigger>
              </TabsList>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TabsContent value="ya-marhaba">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="border-none shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-2xl text-chamDarkBlue">Ya Marhaba Transportation</CardTitle>
                        <CardDescription>Book transportation services across Syrian cities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleYaMarhabaSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <Label htmlFor="from-city">From City *</Label>
                              <Select value={fromCity} onValueChange={setFromCity}>
                                <SelectTrigger id="from-city">
                                  <SelectValue placeholder="Select departure city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {syriaCities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="to-city">To City *</Label>
                              <Select value={toCity} onValueChange={setToCity}>
                                <SelectTrigger id="to-city">
                                  <SelectValue placeholder="Select destination city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {syriaCities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="travel-date">Travel Date *</Label>
                              <Popover open={travelDateOpen} onOpenChange={setTravelDateOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !travelDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {travelDate ? format(travelDate, "PPP") : <span>Select date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={travelDate}
                                    onSelect={(date) => {
                                      setTravelDate(date);
                                      setTravelDateOpen(false);
                                    }}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="passengers">Number of Passengers</Label>
                              <Select value={passengers} onValueChange={setPassengers}>
                                <SelectTrigger id="passengers">
                                  <SelectValue placeholder="Select passengers" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? 'passenger' : 'passengers'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                            <Input
                              id="special-requests"
                              placeholder="Any special requirements or requests"
                              value={specialRequests}
                              onChange={(e) => setSpecialRequests(e.target.value)}
                            />
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Book Transportation'}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="border-none shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-xl text-chamDarkBlue">Service Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-medium text-chamDarkBlue mb-2">About Ya Marhaba</h3>
                          <p className="text-gray-600 text-sm">
                            Ya Marhaba provides reliable transportation services across major Syrian cities.
                            Perfect for travelers looking for comfortable and safe transportation options.
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium text-chamDarkBlue mb-2">Service Benefits</h3>
                          <ul className="space-y-2">
                            {[
                              'Door-to-door transportation service',
                              'Professional and courteous drivers',
                              'Comfortable vehicles for all group sizes',
                              'Flexible scheduling options',
                              'Priority booking for Cham Wings customers'
                            ].map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-chamGold mt-0.5" />
                                <span className="text-gray-600">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium text-chamDarkBlue mb-2">Pricing</h3>
                          <p className="text-gray-600 text-sm">
                            Pricing varies based on distance and number of passengers.
                            A detailed quote will be provided upon booking confirmation.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="limousine">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="border-none shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-2xl text-chamDarkBlue">Limousine Service</CardTitle>
                        <CardDescription>Free limousine service for Business Class passengers in UAE</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleLimousineSubmit}>
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                            <p className="text-sm text-yellow-800 flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>This service is exclusively available for Business Class passengers</span>
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <Label htmlFor="flight-number">Flight Number *</Label>
                              <Input
                                id="flight-number"
                                placeholder="e.g. RB501"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="arrival-date">Arrival Date *</Label>
                              <Popover open={arrivalDateOpen} onOpenChange={setArrivalDateOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !arrivalDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {arrivalDate ? format(arrivalDate, "PPP") : <span>Select date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={arrivalDate}
                                    onSelect={(date) => {
                                      setArrivalDate(date);
                                      setArrivalDateOpen(false);
                                    }}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="pickup-location">Pickup Location *</Label>
                              <Select value={pickupLocation} onValueChange={setPickupLocation}>
                                <SelectTrigger id="pickup-location">
                                  <SelectValue placeholder="Select pickup location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Dubai International Airport">Dubai International Airport</SelectItem>
                                  <SelectItem value="Abu Dhabi International Airport">Abu Dhabi International Airport</SelectItem>
                                  <SelectItem value="Sharjah International Airport">Sharjah International Airport</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="dropoff-location">Dropoff Location *</Label>
                              <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                                <SelectTrigger id="dropoff-location">
                                  <SelectValue placeholder="Select dropoff location" />
                                </SelectTrigger>
                                <SelectContent>
                                  {uaeCities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="contact-number">Contact Number *</Label>
                              <Input
                                id="contact-number"
                                placeholder="e.g. +971 50 123 4567"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2 flex items-center">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="business-class"
                                  className="h-4 w-4 rounded border-gray-300 text-chamBlue focus:ring-chamBlue"
                                  checked={businessClass}
                                  onChange={(e) => setBusinessClass(e.target.checked)}
                                />
                                <Label htmlFor="business-class" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  I confirm this booking is for a Business Class passenger
                                </Label>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Book Limousine Service'}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="border-none shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-xl text-chamDarkBlue">Service Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-medium text-chamDarkBlue mb-2">About Limousine Service</h3>
                          <p className="text-gray-600 text-sm">
                            Cham Wings offers complimentary limousine transportation for Business Class
                            passengers arriving in the UAE. Enjoy a luxurious ride to your destination.
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium text-chamDarkBlue mb-2">Eligibility</h3>
                          <ul className="space-y-2">
                            {[
                              'Available exclusively for Business Class passengers',
                              'Valid for Cham Wings flights to UAE destinations',
                              'Must be booked at least 24 hours before arrival',
                              'Limited to one service per passenger per booking'
                            ].map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-chamGold mt-0.5" />
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium text-chamDarkBlue mb-2">Important Notice</h3>
                          <p className="text-gray-600 text-sm">
                            The limousine service is complimentary and does not incur any charges.
                            Bookings are subject to availability and confirmation.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TransportationBooking;
