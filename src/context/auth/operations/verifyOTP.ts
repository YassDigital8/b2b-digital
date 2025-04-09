
import { toast } from 'sonner';
import { User } from '../types';
import { getUserFromStorage, saveUserToStorage } from '../authUtils';
import { AuthState } from '../useAuthState';

export const verifyOTPOperation = async (
  otp: string,
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
): Promise<void> => {
  setAuthState(prev => ({ ...prev, isLoading: true }));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any 6-digit OTP
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      throw new Error('Invalid OTP format. Please enter 6 digits.');
    }

    // Get the unverified user from storage
    const storedUser = getUserFromStorage();
    if (!storedUser) {
      throw new Error('No pending verification found');
    }
    
    // Update user's verification status
    const verifiedUser: User = {
      ...storedUser,
      verified: true
    };
    
    // Update states
    setAuthState(prev => ({
      ...prev,
      user: verifiedUser,
      needsVerification: false,
      pendingVerificationEmail: null
    }));
    
    // Update storage
    saveUserToStorage(verifiedUser);
    
    // In a real app, you would notify the backend about successful verification
    console.log(`User ${storedUser.email} verified successfully with OTP: ${otp}`);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to verify OTP');
    }
    throw error;
  } finally {
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }
};
