
import React from 'react';
import { Formik, FormikProps, Form } from 'formik';
import { bookingFormSchema } from './validationSchema';
import { Passenger, ContactInformation } from './types';

export interface BookingFormValues {
  passengers: Passenger[];
  contactInformation: ContactInformation;
}

interface FormProviderProps {
  initialValues: BookingFormValues;
  onSubmit: (values: BookingFormValues) => void;
  children: (formikProps: FormikProps<BookingFormValues>) => React.ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ 
  initialValues, 
  onSubmit, 
  children 
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookingFormSchema}
      onSubmit={(values, actions) => {
        console.log('Form submitted with values:', values);
        onSubmit(values);
        actions.setSubmitting(false);
      }}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {(formikProps) => (
        <Form className="h-full">
          {children(formikProps)}
        </Form>
      )}
    </Formik>
  );
};

export default FormProvider;
