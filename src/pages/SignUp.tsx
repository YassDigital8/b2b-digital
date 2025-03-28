
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SignUp = () => {
  const { redirectIfAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('register');
  
  useEffect(() => {
    redirectIfAuthenticated('/dashboard');
    window.scrollTo(0, 0);
  }, [redirectIfAuthenticated]);
  
  const benefits = [
    'Exclusive access to Cham Wings B2B services',
    'Book Ya Marhaba transportation across Syrian cities',
    'Arrange limousine services for Business Class passengers in UAE',
    'Top up your account through multiple payment channels',
    'Book interline tickets with partner airlines',
    'Track all your bookings and transactions'
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-chamGray/30 to-chamLightGold/10">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md"
            >
              {activeTab === 'register' ? (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-6">
                    <span className="bg-gradient-to-r from-chamBlue to-chamDarkBlue bg-clip-text text-transparent">
                      Join Cham Wings Travel Hub
                    </span>
                  </h1>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Create your travel agent account to access our exclusive B2B services.
                    Already have an account? <Link to="/login" className="text-chamBlue font-medium hover:text-chamGold transition-colors underline underline-offset-4">Sign in</Link>.
                  </p>
                  
                  <div className="space-y-4 bg-white/50 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-chamDarkBlue mb-3">Business Benefits</h3>
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-chamGold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <AuthModal defaultTab="register" onTabChange={setActiveTab} />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
