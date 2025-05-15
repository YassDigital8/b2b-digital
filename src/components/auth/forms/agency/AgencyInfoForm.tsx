
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES, COUNTRY_CODES } from '../../utils/authConstants';
import { useAppSelector } from '@/redux/useAppSelector';

interface FormValues {
  name: string;
  email: string;
  agency: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
}

interface Props {
  form: any;
}

export const AgencyInfoForm: React.FC<Props> = ({ form }) => {
  const { posArray } = useAppSelector(state => state.pos);

  const handleCountryChange = (value: string) => {
    form.setFieldValue('country', value);
  };

  return (
    <div className="space-y-4">
      {/* Travel Agency Name */}
      <div>
        <label>Travel Agency Name</label>
        <Input
          name="name"
          placeholder="Your Office Name"
          value={form.values.name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.touched.name && form.errors.name && (
          <div className="text-red-500 text-xs">{form.errors.name}</div>
        )}
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <Input
          name="email"
          type="email"
          placeholder="your@email.com"
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.touched.email && form.errors.email && (
          <div className="text-red-500 text-xs">{form.errors.email}</div>
        )}
        <p className="text-xs text-muted-foreground">
          Your password will be generated automatically and sent to this email.
        </p>
      </div>

      {/* AccelAero Username */}
      <div>
        <label>AccelAero Username</label>
        <Input
          name="agency"
          placeholder="Your AccelAero Sign Username"
          value={form.values.agency}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.touched.agency && form.errors.agency && (
          <div className="text-red-500 text-xs">{form.errors.agency}</div>
        )}
      </div>

      {/* Country */}
      <div>
        <label>POS | Point of Sale</label>
        <Select value={form.values.country} onValueChange={handleCountryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {posArray?.map((c) => (
              <SelectItem key={c.id} value={c.key}>
                {c.key} - {c.englishName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.touched.country && form.errors.country && (
          <div className="text-red-500 text-xs">{form.errors.country}</div>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label>Phone Number</label>
        <div className="flex gap-2">
          <div className="w-1/3">
            <Select
              value={form.values.phoneCode}
              onValueChange={(val) => form.setFieldValue('phoneCode', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_CODES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} - {c.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.touched.phoneCode && form.errors.phoneCode && (
              <div className="text-red-500 text-xs">{form.errors.phoneCode}</div>
            )}
          </div>
          <div className="w-2/3">
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={form.values.phoneNumber}
              onChange={(e) =>
                form.setFieldValue('phoneNumber', e.target.value.replace(/\D/g, ''))
              }
              onBlur={form.handleBlur}
            />
            {form.touched.phoneNumber && form.errors.phoneNumber && (
              <div className="text-red-500 text-xs">{form.errors.phoneNumber}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
