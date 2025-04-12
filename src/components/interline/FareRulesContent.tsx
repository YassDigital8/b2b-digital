
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, Calendar, CreditCard, Info, Luggage, Plane, Baby } from 'lucide-react';

const FareRulesContent: React.FC = () => {
  return (
    <div className="p-5 bg-gradient-to-br from-white to-orange-50/30">
      <div className="mb-4 flex items-center gap-2">
        <Info className="h-5 w-5 text-orange-500" />
        <h3 className="text-lg font-medium text-chamDarkBlue">Fare Rules & Conditions</h3>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="penalties" className="border-b border-orange-100">
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
              <CreditCard className="h-4 w-4 text-orange-500 flex-shrink-0" />
              Penalties (Per leg)
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white">
              <p>Modification before 24 hours: USD 75 + Any fare difference.</p> 
              <p>Refund before departure: USD 170.</p>
              <p>After departure Non Refundable No Show: USD 210.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="changes" className="border-b border-orange-100">
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
              <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
              Changes
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white">
              <p>Changes or refund within 24H not permitted and will be considered as No Show.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="infant" className="border-b border-orange-100">
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
              <Baby className="h-4 w-4 text-orange-500 flex-shrink-0" />
              Infant Policy
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white">
              <p>INF fare Non Refundable</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="stopover" className="border-b border-orange-100">
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
              <Plane className="h-4 w-4 text-orange-500 flex-shrink-0" />
              Stop Over
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white">
              <p>Not permitted. Void not permitted on B2B TKT.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="baggage" className="border-b border-orange-100">
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
              <Luggage className="h-4 w-4 text-orange-500 flex-shrink-0" />
              Baggage
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white">
              <p>Baggage allowance 30 kg</p>
              <p>Baggage Allowance for INF 10 kgs on 6Q sector</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="connection" className="border-b-0">
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
              Connection Requirements
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white">
              <p>Connecting airline ticket is required to reconfirm with Cham Wings office for a confirmed segment status. Passengers are required to carry connecting airline confirmed ticket.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mt-5 p-4 rounded-md bg-gradient-to-r from-orange-100/50 to-orange-50/50 border-l-4 border-orange-400 text-sm flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
        <p className="text-gray-700">Please review all fare rules carefully before booking. These conditions will apply to your ticket.</p>
      </div>
    </div>
  );
};

export default FareRulesContent;
