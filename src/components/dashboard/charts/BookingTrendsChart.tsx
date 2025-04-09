
import { BarChart3, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface BookingTrendsChartProps {
  data: Array<{ month: string; count: number }>;
}

const BookingTrendsChart = ({ data }: BookingTrendsChartProps) => {
  const reportConfig = {
    bookings: { color: "#33C3F0", label: "Bookings" }
  };
  
  // Calculate total bookings
  const totalBookings = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="border-none shadow-soft overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-chamDarkBlue">Booking Trends</CardTitle>
          <div className="bg-blue-50 p-2 rounded-full">
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <CardDescription>Monthly booking statistics</CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-6">
        <ChartContainer className="h-64" config={reportConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickCount={5} />
              <Bar dataKey="count" name="bookings" fill="#33C3F0" radius={[4, 4, 0, 0]} barSize={30} />
              <ChartTooltip 
                content={<ChartTooltipContent nameKey="name" labelKey="month" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">+23% from last period</span>
          </div>
          <div className="text-sm text-gray-500">Total: {totalBookings} bookings</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTrendsChart;
