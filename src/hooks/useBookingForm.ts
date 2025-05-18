
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
    nextStep,
    prevStep,
    updatePassenger,
    updateContactInformation,
    handleSubmit
  };
};
