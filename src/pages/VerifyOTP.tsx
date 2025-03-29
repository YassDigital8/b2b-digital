
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits' }),
});

type VerifyOTPFormValues = z.infer<typeof formSchema>;

const VerifyOTP = () => {
  const { isLoading, needsVerification, pendingVerificationEmail, verifyOTP, logout } = useAuth();
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  
  const form = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });
  
  useEffect(() => {
    // If no verification is needed, redirect to dashboard or login
    if (!needsVerification) {
      navigate('/login');
    }
  }, [needsVerification, navigate]);
  
  const onSubmit = async (data: VerifyOTPFormValues) => {
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
      setResendLoading(true);
      // In a real app, you would make an API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('OTP has been resent to your email');
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };
  
  if (!needsVerification || !pendingVerificationEmail) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 bg-gradient-to-b from-chamGray to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="border-none shadow-soft">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-chamBlue mb-2">
                  Verify Your Email
                </CardTitle>
                <CardDescription>
                  Enter the 6-digit code sent to {pendingVerificationEmail}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={6}
                        value={form.watch("otp")}
                        onChange={(value) => form.setValue("otp", value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    {form.formState.errors.otp && (
                      <p className="text-destructive text-center text-sm">
                        {form.formState.errors.otp.message}
                      </p>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-chamBlue hover:bg-chamBlue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : 'Verify OTP'}
                    </Button>
                  </form>
                </Form>
                
                <div className="flex flex-col items-center gap-2 text-sm">
                  <p className="text-gray-500">Didn't receive the code?</p>
                  <Button 
                    variant="link" 
                    className="text-chamBlue hover:text-chamGold"
                    onClick={handleResendOTP}
                    disabled={resendLoading}
                  >
                    {resendLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : 'Resend Code'}
                  </Button>
                  
                  <Button 
                    variant="link" 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                  >
                    Use a different account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyOTP;
