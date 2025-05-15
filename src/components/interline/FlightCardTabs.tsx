
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
      <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-gradient-to-r from-slate-50 to-[#D0C29C]/20">
        <TabsTrigger 
          value="details" 
          className="flex gap-1.5 py-3.5 text-sm font-medium transition-all duration-300
            data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-[#5093C9]/10 
            data-[state=active]:text-[#5093C9] data-[state=active]:border-b-2 data-[state=active]:border-[#5093C9]
            hover:bg-[#5093C9]/5"
        >
          <FileText className="h-4 w-4" />
          Flight Details
        </TabsTrigger>
        <TabsTrigger 
          value="price" 
          className="flex gap-1.5 py-3.5 text-sm font-medium transition-all duration-300
            data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-[#D0C29C]/20 
            data-[state=active]:text-[#5093C9] data-[state=active]:border-b-2 data-[state=active]:border-[#D0C29C]
            hover:bg-[#D0C29C]/5"
        >
          <DollarSign className="h-4 w-4" />
          Price Breakdown
        </TabsTrigger>
        <TabsTrigger 
          value="rules" 
          className="flex gap-1.5 py-3.5 text-sm font-medium transition-all duration-300
            data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-[#5093C9]/10 
            data-[state=active]:text-[#5093C9] data-[state=active]:border-b-2 data-[state=active]:border-[#5093C9]
            hover:bg-[#5093C9]/5"
        >
          <Info className="h-4 w-4" />
          Fare Rules
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="mt-0 border-t-0 focus-visible:outline-none">
        <FlightDetailsContent flight={flight} />
      </TabsContent>
      
      <TabsContent value="price" className="mt-0 border-t-0 focus-visible:outline-none">
        <PriceBreakdownContent flight={flight} totalPassengers={totalPassengers} />
      </TabsContent>
      
      <TabsContent value="rules" className="mt-0 border-t-0 focus-visible:outline-none">
        <FareRulesContent />
      </TabsContent>
    </Tabs>
  );
};

export default FlightCardTabs;
