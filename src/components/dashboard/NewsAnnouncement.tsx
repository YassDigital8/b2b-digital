
import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsAnnouncementProps {
  title: string;
  content: string;
  onDismiss?: () => void;
}

const NewsAnnouncement = ({ title, content, onDismiss }: NewsAnnouncementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Alert className="bg-chamBlue/10 border border-chamBlue/20 mb-6 relative">
        <div className="flex items-start gap-3">
          <Newspaper className="h-5 w-5 text-chamBlue mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <AlertTitle className="text-chamDarkBlue font-semibold">{title}</AlertTitle>
              <Badge variant="default" className="bg-chamBlue text-white text-xs px-2 py-0.5">New</Badge>
            </div>
            <AlertDescription className="text-gray-700">
              {content}
            </AlertDescription>
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
