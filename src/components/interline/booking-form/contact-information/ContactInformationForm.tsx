
import { Button } from '@/components/ui/button';
import { ChevronLeft, Send } from 'lucide-react';
import { FormikProps } from 'formik';
import GenderSelector from './GenderSelector';
import PersonalInfo from './PersonalInfo';
import ContactDetails from './ContactDetails';
import LocationSelector from './LocationSelector';

interface ContactInformationFormProps {
  formik: FormikProps<any>;
  onBack: () => void;
  isSubmitting: boolean;
}

const ContactInformationForm = ({
  formik,
  onBack,
  isSubmitting
}: ContactInformationFormProps) => {
  const contactInfo = formik.values.contactInformation;

  return (
    <div className="px-6 py-4 pb-6">
      <h2 className="text-xl font-semibold mb-4 text-chamDarkBlue">Contact Information</h2>
      <p className="text-gray-600 text-sm mb-6">
        Please provide contact details for booking confirmation and updates
      </p>
      
      <div className="space-y-5 max-w-xl mx-auto">
        {/* Gender Selection */}
        <GenderSelector 
          gender={contactInfo.gender}
          onChange={(value) => formik.setFieldValue('contactInformation.gender', value)}
          formik={formik}
        />
        
        {/* Personal Information */}
        <PersonalInfo formik={formik} />
        
        {/* Contact Details */}
        <ContactDetails formik={formik} />
        
        {/* Location Selection */}
        <LocationSelector formik={formik} />
        
        <div className="pt-6 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="border-gray-300 hover:bg-gray-50 rounded-full"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Passenger Details
          </Button>
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-chamGold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 rounded-full shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : (
              <>
                Complete Booking
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;
