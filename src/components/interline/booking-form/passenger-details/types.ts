
import { Passenger } from "../types";

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
