
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import CitySelectorPopover from './CitySelectorPopover';

const ModernFlightSearch = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!fromCity) {
      toast.error('Please select a departure city');
      return;
    }
    
    if (!toCity) {
      toast.error('Please select a destination city');
      return;
    }
    
    if (!departureDate) {
      toast.error('Please select a departure date');
      return;
    }
    
    if (tripType === 'round-trip' && !returnDate) {
      toast.error('Please select a return date');
      return;
    }
    
    if (fromCity === toCity) {
      toast.error('Departure and destination cities cannot be the same');
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search process
    setTimeout(() => {
      setIsSearching(false);
      
      // Navigate to results page (in a real app, you'd pass the search params)
      navigate('/interline', { 
        state: { 
          search: {
            tripType,
            fromCity,
            toCity,
            departureDate,
            returnDate,
            adults: 1,
            children: 0,
            infants: 0,
            cabinClass: 'economy'
          }
        }
      });
      
    }, 1500);
  };

  const cityOptions = [
    { city: 'Damascus', code: 'DAM' },
    { city: 'Aleppo', code: 'ALP' },
    { city: 'Latakia', code: 'LTK' },
    { city: 'Beirut', code: 'BEY' },
    { city: 'Dubai', code: 'DXB' },
    { city: 'Abu Dhabi', code: 'AUH' },
    { city: 'Cairo', code: 'CAI' },
    { city: 'Toronto', code: 'YYZ' },
    { city: 'New Delhi', code: 'DEL' },
    { city: 'Mumbai', code: 'BOM' },
    { city: 'Paris', code: 'CDG' },
    { city: 'London', code: 'LHR' },
    { city: 'New York', code: 'JFK' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="overflow-hidden border-none shadow-lg rounded-2xl bg-white">
        <CardContent className="p-6 md:p-8">
          {/* Trip Type Selector */}
          <div className="mb-6">
            <RadioGroup
              defaultValue={tripType}
              onValueChange={(value) => setTripType(value as 'round-trip' | 'one-way')}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label 
                  htmlFor="round-trip" 
                  className="font-medium cursor-pointer text-gray-800"
                >
                  Round Trip
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label 
                  htmlFor="one-way" 
                  className="font-medium cursor-pointer text-gray-800"
                >
                  One Way
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* From City */}
            <div className="relative">
              <Label className="block mb-2 font-medium text-gray-700">From</Label>
              <CitySelectorPopover
                value={fromCity}
                onChange={setFromCity}
                options={cityOptions}
                placeholder="Select departure"
                excludeCity={toCity}
                icon={<Plane className="h-4 w-4 rotate-45" />}
              />
            </div>

            {/* To City */}
            <div className="relative">
              <Label className="block mb-2 font-medium text-gray-700">To</Label>
              <CitySelectorPopover
                value={toCity}
                onChange={setToCity}
                options={cityOptions}
                placeholder="Select destination"
                excludeCity={fromCity}
                icon={<Plane className="h-4 w-4 -rotate-45" />}
              />
            </div>

            {/* Departure Date */}
            <div>
              <Label className="block mb-2 font-medium text-gray-700">Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal text-left"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {departureDate ? (
                      format(departureDate, "dd MMM yyyy")
                    ) : (
                      <span className="text-gray-500">Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div>
              <Label className="block mb-2 font-medium text-gray-700">Return</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal text-left"
                    disabled={tripType === 'one-way'}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {returnDate && tripType === 'round-trip' ? (
                      format(returnDate, "dd MMM yyyy")
                    ) : (
                      <span className="text-gray-500">Select date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    disabled={(date) => 
                      date < new Date() || (departureDate && date < departureDate)
                    }
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full md:w-auto md:px-12 py-6 md:float-right bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-base font-medium group relative overflow-hidden"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>Searching Flights...</>
                ) : (
                  <>
                    <span>Show Flights</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <motion.div 
                      className="absolute top-0 right-0 w-12 h-full bg-gradient-to-r from-transparent to-white/10 skew-x-12"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 1 }}
                    />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernFlightSearch;
