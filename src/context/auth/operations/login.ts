
import { toast } from 'sonner';
import { User, LoginFormValues } from '../types';
import { saveUserToStorage } from '../authUtils';
import { AuthState } from '../useAuthState';

export const loginOperation = async (
  formData: LoginFormValues,
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
): Promise<void> => {
  const { email, password } = formData;
  
  if (!email || !password) {
    toast.error('Email and password are required');
    throw new Error('Email and password are required');
  }
  
  setAuthState(prev => ({ ...prev, isLoading: true }));
  
  try {
    // Create a default user object based on the input email
    const user: User = {
      id: String(Date.now()), // Generate a temporary ID
      name: email.split('@')[0], // Use part of the email as the name
      email: email,
      role: 'agent',
      agency: 'Demo Agency',
      country: 'Syria',
      phone: '+963123456789',
      balance: 5000, // Demo balance
      verified: true
    };
    
    // Simulate a network delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update auth state with user data
    setAuthState(prev => ({ ...prev, user }));
    
    // Save user data to storage
    saveUserToStorage(user);
    
    // Show success message
    toast.success('Welcome back!');
    
    console.log('Login successful with demo data');
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof Error) {
      toast.error(error.message || 'Failed to login. Please try again.');
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
    
    throw error;
  } finally {
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }
};
