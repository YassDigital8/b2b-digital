
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { AgencyInfoForm } from './agency/AgencyInfoForm';
import { EmployeeSection } from './employee/EmployeeSection';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { Form } from '@/components/ui/form';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const {
    form,
    formState: {
      hasEmployees,
      employees,
      isSubmitting,
      errors
    },
    handleSubmit,
    addEmployee,
    removeEmployee,
    updateEmployee,
    handleHasEmployeesChange
  } = useSignUpForm({ onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <AgencyInfoForm 
            form={form}
            errors={errors}
          />

          <EmployeeSection
            hasEmployees={hasEmployees}
            employees={employees}
            errors={errors}
            onHasEmployeesChange={handleHasEmployeesChange}
            onAddEmployee={addEmployee}
            onRemoveEmployee={removeEmployee}
            onUpdateEmployee={updateEmployee}
          />
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
    </Form>
  );
};
