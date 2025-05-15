
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Passenger, ContactInformation } from '@/components/interline/booking-form/types';

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
    email: user?.email || '',
    phoneCode: '+963',
    phoneNumber: '',
    nationality: ''
  });
  
  // Initialize from state passed from search page
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (!isAuthenticated) return;
    
    const state = location.state;
    if (!state || !state.flightData || !state.passengers) {
      toast.error('Booking information is missing', {
        description: 'Please select a flight first'
      });
      navigate('/interline');
      return;
    }
    
    setFlightData(state.flightData);
    setPassengersCount(state.passengers);
    
    // Initialize passenger forms based on counts
    const initialPassengers: Passenger[] = [];
    
    // Create forms for adults
    for (let i = 0; i < state.passengers.adults; i++) {
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
    for (let i = 0; i < state.passengers.children; i++) {
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
    for (let i = 0; i < state.passengers.infants; i++) {
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
  }, [location.state, navigate, requireAuth, user]);
  
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
