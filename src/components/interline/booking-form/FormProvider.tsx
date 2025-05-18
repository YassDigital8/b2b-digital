
import React from 'react';
import { useFormik, FormikConfig, FormikProps } from 'formik';
import { FormProvider as HookFormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';

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
  
  // Create a fully initialized react-hook-form instance for shadcn/ui compatibility
  // This is crucial for the shadcn/ui Form components to work properly
  const methods = useForm({
    // We need to provide default values to avoid the 'null' error
    defaultValues: {},
    // This is important for the Form components to render without errors
    mode: "onBlur"
  });

  return (
    <HookFormProvider {...methods}>
      <form onSubmit={formik.handleSubmit} className="h-full">
        {children(formik)}
      </form>
    </HookFormProvider>
  );
}

export default FormProvider;
