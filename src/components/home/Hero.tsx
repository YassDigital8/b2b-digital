
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight, Plane, Shield, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-hero-pattern bg-cover bg-center flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-chamDarkBlue/90 to-chamDarkBlue/80"></div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 lg:w-3/5"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-1 mb-6 bg-chamGold/30 backdrop-blur-sm border border-chamGold/30 rounded-full"
            >
              <span className="text-white font-medium text-sm">B2B Platform for Travel Professionals</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Your Partner in <span className="text-chamGold">Global Air Travel</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-100 mb-8 max-w-2xl"
            >
              Cham Wings Travel Hub provides travel agencies with premium booking solutions, seamless 
              interline connections, and exclusive services to elevate your business.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="/signup">
                <Button size="lg" className="bg-chamGold hover:bg-chamGold/90 text-white w-full sm:w-auto font-medium">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 text-white w-full sm:w-auto font-medium">
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
                <span className="text-white text-sm">Global Network</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Shield className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">Secure Bookings</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <Globe className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden md:block w-full md:w-1/2 lg:w-2/5"
          >
            <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute -top-3 -right-3 bg-chamGold text-white text-xs px-3 py-1 rounded-full">
                Travel Partners
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-2">Agency Advantages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-white text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Competitive airline fares worldwide</span>
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Streamlined interline booking process</span>
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Premium ground transportation options</span>
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                      <span>Dedicated B2B support channels</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4">
                  <Link to="/signup" className="block w-full">
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium">
                      Become a Partner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
