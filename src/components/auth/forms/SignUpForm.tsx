
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { COUNTRIES, COUNTRY_CODES } from '../utils/authConstants';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agency, setAgency] = useState('');
  const [country, setCountry] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!agency) newErrors.agency = 'Agency name is required';
    if (!country) newErrors.country = 'Country is required';
    if (!phoneCode) newErrors.phoneCode = 'Country code is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await signUp({
        name,
        email,
        password: '',
        agency,
        country,
        phone: `${phoneCode}${phoneNumber}`
      });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    const countryData = COUNTRY_CODES.find(c => c.country === value);
    if (countryData) {
      setPhoneCode(countryData.code);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="name">Travel Agency Name</Label>
          <Input 
            id="name" 
            placeholder="Your Office Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
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
            onChange={e => setEmail(e.target.value)} 
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
            onChange={e => setAgency(e.target.value)} 
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
              <Select value={phoneCode} onValueChange={setPhoneCode}>
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
                onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
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
      </CardContent>
      <CardFooter className="flex-col">
        <Button type="submit" className="w-full bg-chamBlue hover:bg-chamBlue/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : 'Create Account'}
        </Button>
      </CardFooter>
    </form>
  );
};
