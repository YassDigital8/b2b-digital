
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ChevronLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import { ContactInformation } from '@/pages/InterlineBookingForm';
import { nationalities } from '@/components/interline/booking-form/passenger-details/NationalitySelect';

interface ContactInformationFormProps {
  contactInformation: ContactInformation;
  updateContactInformation: (data: Partial<ContactInformation>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ContactInformationForm = ({
  contactInformation,
  updateContactInformation,
  onBack,
  onSubmit,
  isSubmitting
}: ContactInformationFormProps) => {
  const phoneCodes = [
    { value: '+963', label: 'Syria (+963)' },
    { value: '+961', label: 'Lebanon (+961)' },
    { value: '+962', label: 'Jordan (+962)' },
    { value: '+964', label: 'Iraq (+964)' },
    { value: '+20', label: 'Egypt (+20)' },
    { value: '+971', label: 'UAE (+971)' },
    { value: '+966', label: 'Saudi Arabia (+966)' },
    { value: '+974', label: 'Qatar (+974)' },
    { value: '+90', label: 'Turkey (+90)' },
    { value: '+1', label: 'USA (+1)' },
  ];

  const handleSubmit = () => {
    // Simple validation
    if (!contactInformation.email) {
      toast.error('Please enter an email address');
      return;
    }
    
    if (!contactInformation.email.includes('@') || !contactInformation.email.includes('.')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!contactInformation.phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    if (!contactInformation.nationality) {
      toast.error('Please select your nationality');
      return;
    }
    
    // Submit the form
    onSubmit();
  };

  return (
    <div className="px-6 py-4 pb-6">
      <h2 className="text-xl font-semibold mb-4 text-chamDarkBlue">Contact Information</h2>
      <p className="text-gray-600 text-sm mb-6">
        Please provide contact details for booking confirmation and updates
      </p>
      
      <div className="space-y-5 max-w-xl mx-auto">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={contactInformation.email}
            onChange={(e) => updateContactInformation({ email: e.target.value })}
            placeholder="e.g. name@example.com"
            className="mt-1 border-chamBlue/20 focus:border-chamBlue"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="phoneCode">Country Code</Label>
            <Select
              value={contactInformation.phoneCode}
              onValueChange={(value) => updateContactInformation({ phoneCode: value })}
            >
              <SelectTrigger id="phoneCode" className="w-full mt-1 border-chamBlue/20 focus:border-chamBlue">
                <SelectValue placeholder="Select Code" />
              </SelectTrigger>
              <SelectContent>
                {phoneCodes.map((code) => (
                  <SelectItem key={code.value} value={code.value}>
                    {code.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={contactInformation.phoneNumber}
              onChange={(e) => updateContactInformation({ phoneNumber: e.target.value })}
              placeholder="e.g. 9XXXXXXXX"
              className="mt-1 border-chamBlue/20 focus:border-chamBlue"
            />
          </div>
        </div>
        
        {/* Nationality Selector */}
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select
            value={contactInformation.nationality}
            onValueChange={(value) => updateContactInformation({ nationality: value })}
          >
            <SelectTrigger id="nationality" className="w-full mt-1 border-chamBlue/20 focus:border-chamBlue">
              <SelectValue placeholder="Select Nationality" />
            </SelectTrigger>
            <SelectContent>
              {nationalities.map((nation) => (
                <SelectItem key={nation.value} value={nation.value}>
                  {nation.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
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
            type="button"
            className="bg-gradient-to-r from-chamGold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 rounded-full shadow-md"
            onClick={handleSubmit}
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
