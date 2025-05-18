
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CabinClassSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CabinClassSelector = ({ value, onChange, error }: CabinClassSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="cabinClass">Cabin Class</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id="cabinClass" 
          className={cn(
            "w-full border-chamBlue/20 hover:border-chamBlue/50 bg-white shadow-sm",
            error ? "border-red-500 ring-1 ring-red-500" : ""
          )}
        >
          <SelectValue placeholder="Select cabin class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="economy">Economy Class</SelectItem>
          <SelectItem value="business">Business Class</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CabinClassSelector;
