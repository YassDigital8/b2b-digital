
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { 
  TooltipProvider, 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent 
} from '@/components/ui/tooltip';
import { Plane, Car, CreditCard, ChevronRight, Info, FileBarChart } from 'lucide-react';

const ActionBanner = () => {
  const [quickActions] = useState([
    {
      id: 'interline',
      label: 'Book Flights',
      icon: Plane,
      link: '/interline',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      hoverColor: 'hover:border-purple-300 hover:bg-purple-50',
      description: 'Book interline flights with partner airlines including FlyDubai, Emirates, Air Arabia and more.',
      tooltipText: 'Book interline flights with partner airlines'
    },
    {
      id: 'transportation',
      label: 'Book Transportation',
      icon: Car,
      link: '/transportation',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:border-blue-300 hover:bg-blue-50',
      description: 'Book Ya Marhaba services for your passengers or arrange limousine transportation.',
      tooltipText: 'Book Ya Marhaba services or limousine'
    },
    {
      id: 'top-up',
      label: 'Top Up Account',
      icon: CreditCard,
      link: '/top-up',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      hoverColor: 'hover:border-green-300 hover:bg-green-50',
      description: 'Add funds to your account balance for booking flights and other services.',
      tooltipText: 'Add funds to your account'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileBarChart,
      link: '/reports',
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
      hoverColor: 'hover:border-amber-300 hover:bg-amber-50',
      description: 'Access detailed reports on bookings, revenue, and performance metrics.',
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
                  <Info className="h-4 w-4 text-chamBlue/70 cursor-help" />
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
            <HoverCard key={action.id} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link to={action.link} className="w-full group">
                  <Button 
                    variant="outline" 
                    className={`w-full h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 border-gray-100 ${action.hoverColor} transition-all duration-300 hover:shadow-md group-focus:ring-2 group-focus:ring-chamBlue/30`}
                  >
                    <div className={`${action.color} p-2 rounded-lg w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    <span className="font-medium text-sm text-chamDarkBlue">{action.label}</span>
                  </Button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 p-4 bg-white/95 backdrop-blur border border-gray-100 shadow-lg rounded-xl">
                <div className="flex gap-3">
                  <div className={`${action.color} p-3 rounded-lg h-10 w-10 flex items-center justify-center`}>
                    <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-chamDarkBlue">{action.label}</h4>
                    <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ActionBanner;
