
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from './schema';

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

  return (
    <div>
      <Label>Passengers</Label>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="border rounded-md p-3 bg-blue-50/30 border-blue-100">
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
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-3 bg-green-50/30 border-green-100">
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
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-3 bg-amber-50/30 border-amber-100">
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
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {(form.watch('adults') + form.watch('children') + form.watch('infants')) > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Total passengers: {form.watch('adults') + form.watch('children') + form.watch('infants')}
        </p>
      )}
    </div>
  );
};

export default PassengerSelector;
