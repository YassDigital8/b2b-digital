
export type BookingStep = 1 | 2 | 3;

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  passportNumber: string;
  passportIssueDate: Date | null;
  passportExpiryDate: Date | null;
  nationality: string;
}

export interface ContactInformation {
  email: string;
  phoneCode: string;
  phoneNumber: string;
}

export interface BookingFormProps {
  flightData: any;
  passengersCount: {
    adults: number;
    children: number;
    infants: number;
  };
}
