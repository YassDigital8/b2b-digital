
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flight } from '@/types/flight';
import FlightDetailsContent from './FlightDetailsContent';
import PriceBreakdownContent from './PriceBreakdownContent';
import FareRulesContent from './FareRulesContent';
import { FileText, DollarSign, Info } from 'lucide-react';

interface FlightCardTabsProps {
  flight: Flight;
  totalPassengers: {
    adults: number;
    children: number;
    infants: number;
    total: number;
  };
}

const FlightCardTabs: React.FC<FlightCardTabsProps> = ({ flight, totalPassengers }) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-3 rounded-md bg-gradient-to-r from-slate-50 to-slate-100 border-b shadow-sm overflow-hidden">
        <TabsTrigger 
          value="details" 
          className="flex gap-1.5 py-3.5 text-sm font-medium relative"
        >
          <FileText className="h-4 w-4" />
          Flight Details
        </TabsTrigger>
        <TabsTrigger 
          value="price" 
          className="flex gap-1.5 py-3.5 text-sm font-medium relative"
        >
          <DollarSign className="h-4 w-4" />
          Price Breakdown
        </TabsTrigger>
        <TabsTrigger 
          value="rules" 
          className="flex gap-1.5 py-3.5 text-sm font-medium relative"
        >
          <Info className="h-4 w-4" />
          Fare Rules
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="mt-0 bg-white rounded-b-md shadow-sm p-4 border border-t-0">
        <FlightDetailsContent flight={flight} />
      </TabsContent>
      
      <TabsContent value="price" className="mt-0 bg-white rounded-b-md shadow-sm p-4 border border-t-0">
        <PriceBreakdownContent flight={flight} totalPassengers={totalPassengers} />
      </TabsContent>
      
      <TabsContent value="rules" className="mt-0 bg-white rounded-b-md shadow-sm p-4 border border-t-0">
        <FareRulesContent />
      </TabsContent>
    </Tabs>
  );
};

export default FlightCardTabs;
