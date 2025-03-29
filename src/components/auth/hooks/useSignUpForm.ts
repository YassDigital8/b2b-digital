
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EmployeeData, EMPTY_EMPLOYEE } from '../utils/authConstants';
import { toast } from 'sonner';

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
  const [apiResponse, setApiResponse] = useState<any>(null);
  
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
      // Prepare emails array (main user + employees)
      const emails = [data.email];
      const phones = [data.phoneNumber];
      const codes = [data.phoneCode];
      
      // Add employee data if exists
      if (hasEmployees && employees.length > 0) {
        employees.forEach(employee => {
          if (employee.email) {
            emails.push(employee.email);
            phones.push(employee.phoneNumber);
            codes.push(employee.phoneCode);
          }
        });
      }

      // Format data for API
      const apiData = {
        travel_agent_office: data.name,
        pos: data.country === 'Syria' ? 'SYR' : data.country,
        email: emails,
        phone: phones,
        code: codes,
        user_name: data.agency
      };

      console.log('Sending API request to:', 'https://b2b-chamwings.com/api/signup');
      console.log('Request data:', JSON.stringify(apiData, null, 2));

      // Send POST request to API - Updated endpoint URL
      const response = await fetch('https://b2b-chamwings.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      // Get the raw response text and parse it as JSON if possible
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { raw: responseText };
      }

      // Store the API response
      setApiResponse(responseData);
      console.log('API Response:', responseData);

      // Display the response in a toast - using a string instead of JSX
      toast(
        response.ok ? "API Response (Success)" : "API Response (Error)",
        {
          description: JSON.stringify(responseData, null, 2),
          duration: 10000, // 10 seconds
        }
      );

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to sign up');
      }

      // Call the auth context signUp method to handle local state
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

      toast.success('Account created successfully!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      let errorMessage = 'Failed to create account';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
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
      errors,
      apiResponse
    },
    handleSubmit: form.handleSubmit(handleSubmit),
    addEmployee,
    removeEmployee,
    updateEmployee,
    handleHasEmployeesChange
  };
};
