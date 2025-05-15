
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Passenger, ContactInformation } from '@/pages/InterlineBookingForm';
import { Flight } from '@/types/flight';
import { ArrowRight, Check, DownloadCloud, FileText, Home, Printer } from 'lucide-react';

interface BookingConfirmationProps {
  flightData: Flight;
  passengers: Passenger[];
  contactInformation: ContactInformation;
}

const BookingConfirmation = ({
  flightData,
  passengers,
  contactInformation
}: BookingConfirmationProps) => {
  const navigate = useNavigate();
  
  // Generate a random booking reference
  const bookingReference = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return (
    <div className="px-6 py-8">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your booking has been successfully completed. A confirmation email has been sent to {contactInformation.email}.
        </p>
        <div className="mt-4 bg-violet-50 rounded-lg p-3 inline-block">
          <p className="text-sm text-gray-600">Booking Reference</p>
          <p className="text-xl font-mono font-bold text-violet-900 tracking-wider">{bookingReference}</p>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden mb-6 shadow-md">
        <div className="bg-violet-50 px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-violet-900">Flight Details</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {flightData.segments.map((segment, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between pb-4 border-b last:border-0 last:pb-0">
                <div className="mb-2 md:mb-0">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {segment.fromCode} → {segment.toCode}
                    </span>
                    {index === 0 && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                        Departure
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {segment.airline} • Flight {segment.flightNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(segment.departureTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}{' '}
                    -
                    {' '}
                    {new Date(segment.arrivalTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(segment.departureTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden mb-6 shadow-md">
        <div className="bg-violet-50 px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-violet-900">Passenger Information</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {passengers.map((passenger, index) => (
              <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-center mb-2">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs
                    ${passenger.type === 'adult' 
                      ? 'bg-violet-100 text-violet-700' 
                      : passenger.type === 'child' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                    {passenger.type === 'adult' ? 'A' : passenger.type === 'child' ? 'C' : 'I'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {passenger.firstName} {passenger.lastName}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Passport</p>
                    <p className="font-medium">{passenger.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Nationality</p>
                    <p className="font-medium">
                      {passenger.nationality === 'SY' && 'Syrian'}
                      {passenger.nationality === 'LB' && 'Lebanese'}
                      {passenger.nationality === 'EG' && 'Egyptian'}
                      {passenger.nationality === 'JO' && 'Jordanian'}
                      {passenger.nationality === 'IQ' && 'Iraqi'}
                      {passenger.nationality === 'AE' && 'Emirati'}
                      {passenger.nationality === 'SA' && 'Saudi'}
                      {passenger.nationality === 'TR' && 'Turkish'}
                      {passenger.nationality === 'US' && 'American'}
                      {passenger.nationality === 'GB' && 'British'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {passenger.dateOfBirth?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden mb-10 shadow-md">
        <div className="bg-violet-50 px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-violet-900">Contact Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{contactInformation.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{contactInformation.phoneCode} {contactInformation.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <Button variant="outline" className="gap-2 rounded-full">
          <Printer className="h-4 w-4" />
          Print Confirmation
        </Button>
        <Button variant="outline" className="gap-2 rounded-full">
          <DownloadCloud className="h-4 w-4" />
          Download E-Ticket
        </Button>
        <Button variant="outline" className="gap-2 rounded-full">
          <FileText className="h-4 w-4" />
          View Invoice
        </Button>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 gap-2 rounded-full shadow-md"
        >
          <Home className="h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
