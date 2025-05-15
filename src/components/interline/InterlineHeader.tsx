
import { motion } from 'framer-motion';
import { Plane, Search, Map, Calendar, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const InterlineHeader = () => {
  return (
    <div className="relative">
      {/* Header Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900 overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zMCAzMGgzMHYzMEgzMHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Animated Planes */}
        <motion.div 
          className="absolute -top-5 right-[20%]"
          initial={{ x: -80, y: 40, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0], 
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <Plane className="text-white/30 h-20 w-20" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-[15%]"
          initial={{ x: 80, y: -40, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.7 }}
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0], 
              rotate: [0, -3, 0, 3, 0]
            }}
            transition={{ 
              duration: 10, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: 1 
            }}
          >
            <Plane className="text-white/20 h-12 w-12" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Plane className="h-5 w-5 text-amber-300" />
              <h1 className="text-2xl md:text-3xl font-semibold font-display text-white drop-shadow-md">Interline Booking</h1>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg"
            >
              Connect Your <span className="text-amber-300">Journey</span><br />
              Across the World
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-md text-lg text-white/90 bg-violet-800/20 backdrop-blur-sm px-5 py-3 rounded-lg border border-violet-300/30 shadow-lg"
            >
              Book seamless connections with Cham Wings and our trusted airline partners for your global travel needs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Search className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-medium">Find best routes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Map className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-medium">Global destinations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Calendar className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-medium">Flexible dates</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Clock className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-medium">Real-time availability</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hidden md:block"
          >
            <div className="rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <AspectRatio ratio={4/3} className="bg-white/10 backdrop-blur-md overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-600/30 via-transparent to-amber-300/30"></div>
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/5 backdrop-blur-lg flex items-center justify-center border border-white/20">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 360] 
                          }}
                          transition={{ 
                            scale: {
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse"
                            },
                            rotate: {
                              duration: 60,
                              repeat: Infinity,
                              ease: "linear"
                            }
                          }}
                          className="relative w-24 h-24 md:w-36 md:h-36"
                        >
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/50 animate-spin" style={{ animationDuration: '30s' }}></div>
                          <div className="absolute inset-2 rounded-full border border-white/30"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Plane className="h-10 w-10 md:h-16 md:w-16 text-amber-300" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                      <motion.circle 
                        cx="50" cy="50" r="30" 
                        fill="none" 
                        stroke="rgba(255,255,255,0.15)" 
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.3 }}
                      />
                    </svg>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,96C672,117,768,139,864,133.3C960,128,1056,96,1152,80C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default InterlineHeader;
