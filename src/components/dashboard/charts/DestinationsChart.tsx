
import { Plane } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Destination {
  name: string;
  value: number;
}

interface DestinationsChartProps {
  data: Destination[];
}

const DestinationsChart = ({ data }: DestinationsChartProps) => {
  return (
    <Card className="border-none shadow-soft overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-chamDarkBlue">Popular Destinations</CardTitle>
          <div className="bg-amber-50 p-2 rounded-full">
            <Plane className="h-5 w-5 text-amber-500" />
          </div>
        </div>
        <CardDescription>Most booked destinations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {data.map((destination, index) => (
            <div key={destination.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-chamGray flex items-center justify-center text-xs font-medium text-chamDarkBlue">
                  {index + 1}
                </span>
                <span className="font-medium text-chamDarkBlue">{destination.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${(destination.value / data[0].value) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">{destination.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationsChart;
