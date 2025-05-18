
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormikProps } from 'formik';
import { getIn } from 'formik';

interface GenderSelectorProps {
  gender: string;
  onChange: (value: string) => void;
  formik: FormikProps<any>;
}

const GenderSelector = ({ gender, onChange, formik }: GenderSelectorProps) => {
  const getErrorMessage = (fieldName: string) => {
    const error = getIn(formik.errors, fieldName);
    const touched = getIn(formik.touched, fieldName);
    return touched && error ? error : undefined;
  };

  return (
    <div>
      <Label>Gender*</Label>
      <RadioGroup 
        value={gender} 
        onValueChange={onChange}
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
      {getErrorMessage('contactInformation.gender') && (
        <p className="text-xs text-red-500 mt-1">{getErrorMessage('contactInformation.gender')}</p>
      )}
    </div>
  );
};

export default GenderSelector;
