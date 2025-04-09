
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpcomingBookingsCard = () => {
  return (
    <Card className="border-none shadow-soft overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-chamDarkBlue">Upcoming Bookings</CardTitle>
          <div className="bg-green-50 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-green-500" />
          </div>
        </div>
        <CardDescription>Next 7 days schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-medium text-chamDarkBlue">FlyDubai: DAM to DXB</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>Jun 20, 2023 - 10:30 AM</span>
                </div>
              </div>
              <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full font-medium">
                Pending
              </span>
            </div>
          </div>
          <div className="text-center py-2">
            <p className="text-gray-500 text-sm">No other upcoming bookings</p>
          </div>
          <div className="flex justify-center">
            <Link to="/interline">
              <Button variant="outline" className="text-chamBlue">
                Book New Flight
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBookingsCard;
