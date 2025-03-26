
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const Login = () => {
  const { redirectIfAuthenticated } = useAuth();
  
  useEffect(() => {
    redirectIfAuthenticated('/dashboard');
    window.scrollTo(0, 0);
  }, [redirectIfAuthenticated]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 bg-gradient-to-b from-chamGray to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4">Welcome to Cham Wings Travel Hub</h1>
              <p className="text-gray-600 mb-8">
                Sign in to access your travel agent dashboard and manage your services.
                New to the platform? <Link to="/signup" className="text-chamBlue hover:text-chamGold">Create an account</Link>.
              </p>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                    <span className="text-chamBlue font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-chamDarkBlue">Access Services</h3>
                    <p>Book transportation, top up your account, and manage interline bookings.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                    <span className="text-chamBlue font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-chamDarkBlue">Track Bookings</h3>
                    <p>Monitor your transactions and booking history in real-time.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                    <span className="text-chamBlue font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-chamDarkBlue">Manage Account</h3>
                    <p>Update your profile information and check your account balance.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <AuthModal defaultTab="login" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
