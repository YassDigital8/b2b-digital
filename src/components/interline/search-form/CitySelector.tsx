
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
import { allCities } from "./schema";

interface CitySelectorProps {
  form: UseFormReturn<BookingFormValues>;
  type: 'from' | 'to';
  label: string;
  placeholder: string;
  fromCity?: string;
}

const CitySelector = ({ form, type, label, placeholder, fromCity }: CitySelectorProps) => {
  const fieldName = type === 'from' ? 'fromCity' : 'toCity';
  
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} *</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent enableSearch>
              {type === 'to' && fromCity
                ? allCities
                  .filter(city => city.city !== fromCity)
                  .map((city) => (
                    <SelectItem key={city.code} value={city.city}>
                      {city.city} ({city.code})
                    </SelectItem>
                  ))
                : allCities.map((city) => (
                    <SelectItem key={city.code} value={city.city}>
                      {city.city} ({city.code})
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CitySelector;
