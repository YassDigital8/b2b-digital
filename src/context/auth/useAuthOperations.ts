
import { 
  LoginFormValues,
  SignUpData
} from './types';
import { 
  loginOperation,
  signUpOperation,
  verifyOTPOperation,
  logoutOperation
} from './operations';
import { AuthState } from './useAuthState';

export interface AuthOperations {
  login: (formData: LoginFormValues) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
}

export const useAuthOperations = (
  authState: AuthState,
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
): AuthOperations => {
  
  const login = async (formData: LoginFormValues) => {
    return loginOperation(formData, setAuthState);
  };

  const signUp = async (userData: SignUpData) => {
    return signUpOperation(userData, setAuthState);
  };

  const verifyOTP = async (otp: string) => {
    return verifyOTPOperation(otp, setAuthState);
  };

  const logout = () => {
    logoutOperation(setAuthState);
  };

  return {
    login,
    signUp,
    verifyOTP,
    logout
  };
};

// Re-export AuthState interface for other files to use
export type { AuthState };
