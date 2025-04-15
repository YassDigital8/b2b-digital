import { z } from 'zod';

export const employeeSchema = z.object({
  email: z.string().email({ message: 'Valid employee email is required' }),
  role: z.string().min(1, { message: 'Employee role is required' }),
  phoneCode: z.string().min(1, { message: 'Phone code is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
});