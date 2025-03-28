
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Plus, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { COUNTRIES, COUNTRY_CODES, EMPLOYEE_ROLES, EmployeeData, EMPTY_EMPLOYEE } from '../utils/authConstants';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [hasEmployees, setHasEmployees] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Agency name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!agency) newErrors.agency = 'AccelAero username is required';
    if (!country) newErrors.country = 'Country is required';
    if (!phoneCode) newErrors.phoneCode = 'Country code is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    
    // Validate employees if checkbox is checked
    if (hasEmployees && employees.length > 0) {
      employees.forEach((employee, index) => {
        if (!employee.name) newErrors[`employee-${index}-name`] = 'Employee name is required';
        if (!employee.email) newErrors[`employee-${index}-email`] = 'Employee email is required';
        if (!employee.role) newErrors[`employee-${index}-role`] = 'Employee role is required';
        if (!employee.phoneCode) newErrors[`employee-${index}-phoneCode`] = 'Employee phone code is required';
        if (!employee.phoneNumber) newErrors[`employee-${index}-phoneNumber`] = 'Employee phone number is required';
      });
    }
    
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
        phone: `${phoneCode}${phoneNumber}`,
        employees: hasEmployees ? employees.map(employee => ({
          ...employee,
          phone: `${employee.phoneCode}${employee.phoneNumber}`
        })) : undefined
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

  const addEmployee = () => {
    setEmployees([...employees, { ...EMPTY_EMPLOYEE }]);
  };

  const removeEmployee = (index: number) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const updateEmployee = (index: number, field: keyof EmployeeData, value: string) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = { ...updatedEmployees[index], [field]: value };
    setEmployees(updatedEmployees);
  };

  const handleEmployeeCountryCodeChange = (index: number, value: string) => {
    updateEmployee(index, 'phoneCode', value);
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

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox 
            id="has-employees" 
            checked={hasEmployees}
            onCheckedChange={(checked) => {
              setHasEmployees(checked === true);
              if (checked === true && employees.length === 0) {
                addEmployee();
              }
            }}
          />
          <label
            htmlFor="has-employees"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I want to create accounts for my employees
          </label>
        </div>

        {hasEmployees && (
          <Accordion type="single" collapsible className="border rounded-md" defaultValue="employees">
            <AccordionItem value="employees" className="border-none">
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Employee Accounts ({employees.length})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <AnimatePresence>
                  {employees.map((employee, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border rounded-md p-4 mb-4 relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => removeEmployee(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`employee-${index}-name`}>Employee Name</Label>
                          <Input
                            id={`employee-${index}-name`}
                            value={employee.name}
                            onChange={(e) => updateEmployee(index, 'name', e.target.value)}
                            placeholder="Full Name"
                            className={errors[`employee-${index}-name`] ? "border-red-500" : ""}
                          />
                          {errors[`employee-${index}-name`] && (
                            <p className="text-red-500 text-sm">{errors[`employee-${index}-name`]}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`employee-${index}-email`}>Employee Email</Label>
                          <Input
                            id={`employee-${index}-email`}
                            type="email"
                            value={employee.email}
                            onChange={(e) => updateEmployee(index, 'email', e.target.value)}
                            placeholder="employee@example.com"
                            className={errors[`employee-${index}-email`] ? "border-red-500" : ""}
                          />
                          {errors[`employee-${index}-email`] && (
                            <p className="text-red-500 text-sm">{errors[`employee-${index}-email`]}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`employee-${index}-role`}>Role</Label>
                          <Select
                            value={employee.role}
                            onValueChange={(value) => updateEmployee(index, 'role', value)}
                          >
                            <SelectTrigger id={`employee-${index}-role`}>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {EMPLOYEE_ROLES.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`employee-${index}-phone`}>Phone Number</Label>
                          <div className="flex gap-2">
                            <div className="w-1/3">
                              <Select 
                                value={employee.phoneCode} 
                                onValueChange={(value) => handleEmployeeCountryCodeChange(index, value)}
                              >
                                <SelectTrigger 
                                  id={`employee-${index}-phone-code`} 
                                  className={errors[`employee-${index}-phoneCode`] ? "border-red-500" : ""}
                                >
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
                                id={`employee-${index}-phone-number`}
                                type="tel" 
                                placeholder="Phone number"
                                value={employee.phoneNumber}
                                onChange={(e) => updateEmployee(index, 'phoneNumber', e.target.value.replace(/\D/g, ''))}
                                className={errors[`employee-${index}-phoneNumber`] ? "border-red-500" : ""}
                              />
                            </div>
                          </div>
                          {(errors[`employee-${index}-phoneCode`] || errors[`employee-${index}-phoneNumber`]) && (
                            <p className="text-red-500 text-sm">
                              {errors[`employee-${index}-phoneCode`] || errors[`employee-${index}-phoneNumber`]}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={addEmployee}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Login credentials will be automatically generated and sent to each employee email address.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
      <CardFooter className="flex-col">
        <Button type="submit" className="w-full bg-chamBlue hover:bg-chamBlue/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account{hasEmployees && employees.length > 0 ? 's' : ''}...
            </>
          ) : `Create Account${hasEmployees && employees.length > 0 ? 's' : ''}`}
        </Button>
      </CardFooter>
    </form>
  );
};
