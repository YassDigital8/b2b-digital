import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface DatePickerFieldProps {
  label: string;
  id: string;
  date: Date | string | null;
  onSelect: (date: string | null) => void;
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
  // Parse the input date into a Date object if it's a string
  const parseDate = (date: Date | string | null): Date | null => {
    if (!date) return null;
    if (date instanceof Date) return !isNaN(date.getTime()) ? date : null;
    try {
      const parsed = parseISO(date);
      return !isNaN(parsed.getTime()) ? parsed : null;
    } catch {
      return null;
    }
  };

  const validDate = parseDate(date);

  const handleSelect = (selectedDate: Date | undefined) => {
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
    console.log('Selected date:', formattedDate);
    onSelect(formattedDate);
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal mt-1.5 shadow-sm border-chamBlue/20 hover:bg-blue-50/50',
              !validDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-chamBlue" />
            {validDate ? format(validDate, 'yyyy-MM-dd') : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-lg border-chamBlue/20" align="start">
          <Calendar
            mode="single"
            selected={validDate || undefined}
            onSelect={handleSelect}
            disabled={(day) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (disableFuture && day > today) return true;
              if (disablePast && day < today) return true;
              return false;
            }}
            initialFocus
            className="p-3 pointer-events-auto rounded-lg bg-gradient-to-br from-white to-blue-50/30"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;