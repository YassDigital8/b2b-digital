
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EmployeeData } from '../utils/authConstants';
import { toast } from 'sonner';
import { signUpFormSchema, SignUpFormValues } from './form/signUpFormSchema';
import { sendSignUpRequest, SignUpApiResponse } from './api/signUpApi';
import { addEmployee, removeEmployee, updateEmployee } from './utils/employeeUtils';
import { prepareSignUpApiData, prepareSignUpContextData } from './utils/formDataUtils';

interface UseSignUpFormProps {
  onSuccess?: () => void;
}

export const useSignUpForm = ({ onSuccess }: UseSignUpFormProps = {}) => {
  const [hasEmployees, setHasEmployees] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [apiResponse, setApiResponse] = useState<SignUpApiResponse | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  
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
      // Reset error states
      setNetworkError(null);
      
      // Prepare data for API
      const apiData = prepareSignUpApiData(data, hasEmployees, employees);
      
      // Send request to API
      const responseData = await sendSignUpRequest(apiData);
      
      // Store the API response
      setApiResponse(responseData);
      console.log('API Response:', responseData);
      
      if (responseData.error) {
        setNetworkError(responseData.message || null);
        return;
      }

      // Call the auth context signUp method to handle local state
      const contextData = prepareSignUpContextData(data, hasEmployees, employees);
      await signUp(contextData);

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

  const handleAddEmployee = () => {
    setEmployees(addEmployee(employees));
  };

  const handleRemoveEmployee = (index: number) => {
    setEmployees(removeEmployee(employees, index));
  };

  const handleUpdateEmployee = (index: number, field: keyof EmployeeData, value: string) => {
    setEmployees(updateEmployee(employees, index, field, value));
  };

  const handleHasEmployeesChange = (checked: boolean) => {
    setHasEmployees(checked);
    if (checked && employees.length === 0) {
      handleAddEmployee();
    }
  };

  return {
    form,
    formState: {
      hasEmployees,
      employees,
      isSubmitting,
      errors,
      apiResponse,
      networkError
    },
    handleSubmit: form.handleSubmit(handleSubmit),
    addEmployee: handleAddEmployee,
    removeEmployee: handleRemoveEmployee,
    updateEmployee: handleUpdateEmployee,
    handleHasEmployeesChange
  };
};
