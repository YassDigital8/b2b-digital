
// This file now acts as a reexport to maintain backward compatibility
// export type { SignUpFormValues } from './form/signUpFormSchema';

// Re-export other necessary types and functions
export * from './api/signUpApi';

// We need to create this hook since it's being imported in SignUpForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { signUpFormSchema, SignUpFormValues } from './form/signUpFormSchema';
import { EmployeeData, EMPTY_EMPLOYEE } from '../utils/authConstants';
import { useState } from 'react';
import { sendSignUpRequest, SignUpApiResponse } from './api/signUpApi';
import { addEmployee, removeEmployee, updateEmployee } from './utils/employeeUtils';
import { formatFormData } from './utils/formDataUtils';
import { toast } from 'sonner';

interface UseSignUpFormProps {
  onSuccess?: () => void;
}

export const useSignUpForm = ({ onSuccess }: UseSignUpFormProps = {}) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [hasEmployees, setHasEmployees] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<SignUpApiResponse | null>(null);

  const form = useForm<any>({
    // resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      agency: '',
      country: '',
      phoneCode: '',
      phoneNumber: '',
    },
  });

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
      setEmployees([{ ...EMPTY_EMPLOYEE }]);
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    setNetworkError(null);
    setApiResponse(null);

    try {
      // Validate the form data before sending to API
      if (!data.name.trim() || !data.email.trim() || !data.agency.trim() ||
        !data.country.trim() || !data.phoneCode.trim() || !data.phoneNumber.trim()) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Validate employee data if any
      if (hasEmployees && employees.length > 0) {
        const hasInvalidEmployee = employees.some(emp =>
          !emp.email.trim() || !emp.phoneNumber.trim() || !emp.phoneCode.trim()
        );

        if (hasInvalidEmployee) {
          toast.error("Please fill in all employee fields or remove incomplete employees");
          setIsSubmitting(false);
          return;
        }
      }

      const formattedData = formatFormData(data, hasEmployees ? employees : []);
      const response = await sendSignUpRequest(formattedData);

      setApiResponse(response);

      if (response.error) {
        if (response.message?.includes('403 Forbidden') || response.message?.includes('API access forbidden')) {
          setNetworkError("Server is currently not accepting registration requests. Please try again later or contact support.");
          toast.error("Server unavailable", {
            description: "Registration server is currently not accepting requests. Please try again later.",
            duration: 8000
          });
        } else {
          setNetworkError(response.message || 'Unknown error occurred');
        }
      } else if (response.status === "error" && response.errors) {
        // Handle API validation errors
        const errorMessages = Object.entries(response.errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
          .join('\n');

        toast.error(`API Validation Errors:\n${errorMessages}`, { duration: 5000 });
      } else if (response.raw && response.raw.includes('403 Forbidden')) {
        setNetworkError("Cannot connect to the registration server. The server is blocking access from this application.");
        toast.error("Server access denied", {
          description: "The registration server is blocking requests from this application. Please try again later or contact support.",
          duration: 8000
        });
      } else if (response.success || (response.status && response.status !== "error")) {
        toast.success("Registration submitted successfully!");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setNetworkError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    formState: {
      hasEmployees,
      employees,
      isSubmitting,
      errors: form.formState.errors,
      apiResponse,
      networkError
    },
    handleSubmit,
    addEmployee: handleAddEmployee,
    removeEmployee: handleRemoveEmployee,
    updateEmployee: handleUpdateEmployee,
    handleHasEmployeesChange
  };
};
