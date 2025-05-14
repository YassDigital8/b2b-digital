
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
import { PassengerFormItemProps } from './types';

const PassengerFormItem = ({ 
  passenger, 
  index, 
  updatePassenger, 
  openAccordion,
  setOpenAccordion
}: PassengerFormItemProps) => {
  
  const getPassengerTitle = () => {
    const typeLabel = passenger.type === 'adult' ? 'Adult' : passenger.type === 'child' ? 'Child' : 'Infant';
    const idx = parseInt(passenger.id.split('-')[1]);
    return `${typeLabel} #${idx}`;
  };

  return (
    <AccordionItem 
      value={`passenger-${index}`}
      className="border rounded-lg overflow-hidden shadow-sm"
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gray-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs
              ${passenger.type === 'adult' 
                ? 'bg-blue-100 text-blue-700' 
                : passenger.type === 'child' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
              {passenger.type === 'adult' ? 'A' : passenger.type === 'child' ? 'C' : 'I'}
            </span>
            <span className="font-medium text-gray-900">
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
      
      <AccordionContent className="px-4 pt-4 pb-6">
        <div className="space-y-4">
          {/* Gender Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`${passenger.id}-gender`}>Gender</Label>
              <Select 
                value={passenger.gender}
                onValueChange={(value) => updatePassenger(index, { 
                  gender: value as 'male' | 'female' 
                })}
              >
                <SelectTrigger id={`${passenger.id}-gender`} className="w-full mt-1">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${passenger.id}-firstName`}>First Name</Label>
              <Input 
                id={`${passenger.id}-firstName`}
                value={passenger.firstName}
                onChange={(e) => updatePassenger(index, { firstName: e.target.value })}
                className="mt-1"
                placeholder="As in passport"
              />
            </div>
            
            <div>
              <Label htmlFor={`${passenger.id}-lastName`}>Last Name</Label>
              <Input 
                id={`${passenger.id}-lastName`}
                value={passenger.lastName}
                onChange={(e) => updatePassenger(index, { lastName: e.target.value })}
                className="mt-1"
                placeholder="As in passport"
              />
            </div>
          </div>
          
          {/* Date of Birth & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerField 
              label="Date of Birth"
              id={`${passenger.id}-dob`}
              date={passenger.dateOfBirth}
              onSelect={(date) => updatePassenger(index, { dateOfBirth: date })}
              disableFuture={true}
            />
            
            <NationalitySelect 
              passengerId={passenger.id}
              value={passenger.nationality}
              onChange={(value) => updatePassenger(index, { nationality: value })}
            />
          </div>
          
          {/* Passport Information */}
          <div className="mt-6 mb-2">
            <h3 className="text-md font-medium">Passport Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${passenger.id}-passport`}>Passport Number</Label>
              <Input 
                id={`${passenger.id}-passport`}
                value={passenger.passportNumber}
                onChange={(e) => updatePassenger(index, { passportNumber: e.target.value })}
                className="mt-1"
                placeholder="Enter passport number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerField 
              label="Issue Date"
              id={`${passenger.id}-issue-date`}
              date={passenger.passportIssueDate}
              onSelect={(date) => updatePassenger(index, { passportIssueDate: date })}
              disableFuture={true}
            />
            
            <DatePickerField 
              label="Expiry Date"
              id={`${passenger.id}-expiry-date`}
              date={passenger.passportExpiryDate}
              onSelect={(date) => updatePassenger(index, { passportExpiryDate: date })}
              disablePast={true}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PassengerFormItem;
