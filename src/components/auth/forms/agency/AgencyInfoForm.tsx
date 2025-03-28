
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES, COUNTRY_CODES } from '../../utils/authConstants';

interface AgencyInfoFormProps {
  name: string;
  email: string;
  agency: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  errors: Record<string, string>;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAgencyChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPhoneCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

export const AgencyInfoForm: React.FC<AgencyInfoFormProps> = ({
  name,
  email,
  agency,
  country,
  phoneCode,
  phoneNumber,
  errors,
  onNameChange,
  onEmailChange,
  onAgencyChange,
  onCountryChange,
  onPhoneCodeChange,
  onPhoneNumberChange
}) => {
  const handleCountryChange = (value: string) => {
    onCountryChange(value);
    const countryData = COUNTRY_CODES.find(c => c.country === value);
    if (countryData) {
      onPhoneCodeChange(countryData.code);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Travel Agency Name</Label>
        <Input 
          id="name" 
          placeholder="Your Office Name" 
          value={name} 
          onChange={e => onNameChange(e.target.value)} 
          className={errors.name ? "border-red-500" : ""} 
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input 
          id="signup-email" 
          type="email" 
          placeholder="your@email.com" 
          value={email} 
          onChange={e => onEmailChange(e.target.value)} 
          className={errors.email ? "border-red-500" : ""} 
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <p className="text-xs text-muted-foreground">
          Your password will be generated automatically and sent to this email.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agency">AccelAero Username</Label>
        <Input 
          id="agency" 
          placeholder="Your AccelAero Sign Username" 
          value={agency} 
          onChange={e => onAgencyChange(e.target.value)} 
          className={errors.agency ? "border-red-500" : ""} 
        />
        {errors.agency && <p className="text-red-500 text-sm">{errors.agency}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">POS | Point of Sale</Label>
        <Select value={country} onValueChange={handleCountryChange}>
          <SelectTrigger id="country" className={errors.country ? "border-red-500" : ""}>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent enableSearch={true}>
            {COUNTRIES.map(c => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <div className="w-1/3">
            <Select value={phoneCode} onValueChange={onPhoneCodeChange}>
              <SelectTrigger id="phone-code" className={errors.phoneCode ? "border-red-500" : ""}>
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent enableSearch={true}>
                {COUNTRY_CODES.map(c => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} - {c.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-2/3">
            <Input 
              id="phone-number" 
              type="tel" 
              placeholder="Phone number"
              value={phoneNumber}
              onChange={e => onPhoneNumberChange(e.target.value.replace(/\D/g, ''))}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
          </div>
        </div>
        {(errors.phoneCode || errors.phoneNumber) && (
          <p className="text-red-500 text-sm">
            {errors.phoneCode || errors.phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
};
