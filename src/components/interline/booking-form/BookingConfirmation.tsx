
import { CheckCircle, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Passenger, ContactInformation } from '@/components/interline/booking-form/types';

interface BookingConfirmationProps {
  flightData: any;
  passengers: Passenger[];
  contactInformation: ContactInformation;
}

const BookingConfirmation = ({
  flightData,
  passengers,
  contactInformation
}: BookingConfirmationProps) => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="px-6 py-4 pb-6">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <div className="bg-green-100 p-4 mb-4 rounded-full">
          <CheckCircle size={50} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Your booking has been confirmed. A confirmation email has been sent to {contactInformation.email}.
        </p>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 w-full max-w-md">
          <p className="font-medium text-gray-700 mb-1">Booking Reference</p>
          <div className="text-2xl font-mono font-semibold text-chamDarkBlue tracking-wider">
            {/* Generate a random booking reference */}
            {`CW${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`}
          </div>
        </div>
      </div>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3">
          <h3 className="font-medium">Flight Details</h3>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{flightData?.segments[0]?.from}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">{flightData.segments[flightData?.segments?.length-1]?.to}</p>
            </div>
          </div>
          <hr className="my-3" />
          <div className="space-y-2">
            {flightData?.segments?.map((segment: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-3 w-6 h-6 bg-chamBlue/10 flex items-center justify-center rounded-full text-xs font-medium text-chamBlue">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{segment?.from} → {segment?.to}</p>
                    <p className="text-gray-500">{new Date(segment?.departureTime)?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{segment?.flightNumber}</p>
                  <p className="text-gray-500">{segment?.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3">
          <h3 className="font-medium">Contact Information</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <UserRound className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium">
              {contactInformation?.gender === 'male' ? 'Mr.' : 'Ms.'} {contactInformation?.firstName} {contactInformation?.lastName}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{contactInformation?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{contactInformation?.phoneCode} {contactInformation?.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p>{contactInformation?.city}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3">
          <h3 className="font-medium">Passenger Details</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {passengers?.map((passenger, index) => (
              <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">
                    {passenger?.gender === 'male' ? 'Mr.' : 'Ms.'} {passenger?.firstName} {passenger?.lastName}
                  </span>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded-full capitalize">
                    {passenger?.type}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Passport</p>
                    <p>{passenger?.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Nationality</p>
                    <p>{passenger?.nationality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={handleBackToHome}
          className="bg-gradient-to-r from-chamBlue to-chamDarkBlue hover:from-chamDarkBlue hover:to-blue-800 text-white px-8 py-2 rounded-full shadow-md"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
