
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./schema";

interface CabinClassSelectorProps {
  form: UseFormReturn<BookingFormValues>;
}

const CabinClassSelector = ({ form }: CabinClassSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="cabinClass"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cabin Class</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select cabin class" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="economy">Economy Class</SelectItem>
              <SelectItem value="business">Business Class</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CabinClassSelector;
