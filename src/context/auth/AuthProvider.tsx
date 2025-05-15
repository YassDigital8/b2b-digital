
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './types';
import { useAuthState } from './useAuthState';
import { useAuthOperations } from './useAuthOperations';
import { useAppSelector } from '@/redux/useAppSelector';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useAuthState();
  const operations = useAuthOperations(state, setState);
  const { token } = useAppSelector(state => state.auth);

  console.log("Redux token:", token); // Verify token exists

  // Derive computed properties
  // const isAuthenticated = !!state.user && !!state.user.verified;
  const isAuthenticated = true;

  // Create the context value
  const contextValue: AuthContextType = {
    user: state.user,
    isAuthenticated,
    isLoading: state.isLoading,
    needsVerification: state.needsVerification,
    pendingVerificationEmail: state.pendingVerificationEmail,
    ...operations
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
