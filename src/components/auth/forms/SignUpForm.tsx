
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Terminal, WifiOff, ShieldAlert, ExternalLink } from 'lucide-react';
import { AgencyInfoForm } from './agency/AgencyInfoForm';
import { EmployeeSection } from './employee/EmployeeSection';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { Form } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { createTravelAgentService } from '@/redux/services/authService';
import { useAppSelector } from '@/redux/useAppSelector';
import { signUpFormSchema } from '../hooks/form/signUpFormSchema';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {


  // // Check if the response contains a 403 Forbidden error
  // const isForbiddenError = networkError?.includes('access denied') ||
  //   networkError?.includes('403') ||
  //   apiResponse?.raw?.includes('403 Forbidden') ||
  //   apiResponse?.message?.includes('API access forbidden');

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useAppSelector(state => state.auth);

  const initialValues = {
    name: '',
    email: '',
    agency: '',
    country: 'sy',
    phoneCode: '',
    phoneNumber: '',
    employees: [
      {
        email: '',
        role: '',  // Initialize the role field
        phoneCode: '',
        phoneNumber: '',
      }
    ],
    hasEmployees: false
  };
  const formik = useFormik({
    initialValues,
    validationSchema: signUpFormSchema,
    onSubmit: (values) => {
      const data = {
        travelAgencyName: values.name,
        email: values.email,
        accelAeroUserName: values.agency,
        pos: 'sy',
        phoneNumber: `${values.phoneCode}${values.phoneNumber}`,
        employees: values.hasEmployees
          ? values.employees.map(emp => ({
            employeeEmail: emp.email,
            role: emp.role,
            phoneNumber: `${emp.phoneCode}${emp.phoneNumber}`,
          }))
          : [],
      };
      dispatch(createTravelAgentService(data)).then((action) => {
        if (createTravelAgentService.fulfilled.match(action)) {
          formik.handleReset({} as React.FormEvent);
        }

      })
    },
  });

  useEffect(() => {
    if (!formik.values.hasEmployees) {
      formik.setFieldValue('employees', [
        {
          email: '',
          role: '',  // Initialize the role field
          phoneCode: '',
          phoneNumber: '',
        }
      ]);
    }
  }, [formik.values.hasEmployees]);

  console.log('formikE', formik.errors);


  return (
    // <Form {...form}>
    <form onSubmit={formik.handleSubmit}>
      <CardContent className="space-y-4 pt-4">
        <AgencyInfoForm form={formik} />

        {/* <AgencyInfoForm
            form={form}
            errors={errors}
          /> */}

        <EmployeeSection
          formik={formik}
        />
        {/* 
        <EmployeeSection
          hasEmployees={hasEmployees}
          employees={employees}
          errors={errors}
          onHasEmployeesChange={handleHasEmployeesChange}
          onAddEmployee={addEmployee}
          onRemoveEmployee={removeEmployee}
          onUpdateEmployee={updateEmployee}
        /> */}

        {/* {isForbiddenError && (
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
        )} */}

        {/* {networkError && !isForbiddenError && (
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
        )} */}
      </CardContent>
      <CardFooter className="flex-col">
        <Button
          type="submit"
          className="w-full bg-chamBlue hover:bg-chamBlue/90 py-5 h-auto font-medium"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}

        </Button>

      </CardFooter>
    </form>
    // </Form>
  );
};
