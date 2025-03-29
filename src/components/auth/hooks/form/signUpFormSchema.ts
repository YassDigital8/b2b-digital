
import * as z from 'zod';

// Define schema for the form
export const signUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Agency name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  agency: z.string().min(1, { message: 'AccelAero username is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  phoneCode: z.string().min(1, { message: 'Country code is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
