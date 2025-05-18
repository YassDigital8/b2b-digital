
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerFieldProps {
  id: string;
  date: Date | null;
  onSelect: (date: Date | null) => void;
  disableFuture?: boolean;
  disablePast?: boolean;
  name?: string;
  error?: string;
}

const DatePickerField = ({ 
  id, 
  date, 
  onSelect, 
  disableFuture = false, 
  disablePast = false,
  name,
  error
}: DatePickerFieldProps) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            name={name}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal mt-1.5 shadow-sm border-chamBlue/20 hover:bg-blue-50/50",
              !date && "text-muted-foreground",
              error && "border-red-500 ring-1 ring-red-500"
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
            className={cn("p-3 pointer-events-auto rounded-lg bg-gradient-to-br from-white to-blue-50/30")}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default DatePickerField;
