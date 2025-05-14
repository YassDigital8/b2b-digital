
import { Plane } from 'lucide-react';

const InterlineHeader = () => {
  return (
    <div className="h-48 bg-gradient-to-r from-chamDarkBlue to-chamBlue relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="text-white">
          <div className="flex items-center gap-2 mb-1">
            <Plane className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Interline Booking</h1>
          </div>
          <p className="text-white/80 text-sm max-w-xl">
            Book connecting flights with Cham Wings and partner airlines
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterlineHeader;
