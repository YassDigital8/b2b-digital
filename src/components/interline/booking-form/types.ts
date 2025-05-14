
import { Passenger, ContactInformation } from '@/pages/InterlineBooking';

export type BookingStep = 1 | 2 | 3;

export interface BookingFormProps {
  flightData: any;
  passengersCount: {
    adults: number;
    children: number;
    infants: number;
  };
}

export { type Passenger, type ContactInformation };
