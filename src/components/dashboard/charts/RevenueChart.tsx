
import { DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: Array<{ month: string; amount: number }>;
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  const reportConfig = {
    revenue: { color: "#9b87f5", label: "Revenue" }
  };
  
  // Calculate total revenue
  const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="border-none shadow-soft overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-chamDarkBlue">Revenue Analysis</CardTitle>
          <div className="bg-purple-50 p-2 rounded-full">
            <DollarSign className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        <CardDescription>Monthly revenue breakdown</CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-6">
        <ChartContainer className="h-64" config={reportConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickCount={5} />
              <Line
                type="monotone"
                dataKey="amount"
                name="revenue"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "white" }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent nameKey="name" labelKey="month" />}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">+15% from last period</span>
          </div>
          <div className="text-sm text-gray-500">Total: ${totalRevenue.toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
