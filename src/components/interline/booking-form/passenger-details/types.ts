
import { Dispatch, SetStateAction } from 'react';

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title?: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: Date | null;
  nationality: string;
  passportNumber: string;
  passportIssueDate: Date | null;
  passportExpiryDate: Date | null;
}

export interface PassengerFormItemProps {
  passenger: Passenger;
  index: number;
  updatePassenger: (index: number, updates: Partial<Passenger>) => void;
  openAccordion: string;
  setOpenAccordion: Dispatch<SetStateAction<string>>;
}

export interface PassengerDetailsFormProps {
  passengers: Passenger[];
  updatePassenger: (index: number, updates: Partial<Passenger>) => void;
  onNext: () => void;
}
