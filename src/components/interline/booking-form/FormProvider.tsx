
import React from 'react';
import { useFormik, FormikConfig, FormikProps } from 'formik';

interface FormProviderProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema?: any;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
}

function FormProvider<T>({ initialValues, onSubmit, validationSchema, children }: FormProviderProps<T>) {
  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="h-full">
      {children(formik)}
    </form>
  );
}

export default FormProvider;
