
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from './schema';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  form: UseFormReturn<BookingFormValues>;
  name: "departureDate" | "returnDate";
  label: string;
  disabled?: boolean;
  minDate?: Date;
}

const DatePicker = ({ form, name, label, disabled = false, minDate }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className={disabled ? 'text-gray-400' : ''}>
            {label} {!disabled && '*'}
          </FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={disabled}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-2 bg-blue-50/50 border-b border-blue-100/50">
                <div className="text-xs text-blue-700 font-medium">
                  Use the year/month dropdowns to navigate quickly
                </div>
              </div>
              <Calendar
                mode="single"
                selected={field.value || undefined}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false);
                }}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={2024}
                toYear={2030}
                defaultMonth={field.value || undefined}
                disabled={(date) => {
                  if (minDate) {
                    return date < minDate;
                  }
                  return date < new Date();
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePicker;
