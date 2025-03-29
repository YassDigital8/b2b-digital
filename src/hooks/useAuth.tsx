
import { useAuth as useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useAuth = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const requireAuth = useCallback((redirectTo = '/') => {
    if (auth.needsVerification) {
      navigate('/verify-otp', { replace: true });
      return false;
    }
    
    if (!auth.isAuthenticated && !auth.isLoading) {
      navigate(redirectTo, { replace: true });
      return false;
    }
    return true;
  }, [auth.isAuthenticated, auth.isLoading, auth.needsVerification, navigate]);

  const redirectIfAuthenticated = useCallback((redirectTo = '/dashboard') => {
    if (auth.needsVerification) {
      navigate('/verify-otp', { replace: true });
      return true;
    }
    
    if (auth.isAuthenticated && !auth.isLoading) {
      navigate(redirectTo, { replace: true });
      return true;
    }
    return false;
  }, [auth.isAuthenticated, auth.isLoading, auth.needsVerification, navigate]);

  return {
    ...auth,
    requireAuth,
    redirectIfAuthenticated
  };
};
