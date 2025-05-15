
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Ticket } from 'lucide-react';
import { Flight } from '@/types/flight';

interface BookingSummaryProps {
  selectedFlight: Flight | null;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
  onBook: () => void;
  isSubmitting: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedFlight,
  totalPassengers,
  onBook,
  isSubmitting
}) => {
  if (!selectedFlight) return null;

  // Calculate total price
  const calculateTotalPrice = () => {
    return selectedFlight.price * totalPassengers.adults + 
      selectedFlight.price * totalPassengers.children + 
      (selectedFlight.price * totalPassengers.infants * 0.1);
  };

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-gradient-to-r from-chamBlue/10 to-chamGold/10 p-6 rounded-lg shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <p className="text-xl font-bold text-chamDarkBlue">
              Total: ${calculateTotalPrice().toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              for {totalPassengers.total} passenger{totalPassengers.total !== 1 ? 's' : ''}
              {totalPassengers.adults > 0 && ` (${totalPassengers.adults} adult${totalPassengers.adults !== 1 ? 's' : ''}${totalPassengers.children > 0 ? `, ${totalPassengers.children} child${totalPassengers.children !== 1 ? 'ren' : ''}` : ''}${totalPassengers.infants > 0 ? `, ${totalPassengers.infants} infant${totalPassengers.infants !== 1 ? 's' : ''}` : ''})`}
            </p>
          </div>
        </div>
        
        <Button
          onClick={onBook}
          className="bg-chamGold hover:bg-chamGold/90 text-white text-base px-10 py-6 h-auto font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-w-[200px] rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : (
            <div className="flex items-center justify-center gap-2">
              <Ticket className="h-5 w-5" />
              <span>Book Now</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
