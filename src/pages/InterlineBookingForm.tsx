import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingSteps from '@/components/interline/booking-form/BookingSteps';
import PassengerDetailsForm from '@/components/interline/booking-form/passenger-details';
import ContactInformationForm from '@/components/interline/booking-form/ContactInformationForm';
import BookingConfirmation from '@/components/interline/booking-form/BookingConfirmation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  passportNumber: string;
  passportIssueDate: Date | null;
  passportExpiryDate: Date | null;
  nationality: string;
}

export interface ContactInformation {
  email: string;
  phoneCode: string;
  phoneNumber: string;
}

const InterlineBookingForm = () => {
  const { user, requireAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
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
    phoneNumber: ''
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
        passportIssueDate: null,
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
        passportIssueDate: null,
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
        passportIssueDate: null,
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
  
  if (!flightData) {
    return null; // Could show a loading state or redirect
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Simplified header */}
      <div className="h-32 bg-gradient-to-r from-chamDarkBlue to-chamBlue relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-2xl font-semibold">Complete Your Booking</h1>
            <p className="text-white/80 text-sm mt-1">
              {flightData.segments[0].from} to {flightData.segments[flightData.segments.length-1].to}
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pb-12">
        <div className="container mx-auto px-4 -mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6"
          >
            <Card className="border-none shadow-md overflow-visible">
              <CardContent className="p-0">
                <BookingSteps currentStep={currentStep} />
                
                {currentStep === 1 && (
                  <PassengerDetailsForm 
                    passengers={passengers}
                    updatePassenger={updatePassenger}
                    onNext={nextStep}
                  />
                )}
                
                {currentStep === 2 && (
                  <ContactInformationForm 
                    contactInformation={contactInformation}
                    updateContactInformation={updateContactInformation}
                    onBack={prevStep}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
                
                {currentStep === 3 && (
                  <BookingConfirmation 
                    flightData={flightData}
                    passengers={passengers}
                    contactInformation={contactInformation}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterlineBookingForm;
