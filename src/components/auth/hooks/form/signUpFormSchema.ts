import * as yup from 'yup';

export const employeeSchema = yup.object({
  email: yup
    .string()
    .email('Valid employee email is required')
    .required('Employee email is required'),
  role: yup.string().required('Employee role is required'),
  phoneCode: yup.string().required('Phone code is required'),
  phoneNumber: yup.string().required('Phone number is required'),
});

export const signUpFormSchema = yup.object({
  name: yup.string().required('Agency name is required'),
  email: yup.string().email('Valid email is required').required('Email is required'),
  agency: yup.string().required('AccelAero username is required'),
  country: yup.string().required('Country is required'),
  phoneCode: yup.string().required('Country code is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  hasEmployees: yup.boolean().required(),
  employees: yup.lazy((value, context) => {
    const hasEmployees = context.parent.hasEmployees;  // Access the parent object for hasEmployees

    if (hasEmployees) {
      return yup
        .array()
        .of(employeeSchema)
        .min(1, 'At least one employee is required');
    }
    return yup.mixed().notRequired();
  }),
});
;
