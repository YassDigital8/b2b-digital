
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

interface PassengerSelectorProps {
  adults: number;
  children: number;
  infants: number;
  onChangeAdults: (value: number) => void;
  onChangeChildren: (value: number) => void;
  onChangeInfants: (value: number) => void;
  error?: string;
}

interface PassengerTypeControlProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  description: string;
  minValue?: number;
  maxValue?: number;
}

const PassengerTypeControl = ({ 
  value, 
  onChange, 
  label, 
  description,
  minValue = 0,
  maxValue = 9
}: PassengerTypeControlProps) => {
  
  const handleIncrement = () => {
    if (value < maxValue) {
      onChange(value + 1);
    }
  };
  
  const handleDecrement = () => {
    if (value > minValue) {
      onChange(value - 1);
    }
  };
  
  const isDisabled = value <= minValue;
  
  return (
    <div className="flex items-center justify-between py-3 first:pt-1 last:pb-1">
      <div className="space-y-0.5">
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 rounded-full"
          onClick={handleDecrement}
          disabled={isDisabled}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        <span className="w-4 text-center font-medium">{value}</span>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleIncrement}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const PassengerSelector = ({
  adults,
  children,
  infants,
  onChangeAdults,
  onChangeChildren,
  onChangeInfants,
  error
}: PassengerSelectorProps) => {
  const total = adults + children + infants;
  
  return (
    <div className="space-y-2">
      <FormLabel>Passengers *</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={`justify-between w-full ${error ? "border-red-500 ring-1 ring-red-500" : "border-chamBlue/20 hover:border-chamBlue/50"}`}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{total} Passenger{total !== 1 ? "s" : ""}</span>
              </div>
              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {adults} Adult{adults !== 1 ? "s" : ""}
                {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                {infants > 0 && `, ${infants} Infant${infants !== 1 ? "s" : ""}`}
              </div>
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="end">
          <PassengerTypeControl
            value={adults}
            onChange={onChangeAdults}
            label="Adults"
            description="Age 12+"
            minValue={1} // At least one adult is required
          />
          <PassengerTypeControl
            value={children}
            onChange={onChangeChildren}
            label="Children"
            description="Age 2-11"
          />
          <PassengerTypeControl
            value={infants}
            onChange={onChangeInfants}
            label="Infants"
            description="Under 2 years"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PassengerSelector;
