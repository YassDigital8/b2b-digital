
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, X, ArrowRight, Plane, MapPin } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsAnnouncementProps {
  title: string;
  content: string;
  onDismiss?: () => void;
}

const NewsAnnouncement = ({ title, content, onDismiss }: NewsAnnouncementProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  useEffect(() => {
    if (textRef.current && containerRef.current) {
      setContentWidth(textRef.current.scrollWidth);
      setContainerWidth(containerRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (textRef.current && containerRef.current) {
        setContentWidth(textRef.current.scrollWidth);
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [content]);

  const needsAnimation = contentWidth > containerWidth;

  // Process the content to add icons
  const processedContent = content.split('|').map((item, index) => {
    const trimmedItem = item.trim();
    
    // Select an appropriate icon based on the content
    let Icon = Plane; // Default icon - using Plane instead of Airplane
    
    if (trimmedItem.toLowerCase().includes('hub') || trimmedItem.toLowerCase().includes('booking')) {
      Icon = MapPin;
    }
    
    return (
      <span key={index} className="flex items-center gap-2 mx-3 first:ml-0">
        {index > 0 && <span className="text-gray-400 mx-1">•</span>}
        <Icon className="h-4 w-4 text-chamBlue shrink-0" />
        <span>{trimmedItem}</span>
      </span>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Alert className="bg-chamBlue/10 border border-chamBlue/20 mb-6 relative overflow-hidden">
        <div className="flex items-center" ref={containerRef}>
          <div className="flex items-center gap-2 min-w-max pr-3">
            <Newspaper className="h-5 w-5 text-chamBlue shrink-0" />
            <AlertTitle className="text-chamDarkBlue font-semibold shrink-0">{title}</AlertTitle>
            <Badge variant="default" className="bg-chamBlue text-white text-xs px-2 py-0.5 shrink-0">New</Badge>
            <ArrowRight className="h-4 w-4 text-chamBlue animate-pulse shrink-0" />
          </div>
          
          <div className="overflow-hidden flex-1 relative">
            {needsAnimation ? (
              <div className="whitespace-nowrap text-gray-700 font-medium inline-flex">
                <motion.div
                  animate={{
                    x: [0, -contentWidth],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: contentWidth * 0.02,
                      ease: "linear",
                    },
                  }}
                  className="inline-flex items-center"
                >
                  {processedContent}
                </motion.div>
                <motion.div
                  animate={{
                    x: [0, -contentWidth],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: contentWidth * 0.02,
                      ease: "linear",
                    },
                  }}
                  className="inline-flex items-center"
                  style={{ marginLeft: 50 }} // Add some spacing between repeated content
                >
                  {processedContent}
                </motion.div>
              </div>
            ) : (
              <div ref={textRef} className="whitespace-nowrap text-gray-700 font-medium inline-flex items-center">
                {processedContent}
              </div>
            )}
          </div>
        </div>
        
        {onDismiss && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onDismiss}
            className="absolute top-2 right-2 h-6 w-6 text-gray-500 hover:text-gray-700 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </Alert>
    </motion.div>
  );
};

export default NewsAnnouncement;
