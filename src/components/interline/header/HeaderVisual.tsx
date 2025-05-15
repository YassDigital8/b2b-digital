
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HeaderVisual = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="hidden md:block"
    >
      <div className="rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
        <AspectRatio ratio={4/3} className="bg-white/15 backdrop-blur-md overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-700/40 via-transparent to-amber-400/40"></div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/30">
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
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/70 animate-spin" style={{ animationDuration: '30s' }}></div>
                    <div className="absolute inset-2 rounded-full border border-white/50"></div>
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
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.circle 
                  cx="50" cy="50" r="30" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.25)" 
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
  );
};

export default HeaderVisual;
