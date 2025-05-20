
import { CheckCircle, UserRound, Ticket, Calendar, Clock, MapPin, CreditCard, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { Passenger, ContactInformation } from '@/components/interline/booking-form/types';

interface BookingConfirmationProps {
  flightData: any;
  passengers: Passenger[];
  contactInformation: ContactInformation;
}

// Sample API response structure for the confirmed booking
interface FlightSegment {
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_datetime: string;
  arrival_datetime: string;
  res_cabin_class: string;
  status: string;
  duration: string;
  airline: string;
}

interface TaxOrFee {
  name?: string;
  amount: number;
  code: string;
  description?: string;
}

interface PassengerFare {
  base_fare: number;
  total_fare: number;
  taxes: TaxOrFee[];
  fees: TaxOrFee[];
  total_taxes: number;
  total_fees: number;
}

interface PassengerInfo {
  type: string;
  given_name: string;
  surname: string;
  title: string;
  passport_id: string;
  passport_number: string;
  passport_expiredate: string;
  phone_number: string;
  e_ticket: {
    number: string;
    status: string;
    used_status: string;
  };
  fare: PassengerFare;
}

interface TotalFareSummary {
  base_fare: number;
  total_fare: number;
  total_equiv_fare: number;
  currency: string;
  taxes: TaxOrFee[];
  fees: TaxOrFee[];
}

interface PaymentInfo {
  agency_code: string;
  agency_name: string;
  payment_amount: number;
  payment_currency: string;
  pay_currency_equiv: number;
  pay_currency_code: string;
}

interface ContactInfo {
  Title: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  CountryCode: string;
  Email: string;
  CountryName: string;
  CityName: string;
}

interface TicketingStatus {
  status_code: string;
  advisory: string;
}

interface BookingResponse {
  fly_cham: {
    pnr: string;
    flight_segments: FlightSegment[];
    total_fare_summary: TotalFareSummary;
    passengers: PassengerInfo[];
    payment: PaymentInfo;
    ticketing_status: TicketingStatus;
    contatct_info: ContactInfo;
  };
  air_ariba: any[];
}

// Mock response for testing - this would normally come from the API
const mockBookingResponse: BookingResponse = {
  fly_cham: {
    pnr: "0R4GD6",
    flight_segments: [
      {
        flight_number: "6Q706",
        departure_airport: "KWI",
        arrival_airport: "DAM",
        departure_datetime: "2025-06-21T18:00:00",
        arrival_datetime: "2025-06-21T20:15:00",
        res_cabin_class: "Y",
        status: "35",
        duration: "2h 15m",
        airline: "Cham Wings Airlines"
      },
      {
        flight_number: "6Q701",
        departure_airport: "DAM",
        arrival_airport: "KWI",
        departure_datetime: "2025-06-15T10:30:00",
        arrival_datetime: "2025-06-15T12:30:00",
        res_cabin_class: "Y",
        status: "35",
        duration: "2h 0m",
        airline: "Cham Wings Airlines"
      }
    ],
    total_fare_summary: {
      base_fare: 258.35,
      total_fare: 519.5,
      total_equiv_fare: 201,
      currency: "OMR",
      taxes: [
        {
          amount: 51.15,
          code: "TOTALTAX"
        }
      ],
      fees: [
        {
          amount: 210,
          code: "TOTALFEE"
        }
      ]
    },
    passengers: [
      {
        type: "ADT",
        given_name: "Luewllr",
        surname: "AAAAs",
        title: "MS",
        passport_id: "GFHYG",
        passport_number: "GFHYG",
        passport_expiredate: "2033-08-25",
        phone_number: "9409867697",
        e_ticket: {
          number: "3862304406288",
          status: "O",
          used_status: "UNUSED"
        },
        fare: {
          base_fare: 258.35,
          total_fare: 519.5,
          taxes: [
            {
              name: "KWA Kuwait Airport Arrival",
              amount: 6.46,
              code: "TAX"
            },
            {
              name: "Passenger Service Fee",
              amount: 15,
              code: "TAX"
            },
            {
              name: "(FY) Syria Departure Tax",
              amount: 1.69,
              code: "TAX"
            },
            {
              name: "SCAA Security Charge",
              amount: 7,
              code: "TAX"
            },
            {
              name: "Kuwait Passenger Service Charg",
              amount: 0.8,
              code: "TAX"
            },
            {
              name: "Kuwait Passenger Service Charg",
              amount: 0.8,
              code: "TAX"
            },
            {
              name: "(KW) Kuwait Airport Departure",
              amount: 16.16,
              code: "TAX"
            },
            {
              name: "Kuwait Airport Service Charge",
              amount: 3.24,
              code: "TAX"
            }
          ],
          fees: [
            {
              amount: 25,
              code: "SUR",
              description: "RB05 RB Royalty"
            },
            {
              amount: 30,
              code: "SUR",
              description: "PTA DAM Out stations"
            },
            {
              amount: 5,
              code: "SUR",
              description: "RB Summer Surcharge"
            },
            {
              amount: 60,
              code: "SUR",
              description: "Cham Wings Surcharge"
            },
            {
              amount: 60,
              code: "SUR",
              description: "Cham Wings Surcharge"
            },
            {
              amount: 5,
              code: "SUR",
              description: "RB Summer Surcharge"
            },
            {
              amount: 25,
              code: "SUR",
              description: "RB05 RB Royalty"
            }
          ],
          total_taxes: 51.15,
          total_fees: 210
        }
      }
    ],
    payment: {
      agency_code: "MCT46",
      agency_name: "MCT46",
      payment_amount: 519.5,
      payment_currency: "USD",
      pay_currency_equiv: 201,
      pay_currency_code: "OMR"
    },
    ticketing_status: {
      status_code: "3",
      advisory: "Reservation is fully paid and confirmed."
    },
    contatct_info: {
      Title: "Ms",
      FirstName: "LukbnaTestsdff24lm01",
      LastName: "Halabyi",
      PhoneNumber: "987654321",
      CountryCode: "963",
      Email: "lubna@example.com",
      CountryName: "Syria",
      CityName: "Damascus"
    }
  },
  air_ariba: []
};

const BookingConfirmation = ({
  flightData,
  passengers,
  contactInformation
}: BookingConfirmationProps) => {
  const navigate = useNavigate();
  
  // In a real app, this would come from an API call when booking is confirmed
  const bookingResponse = mockBookingResponse; 
  const { fly_cham } = bookingResponse;
  
  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="px-6 py-4 pb-6">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <div className="bg-green-100 p-4 mb-4 rounded-full">
          <CheckCircle size={50} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-green-700 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Your booking has been confirmed. A confirmation email has been sent to {fly_cham.contatct_info.Email}.
        </p>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 w-full max-w-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-700 mb-1">PNR / Booking Reference</p>
              <div className="text-2xl font-mono font-semibold text-chamDarkBlue tracking-wider">
                {fly_cham.pnr}
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200 text-sm py-1.5">
              {fly_cham.ticketing_status.status_code === "3" ? "Confirmed" : "Pending"}
            </Badge>
          </div>
        </div>
      </div>
      
      <Alert className="bg-blue-50 border-blue-100 mb-6">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          {fly_cham.ticketing_status.advisory}
        </AlertDescription>
      </Alert>
      
      {/* Flight Details */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <h3 className="font-medium">Flight Details</h3>
        </div>
        <div className="p-4">
          {fly_cham.flight_segments.map((segment, index) => (
            <div key={index} className={`${index > 0 ? 'mt-6 pt-6 border-t' : ''}`}>
              <div className="flex items-center mb-3">
                <Badge className="mr-2 bg-violet-100 text-violet-800 hover:bg-violet-100 border-violet-200">
                  {index === 0 ? 'Return' : 'Outbound'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {new Date(segment.departure_datetime).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-bold text-lg">{segment.departure_airport}</span>
                    <div className="mx-2 flex-1 border-t border-dashed border-gray-300 relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs text-gray-500">
                        {segment.duration}
                      </div>
                    </div>
                    <span className="font-bold text-lg">{segment.arrival_airport}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatDate(segment.departure_datetime)}</span>
                    <span>{formatDate(segment.arrival_datetime)}</span>
                  </div>
                </div>
                
                <div className="border-l pl-4 md:w-1/4 flex flex-col">
                  <div className="text-sm text-gray-500">Flight</div>
                  <div className="font-medium">{segment.flight_number}</div>
                  <div className="text-xs text-gray-500">{segment.airline}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* E-Ticket */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3 flex items-center">
          <Ticket className="h-4 w-4 mr-2" />
          <h3 className="font-medium">E-Ticket Details</h3>
        </div>
        <div className="p-4">
          {fly_cham.passengers.map((passenger, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {passenger.title === 'MS' ? 'Ms.' : 'Mr.'} {passenger.given_name} {passenger.surname}
                </span>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  {passenger.e_ticket.used_status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">E-Ticket Number</p>
                  <p className="font-mono">{passenger.e_ticket.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Passenger Type</p>
                  <p>{passenger.type === 'ADT' ? 'Adult' : passenger.type === 'CHD' ? 'Child' : 'Infant'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment Details */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3 flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          <h3 className="font-medium">Payment Details</h3>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Agency</p>
              <p>{fly_cham.payment.agency_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Currency</p>
              <p>{fly_cham.payment.payment_currency}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Base Fare</span>
                  <span>${fly_cham.total_fare_summary.base_fare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taxes & Fees</span>
                  <span>${(fly_cham.total_fare_summary.taxes[0].amount + fly_cham.total_fare_summary.fees[0].amount).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-lg text-amber-600">
                  ${fly_cham.total_fare_summary.total_fare.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-right">
                Equivalent to {fly_cham.total_fare_summary.total_equiv_fare} {fly_cham.total_fare_summary.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-chamBlue text-white px-4 py-3 flex items-center">
          <UserRound className="h-4 w-4 mr-2" />
          <h3 className="font-medium">Contact Information</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <UserRound className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium">
              {fly_cham.contatct_info.Title === 'Ms' ? 'Ms.' : 'Mr.'} {fly_cham.contatct_info.FirstName} {fly_cham.contatct_info.LastName}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{fly_cham.contatct_info.Email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>+{fly_cham.contatct_info.CountryCode} {fly_cham.contatct_info.PhoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p>{fly_cham.contatct_info.CountryName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">City</p>
              <p>{fly_cham.contatct_info.CityName}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
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
