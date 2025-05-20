
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Passenger, ContactInformation } from '@/components/interline/booking-form/types';
import { useDispatch } from 'react-redux';
import { bookSessionsService } from '@/redux/services/posService';
import { useAppSelector } from '@/redux/useAppSelector';

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
    BirthDate: "",
    PassengerTypeCode: "",
    GivenName: "",
    Surname: "",
    NameTitle: "MR",
    Telephone: {
      AreaCityCode: "6",
      CountryAccessCode: "91",
      PhoneNumber: "9409867697"
    },
    CountryCode: "",
    Document: {
      DocID: "",
      ExpireDate: ""
    }
  }
];

// Default contact info
const defaultContactInfo = {
  Title: "",
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  CountryCode: "963",
  Email: "",
  CountryName: "",
  CityName: ""
};


export const useBookingForm = () => {
  const dispatch = useDispatch()
  const { selectedFlight, passengersInfo, flight_type } = useAppSelector(state => state.pos)
  const { travelAgent } = useAppSelector(state => state.auth)
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
      // setFlightData(state.flightData);
      setPassengersCount(state.passengers);

      // Initialize passenger forms based on counts from state
      initializePassengers(state.passengers);
    }
    // Use default data if no state was passed
    else {
      // Set default flight data
      // setFlightData(defaultFlightData);
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
  const initializePassengers = (counts: { adults: number, children: number, infants: number }) => {
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
    console.log('passengersInfo',passengersInfo);
    
    const dataToSend = {
      transaction_id: selectedFlight?.transaction_id,
      segments: selectedFlight?.segments,
      travelers: selectedFlight?.travelers,
      travelers_info: passengersInfo.map((passenger) => ({
        ...passenger,
        BirthDate: passenger.BirthDate
          ? new Date(passenger.BirthDate).toISOString().split('T')[0]
          : null,
        Document: passenger.Document
          ? {
            ...passenger.Document,
            ExpireDate: passenger.Document.ExpireDate
              ? new Date(passenger.Document.ExpireDate).toISOString().split('T')[0]
              : null,
          }
          : null,
      })), contact_info: {
        Title: contactInformation.gender, 
        FirstName: contactInformation.firstName,
        LastName: contactInformation.lastName,
        PhoneNumber: contactInformation.phoneNumber,
        CountryCode: contactInformation.phoneCode,
        Email: contactInformation.email,
        CountryName: 'Syria',
        CityName: contactInformation.city
      },
      cw_payment_amount: selectedFlight?.cw_total_fare,
      pricing_info: selectedFlight?.pricing_info,
      flight_type,
      pos: travelAgent?.value?.pos,
      on_account: travelAgent?.value?.travelAgentNameISA,
      company_name: 'MCT46',
    }
    dispatch(bookSessionsService({ data: dataToSend })).then((action) => {
      if (bookSessionsService.fulfilled.match(action)) {
        toast.success('Booking completed successfully!', {
          description: 'You will receive a confirmation email shortly.'
        });
        nextStep();
        setIsSubmitting(false);
      }
    })

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
