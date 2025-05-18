
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormikProps } from 'formik';
import { getIn } from 'formik';

interface PersonalInfoProps {
  formik: FormikProps<any>;
}

const PersonalInfo = ({ formik }: PersonalInfoProps) => {
  const contactInfo = formik.values.contactInformation;
  
  const getFieldName = (field: string) => `contactInformation.${field}`;

  const getErrorMessage = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? error : undefined;
  };

  return (
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
  );
};

export default PersonalInfo;
