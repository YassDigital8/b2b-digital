
import React from 'react';
import { motion } from 'framer-motion';
import { HeaderBackground, HeaderTitle, HeaderFeatures, HeaderVisual, WaveSeparator } from './header';

const InterlineHeader = () => {
  return (
    <div className="relative overflow-hidden h-80 sm:h-96 md:h-[460px] bg-gradient-to-r from-chamDarkBlue to-blue-700">
      {/* Background effects */}
      <HeaderBackground />
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Header title and text */}
          <HeaderTitle />
          
          {/* Right side - Visual elements */}
          <HeaderVisual />
        </div>
        
        {/* Features list */}
        <HeaderFeatures />
      </div>
      
      {/* Wave separator */}
      <WaveSeparator />
    </div>
  );
};

export default InterlineHeader;
