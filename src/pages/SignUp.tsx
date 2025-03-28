
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
      
      <main 
        className="flex-grow flex items-center justify-center py-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 85, 154, 0.85), rgba(10, 37, 64, 0.9)), url('/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Cham Wings Travel Hub</h1>
              <p className="text-gray-100 mb-8">
                Create your travel agent account to access our exclusive B2B services.
                Already have an account? <Link to="/login" className="text-chamGold hover:text-white transition-colors">Sign in</Link>.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-chamGold flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <AuthModal defaultTab="register" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
