
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import CtaSection from '@/components/home/CtaSection';
import { motion, useScroll, useTransform } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <motion.div style={{ opacity, scale }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-chamBlue/10 to-transparent" />
      </motion.div>

      <Navbar />
      
      <main>
        <Hero />
        <FeaturedServices />
        <FeaturesSection />
        <TestimonialsSection />
        <PartnersSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
