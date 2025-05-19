
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  color: string;
  buttonText: string;
  isNew?: boolean;
}

const ServiceCard = ({ id, title, description, icon: Icon, link, color, buttonText, isNew }: ServiceCardProps) => {
  return (
    <motion.div 
      whileHover={{ translateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-soft overflow-hidden h-full flex flex-col">
        <div className={`${color} h-2 w-full`}></div>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className={`${color} p-3 rounded-lg w-12 h-12 flex items-center justify-center shadow-sm`}>
              <Icon className="h-6 w-6 text-chamBlue" />
            </div>
            <div className="flex items-center gap-2">
              {isNew && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600 border border-red-200 animate-pulse">
                  New
                </span>
              )}
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-chamBlue/10 text-chamBlue border border-chamBlue/20">
                Available
              </span>
            </div>
          </div>
          <CardTitle className="text-xl text-chamDarkBlue mt-3">{title}</CardTitle>
          <CardDescription className="text-gray-600 mt-1">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-2">
          <Link to={link} className="w-full">
            <Button 
              className="w-full bg-gradient-to-r from-chamBlue to-blue-500 hover:from-chamBlue/90 hover:to-blue-600 flex items-center justify-center gap-2 shadow-sm hover:shadow text-white py-6"
            >
              {buttonText}
              <ArrowRight className="h-5 w-5 animate-pulse" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
