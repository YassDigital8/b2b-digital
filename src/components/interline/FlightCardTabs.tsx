
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
      <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-gradient-to-r from-gray-50 to-chamGold/5">
        <TabsTrigger
          value="details"
          className="flex gap-1.5 py-3.5 text-sm font-medium data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-chamBlue/5 data-[state=active]:text-chamBlue data-[state=active]:border-b-2 data-[state=active]:border-chamBlue"
        >
          <FileText className="h-4 w-4" />
          Flight Details
        </TabsTrigger>
        <TabsTrigger
          value="price"
          className="flex gap-1.5 py-3.5 text-sm font-medium data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-chamGold/5 data-[state=active]:text-chamGold data-[state=active]:border-b-2 data-[state=active]:border-chamGold"
        >
          <DollarSign className="h-4 w-4" />
          Price Breakdown
        </TabsTrigger>
        <TabsTrigger
          value="rules"
          className="flex gap-1.5 py-3.5 text-sm font-medium data-[state=active]:bg-gradient-to-b data-[state=active]:from-white data-[state=active]:to-orange-50 data-[state=active]:text-orange-600 data-[state=active]:border-b-2 data-[state=active]:border-orange-400"
        >
          <Info className="h-4 w-4" />
          Fare Rules
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-0 border-t-0 focus-visible:outline-none">
        <FlightDetailsContent flight={flight} />
      </TabsContent>

      <TabsContent value="price" className="mt-0 border-t-0 focus-visible:outline-none">
        <PriceBreakdownContent pricingData={flight?.pricing_info} totalPassengers={totalPassengers} />
      </TabsContent>

      <TabsContent value="rules" className="mt-0 border-t-0 focus-visible:outline-none">
        <FareRulesContent fareRulesData={flight?.pricing_info[0]?.FareRuleReference} />
      </TabsContent>
    </Tabs>
  );
};

export default FlightCardTabs;
