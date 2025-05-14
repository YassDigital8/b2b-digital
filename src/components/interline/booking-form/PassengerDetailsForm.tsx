
import { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
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
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Passenger } from '@/pages/InterlineBookingForm';

interface PassengerDetailsFormProps {
  passengers: Passenger[];
  updatePassenger: (index: number, data: Partial<Passenger>) => void;
  onNext: () => void;
}

const PassengerDetailsForm = ({ 
  passengers, 
  updatePassenger,
  onNext 
}: PassengerDetailsFormProps) => {
  const [openAccordion, setOpenAccordion] = useState<string>("passenger-0");
  
  const nationalities = [
    { value: 'SY', label: 'Syrian' },
    { value: 'LB', label: 'Lebanese' },
    { value: 'EG', label: 'Egyptian' },
    { value: 'JO', label: 'Jordanian' },
    { value: 'IQ', label: 'Iraqi' },
    { value: 'AE', label: 'Emirati' },
    { value: 'SA', label: 'Saudi' },
    { value: 'TR', label: 'Turkish' },
    { value: 'US', label: 'American' },
    { value: 'GB', label: 'British' },
  ];

  const handleNext = () => {
    // Validate all passenger forms before proceeding
    const isValid = validateAllPassengers();
    
    if (isValid) {
      onNext();
    }
  };
  
  const validateAllPassengers = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      
      if (!p.firstName || !p.lastName) {
        toast.error(`Please enter first and last name for ${getPassengerTitle(p)}`);
        setOpenAccordion(`passenger-${i}`);
        return false;
      }
      
      if (!p.dateOfBirth) {
        toast.error(`Please enter date of birth for ${getPassengerTitle(p)}`);
        setOpenAccordion(`passenger-${i}`);
        return false;
      }
      
      if (!p.passportNumber) {
        toast.error(`Please enter passport number for ${getPassengerTitle(p)}`);
        setOpenAccordion(`passenger-${i}`);
        return false;
      }
      
      if (!p.passportIssueDate || !p.passportExpiryDate) {
        toast.error(`Please enter passport issue and expiry dates for ${getPassengerTitle(p)}`);
        setOpenAccordion(`passenger-${i}`);
        return false;
      }
      
      if (p.passportExpiryDate && p.passportExpiryDate < new Date()) {
        toast.error(`Passport for ${getPassengerTitle(p)} is expired`);
        setOpenAccordion(`passenger-${i}`);
        return false;
      }
      
      if (!p.nationality) {
        toast.error(`Please select nationality for ${getPassengerTitle(p)}`);
        setOpenAccordion(`passenger-${i}`);
        return false;
      }
    }
    
    return true;
  };
  
  const getPassengerTitle = (passenger: Passenger) => {
    const typeLabel = passenger.type === 'adult' ? 'Adult' : passenger.type === 'child' ? 'Child' : 'Infant';
    const index = parseInt(passenger.id.split('-')[1]);
    return `${typeLabel} #${index}`;
  };
  
  return (
    <div className="px-6 py-4 pb-6">
      <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
      
      <Accordion 
        type="single" 
        collapsible
        value={openAccordion}
        onValueChange={setOpenAccordion}
        className="space-y-4"
      >
        {passengers.map((passenger, index) => (
          <AccordionItem 
            key={passenger.id} 
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
                    {getPassengerTitle(passenger)}
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
                
                {/* Date of Birth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`${passenger.id}-dob`}>Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id={`${passenger.id}-dob`}
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !passenger.dateOfBirth && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {passenger.dateOfBirth ? (
                            format(passenger.dateOfBirth, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={passenger.dateOfBirth || undefined}
                          onSelect={(date) => updatePassenger(index, { dateOfBirth: date || null })}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor={`${passenger.id}-nationality`}>Nationality</Label>
                    <Select 
                      value={passenger.nationality}
                      onValueChange={(value) => updatePassenger(index, { nationality: value })}
                    >
                      <SelectTrigger id={`${passenger.id}-nationality`} className="w-full mt-1">
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
                  <div>
                    <Label htmlFor={`${passenger.id}-issue-date`}>Issue Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id={`${passenger.id}-issue-date`}
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !passenger.passportIssueDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {passenger.passportIssueDate ? (
                            format(passenger.passportIssueDate, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={passenger.passportIssueDate || undefined}
                          onSelect={(date) => updatePassenger(index, { passportIssueDate: date || null })}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor={`${passenger.id}-expiry-date`}>Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id={`${passenger.id}-expiry-date`}
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !passenger.passportExpiryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {passenger.passportExpiryDate ? (
                            format(passenger.passportExpiryDate, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={passenger.passportExpiryDate || undefined}
                          onSelect={(date) => updatePassenger(index, { passportExpiryDate: date || null })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleNext}
          className="bg-chamBlue hover:bg-chamDarkBlue text-white font-medium px-6"
        >
          Continue to Contact Information
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetailsForm;
