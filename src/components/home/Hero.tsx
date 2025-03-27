
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import HeroScene from '@/components/three/HeroScene';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-pattern bg-cover bg-center flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-chamDarkBlue/80 to-chamDarkBlue/40 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-chamGold/10 backdrop-blur-lg"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.3, 0.2],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 2
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-1 mb-6 bg-chamGold/20 backdrop-blur-sm border border-chamGold/30 rounded-full"
            >
              <span className="text-white font-medium text-sm">Cham Wings Travel Hub for B2B Partners</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Enhance Travel <br className="hidden md:block" />
              <span className="relative">
                Experiences
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-chamGold/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-200 mb-8 max-w-2xl"
            >
              A premium B2B platform for travel agents to manage bookings, arrange transportation, 
              top up accounts, and provide exceptional services to travelers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup">
                <Button size="lg" className="bg-chamGold hover:bg-chamGold/90 text-white relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-chamGold to-yellow-400 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* 3D Scene - Replace the previous pseudo-3D with actual 3D */}
          <motion.div 
            className="hidden md:block h-[500px] w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          >
            <HeroScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
