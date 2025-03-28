
import React from 'react';
import { UseFormReturn, FieldErrors } from 'react-hook-form';
import { SignUpFormValues } from '../../hooks/useSignUpForm';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES, COUNTRY_CODES } from '../../utils/authConstants';

interface AgencyInfoFormProps {
  form: UseFormReturn<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}

export const AgencyInfoForm: React.FC<AgencyInfoFormProps> = ({
  form,
  errors
}) => {
  const handleCountryChange = (value: string) => {
    form.setValue('country', value);
    const countryData = COUNTRY_CODES.find(c => c.country === value);
    if (countryData) {
      form.setValue('phoneCode', countryData.code);
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Travel Agency Name</FormLabel>
            <FormControl>
              <Input placeholder="Your Office Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" {...field} />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-muted-foreground">
              Your password will be generated automatically and sent to this email.
            </p>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="agency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>AccelAero Username</FormLabel>
            <FormControl>
              <Input placeholder="Your AccelAero Sign Username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>POS | Point of Sale</FormLabel>
            <Select 
              value={field.value} 
              onValueChange={handleCountryChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent enableSearch={true}>
                {COUNTRIES.map(c => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel>Phone Number</FormLabel>
        <div className="flex gap-2">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="phoneCode"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent enableSearch={true}>
                      {COUNTRY_CODES.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.code} - {c.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-2/3">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="Phone number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
