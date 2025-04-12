
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight, Plane, Shield, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-pattern bg-cover bg-center flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-chamDarkBlue/90 to-chamDarkBlue/50 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mr-auto"
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
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Enhance Travel Experiences with Cham Wings
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
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="/signup">
                <Button size="lg" className="bg-chamGold hover:bg-chamGold/90 text-white w-full sm:w-auto">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 text-white w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Plane className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">Global Flights</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Shield className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">Secure Bookings</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <MapPin className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">Premium Services</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden md:block md:w-2/5 lg:w-1/3 mt-8 md:mt-0"
          >
            <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-chamGold text-white text-xs px-3 py-1 rounded-full">
                B2B Access
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-2">Partner Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-200 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Exclusive airline partnerships</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-200 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Premium transportation services</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-200 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Flexible payment options</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-200 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Dedicated support team</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
