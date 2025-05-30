
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'admin' | 'manager' | 'accountant' | 'supervisor' | 'other';
  agency?: string;
  country?: string;
  phone?: string;
  balance: number;
  managerId?: string;
  verified?: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface VerifyOTPValues {
  otp: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsVerification: boolean;
  pendingVerificationEmail: string | null;
  login: (formData: LoginFormValues) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
}

export interface SignUpData {
  name: string;
  email: string;
  password?: string; // Made optional since it will be auto-generated
  agency: string;
  country: string;
  phone?: string;
  employees?: (EmployeeData & { phone?: string })[];
}

export interface EmployeeSignUpData extends EmployeeData {
  phone?: string;
}

// Re-export this interface from auth constants
import { EmployeeData } from '@/components/auth/utils/authConstants';
export type { EmployeeData };
