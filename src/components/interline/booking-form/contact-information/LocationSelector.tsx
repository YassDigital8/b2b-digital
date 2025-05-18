
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
import { getCountryCities } from './ContactDetails';

interface LocationSelectorProps {
  formik: FormikProps<any>;
}

const LocationSelector = ({ formik }: LocationSelectorProps) => {
  const contactInfo = formik.values.contactInformation;
  const getFieldName = (field: string) => `contactInformation.${field}`;

  const getErrorMessage = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? error : undefined;
  };

  // Get available cities based on selected country code
  const availableCities = getCountryCities(contactInfo.phoneCode);

  return (
    <div>
      <Label htmlFor="city">City*</Label>
      <Select
        value={contactInfo.city}
        onValueChange={(value) => formik.setFieldValue(getFieldName('city'), value)}
      >
        <SelectTrigger 
          id="city" 
          className={`w-full mt-1 border-chamBlue/20 focus:border-chamBlue ${getErrorMessage(getFieldName('city')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
        >
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
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
  );
};

export default LocationSelector;
