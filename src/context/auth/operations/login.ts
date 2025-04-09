
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
    // Call the login API endpoint with the updated URL
    const response = await fetch('https://b2b-chamwings.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid email or password');
    }
    
    const userData = await response.json();
    
    // Transform API response to user object
    const user: User = {
      id: userData.id || userData.user_id || String(userData.user_id),
      name: userData.name || userData.travel_agent_office || '',
      email: userData.email || email,
      role: userData.role || 'agent',
      agency: userData.agency || userData.user_name || '',
      country: userData.country || userData.pos || '',
      phone: userData.phone || '',
      balance: userData.balance || 0,
      verified: true // User is verified since they logged in successfully
    };
    
    // Update auth state with user data
    setAuthState(prev => ({ ...prev, user }));
    
    // Save user data to storage
    saveUserToStorage(user);
    
    // Show success message
    toast.success('Welcome back!');
    
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to login');
    }
    throw error;
  } finally {
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }
};
