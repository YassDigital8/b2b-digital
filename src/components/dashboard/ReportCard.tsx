
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
  buttonText: string;
}

const ReportCard = ({ id, title, description, image, link, color, buttonText }: ReportCardProps) => {
  return (
    <Card className="border-none shadow-soft overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className={`${color} h-2 w-full`}></div>
      <div className="flex flex-col h-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className={`${color} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
              <span className="font-bold text-xl text-chamBlue">{id.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-chamBlue/10 text-chamBlue">
              Available
            </span>
          </div>
          <CardTitle className="text-xl text-chamDarkBlue mt-2">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0 mt-auto">
          <AspectRatio ratio={16/9} className="bg-muted">
            <img
              src={image}
              alt={title}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        </CardContent>
        
        <CardFooter className="pt-4">
          <Link to={link} className="w-full">
            <Button 
              className="w-full bg-chamBlue hover:bg-chamBlue/90 flex items-center justify-center gap-2"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ReportCard;
