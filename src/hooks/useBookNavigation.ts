
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Flight } from '@/types/flight';

export const useBookNavigation = (
  searchResults: Flight[],
  selectedFlight: string | null,
  setIsSubmitting: (value: boolean) => void,
  passengers: {
    adults: number;
    children: number;
    infants: number;
  }
) => {
  const navigate = useNavigate();
  
  // Handle booking button click - navigates to booking form
  const handleBooking = () => {
    // if (!selectedFlight) {
    //   toast.error('Please select a flight first');
    //   return;
    // }
    
    const selectedFlightData = searchResults.find(f => f.id === selectedFlight);
    
    // if (!selectedFlightData) {
    //   toast.error('Flight data not found');
    //   return;
    // }
    
    // Set loading state while preparing navigation
    // setIsSubmitting(true);
    
    // Navigate to booking form with flight and passenger data
    navigate('/interline-booking', {
      state: {
        flightData: selectedFlightData,
        passengers: passengers
      }
    });
  };
  
  return { handleBooking };
};
