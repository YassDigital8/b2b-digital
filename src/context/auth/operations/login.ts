
import { toast } from 'sonner';
import { User, LoginFormValues } from '../types';
import { saveUserToStorage } from '../authUtils';
import { AuthState } from '../useAuthState';

export const loginOperation = async (
  formData: LoginFormValues,
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
): Promise<void> => {
  const { email, password } = formData;
  setAuthState(prev => ({ ...prev, isLoading: true }));
  
  try {
    const apiUrl = 'https://b2b-chamwings.com/api/login';
    
    // Call the login API endpoint with proper CORS handling
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      // Remove no-cors mode to allow proper response handling
      credentials: 'include',
    });
    
    console.log('Login API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'Login failed. Please check your credentials and try again.'
      }));
      
      throw new Error(errorData.message || 'Login failed');
    }
    
    const userData = await response.json().catch(() => null);
    
    if (!userData || !userData.id) {
      throw new Error('Invalid response from server');
    }
    
    // Create user object from API response
    const user: User = {
      id: userData.id,
      name: userData.name || email.split('@')[0],
      email: userData.email || email,
      role: userData.role || 'agent',
      agency: userData.agency || '',
      country: userData.country || '',
      phone: userData.phone || '',
      balance: userData.balance || 0,
      verified: userData.verified !== false
    };
    
    // Update auth state with user data
    setAuthState(prev => ({ ...prev, user }));
    
    // Save user data to storage
    saveUserToStorage(user);
    
    // Show success message
    toast.success('Welcome back!');
    console.log('Login successful with API data');
    
  } catch (error) {
    console.error('Login error:', error);
    
    // Don't fall back to mock data anymore
    if (error instanceof Error) {
      toast.error(error.message || 'Failed to login');
    } else {
      toast.error('Failed to login. Please try again');
    }
    throw error;
  } finally {
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }
};
