
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
  // Calculate reasonable year ranges based on the field type
  const currentYear = new Date().getFullYear();
  // For DOB fields (disableFuture=true), show 100 years in the past
  // For expiry dates (disablePast=true), show 20 years in the future
  const fromYear = disableFuture ? currentYear - 100 : currentYear;
  const toYear = disablePast ? currentYear + 20 : currentYear;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal mt-1.5 shadow-sm border-chamBlue/20 hover:bg-blue-50/50",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-chamBlue" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>Select date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-lg border-chamBlue/20" align="start">
          <div className="text-xs text-center p-2 text-muted-foreground bg-muted/50 border-b">
            Click on month/year to select different years
          </div>
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
            captionLayout="dropdown-buttons"
            fromYear={fromYear}
            toYear={toYear}
            className={cn("p-3 pointer-events-auto rounded-lg bg-gradient-to-br from-white to-blue-50/30")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
