
// Re-export everything from the auth folder for backward compatibility
import { 
  AuthProvider, 
  useAuthContext,
  User,
  AuthContextType,
  SignUpData,
  EmployeeData,
  EmployeeSignUpData
} from './auth';

export { AuthProvider };
export { useAuthContext as useAuth };
export type { 
  User, 
  AuthContextType, 
  SignUpData, 
  EmployeeData, 
  EmployeeSignUpData 
};
