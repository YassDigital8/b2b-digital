
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import BookingSteps from '@/components/interline/booking-form/BookingSteps';
import { PassengerFormItem } from './PassengerFormItem';
import { Button } from '@/components/ui/button';
import { PassengerCounts, PassengerDetails } from './types';
import { validatePassengers } from './validatePassengers';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

interface PassengerDetailsFormProps {
  passengers: PassengerCounts;
  onSubmit: (passengers: PassengerDetails[]) => void;
  onCancel: () => void;
}

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  passengers,
  onSubmit,
  onCancel,
}) => {
  const [passengerDetails, setPassengerDetails] = React.useState<PassengerDetails[]>(
    [...Array(passengers.adults)].map((_, i) => ({
      type: 'adult',
      firstName: '',
      lastName: '',
      gender: 'male',
      dateOfBirth: '',
      nationality: 'SY',
      passportNumber: '',
      passportExpiry: '',
    }))
    .concat(
      [...Array(passengers.children)].map(() => ({
        type: 'child',
        firstName: '',
        lastName: '',
        gender: 'male',
        dateOfBirth: '',
        nationality: 'SY',
        passportNumber: '',
        passportExpiry: '',
      }))
    )
    .concat(
      [...Array(passengers.infants)].map(() => ({
        type: 'infant',
        firstName: '',
        lastName: '',
        gender: 'male',
        dateOfBirth: '',
        nationality: 'SY',
        passportNumber: '',
        passportExpiry: '',
      }))
    )
  );

  const updatePassenger = (index: number, field: keyof PassengerDetails, value: string) => {
    const updated = [...passengerDetails];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerDetails(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the passenger details
    const validation = validatePassengers(passengerDetails);
    
    if (!validation.valid) {
      toast.error('Please complete all passenger details', {
        description: validation.errors.join(', ')
      });
      return;
    }
    
    onSubmit(passengerDetails);
  };

  return (
    <Card className="shadow-md bg-white">
      <BookingSteps currentStep={1} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-chamDarkBlue mb-2">Passenger Details</h2>
          <p className="text-gray-600">Please enter the details for each passenger as they appear on their travel documents.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {passengerDetails.map((passenger, index) => (
            <motion.div
              key={`passenger-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PassengerFormItem
                passenger={passenger}
                index={index}
                updatePassenger={(field, value) => updatePassenger(index, field, value)}
                className="bg-gray-50 border border-gray-100 rounded-lg p-6"
              />
            </motion.div>
          ))}
          
          <div className="flex justify-between pt-6 border-t">
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-chamBlue hover:bg-chamBlue/90 text-white gap-2"
            >
              Continue
              <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </motion.div>
    </Card>
  );
};

export default PassengerDetailsForm;
