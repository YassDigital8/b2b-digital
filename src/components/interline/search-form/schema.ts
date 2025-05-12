
import { z } from "zod";

export const bookingFormSchema = z.object({
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

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export interface SearchFormProps {
  onSearch: (data: BookingFormValues) => void;
  isSearching: boolean;
  initialValues?: BookingFormValues;
}

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
