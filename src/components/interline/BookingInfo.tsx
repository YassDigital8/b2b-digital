
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plane, Info, Shield, Globe } from 'lucide-react';

const BookingInfo: React.FC = () => {
  return (
    <Card className="border-none shadow-md overflow-hidden bg-white">      
      <CardHeader className="relative z-10 bg-gradient-to-r from-violet-50 to-white">
        <CardTitle className="text-lg text-violet-900 flex items-center gap-2">
          <Globe className="h-5 w-5 text-violet-600" />
          Interline Booking Information
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-5 relative z-10">
        <div>
          <h3 className="font-medium text-violet-900 mb-2 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-violet-600" />
            About Interline Booking
          </h3>
          <p className="text-gray-600 text-sm">
            Cham Wings Airlines has partnered with several airlines to offer interline booking options,
            allowing you to book flights with at least one segment operated by Cham Wings (code 6Q)
            and connecting flights on partner airlines in a single reservation.
          </p>
        </div>
        
        <Separator className="bg-gray-200" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
            <h3 className="font-medium text-violet-900 mb-3 flex items-center gap-1.5">
              <Plane className="h-4 w-4 text-violet-600" />
              Partner Airlines
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-violet-600 mt-2"></div>
                <div>
                  <p className="font-medium text-violet-900">Cham Wings Airlines (6Q)</p>
                  <p className="text-xs text-gray-600">Syria's leading private carrier</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-violet-600 mt-2"></div>
                <div>
                  <p className="font-medium text-violet-900">Jazeera Airways (J9)</p>
                  <p className="text-xs text-gray-600">Kuwait-based airline with extensive Middle East network</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-violet-600 mt-2"></div>
                <div>
                  <p className="font-medium text-violet-900">Air Arabia (G9)</p>
                  <p className="text-xs text-gray-600">UAE's first and largest low-cost carrier</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <h3 className="font-medium text-amber-800 mb-3 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-amber-600" />
              Important Information
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500 mt-2"></div>
                <span>All interline bookings include at least one segment operated by Cham Wings Airlines</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500 mt-2"></div>
                <span>Baggage policies follow the most restrictive rules of the operating airlines</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500 mt-2"></div>
                <span>For flight changes or cancellations, please contact Cham Wings customer service</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-500 mt-2"></div>
                <span>E-tickets will be sent to your registered email address</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-violet-800 font-medium mb-1">Additional Partners:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>FlyDubai (FZ)</div>
                <div>Kuwait Airways (KU)</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
