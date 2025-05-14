
import { useState } from 'react';
import { 
  Accordion
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import PassengerFormItem from './PassengerFormItem';
import { validateAllPassengers } from './validatePassengers';
import { PassengerDetailsFormProps } from './types';

const PassengerDetailsForm = ({ 
  passengers, 
  updatePassenger,
  onNext 
}: PassengerDetailsFormProps) => {
  const [openAccordion, setOpenAccordion] = useState<string>("passenger-0");

  const handleNext = () => {
    // Validate all passenger forms before proceeding
    const isValid = validateAllPassengers(passengers, setOpenAccordion);
    
    if (isValid) {
      onNext();
    }
  };
  
  return (
    <div className="px-6 py-4 pb-6">
      <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
      
      <Accordion 
        type="single" 
        collapsible
        value={openAccordion}
        onValueChange={setOpenAccordion}
        className="space-y-4"
      >
        {passengers.map((passenger, index) => (
          <PassengerFormItem
            key={passenger.id}
            passenger={passenger}
            index={index}
            updatePassenger={updatePassenger}
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
          />
        ))}
      </Accordion>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleNext}
          className="bg-chamBlue hover:bg-chamDarkBlue text-white font-medium px-6"
        >
          Continue to Contact Information
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetailsForm;
