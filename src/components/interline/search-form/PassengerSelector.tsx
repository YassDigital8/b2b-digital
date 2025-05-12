
import { useState } from 'react';
import { Plus, Minus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from './schema';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PassengerSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

const PassengerSelector = ({ form }: PassengerSelectorProps) => {
  
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

  return (
    <div>
      <Label>Passengers</Label>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="border rounded-md p-3 relative">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Adults</p>
              <p className="text-xs text-muted-foreground">12+ years</p>
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
        </div>
        
        <div className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Children</p>
              <p className="text-xs text-muted-foreground">2-11 years</p>
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
        </div>
        
        <div className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Infants</p>
              <p className="text-xs text-muted-foreground">0-23 months</p>
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
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-xs text-muted-foreground">
          Total passengers: {totalPassengers}
        </p>
        
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
      </div>
    </div>
  );
};

export default PassengerSelector;
