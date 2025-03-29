
import { z } from 'zod';

// Define schema for employee entries
export const employeeSchema = z.object({
  name: z.string().min(1, { message: 'Employee name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
