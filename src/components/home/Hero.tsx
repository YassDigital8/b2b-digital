
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { language, t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  return (
    <section className="relative min-h-screen bg-hero-pattern bg-cover bg-center flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-chamDarkBlue/80 to-chamDarkBlue/40 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`max-w-3xl ${isRTL ? 'mr-0 ml-auto text-right' : 'mx-0 md:mx-0'}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1 mb-6 bg-chamGold/20 backdrop-blur-sm border border-chamGold/30 rounded-full"
          >
            <span className="text-white font-medium text-sm">
              {isRTL ? 'مركز سفر أجنحة الشام للشركاء' : 'Cham Wings Travel Hub for B2B Partners'}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {isRTL ? 'تحسين تجارب السفر مع أجنحة الشام' : 'Enhance Travel Experiences with Cham Wings'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-200 mb-8 max-w-2xl"
          >
            {isRTL 
              ? 'منصة متميزة للشركات لوكلاء السفر لإدارة الحجوزات وترتيب وسائل النقل وشحن الحسابات وتقديم خدمات استثنائية للمسافرين.' 
              : 'A premium B2B platform for travel agents to manage bookings, arrange transportation, top up accounts, and provide exceptional services to travelers.'}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/signup">
              <Button size="lg" className="bg-chamGold hover:bg-chamGold/90 text-white">
                {isRTL ? 'ابدأ الآن' : 'Get Started'}
                {isRTL ? <ChevronLeft className="mr-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                {isRTL ? 'تسجيل الدخول' : 'Sign In'}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
