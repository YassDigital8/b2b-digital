
import { 
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import DatePickerField from './DatePickerField';
import NationalitySelect from './NationalitySelect';
import { FormikProps } from 'formik';
import { getIn } from 'formik';

interface PassengerFormItemProps {
  index: number;
  formik: FormikProps<any>;
  openAccordion: string;
  setOpenAccordion: (value: string) => void;
}

const PassengerFormItem = ({ 
  index, 
  formik,
  openAccordion,
  setOpenAccordion
}: PassengerFormItemProps) => {
  
  const passenger = formik.values.passengers[index];
  
  const getFieldName = (field: string) => `passengers[${index}].${field}`;
  
  const getPassengerTitle = () => {
    const typeLabel = passenger.type === 'adult' ? 'Adult' : passenger.type === 'child' ? 'Child' : 'Infant';
    const idx = parseInt(passenger.id.split('-')[1]);
    return `${typeLabel} #${idx}`;
  };

  // Get error helper for nested objects in formik
  const getErrorMessage = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? error : undefined;
  };

  const hasErrors = () => {
    return Object.keys(formik.errors.passengers || {}).length > 0 && 
           formik.errors.passengers[index] !== undefined;
  };

  return (
    <AccordionItem 
      value={`passenger-${index}`}
      className="border rounded-xl overflow-hidden shadow-md mb-4 transition-all duration-300 hover:shadow-lg group"
    >
      <AccordionTrigger className={`px-4 py-3.5 hover:no-underline bg-gradient-to-r from-white to-blue-50/30 group-hover:from-slate-50 group-hover:to-blue-50/50 ${hasErrors() ? 'border-l-4 border-red-500' : ''}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 text-xs font-medium
              ${passenger.type === 'adult' 
                ? 'bg-chamBlue/15 text-chamBlue ring-1 ring-chamBlue/30' 
                : passenger.type === 'child' 
                  ? 'bg-green-100 text-green-700 ring-1 ring-green-300' 
                  : 'bg-pink-100 text-pink-700 ring-1 ring-pink-300'
              }`}>
              {passenger.type === 'adult' ? 'A' : passenger.type === 'child' ? 'C' : 'I'}
            </span>
            <span className="font-medium text-gray-900 font-display">
              {getPassengerTitle()}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {passenger.firstName && passenger.lastName 
              ? `${passenger.firstName} ${passenger.lastName}` 
              : 'Not completed'}
          </span>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="px-5 pt-5 pb-6 bg-gradient-to-br from-white to-blue-50/30">
        <div className="space-y-5">
          {/* Gender Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`${passenger.id}-gender`} className="text-sm font-medium text-gray-700">
                Gender*
              </Label>
              <Select 
                value={passenger.gender}
                onValueChange={(value) => {
                  formik.setFieldValue(getFieldName('gender'), value);
                }}
                name={getFieldName('gender')}
              >
                <SelectTrigger id={`${passenger.id}-gender`} className={`w-full mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm ${getErrorMessage(getFieldName('gender')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {getErrorMessage(getFieldName('gender')) && (
                <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('gender'))}</p>
              )}
            </div>
          </div>
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor={`${passenger.id}-firstName`} className="text-sm font-medium text-gray-700">
                First Name*
              </Label>
              <Input 
                id={`${passenger.id}-firstName`}
                name={getFieldName('firstName')}
                value={passenger.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm ${getErrorMessage(getFieldName('firstName')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="As in passport"
              />
              {getErrorMessage(getFieldName('firstName')) && (
                <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('firstName'))}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor={`${passenger.id}-lastName`} className="text-sm font-medium text-gray-700">
                Last Name*
              </Label>
              <Input 
                id={`${passenger.id}-lastName`}
                name={getFieldName('lastName')}
                value={passenger.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm ${getErrorMessage(getFieldName('lastName')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="As in passport"
              />
              {getErrorMessage(getFieldName('lastName')) && (
                <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('lastName'))}</p>
              )}
            </div>
          </div>
          
          {/* Date of Birth & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Date of Birth*
              </Label>
              <DatePickerField 
                id={`${passenger.id}-dob`}
                date={passenger.dateOfBirth}
                onSelect={(date) => {
                  formik.setFieldValue(getFieldName('dateOfBirth'), date);
                }}
                disableFuture={true}
                name={getFieldName('dateOfBirth')}
                error={getErrorMessage(getFieldName('dateOfBirth'))}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Nationality*
              </Label>
              <NationalitySelect 
                passengerId={passenger.id}
                value={passenger.nationality}
                onChange={(value) => {
                  formik.setFieldValue(getFieldName('nationality'), value);
                }}
                name={getFieldName('nationality')}
                error={getErrorMessage(getFieldName('nationality'))}
              />
            </div>
          </div>
          
          {/* Passport Information */}
          <div className="mt-6 mb-2">
            <h3 className="text-md font-medium text-chamBlue font-display flex items-center">
              <span className="bg-chamBlue/10 text-chamBlue h-6 w-6 rounded-full inline-flex items-center justify-center mr-2 text-xs">P</span>
              Passport Information
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor={`${passenger.id}-passport`} className="text-sm font-medium text-gray-700">
                Passport Number*
              </Label>
              <Input 
                id={`${passenger.id}-passport`}
                name={getFieldName('passportNumber')}
                value={passenger.passportNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm ${getErrorMessage(getFieldName('passportNumber')) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="Enter passport number"
              />
              {getErrorMessage(getFieldName('passportNumber')) && (
                <p className="text-xs text-red-500 mt-1">{getErrorMessage(getFieldName('passportNumber'))}</p>
              )}
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Expiry Date*
              </Label>
              <DatePickerField 
                id={`${passenger.id}-expiry-date`}
                date={passenger.passportExpiryDate}
                onSelect={(date) => {
                  formik.setFieldValue(getFieldName('passportExpiryDate'), date);
                }}
                disablePast={true}
                name={getFieldName('passportExpiryDate')}
                error={getErrorMessage(getFieldName('passportExpiryDate'))}
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PassengerFormItem;
