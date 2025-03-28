
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EmployeeData, EMPTY_EMPLOYEE } from '../utils/authConstants';

interface UseSignUpFormProps {
  onSuccess?: () => void;
}

// Define schema for the form
const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Agency name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  agency: z.string().min(1, { message: 'AccelAero username is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  phoneCode: z.string().min(1, { message: 'Country code is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const useSignUpForm = ({ onSuccess }: UseSignUpFormProps = {}) => {
  const [hasEmployees, setHasEmployees] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      agency: '',
      country: '',
      phoneCode: '',
      phoneNumber: '',
    },
  });

  const { formState } = form;
  const { errors, isSubmitting } = formState;

  const handleSubmit = async (data: SignUpFormValues) => {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: '',
        agency: data.agency,
        country: data.country,
        phone: `${data.phoneCode}${data.phoneNumber}`,
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
    form,
    formState: {
      hasEmployees,
      employees,
      isSubmitting,
      errors
    },
    handleSubmit: form.handleSubmit(handleSubmit),
    addEmployee,
    removeEmployee,
    updateEmployee,
    handleHasEmployeesChange
  };
};
