
import { Flight } from '@/types/flight';
import { getAirlineLogo } from './airlineLogos';

// Define available airlines
export const airlines = [
  { id: 'chamwings', name: 'Cham Wings Airlines', code: '6Q' },
  { id: 'jazeera', name: 'Jazeera Airways', code: 'J9' },
  { id: 'airarabia', name: 'Air Arabia', code: 'G9' },
  { id: 'flydubai', name: 'FlyDubai', code: 'FZ' },
  { id: 'kuwait', name: 'Kuwait Airways', code: 'KU' }
];

// All available cities with airport codes
export const allCities = [
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

// Helper function to get city name from code
export const getCityNameFromCode = (code: string): string => {
  const city = allCities.find(c => c.code === code);
  return city ? city.city : code;
};

// Helper function to get city code from name
export const getCityCodeFromName = (name: string): string => {
  const city = allCities.find(c => c.city === name);
  return city ? city.code : '';
};

// Function to sort flights
export const sortFlights = (flights: Flight[], sortType: 'price' | 'departure' | 'arrival') => {
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

// Mock interline flight generation
export const generateInterlineFlights = (
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
    
    const firstSegment = {
      id: `seg1-${i}`,
      flightNumber: `${firstAirline?.code}${100 + Math.floor(Math.random() * 900)}`,
      airline: firstAirline?.name || 'Unknown Airline',
      airlineCode: firstAirline?.code || 'XX',
      airlineLogo: firstAirline ? getAirlineLogo(firstAirline.code) : '',
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
    
    const secondSegment = {
      id: `seg2-${i}`,
      flightNumber: `${secondAirline?.code}${100 + Math.floor(Math.random() * 900)}`,
      airline: secondAirline?.name || 'Unknown Airline',
      airlineCode: secondAirline?.code || 'XX',
      airlineLogo: secondAirline ? getAirlineLogo(secondAirline.code) : '',
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
      cabin: cabin as 'economy' | 'business',
      connectionTime: `${Math.floor(connectionDuration / 60)}h ${connectionDuration % 60}m`,
    });
  }
  
  return flights;
};
