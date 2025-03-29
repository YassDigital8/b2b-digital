
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { motion } from 'framer-motion';
import OTPInputSection from '@/components/auth/otp/OTPInputSection';
import OTPHeader from '@/components/auth/otp/OTPHeader';
import OTPActions from '@/components/auth/otp/OTPActions';
import { useOTPVerification } from '@/components/auth/otp/useOTPVerification';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const {
    form,
    isLoading,
    needsVerification,
    pendingVerificationEmail,
    onSubmit,
    handleResendOTP,
    handleUseAnotherAccount
  } = useOTPVerification();
  
  useEffect(() => {
    // If no verification is needed, redirect to login
    if (!needsVerification) {
      navigate('/login');
    }
  }, [needsVerification, navigate]);
  
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
                <OTPHeader email={pendingVerificationEmail} />
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={onSubmit} className="space-y-6">
                    <OTPInputSection form={form} />
                    
                    <OTPActions 
                      isLoading={isLoading}
                      onSubmit={onSubmit}
                      onResend={handleResendOTP}
                      onChangeAccount={handleUseAnotherAccount}
                    />
                  </form>
                </Form>
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
