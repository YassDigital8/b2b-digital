
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <Card className="border-none shadow-soft overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className={`${color} h-2 w-full`}></div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className={`${color} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-chamBlue" />
          </div>
          <div className="flex items-center gap-2">
            {isNew && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600 border border-red-200 animate-pulse">
                New
              </span>
            )}
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-chamBlue/10 text-chamBlue">
              Available
            </span>
          </div>
        </div>
        <CardTitle className="text-xl text-chamDarkBlue mt-2">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={link} className="w-full">
          <Button 
            className="w-full bg-chamBlue hover:bg-chamBlue/90 flex items-center justify-center gap-2"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
