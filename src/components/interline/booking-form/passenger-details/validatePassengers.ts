
import { Passenger } from '@/components/interline/booking-form/types';
import { toast } from 'sonner';

export const getPassengerTitle = (passenger: Passenger) => {
  const typeLabel = passenger.type === 'adult' ? 'Adult' : passenger.type === 'child' ? 'Child' : 'Infant';
  const index = parseInt(passenger.id.split('-')[1]);
  return `${typeLabel} #${index}`;
};

export const validateAllPassengers = (
  passengers: Passenger[], 
  setOpenAccordion: (id: string) => void
) => {
  for (let i = 0; i < passengers.length; i++) {
    const p = passengers[i];
    
    if (!p.firstName || !p.lastName) {
      toast.error(`Please enter first and last name for ${getPassengerTitle(p)}`);
      setOpenAccordion(`passenger-${i}`);
      return false;
    }
    
    if (!p.dateOfBirth) {
      toast.error(`Please enter date of birth for ${getPassengerTitle(p)}`);
      setOpenAccordion(`passenger-${i}`);
      return false;
    }
    
    if (!p.passportNumber) {
      toast.error(`Please enter passport number for ${getPassengerTitle(p)}`);
      setOpenAccordion(`passenger-${i}`);
      return false;
    }
    
    if (!p.passportIssueDate || !p.passportExpiryDate) {
      toast.error(`Please enter passport issue and expiry dates for ${getPassengerTitle(p)}`);
      setOpenAccordion(`passenger-${i}`);
      return false;
    }
    
    if (p.passportExpiryDate && p.passportExpiryDate < new Date()) {
      toast.error(`Passport for ${getPassengerTitle(p)} is expired`);
      setOpenAccordion(`passenger-${i}`);
      return false;
    }
    
    if (!p.nationality) {
      toast.error(`Please select nationality for ${getPassengerTitle(p)}`);
      setOpenAccordion(`passenger-${i}`);
      return false;
    }
  }
  
  return true;
};
