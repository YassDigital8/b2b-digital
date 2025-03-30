
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Terminal, WifiOff, ShieldAlert, ExternalLink } from 'lucide-react';
import { AgencyInfoForm } from './agency/AgencyInfoForm';
import { EmployeeSection } from './employee/EmployeeSection';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { Form } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      errors,
      apiResponse,
      networkError
    },
    handleSubmit,
    addEmployee,
    removeEmployee,
    updateEmployee,
    handleHasEmployeesChange
  } = useSignUpForm({ onSuccess });

  // Check if the response contains a 403 Forbidden error
  const isForbiddenError = networkError?.includes('access denied') || 
                          networkError?.includes('403') || 
                          apiResponse?.raw?.includes('403 Forbidden') ||
                          apiResponse?.message?.includes('API access forbidden');

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
          
          {isForbiddenError && (
            <Alert variant="destructive" className="mt-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Registration Server Unavailable</AlertTitle>
              <AlertDescription>
                <p>The registration server is currently not accepting requests from this application.</p>
                <p className="text-xs mt-2">
                  Since you've hosted the server on Hostinger, you need to enable CORS support to allow requests from your application's domain. 
                </p>
                <div className="mt-3 space-y-2">
                  <p className="font-medium">Possible solutions:</p>
                  <ol className="text-xs list-decimal pl-5 space-y-1">
                    <li>Enable CORS on your server by adding appropriate HTTP headers</li>
                    <li>Create a server-side proxy endpoint that forwards requests to the API</li>
                    <li>Contact support at <a href="mailto:support@chamwings.com" className="underline hover:text-chamGold">support@chamwings.com</a></li>
                  </ol>
                </div>
                <a 
                  href="https://b2b-chamwings.com/register" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-xs text-chamGold hover:underline"
                >
                  Try registering directly on the official website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </AlertDescription>
            </Alert>
          )}
          
          {networkError && !isForbiddenError && (
            <Alert variant="destructive" className="mt-4">
              <WifiOff className="h-4 w-4" />
              <AlertTitle>Network Error</AlertTitle>
              <AlertDescription>
                <p>{networkError}</p>
                <p className="text-xs mt-2">
                  This is likely due to CORS restrictions. The API server needs to allow requests from your domain.
                  Please contact the API provider or try using a CORS proxy for testing.
                </p>
              </AlertDescription>
            </Alert>
          )}
          
          {apiResponse && !networkError && !isForbiddenError && (
            <Alert className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>API Response</AlertTitle>
              <AlertDescription>
                <div className="max-h-[200px] overflow-auto rounded bg-gray-100 p-2 text-xs">
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
              </AlertDescription>
            </Alert>
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
    </Form>
  );
};
