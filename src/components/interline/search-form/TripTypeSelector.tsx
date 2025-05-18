
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from "@/components/ui/form";
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from './schema';

interface TripTypeSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

const TripTypeSelector = ({ form }: TripTypeSelectorProps) => {
  return (
    <div className="mb-6">
      <FormField
        control={form.control}
        name="tripType"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-way" id="one-way" />
                  <Label htmlFor="one-way">One Way</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round-trip" id="round-trip" />
                  <Label htmlFor="round-trip">Round Trip</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TripTypeSelector;
