
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Login = () => {
  const { redirectIfAuthenticated } = useAuth();
  const { language, t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  useEffect(() => {
    redirectIfAuthenticated('/dashboard');
    window.scrollTo(0, 0);
  }, [redirectIfAuthenticated]);
  
  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 bg-gradient-to-b from-chamGray to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4">
                {isRTL ? 'مرحبًا بك في مركز سفر أجنحة الشام' : 'Welcome to Cham Wings Travel Hub'}
              </h1>
              <p className="text-gray-600 mb-8">
                {isRTL 
                  ? 'قم بتسجيل الدخول للوصول إلى لوحة تحكم وكيل السفر الخاصة بك وإدارة خدماتك. جديد على المنصة؟ ' 
                  : 'Sign in to access your travel agent dashboard and manage your services. New to the platform? '}
                <Link to="/signup" className="text-chamBlue hover:text-chamGold">
                  {isRTL ? 'إنشاء حساب' : 'Create an account'}
                </Link>.
              </p>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                    <span className="text-chamBlue font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-chamDarkBlue">
                      {isRTL ? 'الوصول إلى الخدمات' : 'Access Services'}
                    </h3>
                    <p>
                      {isRTL 
                        ? 'احجز وسائل النقل، واشحن حسابك، وأدر حجوزات الخطوط المشتركة.'
                        : 'Book transportation, top up your account, and manage interline bookings.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                    <span className="text-chamBlue font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-chamDarkBlue">
                      {isRTL ? 'تتبع الحجوزات' : 'Track Bookings'}
                    </h3>
                    <p>
                      {isRTL 
                        ? 'راقب معاملاتك وتاريخ الحجز في الوقت الفعلي.'
                        : 'Monitor your transactions and booking history in real-time.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                    <span className="text-chamBlue font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-chamDarkBlue">
                      {isRTL ? 'إدارة الحساب' : 'Manage Account'}
                    </h3>
                    <p>
                      {isRTL 
                        ? 'قم بتحديث معلومات ملفك الشخصي وتحقق من رصيد حسابك.'
                        : 'Update your profile information and check your account balance.'}
                    </p>
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
