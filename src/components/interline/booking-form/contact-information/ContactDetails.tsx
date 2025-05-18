
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FormikProps } from 'formik';
import { getIn } from 'formik';

interface ContactDetailsProps {
  formik: FormikProps<any>;
}

const ContactDetails = ({ formik }: ContactDetailsProps) => {
  const contactInfo = formik.values.contactInformation;
  const getFieldName = (field: string) => `contactInformation.${field}`;

  const getErrorMessage = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? error : undefined;
  };

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
    <>
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
    </>
  );
};

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
export const getCountryCities = (countryCode: string) => {
  return citiesByCountry[countryCode as keyof typeof citiesByCountry] || [];
};

export default ContactDetails;
