
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerFieldProps {
  label: string;
  id: string;
  date: Date | null;
  onSelect: (date: Date | null) => void;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const DatePickerField = ({ 
  label, 
  id, 
  date, 
  onSelect, 
  disableFuture = false, 
  disablePast = false 
}: DatePickerFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal mt-1",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>Select date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={onSelect}
            disabled={(day) => {
              if (disableFuture && day > new Date()) return true;
              if (disablePast && day < new Date()) return true;
              return false;
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
