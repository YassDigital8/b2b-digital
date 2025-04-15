import * as yup from 'yup';

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .email('Valid email is required')  // Check if the email is valid
    .required('Email is required'),   // Email is a required field

  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')  // Minimum password length
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character')  // At least one special character
    .required('Password is required'),  // Password is a required field
});
