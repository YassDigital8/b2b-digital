
export interface Segment {
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
  
  // Additional fields used in the application
  airport?: string;
  FlightNumber?: string;
  departure_time?: string;
  departure_date?: string;
  origin_code?: string;
  origin_name?: string;
  arrival_time?: string;
  arrival_date?: string;
  destination_code?: string;
  destination_name?: string;
  Duration?: string;
}

export interface Flight {
  id: string;
  segments: Segment[];
  stops: number;
  price: number;
  seats: number;
  cabin: 'economy' | 'business';
  connectionTime?: string;
  
  // Additional fields used in the application
  Duration?: string;
  flight_class?: string;
  total_fare_with_additional?: number | string;
  pricing_info?: any;
  connection_time?: string[];
  
  // Fields used in components
  departure_time?: string;
  origin_code?: string;
  origin_name?: string;
  arrival_time?: string;
  destination_code?: string;
  destination_name?: string;
}

export interface PriceBreakdownContentProps {
  pricingData: any;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
}

export interface LoginResponse {
  code?: string;
  token: string;
}

// Define types for our Redux state
export interface FlightSearchData {
  data?: any;
}

export interface Pos {
  id: string;
  key: string;
  englishName: string;
  value?: {
    pos?: string;
  };
}
