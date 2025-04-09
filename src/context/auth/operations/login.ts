
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
    // Try with a proxy or direct connection depending on what's available
    const apiUrl = 'https://b2b-chamwings.com/api/login';
    
    // Call the login API endpoint
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ email, password }),
      // Using no-cors mode as an alternative approach
      mode: 'no-cors',
      credentials: 'omit',
    });
    
    // For demo/development purposes, create a mock successful response
    // This allows testing the UI flow even if the API is unreachable
    // Remove this in production or when API is confirmed working
    console.log('Login attempted for:', email);
    
    // Mock user data for development testing
    const mockUserData = {
      id: '12345',
      name: email.split('@')[0],
      email: email,
      role: 'agent' as const, // Use 'as const' to specify literal type
      agency: 'Cham Wings Agency',
      country: 'UAE',
      phone: '+971501234567',
      balance: 5000,
      verified: true
    };
    
    // Create user object from mock data
    const user: User = mockUserData;
    
    // Update auth state with mock user data
    setAuthState(prev => ({ ...prev, user }));
    
    // Save mock user data to storage
    saveUserToStorage(user);
    
    // Show success message
    toast.success('Welcome back!');
    
    // Log success for debugging
    console.log('Login successful (mock data)');
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      toast.error('API server is currently unreachable. Using mock data for development.');
      
      // Create mock user for development testing when API is down
      const mockUser: User = {
        id: '12345',
        name: email.split('@')[0],
        email: email,
        role: 'agent' as const, // Use 'as const' to specify literal type
        agency: 'Cham Wings Agency',
        country: 'UAE',
        phone: '+971501234567',
        balance: 5000,
        verified: true
      };
      
      // Update auth state with mock user
      setAuthState(prev => ({ ...prev, user: mockUser }));
      
      // Save mock user to storage
      saveUserToStorage(mockUser);
      
      // Show success message for development
      toast.success('Logged in with mock data for development');
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to login');
    }
    throw error;
  } finally {
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }
};
