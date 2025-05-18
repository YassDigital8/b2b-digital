
import React from 'react';
import { motion } from 'framer-motion';
import PassengerFormItem from './PassengerFormItem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import { FormikProps } from 'formik';
import { Accordion, AccordionItem } from '@/components/ui/accordion';

interface PassengerDetailsFormProps {
  formik: FormikProps<any>;
  onNext: () => void;
}

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  formik,
  onNext,
}) => {
  const [openAccordion, setOpenAccordion] = React.useState<string>('passenger-0');

  const handleSubmit = async () => {
    // Validate just the passengers part of the form
    try {
      await formik.validateForm();
      
      // Check if there are any errors in the passengers array
      const hasErrors = formik.errors.passengers && 
        (Array.isArray(formik.errors.passengers) || Object.keys(formik.errors.passengers).length > 0);
      
      if (hasErrors) {
        // Find the first passenger with errors
        if (Array.isArray(formik.errors.passengers)) {
          const errorIndex = formik.errors.passengers.findIndex(error => error && Object.keys(error).length > 0);
          if (errorIndex >= 0) {
            setOpenAccordion(`passenger-${errorIndex}`);
            
            // Show toast with error
            const errorMessages = Object.values(formik.errors.passengers[errorIndex] || {});
            if (errorMessages.length > 0) {
              toast.error(`Please fix the errors: ${errorMessages[0]}`);
            }
            return;
          }
        }
        toast.error("Please complete all required passenger information");
        return;
      }
      
      toast.success("Passenger details saved", {
        description: "Moving to contact information"
      });
      onNext();
    } catch (error) {
      toast.error("Please complete all required passenger information");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50/30">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-chamDarkBlue mb-2 font-display">Passenger Details</h2>
        <p className="text-gray-600">Please enter the details for each passenger as they appear on their travel documents.</p>
      </div>
      
      <div className="space-y-8">
        <Accordion type="single" value={openAccordion} onValueChange={setOpenAccordion} collapsible>
          {formik.values.passengers.map((passenger: any, index: number) => (
            <motion.div
              key={`passenger-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PassengerFormItem
                index={index}
                formik={formik}
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
              />
            </motion.div>
          ))}
        </Accordion>
        
        <motion.div 
          className="flex justify-between pt-6 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            type="button" 
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 rounded-full shadow-sm hover:shadow transition-all duration-300"
          >
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-chamGold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white gap-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Continue
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PassengerDetailsForm;
