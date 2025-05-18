
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, Send, UserRound } from 'lucide-react';
import { toast } from 'sonner';
import { ContactInformation } from '@/components/interline/booking-form/types';
import { useState, useEffect } from 'react';
import { allCities } from '@/components/interline/search-form/schema';

interface ContactInformationFormProps {
  contactInformation: ContactInformation;
  updateContactInformation: (data: Partial<ContactInformation>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

// Define cities data by country code
const citiesByCountry = {
  '+963': [ // Syria
    { city: 'Damascus', code: 'DAM' },
    { city: 'Aleppo', code: 'ALP' },
    { city: 'Latakia', code: 'LTK' },
    { city: 'Homs', code: 'HMO' },
    { city: 'Hama', code: 'HAM' },
    { city: 'Tartus', code: 'TRT' },
    { city: 'Qamishli', code: 'KAC' },
    { city: 'Deir ez-Zor', code: 'DEZ' },
  ],
  '+961': [ // Lebanon
    { city: 'Beirut', code: 'BEY' },
    { city: 'Tripoli', code: 'TRI' },
    { city: 'Sidon', code: 'SID' },
    { city: 'Tyre', code: 'TYR' },
    { city: 'Baalbek', code: 'BAL' },
  ],
  '+20': [ // Egypt
    { city: 'Cairo', code: 'CAI' },
    { city: 'Alexandria', code: 'ALY' },
    { city: 'Luxor', code: 'LXR' },
    { city: 'Aswan', code: 'ASW' },
    { city: 'Hurghada', code: 'HRG' },
  ],
  '+971': [ // UAE
    { city: 'Dubai', code: 'DXB' },
    { city: 'Abu Dhabi', code: 'AUH' },
    { city: 'Sharjah', code: 'SHJ' },
    { city: 'Ajman', code: 'AJM' },
    { city: 'Ras Al Khaimah', code: 'RKT' },
  ],
  '+966': [ // Saudi Arabia
    { city: 'Riyadh', code: 'RUH' },
    { city: 'Jeddah', code: 'JED' },
    { city: 'Mecca', code: 'MEC' },
    { city: 'Medina', code: 'MED' },
    { city: 'Dammam', code: 'DMM' },
  ],
  '+962': [ // Jordan
    { city: 'Amman', code: 'AMM' },
    { city: 'Zarqa', code: 'ZAR' },
    { city: 'Irbid', code: 'IRB' },
    { city: 'Aqaba', code: 'AQJ' },
  ],
  '+964': [ // Iraq
    { city: 'Baghdad', code: 'BGW' },
    { city: 'Basra', code: 'BSR' },
    { city: 'Mosul', code: 'OSM' },
    { city: 'Erbil', code: 'EBL' },
  ],
  '+974': [ // Qatar
    { city: 'Doha', code: 'DOH' },
    { city: 'Al Wakrah', code: 'AWK' },
    { city: 'Al Khor', code: 'AKH' },
  ],
  '+90': [ // Turkey
    { city: 'Istanbul', code: 'IST' },
    { city: 'Ankara', code: 'ANK' },
    { city: 'Antalya', code: 'AYT' },
    { city: 'Izmir', code: 'IZM' },
  ],
  '+1': [ // USA
    { city: 'New York', code: 'NYC' },
    { city: 'Los Angeles', code: 'LAX' },
    { city: 'Chicago', code: 'CHI' },
    { city: 'Houston', code: 'HOU' },
    { city: 'Miami', code: 'MIA' },
  ],
};

// Default to empty array for any country code not defined
const getCountryCities = (countryCode: string) => {
  return citiesByCountry[countryCode as keyof typeof citiesByCountry] || [];
};

const ContactInformationForm = ({
  contactInformation,
  updateContactInformation,
  onBack,
  onSubmit,
  isSubmitting
}: ContactInformationFormProps) => {
  const [availableCities, setAvailableCities] = useState<Array<{city: string, code: string}>>([]);

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

  // Update cities when country code changes
  useEffect(() => {
    const cities = getCountryCities(contactInformation.phoneCode);
    setAvailableCities(cities);
    
    // Reset city if current selection isn't in the new list
    if (contactInformation.city && cities.length > 0 && !cities.some(c => c.city === contactInformation.city)) {
      updateContactInformation({ city: '' });
    }
  }, [contactInformation.phoneCode, contactInformation.city, updateContactInformation]);

  const handleSubmit = () => {
    // Simple validation
    if (!contactInformation.firstName) {
      toast.error('Please enter your first name');
      return;
    }
    
    if (!contactInformation.lastName) {
      toast.error('Please enter your last name');
      return;
    }
    
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
    
    if (!contactInformation.city) {
      toast.error('Please select a city');
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
        {/* Gender Selection */}
        <div>
          <Label>Gender</Label>
          <RadioGroup 
            value={contactInformation.gender} 
            onValueChange={(value) => updateContactInformation({ gender: value as 'male' | 'female' })}
            className="flex flex-row gap-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="gender-male" />
              <Label htmlFor="gender-male" className="cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="gender-female" />
              <Label htmlFor="gender-female" className="cursor-pointer">Female</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={contactInformation.firstName}
              onChange={(e) => updateContactInformation({ firstName: e.target.value })}
              placeholder="Enter first name"
              className="mt-1 border-chamBlue/20 focus:border-chamBlue"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={contactInformation.lastName}
              onChange={(e) => updateContactInformation({ lastName: e.target.value })}
              placeholder="Enter last name"
              className="mt-1 border-chamBlue/20 focus:border-chamBlue"
            />
          </div>
        </div>
        
        {/* Email Address */}
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
        
        {/* Phone Number with Country Code */}
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
        
        {/* City Selector based on Country */}
        <div>
          <Label htmlFor="city">City</Label>
          <Select
            value={contactInformation.city}
            onValueChange={(value) => updateContactInformation({ city: value })}
          >
            <SelectTrigger id="city" className="w-full mt-1 border-chamBlue/20 focus:border-chamBlue">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent enableSearch>
              {availableCities.map((city) => (
                <SelectItem key={city.code} value={city.city}>
                  {city.city} ({city.code})
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
