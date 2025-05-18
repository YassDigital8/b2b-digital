
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
  // Initialize with true to show year view first
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  
  const handleOpenChange = (open: boolean) => {
    if (open) {
      // When opening the popover, set year picker to open
      setIsYearPickerOpen(true);
    }
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Popover onOpenChange={handleOpenChange}>
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
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(date) => {
              onSelect(date);
              // Reset the year picker state for next opening
              setIsYearPickerOpen(false); 
            }}
            disabled={(day) => {
              if (disableFuture && day > new Date()) return true;
              if (disablePast && day < new Date()) return true;
              return false;
            }}
            initialFocus
            captionLayout="dropdown-buttons"
            fromYear={1900}
            toYear={2030}
            defaultMonth={date || undefined}
            // Start with year picker open
            view={isYearPickerOpen ? "year" : "day"}
            onViewChange={view => {
              if (view !== "year") {
                setIsYearPickerOpen(false);
              }
            }}
            className={cn("p-3 pointer-events-auto rounded-lg bg-gradient-to-br from-white to-blue-50/30")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
