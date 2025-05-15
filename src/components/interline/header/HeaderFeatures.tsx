
import { motion } from 'framer-motion';
import { Search, Map, Calendar, Clock } from 'lucide-react';

const features = [
  { icon: Search, text: 'Find best routes' },
  { icon: Map, text: 'Global destinations' },
  { icon: Calendar, text: 'Flexible dates' },
  { icon: Clock, text: 'Real-time availability' }
];

const HeaderFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-wrap gap-4 md:gap-6"
    >
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
        >
          <feature.icon className="h-4 w-4 text-chamGold" />
          <span className="text-sm font-medium text-white">{feature.text}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default HeaderFeatures;
