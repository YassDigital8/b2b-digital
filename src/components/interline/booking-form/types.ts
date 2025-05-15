
export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  passportNumber: string;
  passportExpiryDate: Date | null;
  nationality: string;
}

export interface ContactInformation {
  email: string;
  phoneCode: string;
  phoneNumber: string;
  nationality: string;
}

export interface PassengerDetailsFormProps {
  passengers: Passenger[];
  updatePassenger: (index: number, data: Partial<Passenger>) => void;
  onNext: () => void;
}

export interface PassengerFormItemProps {
  passenger: Passenger;
  index: number;
  updatePassenger: (index: number, data: Partial<Passenger>) => void;
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
}
