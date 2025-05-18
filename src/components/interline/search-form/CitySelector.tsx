
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface CitySelectorProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  cities: Array<{ city: string; code: string }>;
}

const CitySelector = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  cities,
}: CitySelectorProps) => {
  const selectedCity = cities.find((c) => c.city === value);
  
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            role="combobox"
            aria-expanded={false}
            className={cn(
              "w-full justify-between border-chamBlue/20 hover:border-chamBlue/50 bg-white shadow-sm",
              error ? "border-red-500 ring-1 ring-red-500" : ""
            )}
            onClick={() => {
              if (onBlur) onBlur();
            }}
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-4 w-4 text-chamBlue/70" />
              <span className="truncate">
                {selectedCity ? `${selectedCity.city} (${selectedCity.code})` : `Select ${label} City`}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full max-w-[400px]" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label} city...`} />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.code}
                    value={city.city}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      if (onBlur) onBlur();
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city.city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city.city} ({city.code})
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CitySelector;
