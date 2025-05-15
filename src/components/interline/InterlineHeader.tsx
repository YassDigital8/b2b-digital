
import { Plane } from 'lucide-react';
import MicroAnimations from './MicroAnimations';
import { motion } from 'framer-motion';

const InterlineHeader = () => {
  return (
    <div className="h-48 bg-gradient-to-r from-chamDarkBlue via-blue-600 to-blue-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zMCAzMGgzMHYzMEgzMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Add the MicroAnimations component */}
      <MicroAnimations />
      
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <motion.div 
          className="text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center gap-2 mb-3 backdrop-blur-sm bg-white/15 py-2 px-4 rounded-full inline-block border border-white/20 shadow-sm"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.2)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Plane className="h-5 w-5 text-chamGold" />
            </motion.div>
            <h1 className="text-2xl font-semibold font-display text-white drop-shadow-md">Interline Booking</h1>
          </motion.div>
          <motion.p 
            className="text-white font-medium text-sm max-w-xl ml-1 drop-shadow-md bg-chamGold/20 px-4 py-1.5 rounded-lg inline-block border border-chamGold/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Book connecting flights with Cham Wings and partner airlines
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default InterlineHeader;
