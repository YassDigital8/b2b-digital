
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flight } from '@/types/flight';
import FlightDetailsContent from './FlightDetailsContent';
import PriceBreakdownContent from './PriceBreakdownContent';
import FareRulesContent from './FareRulesContent';

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
      <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-none border-b">
        <TabsTrigger value="details" className="text-sm">Flight Details</TabsTrigger>
        <TabsTrigger value="price" className="text-sm">Price Breakdown</TabsTrigger>
        <TabsTrigger value="rules" className="text-sm">Fare Rules</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <FlightDetailsContent flight={flight} />
      </TabsContent>
      
      <TabsContent value="price">
        <PriceBreakdownContent flight={flight} totalPassengers={totalPassengers} />
      </TabsContent>
      
      <TabsContent value="rules">
        <FareRulesContent />
      </TabsContent>
    </Tabs>
  );
};

export default FlightCardTabs;
