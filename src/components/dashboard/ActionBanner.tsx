
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';
import { Plane, Car, CreditCard, ChevronRight, Info, FileChart } from 'lucide-react';

const ActionBanner = () => {
  const [quickActions] = useState([
    {
      id: 'interline',
      label: 'Book Flights',
      icon: Plane,
      link: '/interline',
      color: 'bg-purple-100',
      tooltipText: 'Book interline flights with partner airlines'
    },
    {
      id: 'transportation',
      label: 'Book Transportation',
      icon: Car,
      link: '/transportation',
      color: 'bg-blue-100',
      tooltipText: 'Book Ya Marhaba services or limousine'
    },
    {
      id: 'top-up',
      label: 'Top Up Account',
      icon: CreditCard,
      link: '/top-up',
      color: 'bg-green-100',
      tooltipText: 'Add funds to your account'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileChart,
      link: '/reports',
      color: 'bg-amber-100',
      tooltipText: 'View performance reports and analytics'
    }
  ]);

  return (
    <Card className="overflow-hidden border-none shadow-soft">
      <div className="bg-gradient-to-r from-chamBlue/20 to-blue-100/30 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center gap-2 mb-3 md:mb-0">
            <h3 className="text-lg font-semibold text-chamDarkBlue">Quick Actions</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-chamBlue/70" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-sm">These are your most common actions. Click any button to quickly start the process.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Link to="/services" className="text-sm text-chamBlue flex items-center hover:underline">
            <span>View all services</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {quickActions.map(action => (
            <TooltipProvider key={action.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={action.link} className="w-full">
                    <Button 
                      variant="outline" 
                      className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 border-gray-100 hover:border-chamBlue/50 hover:bg-white shadow-sm transition-all duration-300 hover:shadow"
                    >
                      <div className={`${action.color} p-2 rounded-lg w-10 h-10 flex items-center justify-center`}>
                        <action.icon className="h-5 w-5 text-chamBlue" />
                      </div>
                      <span className="font-medium text-sm text-chamDarkBlue">{action.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{action.tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ActionBanner;
