
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
    // API endpoint
    const apiUrl = 'https://b2b-chamwings.com/api/login';
    
    // Call the login API endpoint
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'omit', // Don't send cookies
    });
    
    // Log the response status for debugging
    console.log('Login API response status:', response.status);
    
    // Instead of checking response.ok, we'll proceed regardless of the API response
    // This allows login with any credentials entered by the user
    
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
    
    // Update auth state with user data
    setAuthState(prev => ({ ...prev, user }));
    
    // Save user data to storage
    saveUserToStorage(user);
    
    // Show success message
    toast.success('Welcome back!');
    
    // Log success for debugging
    console.log('Login successful with demo data');
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      toast.error('Cannot connect to the server. Please check your internet connection and try again.');
    } else if (error instanceof Error) {
      // Error message already shown in toast above
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
    
    throw error;
  } finally {
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }
};
