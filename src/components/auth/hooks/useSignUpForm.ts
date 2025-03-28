
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EmployeeData, EMPTY_EMPLOYEE } from '../utils/authConstants';
import { validateSignUpForm, SignUpFormData } from '../utils/formValidation';

interface UseSignUpFormProps {
  onSuccess?: () => void;
}

export const useSignUpForm = ({ onSuccess }: UseSignUpFormProps = {}) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: SignUpFormData = {
      name,
      email,
      agency,
      country,
      phoneCode,
      phoneNumber,
      hasEmployees,
      employees
    };
    
    const validationErrors = validateSignUpForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;
    
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

  const handleHasEmployeesChange = (checked: boolean) => {
    setHasEmployees(checked);
    if (checked && employees.length === 0) {
      addEmployee();
    }
  };

  return {
    formState: {
      name,
      email,
      agency,
      country,
      phoneCode,
      phoneNumber,
      hasEmployees,
      employees,
      isSubmitting,
      errors
    },
    setName,
    setEmail,
    setAgency,
    setCountry,
    setPhoneCode,
    setPhoneNumber,
    handleSubmit,
    addEmployee,
    removeEmployee,
    updateEmployee,
    handleHasEmployeesChange
  };
};
