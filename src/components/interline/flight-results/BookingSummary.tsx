
import { Button } from '@/components/ui/button';
import { Flight } from '@/types/flight';
import { ArrowRight, CheckCircle, Plane } from 'lucide-react';

interface BookingSummaryProps {
  selectedFlight: Flight | null | undefined;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
  onBook: () => void;
  isSubmitting: boolean;
}

const BookingSummary = ({
  selectedFlight,
  totalPassengers,
  onBook,
  isSubmitting
}: BookingSummaryProps) => {
  if (!selectedFlight) return null;

  const firstSegment = selectedFlight.segments[0];
  const lastSegment = selectedFlight.segments[selectedFlight.segments.length - 1];
  const totalPrice = selectedFlight.price * totalPassengers.total;

  return (
    <div className="mt-6 bg-violet-50 rounded-xl p-5 border border-violet-100">
      <h3 className="text-lg font-semibold text-violet-900 flex items-center">
        <CheckCircle className="w-5 h-5 mr-2 text-violet-600" />
        Selected Flight Summary
      </h3>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-3 border border-violet-100">
          <div className="text-sm text-gray-500">From - To</div>
          <div className="font-semibold text-violet-900 flex items-center mt-1">
            <Plane className="h-4 w-4 mr-1.5 text-violet-500" />
            {firstSegment.from} → {lastSegment.to}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {firstSegment.fromCode} → {lastSegment.toCode}
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-violet-100">
          <div className="text-sm text-gray-500">Passengers</div>
          <div className="font-semibold text-violet-900 mt-1">
            {totalPassengers.total} {totalPassengers.total > 1 ? 'passengers' : 'passenger'}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {totalPassengers.adults} adult{totalPassengers.adults > 1 ? 's' : ''}
            {totalPassengers.children > 0 && `, ${totalPassengers.children} child${totalPassengers.children > 1 ? 'ren' : ''}`}
            {totalPassengers.infants > 0 && `, ${totalPassengers.infants} infant${totalPassengers.infants > 1 ? 's' : ''}`}
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-violet-100">
          <div className="text-sm text-gray-500">Total Price</div>
          <div className="font-semibold text-amber-600 mt-1">
            ${totalPrice.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            ${selectedFlight.price.toLocaleString()} × {totalPassengers.total}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          onClick={onBook}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 gap-2 text-white rounded-full px-6 py-2.5 shadow-md"
        >
          {isSubmitting ? 'Processing...' : (
            <>
              Continue to Booking
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
