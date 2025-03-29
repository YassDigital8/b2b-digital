
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { OTPFormValues, otpFormSchema } from './OTPInputSection';

export const useOTPVerification = () => {
  const navigate = useNavigate();
  const { isLoading, needsVerification, pendingVerificationEmail, verifyOTP, logout } = useAuth();
  const [isResending, setIsResending] = useState(false);
  
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
    },
  });
  
  const onSubmit = async (data: OTPFormValues) => {
    try {
      await verifyOTP(data.otp);
      toast.success('Email verified successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to verify OTP');
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      // In a real app, you would make an API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('OTP has been resent to your email');
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };
  
  const handleUseAnotherAccount = () => {
    logout();
    navigate('/login');
  };
  
  return {
    form,
    isLoading,
    needsVerification,
    pendingVerificationEmail,
    onSubmit: form.handleSubmit(onSubmit),
    handleResendOTP,
    handleUseAnotherAccount,
    isResending
  };
};
