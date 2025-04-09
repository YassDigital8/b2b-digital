
import { toast } from 'sonner';
import { removeUserFromStorage } from '../authUtils';
import { AuthState } from '../useAuthState';

export const logoutOperation = (
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
): void => {
  setAuthState({
    user: null,
    isLoading: false,
    needsVerification: false,
    pendingVerificationEmail: null
  });
  removeUserFromStorage();
  toast.info('You have been logged out');
};
