
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const HeaderTitle = () => {
  return (
    <>
      <motion.div 
        className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.2)" }}
      >
        <Plane className="h-5 w-5 text-chamGold" />
        <span className="text-2xl md:text-3xl font-semibold font-display text-white drop-shadow-md">Interline Booking</span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg"
      >
        Connect Your <span className="text-chamGold">Journey</span><br />
        Across the World
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-md text-lg text-white bg-chamBlue/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/30 shadow-lg"
      >
        Book seamless connections with Cham Wings and our trusted airline partners for your global travel needs.
      </motion.p>
    </>
  );
};

export default HeaderTitle;
