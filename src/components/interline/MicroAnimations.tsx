
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const PlaneAnimation = () => {
  return (
    <div className="absolute top-[40%] right-[5%] opacity-60 hidden lg:block">
      <motion.div
        initial={{ x: -100, y: 50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.7 }}
        transition={{ 
          duration: 2.5,
          ease: "easeOut",
          delay: 0.5
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, -3, 0, 3, 0]
          }}
          transition={{ 
            duration: 6,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <Plane size={48} className="text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const CloudAnimation = ({ delay = 0, position = {} }) => {
  return (
    <motion.div
      className="absolute bg-white/20 rounded-full blur-md"
      style={{ 
        width: '120px', 
        height: '60px',
        ...position
      }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 0.5, x: 0 }}
      transition={{ 
        duration: 1.5,
        delay: delay
      }}
    >
      <motion.div
        animate={{ x: [0, 150, 0] }}
        transition={{ 
          duration: 15 + Math.random() * 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.div>
  );
};

const SearchPulseAnimation = () => {
  return (
    <motion.div 
      className="absolute w-full h-full top-0 left-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div
        className="absolute w-[240px] h-[240px] rounded-full border-2 border-white/20"
        style={{ 
          top: '50%', 
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ 
          duration: 2.5,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      <motion.div
        className="absolute w-[240px] h-[240px] rounded-full border-2 border-white/10"
        style={{ 
          top: '50%', 
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ 
          duration: 2,
          delay: 0.3,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
    </motion.div>
  );
};

const MicroAnimations = () => {
  return (
    <>
      <PlaneAnimation />
      <CloudAnimation position={{ top: '15%', left: '10%' }} delay={0.5} />
      <CloudAnimation position={{ top: '30%', right: '20%' }} delay={1.2} />
      <CloudAnimation position={{ top: '60%', left: '30%' }} delay={2} />
      <SearchPulseAnimation />
    </>
  );
};

export default MicroAnimations;
