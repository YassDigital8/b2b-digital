
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
import { ChevronLeft, Send } from 'lucide-react';
import { FormikProps } from 'formik';
import { getIn } from 'formik';

interface ContactInformationFormProps {
  formik: FormikProps<any>;
  onBack: () => void;
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
  formik,
  onBack,
  isSubmitting
}: ContactInformationFormProps) => {
  const contactInfo = formik.values.contactInformation;
  const getFieldName = (field: string) => `contactInformation.${field}`;

  // Get error helper for nested objects in formik
  const getErrorMessage = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? error : undefined;
  };

  // Get available cities based on selected country code
  const availableCities = getCountryCities(contactInfo.phoneCode);

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

  return (
    <div className="px-6 py-4 pb-6">
      <h2 className="text-xl font-semibold mb-4 text-chamDarkBlue">Contact Information</h2>
      <p className="text-gray-600 text-sm mb-6">
        Please provide contact details for booking confirmation and updates
      </p>
      
      <div className="space-y-5 max-w-xl mx-auto">
        {/* Gender Selection */}
        <div>
          <Label>Gender*</Label>
          <RadioGroup 
            value={contactInfo.gender} 
            onValueChange={(value) => formik.setFieldValue(getFieldName('gender'), value)}
            name={getFieldName('gender')}
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
          {getErrorMessage(getFieldName('gender')) && (
            <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('gender'))}</p>
          )}
        </div>
        
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name*</Label>
            <Input
              id="firstName"
              name={getFieldName('firstName')}
              value={contactInfo.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter first name"
              className={`mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('firstName')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            />
            {getErrorMessage(getFieldName('firstName')) && (
              <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('firstName'))}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name*</Label>
            <Input
              id="lastName"
              name={getFieldName('lastName')}
              value={contactInfo.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter last name"
              className={`mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('lastName')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            />
            {getErrorMessage(getFieldName('lastName')) && (
              <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('lastName'))}</p>
            )}
          </div>
        </div>
        
        {/* Email Address */}
        <div>
          <Label htmlFor="email">Email Address*</Label>
          <Input
            id="email"
            type="email"
            name={getFieldName('email')}
            value={contactInfo.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g. name@example.com"
            className={`mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('email')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
          />
          {getErrorMessage(getFieldName('email')) && (
            <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('email'))}</p>
          )}
        </div>
        
        {/* Phone Number with Country Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="phoneCode">Country Code*</Label>
            <Select
              value={contactInfo.phoneCode}
              onValueChange={(value) => {
                formik.setFieldValue(getFieldName('phoneCode'), value);
                // If city is not available in the new country, reset it
                const cities = getCountryCities(value);
                if (contactInfo.city && cities.length > 0 && !cities.some(c => c.city === contactInfo.city)) {
                  formik.setFieldValue(getFieldName('city'), '');
                }
              }}
              name={getFieldName('phoneCode')}
            >
              <SelectTrigger 
                id="phoneCode" 
                className={`w-full mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('phoneCode')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              >
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
            {getErrorMessage(getFieldName('phoneCode')) && (
              <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('phoneCode'))}</p>
            )}
          </div>
          
          <div className="col-span-2">
            <Label htmlFor="phoneNumber">Phone Number*</Label>
            <Input
              id="phoneNumber"
              type="tel"
              name={getFieldName('phoneNumber')}
              value={contactInfo.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. 9XXXXXXXX"
              className={`mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('phoneNumber')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            />
            {getErrorMessage(getFieldName('phoneNumber')) && (
              <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('phoneNumber'))}</p>
            )}
          </div>
        </div>
        
        {/* City Selector based on Country */}
        <div>
          <Label htmlFor="city">City*</Label>
          <Select
            value={contactInfo.city}
            onValueChange={(value) => formik.setFieldValue(getFieldName('city'), value)}
            name={getFieldName('city')}
          >
            <SelectTrigger 
              id="city" 
              className={`w-full mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('city')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            >
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
          {getErrorMessage(getFieldName('city')) && (
            <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('city'))}</p>
          )}
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
