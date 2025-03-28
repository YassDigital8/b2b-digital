
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SignUp = () => {
  const { redirectIfAuthenticated } = useAuth();
  
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-20 bg-gradient-to-br from-white via-chamGray to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-chamBlue mb-6 leading-tight">
                Join Cham Wings <span className="text-chamGold">Travel Hub</span>
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Create your travel agent account to access our exclusive B2B services.
                Already have an account? <Link to="/login" className="text-chamBlue hover:text-chamGold transition-colors font-medium underline underline-offset-4">Sign in</Link>.
              </p>
              
              <div className="space-y-4 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-chamGold flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-white to-chamBlue/10 rounded-xl blur-lg"></div>
                <AuthModal defaultTab="register" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
