
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight, Plane, Shield, Globe, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-chamDarkBlue via-chamDarkBlue/95 to-chamDarkBlue/90 flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png')] bg-no-repeat bg-center opacity-5 bg-contain"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute -right-64 top-20 w-96 h-96 bg-chamGold/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-32 top-80 w-80 h-80 bg-chamBlue/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-5 py-2 mb-6 bg-chamGold/30 border border-chamGold/30 rounded-full"
            >
              <span className="text-white font-medium">B2B Platform for Travel Professionals</span>
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Your Partner in <span className="text-chamGold">Global Air Travel</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Cham Wings Travel Hub provides travel agencies with premium booking solutions, seamless 
              interline connections, and exclusive services to elevate your business.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
            >
              <Link to="/signup">
                <Button size="lg" className="bg-chamGold hover:bg-chamGold/90 text-white w-full sm:w-auto font-medium px-8">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white bg-white/10 text-white w-full sm:w-auto font-medium hover:bg-white/20">
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
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <Plane className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">Global Network</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <Shield className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">Secure Bookings</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <Globe className="h-5 w-5 text-chamGold" />
                <span className="text-white text-sm">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full lg:w-2/5 hidden lg:block"
          >
            <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute -top-4 -right-4 bg-chamGold text-white px-4 py-2 rounded-md font-medium">
                Premium Services
              </div>
              
              <h3 className="text-white text-xl font-bold mb-6">Travel Agency Benefits</h3>
              
              <div className="space-y-5">
                {[
                  { icon: Plane, text: "Exclusive airline partnerships" },
                  { icon: MapPin, text: "Premium ground transportation" },
                  { icon: Globe, text: "Global booking platform" },
                  { icon: Shield, text: "24/7 dedicated support" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (i * 0.1), duration: 0.5 }}
                    className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10"
                  >
                    <div className="bg-chamGold/20 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-chamGold" />
                    </div>
                    <span className="text-white">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link to="/signup" className="block w-full">
                  <Button className="w-full bg-white hover:bg-white/90 text-chamDarkBlue font-medium">
                    Join Our Network
                  </Button>
                </Link>
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
