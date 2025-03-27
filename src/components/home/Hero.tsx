
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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
              z: Math.random() * 10 - 20
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
          
          {/* 3D elements container - right side */}
          <motion.div 
            className="hidden md:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* 3D floating elements */}
              <motion.div 
                className="absolute glass-effect rounded-2xl w-64 h-64 bg-gradient-to-br from-white/10 to-white/5"
                animate={{ 
                  rotateY: [0, 10, 0],
                  rotateX: [0, 15, 0],
                  z: [0, 30, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="absolute inset-0 rounded-2xl border border-white/20 backdrop-blur-md" />
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-chamGold/30" />
                <div className="absolute bottom-6 right-6 w-16 h-16 rounded-lg bg-chamBlue/30" />
              </motion.div>
              
              <motion.div 
                className="absolute top-20 right-10 glass-effect rounded-2xl w-48 h-48 bg-gradient-to-br from-chamBlue/10 to-chamBlue/5"
                animate={{ 
                  rotateY: [0, -15, 0],
                  rotateX: [0, -10, 0],
                  z: [0, 20, 0],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 1
                }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="absolute inset-0 rounded-2xl border border-white/20 backdrop-blur-md" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-chamGold/20" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 left-20 glass-effect rounded-full w-32 h-32 bg-gradient-to-br from-chamGold/10 to-chamGold/5"
                animate={{ 
                  y: [0, -15, 0],
                  rotateZ: [0, 10, 0],
                  z: [0, 10, 0],
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 2
                }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="absolute inset-0 rounded-full border border-white/20 backdrop-blur-md" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
