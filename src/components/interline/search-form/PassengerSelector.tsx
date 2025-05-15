
import {
  FormControl,
  FormField,
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
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./schema";
import { MinusCircle, PlusCircle, Users } from "lucide-react";
import { motion } from "framer-motion";

interface PassengerSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

interface PassengerTypeProps {
  form: UseFormReturn<BookingFormValues>;
  type: "adults" | "children" | "infants";
  label: string;
  description: string;
}

const PassengerTypeControl = ({ form, type, label, description }: PassengerTypeProps) => {
  const value = form.watch(type);
  
  const handleIncrement = () => {
    form.setValue(type, value + 1);
  };
  
  const handleDecrement = () => {
    if (value > 0) {
      form.setValue(type, value - 1);
    }
  };
  
  const isDisabled = type === "adults" && value <= 1;
  
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

const PassengerSelector = ({ form }: PassengerSelectorProps) => {
  const adults = form.watch("adults");
  const children = form.watch("children");
  const infants = form.watch("infants");
  const total = adults + children + infants;
  
  return (
    <FormField
      control={form.control}
      name="adults"
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>Passengers *</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between"
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
                form={form}
                type="adults"
                label="Adults"
                description="Age 12+"
              />
              <PassengerTypeControl
                form={form}
                type="children"
                label="Children"
                description="Age 2-11"
              />
              <PassengerTypeControl
                form={form}
                type="infants"
                label="Infants"
                description="Under 2 years"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PassengerSelector;
