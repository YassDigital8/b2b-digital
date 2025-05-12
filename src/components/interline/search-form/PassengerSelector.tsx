
import { useState } from 'react';
import { Plus, Minus, Users, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from './schema';
import { Card } from '@/components/ui/card';

interface PassengerSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

const PassengerSelector = ({ form }: PassengerSelectorProps) => {
  const totalPassengers = 
    form.watch('adults') + 
    form.watch('children') + 
    form.watch('infants');
  
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
    
    // Show warning when approaching passenger limit
    if (increment && totalPassengers === 9) {
      toast.warning('Maximum passenger limit reached (9)');
    } else if (increment && totalPassengers === 8) {
      toast.info('Approaching maximum passenger limit (9)');
    }
    
    if (increment && totalPassengers > 9) {
      toast.error('Maximum 9 passengers allowed per booking');
      return;
    }
    
    form.setValue(type, newValue);
  };

  return (
    <div>
      <Label>Passengers</Label>
      <Card className="mt-2 p-4">
        <div className="space-y-4">
          {/* Adults section */}
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <p className="font-medium">Adults</p>
              </div>
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
                disabled={form.watch('adults') >= 9 || totalPassengers >= 9}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Children section */}
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <p className="font-medium">Children</p>
              </div>
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
                disabled={totalPassengers >= 9}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Infants section */}
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <Baby className="h-4 w-4 text-gray-500" />
                <p className="font-medium">Infants</p>
              </div>
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
                disabled={form.watch('infants') >= form.watch('adults') || totalPassengers >= 9}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          {/* Information about current selection */}
          <p className="text-xs text-muted-foreground text-center">
            {totalPassengers}/9 passengers selected
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PassengerSelector;
