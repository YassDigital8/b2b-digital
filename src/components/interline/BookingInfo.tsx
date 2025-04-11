
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plane, Info } from 'lucide-react';

const BookingInfo: React.FC = () => {
  return (
    <Card className="border-none shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl text-chamDarkBlue">Interline Booking Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-chamDarkBlue mb-2">About Interline Booking</h3>
          <p className="text-gray-600 text-sm">
            Cham Wings Airlines has partnered with several airlines to offer interline booking options.
            This allows you to book flights where at least one segment is operated by Cham Wings (code 6Q),
            with connecting flights on partner airlines, all in a single reservation.
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium text-chamDarkBlue mb-2">Partner Airlines</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-chamDarkBlue">Cham Wings Airlines (6Q)</p>
                <p className="text-xs text-gray-600">Syria's leading private carrier</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-chamDarkBlue">Jazeera Airways (J9)</p>
                <p className="text-xs text-gray-600">Kuwait-based airline with extensive Middle East network</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-chamDarkBlue">Air Arabia (G9)</p>
                <p className="text-xs text-gray-600">UAE's first and largest low-cost carrier</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-chamDarkBlue">FlyDubai (FZ)</p>
                <p className="text-xs text-gray-600">Dubai-based carrier serving the Middle East, Africa, and Asia</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Plane className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-chamDarkBlue">Kuwait Airways (KU)</p>
                <p className="text-xs text-gray-600">Kuwait's national carrier with global connections</p>
              </div>
            </li>
          </ul>
        </div>
        
        <Separator />
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-chamBlue font-medium mb-1">Important Information:</p>
              <ul className="list-disc list-inside text-xs text-chamBlue/80 space-y-1">
                <li>All interline bookings include at least one segment operated by Cham Wings Airlines (6Q)</li>
                <li>Baggage policies follow the most restrictive rules of the operating airlines</li>
                <li>For flight changes or cancellations, please contact Cham Wings customer service</li>
                <li>Connection times shown are minimum required times at each airport</li>
                <li>Visa requirements are the passenger's responsibility</li>
                <li>E-tickets will be sent to your registered email address</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
