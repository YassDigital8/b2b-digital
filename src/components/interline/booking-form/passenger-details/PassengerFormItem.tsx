
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
      className="border rounded-xl overflow-hidden shadow-md mb-4 transition-all duration-300 hover:shadow-lg group"
    >
      <AccordionTrigger className="px-4 py-3.5 hover:no-underline bg-gradient-to-r from-white to-blue-50/30 group-hover:from-slate-50 group-hover:to-blue-50/50">
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
              <Label htmlFor={`${passenger.id}-gender`} className="text-sm font-medium text-gray-700">Gender</Label>
              <Select 
                value={passenger.gender}
                onValueChange={(value) => updatePassenger(index, { 
                  gender: value as 'male' | 'female' 
                })}
              >
                <SelectTrigger id={`${passenger.id}-gender`} className="w-full mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor={`${passenger.id}-firstName`} className="text-sm font-medium text-gray-700">First Name</Label>
              <Input 
                id={`${passenger.id}-firstName`}
                value={passenger.firstName}
                onChange={(e) => updatePassenger(index, { firstName: e.target.value })}
                className="mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm"
                placeholder="As in passport"
              />
            </div>
            
            <div>
              <Label htmlFor={`${passenger.id}-lastName`} className="text-sm font-medium text-gray-700">Last Name</Label>
              <Input 
                id={`${passenger.id}-lastName`}
                value={passenger.lastName}
                onChange={(e) => updatePassenger(index, { lastName: e.target.value })}
                className="mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm"
                placeholder="As in passport"
              />
            </div>
          </div>
          
          {/* Date of Birth & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <h3 className="text-md font-medium text-chamBlue font-display flex items-center">
              <span className="bg-chamBlue/10 text-chamBlue h-6 w-6 rounded-full inline-flex items-center justify-center mr-2 text-xs">P</span>
              Passport Information
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor={`${passenger.id}-passport`} className="text-sm font-medium text-gray-700">Passport Number</Label>
              <Input 
                id={`${passenger.id}-passport`}
                value={passenger.passportNumber}
                onChange={(e) => updatePassenger(index, { passportNumber: e.target.value })}
                className="mt-1.5 border-chamBlue/20 focus:border-chamBlue shadow-sm"
                placeholder="Enter passport number"
              />
            </div>
            
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
