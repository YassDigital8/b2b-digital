
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import BookingSteps from '@/components/interline/booking-form/BookingSteps';
import PassengerFormItem from './PassengerFormItem';
import { Button } from '@/components/ui/button';
import { Passenger } from '@/components/interline/booking-form/types';
import { validateAllPassengers } from './validatePassengers';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import { PassengerDetailsFormProps } from './types';
import { Accordion } from '@/components/ui/accordion';

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  passengers,
  updatePassenger,
  onNext,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string>('passenger-0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the passenger details
    if (validateAllPassengers(passengers, setOpenAccordion)) {
      onNext();
    }
  };

  return (
    <Card className="shadow-lg bg-white rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold gradient-text mb-2 font-display">Passenger Details</h2>
          <p className="text-gray-600">Please enter the details for each passenger as they appear on their travel documents.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Accordion type="single" value={openAccordion} onValueChange={setOpenAccordion} collapsible>
            {passengers?.map((passenger, index) => (
              <motion.div
                key={`passenger-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PassengerFormItem
                  passenger={passenger}
                  index={index}
                  updatePassenger={updatePassenger}
                  openAccordion={openAccordion}
                  setOpenAccordion={setOpenAccordion}
                />
              </motion.div>
            ))}
          </Accordion>

          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-chamBlue to-blue-500 hover:from-blue-600 hover:to-blue-500 text-white gap-2 rounded-full shadow-button"
            >
              Continue
              <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default PassengerDetailsForm;
