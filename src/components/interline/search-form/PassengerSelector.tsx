
import { useState } from 'react';
import { Plus, Minus, AlertTriangle, Users, Baby, Child } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from './schema';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PassengerSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

const PassengerSelector = ({ form }: PassengerSelectorProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const adjustPassenger = (type: 'adults' | 'children' | 'infants', increment: boolean) => {
    const currentValue = form.getValues(type);
    const newValue = increment ? currentValue + 1 : Math.max(type === 'adults' ? 1 : 0, currentValue - 1);
    
    if (type === 'adults' && newValue > 9) {
      toast.error('Maximum 9 adults allowed per booking');
      return;
    }
    
    if (type === 'children' && newValue > 9) {
      toast.error('Maximum 9 children allowed per booking');
      return;
    }
    
    if (type === 'infants' && newValue > form.getValues('adults')) {
      toast.error('Number of infants cannot exceed number of adults');
      return;
    }
    
    const totalPassengers = (type === 'adults' ? newValue : form.getValues('adults')) + 
                           (type === 'children' ? newValue : form.getValues('children')) + 
                           (type === 'infants' ? newValue : form.getValues('infants'));
    
    if (increment && totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    form.setValue(type, newValue);
  };

  const totalPassengers = form.watch('adults') + form.watch('children') + form.watch('infants');
  const isNearMaximum = totalPassengers >= 7;
  const isAtMaximum = totalPassengers === 9;
  
  const passengerSummaryText = () => {
    const adults = form.watch('adults');
    const children = form.watch('children');
    const infants = form.watch('infants');
    
    const parts = [];
    if (adults === 1) parts.push("1 adult");
    else if (adults > 1) parts.push(`${adults} adults`);
    
    if (children === 1) parts.push("1 child");
    else if (children > 1) parts.push(`${children} children`);
    
    if (infants === 1) parts.push("1 infant");
    else if (infants > 1) parts.push(`${infants} infants`);
    
    return parts.join(", ");
  };

  return (
    <div>
      <Label>Passengers</Label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className="w-full justify-between mt-2 bg-white border-input text-left font-normal"
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{passengerSummaryText()}</span>
              {isNearMaximum && (
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${isAtMaximum ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isAtMaximum ? 'MAX' : `${totalPassengers}/9`}
                </span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4 space-y-4">
            {/* Adults selection */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-xs text-muted-foreground">12+ years</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => adjustPassenger('adults', false)}
                  disabled={form.watch('adults') <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-5 text-center">{form.watch('adults')}</span>
                <Button 
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => adjustPassenger('adults', true)}
                  disabled={isAtMaximum}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Children selection */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-start gap-3">
                <div className="bg-green-50 p-2 rounded-full">
                  <Child className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Children</p>
                  <p className="text-xs text-muted-foreground">2-11 years</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => adjustPassenger('children', false)}
                  disabled={form.watch('children') <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-5 text-center">{form.watch('children')}</span>
                <Button 
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => adjustPassenger('children', true)}
                  disabled={isAtMaximum}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Infants selection */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-start gap-3">
                <div className="bg-purple-50 p-2 rounded-full">
                  <Baby className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Infants</p>
                  <p className="text-xs text-muted-foreground">0-23 months</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => adjustPassenger('infants', false)}
                  disabled={form.watch('infants') <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-5 text-center">{form.watch('infants')}</span>
                <Button 
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => adjustPassenger('infants', true)}
                  disabled={isAtMaximum || form.watch('infants') >= form.watch('adults')}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Passenger warnings */}
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground">Total passengers: {totalPassengers}/9</p>
              
              {isNearMaximum && !isAtMaximum && (
                <Alert variant="default" className="mt-2 py-2 bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-xs text-amber-700 ml-2">
                    Approaching passenger limit. Maximum of 9 passengers allowed per booking.
                  </AlertDescription>
                </Alert>
              )}
              
              {isAtMaximum && (
                <Alert variant="default" className="mt-2 py-2 bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-xs text-red-700 ml-2">
                    Maximum passenger limit reached (9). No more passengers can be added.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="mt-3 flex justify-end">
                <Button 
                  size="sm" 
                  className="text-xs" 
                  onClick={() => setIsPopoverOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PassengerSelector;
