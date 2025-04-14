
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plane, Info, Shield, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingInfo: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="border-none shadow-soft overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-chamBlue/5 to-transparent rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-chamGold/5 to-transparent rounded-full"></div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl text-chamDarkBlue flex items-center gap-2">
          <Globe className="h-5 w-5 text-chamBlue" />
          Interline Booking Information
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <div>
          <h3 className="font-medium text-chamDarkBlue mb-2 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-chamBlue" />
            About Interline Booking
          </h3>
          <p className="text-gray-600 text-sm">
            Cham Wings Airlines has partnered with several airlines to offer interline booking options.
            This allows you to book flights where at least one segment is operated by Cham Wings (code 6Q),
            with connecting flights on partner airlines, all in a single reservation.
          </p>
        </div>
        
        <Separator className="bg-gradient-to-r from-chamBlue/20 via-chamGold/20 to-transparent" />
        
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={item} className="bg-gradient-to-br from-chamBlue/5 to-chamBlue/10 rounded-xl p-5 border border-chamBlue/10">
            <h3 className="font-medium text-chamDarkBlue mb-3 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-chamBlue" />
              Partner Airlines
            </h3>
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
            </ul>
          </motion.div>
          
          <motion.div variants={item} className="bg-gradient-to-br from-chamGold/5 to-chamGold/10 rounded-xl p-5 border border-chamGold/10">
            <h3 className="font-medium text-chamDarkBlue mb-3 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-chamGold" />
              Important Information
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>All interline bookings include at least one segment operated by Cham Wings Airlines (6Q)</li>
              <li>Baggage policies follow the most restrictive rules of the operating airlines</li>
              <li>For flight changes or cancellations, please contact Cham Wings customer service</li>
              <li>Connection times shown are minimum required times at each airport</li>
              <li>Visa requirements are the passenger's responsibility</li>
              <li>E-tickets will be sent to your registered email address</li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={item} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-chamBlue font-medium mb-1">Additional Partners:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-chamBlue/80">
                  <div>FlyDubai (FZ)</div>
                  <div>Kuwait Airways (KU)</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default BookingInfo;
