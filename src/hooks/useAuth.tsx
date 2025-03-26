
import { useAuth as useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useAuth = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const requireAuth = useCallback((redirectTo = '/') => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      navigate(redirectTo, { replace: true });
      return false;
    }
    return true;
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  const redirectIfAuthenticated = useCallback((redirectTo = '/dashboard') => {
    if (auth.isAuthenticated && !auth.isLoading) {
      navigate(redirectTo, { replace: true });
      return true;
    }
    return false;
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  return {
    ...auth,
    requireAuth,
    redirectIfAuthenticated
  };
};
