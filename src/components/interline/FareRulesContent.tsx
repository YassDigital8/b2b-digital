
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, Baby, CreditCard, Info, Luggage, Plane } from 'lucide-react';

interface FareRulesContentProps {
  fareRulesData?: any;
}

const FareRulesContent: React.FC<FareRulesContentProps> = ({ fareRulesData }) => {
  console.log('fareRulesData', fareRulesData);
  
  if (!fareRulesData || Object.keys(fareRulesData).length === 0) {
    return (
      <div className="p-5 bg-gradient-to-br from-white to-orange-50/30">
        <div className="mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-medium text-chamDarkBlue">Fare Rules & Conditions</h3>
        </div>
        <div className="p-4 rounded-md bg-orange-50 text-sm text-gray-700">
          No fare rules information available.
        </div>
      </div>
    );
  }

  // Group rules by category (extracted from the key before ":")
  const categorizedRules: Record<string, Array<{key: string, value: string}>> = {};

  Object.entries(fareRulesData).forEach(([key, value]) => {
    // Split key to get category (if any)
    const [category, ...rest] = key.split(' // ');
    const cleanKey = rest.join(' // ').trim() || category;
    
    if (!categorizedRules[category]) {
      categorizedRules[category] = [];
    }
    categorizedRules[category].push({ key: cleanKey, value: value as string });
  });

  // Icons mapping for common categories
  const categoryIcons: Record<string, React.ReactNode> = {
    'Modification': <CreditCard className="h-4 w-4 text-orange-500 flex-shrink-0" />,
    'Refund': <CreditCard className="h-4 w-4 text-orange-500 flex-shrink-0" />,
    'INF fare': <Baby className="h-4 w-4 text-orange-500 flex-shrink-0" />,
    'Stop over': <Plane className="h-4 w-4 text-orange-500 flex-shrink-0" />,
    'Excess Baggage': <Luggage className="h-4 w-4 text-orange-500 flex-shrink-0" />,
    'default': <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
  };

  const getCategoryIcon = (category: string) => {
    const matchedKey = Object.keys(categoryIcons).find(key => 
      category.toLowerCase().includes(key.toLowerCase())
    );
    return matchedKey ? categoryIcons[matchedKey] : categoryIcons['default'];
  };

  return (
    <div className="p-5 bg-gradient-to-br from-white to-orange-50/30">
      <div className="mb-4 flex items-center gap-2">
        <Info className="h-5 w-5 text-orange-500" />
        <h3 className="text-lg font-medium text-chamDarkBlue">Fare Rules & Conditions</h3>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-orange-200 overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(categorizedRules).map(([category, rules], index) => (
            <AccordionItem 
              key={category} 
              value={`item-${index}`}
              className={index === Object.keys(categorizedRules).length - 1 ? '' : 'border-b border-orange-100'}
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-orange-50/50 text-sm font-medium text-chamDarkBlue flex gap-2">
                {getCategoryIcon(category)}
                {category}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-sm text-gray-700 bg-gradient-to-r from-orange-50/30 to-white text-center">
                <ul className="space-y-2">
                  {rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex}>
                      <p className="font-medium">{rule.key}</p>
                      <p>{rule.value}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
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
