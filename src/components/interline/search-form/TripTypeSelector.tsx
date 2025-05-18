
import { Label } from "@/components/ui/label";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { ArrowRight, Repeat } from "lucide-react";

interface TripTypeSelectorProps {
  value: 'one-way' | 'round-trip';
  onChange: (value: 'one-way' | 'round-trip') => void;
}

const TripTypeSelector = ({ value, onChange }: TripTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Trip Type</Label>
      <ToggleGroup 
        type="single" 
        value={value} 
        onValueChange={(value) => {
          if (value) onChange(value as 'one-way' | 'round-trip');
        }}
        className="justify-center border rounded-lg p-1 w-full max-w-md mx-auto shadow-sm"
      >
        <ToggleGroupItem 
          value="one-way" 
          className="data-[state=on]:bg-chamBlue data-[state=on]:text-white flex-1 rounded-md"
          aria-label="Toggle one-way trip"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          One Way
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="round-trip" 
          className="data-[state=on]:bg-chamBlue data-[state=on]:text-white flex-1 rounded-md"
          aria-label="Toggle round trip"
        >
          <Repeat className="h-4 w-4 mr-2" />
          Round Trip
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TripTypeSelector;
