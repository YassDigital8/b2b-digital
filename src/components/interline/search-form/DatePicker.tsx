
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  label: string;
  date: Date | undefined;
  onSelect: (date: Date) => void;
  error?: string;
}

const DatePicker = ({ label, date, onSelect, error }: DatePickerProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`date-${label.replace(/\s+/g, '-').toLowerCase()}`}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={`date-${label.replace(/\s+/g, '-').toLowerCase()}`}
            variant={"outline"}
            className={cn(
              "w-full justify-between border-chamBlue/20 hover:border-chamBlue/50 bg-white shadow-sm",
              !date && "text-muted-foreground",
              error ? "border-red-500 ring-1 ring-red-500" : ""
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-chamBlue/70" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </div>
            <span className="sr-only">Open calendar</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (date) onSelect(date);
            }}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;
