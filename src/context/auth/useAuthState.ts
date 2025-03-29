
import { useState, useEffect } from 'react';
import { User } from './types';
import { getUserFromStorage } from './authUtils';
import { AuthState } from './useAuthOperations';

export const useAuthState = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    needsVerification: false,
    pendingVerificationEmail: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = getUserFromStorage();
      if (storedUser) {
        // If the user is not verified, set verification states
        if (storedUser.verified === false) {
          setAuthState(prev => ({
            ...prev,
            needsVerification: true,
            pendingVerificationEmail: storedUser.email,
            isLoading: false
          }));
        } else {
          setAuthState(prev => ({
            ...prev,
            user: storedUser,
            isLoading: false
          }));
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  return authState;
};
