
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
}

export interface Flight {
  transaction_id: string;
  segments: Segment[];
  stops: number;
  price: number;
  seats: number;
  cabin: 'economy' | 'business';
  connectionTime?: string;
}
