
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
    
    // Check if response is ok
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || 'Login failed. Please check your credentials.';
      } catch (e) {
        errorMessage = `Login failed with status ${response.status}`;
      }
      
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Parse the successful response
    const userData = await response.json();
    console.log('Login API response data:', userData);
    
    // Create user object from API response
    const user: User = {
      id: userData.id || userData.userId || String(Date.now()), // Fallback if ID is not provided
      name: userData.name || email.split('@')[0],
      email: email,
      role: userData.role || 'agent',
      agency: userData.agency || userData.agencyName,
      country: userData.country,
      phone: userData.phone || userData.phoneNumber,
      balance: userData.balance || 0,
      verified: true
    };
    
    // Update auth state with user data
    setAuthState(prev => ({ ...prev, user }));
    
    // Save user data to storage
    saveUserToStorage(user);
    
    // Show success message
    toast.success('Welcome back!');
    
    // Log success for debugging
    console.log('Login successful with API data');
    
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
