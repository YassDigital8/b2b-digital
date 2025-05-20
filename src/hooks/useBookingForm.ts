
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Passenger, ContactInformation } from '@/components/interline/booking-form/types';

// Default flight data for direct access
const defaultFlightData = {
  id: "TID$174731",
  segments: [
    {
      id: "6Q$DAM/KWI$131592$20250721150000$20250721170000",
      flightNumber: "6Q705",
      airline: "Cham Wings",
      airlineCode: "6Q",
      from: "Damascus",
      fromCode: "DAM",
      to: "Kuwait City",
      toCode: "KWI",
      departureTime: new Date("2025-07-21T15:00:00"),
      arrivalTime: new Date("2025-07-21T17:00:00"),
      duration: "2h 0m",
    }
  ],
  stops: 0,
  price: 391.95,
  seats: 1,
  cabin: "economy",
  transaction_id: "TID$174731",
  flight_type: "OneWay",
  company_name: "MCT46",
  pos: "sy",
  pricing_info: [
    {
      PaxType: "ADT",
      TotalFare: "391.95",
      TotalFareWithAdditional: "391.95"
    }
  ]
};

// Default travelers data
const defaultTravelersInfo = [
  {
    BirthDate: "2002-09-11",
    PassengerTypeCode: "ADT",
    GivenName: "LubnaTest12",
    Surname: "AAAAs",
    NameTitle: "MS",
    Telephone: {
      AreaCityCode: "6",
      CountryAccessCode: "91",
      PhoneNumber: "9409867697"
    },
    CountryCode: "AE",
    Document: {
      DocID: "GFHYG",
      ExpireDate: "2033-08-25"
    }
  }
];

// Default contact info
const defaultContactInfo = {
  Title: "Ms",
  FirstName: "LubnaTest21",
  LastName: "Halabyi",
  PhoneNumber: "987654321",
  CountryCode: "963",
  Email: "lubna@example.com",
  CountryName: "Syria",
  CityName: "Damascus"
};

// Mock booking response
const mockBookingResponse = {
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
        departure_date: "2025-06-21",
        departure_time: "18:00:00",
        arrival_date: "2025-06-21",
        arrival_time: "20:15:00",
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
        departure_date: "2025-06-15",
        departure_time: "10:30:00",
        arrival_date: "2025-06-15",
        arrival_time: "12:30:00",
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
        },
        passport_number: "GFHYG",
        passport_expiredate: "2033-08-25",
        phone_number: "9409867697"
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

export const useBookingForm = () => {
  const { user, requireAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Flight and passenger data from search
  const [flightData, setFlightData] = useState<any>(null);
  const [passengersCount, setPassengersCount] = useState({
    adults: 0,
    children: 0,
    infants: 0
  });
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactInformation, setContactInformation] = useState<ContactInformation>({
    gender: 'male',
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phoneCode: '+963',
    phoneNumber: '',
    city: ''
  });
  
  // Booking response
  const [bookingResponse, setBookingResponse] = useState<any>(null);
  
  // Initialize from state passed from search page or use default data
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (!isAuthenticated) return;
    
    const state = location.state;
    
    // If we have state data from the previous page
    if (state && state.flightData && state.passengers) {
      setFlightData(state.flightData);
      setPassengersCount(state.passengers);
      
      // Initialize passenger forms based on counts from state
      initializePassengers(state.passengers);
    } 
    // Use default data if no state was passed
    else {
      // Set default flight data
      setFlightData(defaultFlightData);
      
      // Set passenger count based on default data
      setPassengersCount({
        adults: 1,
        children: 0,
        infants: 0
      });
      
      // Initialize passengers based on default travelers info
      initializeDefaultPassengers();
      
      // Set default contact information
      setContactInformation({
        gender: defaultContactInfo.Title.toLowerCase() === 'ms' ? 'female' : 'male',
        firstName: defaultContactInfo.FirstName,
        lastName: defaultContactInfo.LastName,
        email: defaultContactInfo.Email,
        phoneCode: `+${defaultContactInfo.CountryCode}`,
        phoneNumber: defaultContactInfo.PhoneNumber,
        city: defaultContactInfo.CityName
      });
    }
  }, [location.state, navigate, requireAuth, user]);
  
  // Initialize passengers based on counts
  const initializePassengers = (counts: {adults: number, children: number, infants: number}) => {
    const initialPassengers: Passenger[] = [];
    
    // Create forms for adults
    for (let i = 0; i < counts.adults; i++) {
      initialPassengers.push({
        id: `adult-${i + 1}`,
        type: 'adult',
        gender: 'male',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        passportNumber: '',
        passportExpiryDate: null,
        nationality: ''
      });
    }
    
    // Create forms for children
    for (let i = 0; i < counts.children; i++) {
      initialPassengers.push({
        id: `child-${i + 1}`,
        type: 'child',
        gender: 'male',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        passportNumber: '',
        passportExpiryDate: null,
        nationality: ''
      });
    }
    
    // Create forms for infants
    for (let i = 0; i < counts.infants; i++) {
      initialPassengers.push({
        id: `infant-${i + 1}`,
        type: 'infant',
        gender: 'male',
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        passportNumber: '',
        passportExpiryDate: null,
        nationality: ''
      });
    }
    
    setPassengers(initialPassengers);
  };
  
  // Initialize passengers based on default travelers info
  const initializeDefaultPassengers = () => {
    const initialPassengers: Passenger[] = defaultTravelersInfo.map((traveler, index) => {
      const passengerType = traveler.PassengerTypeCode.toLowerCase() === 'adt' ? 'adult' : 
                            traveler.PassengerTypeCode.toLowerCase() === 'chd' ? 'child' : 'infant';
      
      // Determine gender from NameTitle
      // MSTR is for male infant or child, MR for adult male
      // MISS is for female infant or child, MS for adult female
      const gender = ['MS', 'MISS'].includes(traveler.NameTitle) ? 'female' : 'male';
      
      const birthDate = new Date(traveler.BirthDate);
      const passportExpiryDate = traveler.Document?.ExpireDate ? new Date(traveler.Document.ExpireDate) : null;
      
      return {
        id: `${passengerType}-${index + 1}`,
        type: passengerType as 'adult' | 'child' | 'infant',
        gender: gender as 'male' | 'female',
        firstName: traveler.GivenName,
        lastName: traveler.Surname,
        dateOfBirth: birthDate,
        passportNumber: traveler.Document?.DocID || '',
        passportExpiryDate: passportExpiryDate,
        nationality: traveler.CountryCode || ''
      };
    });
    
    setPassengers(initialPassengers);
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const updatePassenger = (index: number, data: Partial<Passenger>) => {
    setPassengers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...data };
      return updated;
    });
  };
  
  const updateContactInformation = (data: Partial<ContactInformation>) => {
    setContactInformation(prev => ({ ...prev, ...data }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For now, let's simulate a successful booking with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set the mock booking response
      setBookingResponse(mockBookingResponse);
      
      // Simulate successful booking
      toast.success('Booking completed successfully!', {
        description: 'You will receive a confirmation email shortly.'
      });
      
      // Move to confirmation step
      nextStep();
    } catch (error) {
      toast.error('Failed to complete booking', {
        description: 'Please try again or contact customer support.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    flightData,
    passengersCount,
    currentStep,
    isSubmitting,
    passengers,
    contactInformation,
    bookingResponse,
    nextStep,
    prevStep,
    updatePassenger,
    updateContactInformation,
    handleSubmit
  };
};
