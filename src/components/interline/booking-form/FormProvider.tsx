
import React from 'react';
import { FormikProps } from 'formik';

interface FormProviderProps {
  formik: FormikProps<any>;
  children: React.ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ formik, children }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="h-full">
      {children}
    </form>
  );
};

export default FormProvider;
