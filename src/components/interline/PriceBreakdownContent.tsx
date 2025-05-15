import React from 'react';
import { CreditCard } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PriceBreakdownContentProps {
  pricingData: Array<Record<string, any>>;
  title?: string;
  summary?: string;
}

const PriceBreakdownContent: React.FC<PriceBreakdownContentProps> = ({
  pricingData,
  title = "Price Summary",
  summary = "All prices are in USD and include standard taxes and fees. Additional charges may apply for extra baggage or services."
}) => {
  if (!pricingData || pricingData.length === 0) {
    return <div className="p-5 bg-white">No pricing data available</div>;
  }

  // Get all unique keys from all objects (excluding nested objects)
  const allKeys = Array.from(
    new Set(
      pricingData.flatMap(item =>
        Object.keys(item).filter(key => typeof item[key] !== 'object')
      )
    )
  );

  return (
    <div className="p-5 bg-white">
    <div className="p-5 bg-white">
      <div className="mb-4 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-chamGold" />
        <h3 className="text-lg font-medium text-chamDarkBlue">{title}</h3>
      </div>

      <div className="rounded-lg border border-chamGold/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-chamGold/10 to-amber-50">
            <TableRow className="border-b border-chamGold/20 hover:bg-transparent">
              {allKeys.map((key) => (
                <TableHead
                  key={key}
                  className={`py-3 px-4 text-sm font-medium text-chamDarkBlue ${
                    // Align first column left, others right
                    allKeys.indexOf(key) === 0 ? 'text-left' : 'text-right'
                    }`}
                >
                  {key.split(/(?=[A-Z])/).join(' ')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pricingData.map((item, index) => (
              <TableRow
                key={index}
                className={
                  index === pricingData.length - 1
                    ? 'bg-gradient-to-r from-chamGold/5 to-amber-50 font-medium'
                    : 'border-b border-gray-100 hover:bg-gray-50'
                }
              >
                {allKeys.map((key) => (
                  <TableCell
                    key={key}
                    className={`py-3 px-4 text-sm ${allKeys.indexOf(key) === 0 ? 'text-left' : 'text-right'
                      } ${index === pricingData.length - 1 ? 'font-bold text-chamDarkBlue' : ''
                      }`}
                  >
                    {typeof item[key] === 'number' ? (
                      item[key].toFixed(2)
                    ) : key === 'PaxType' ? (
                      item[key] === 'ADT' ? 'Adult' :
                        item[key] === 'CHD' ? 'Children' :
                          item[key] === 'INF' ? 'Infants' :
                            item[key] || '-'
                    ) : (
                      item[key] || '-'
                    )}
                  </TableCell>

                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {summary && (
        <div className="mt-5 p-4 rounded-md bg-gradient-to-r from-chamGold/10 to-amber-50 border-l-4 border-chamGold text-sm text-gray-700">
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default PriceBreakdownContent;