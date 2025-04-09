
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import BookingTrendsChart from './charts/BookingTrendsChart';
import RevenueChart from './charts/RevenueChart';
import DestinationsChart from './charts/DestinationsChart';
import UpcomingBookingsCard from './charts/UpcomingBookingsCard';

// Mock data for reports
const bookingData = [
  { month: 'Jan', count: 5 },
  { month: 'Feb', count: 7 },
  { month: 'Mar', count: 12 },
  { month: 'Apr', count: 9 },
  { month: 'May', count: 11 },
  { month: 'Jun', count: 8 },
];

const revenueData = [
  { month: 'Jan', amount: 510 },
  { month: 'Feb', amount: 780 },
  { month: 'Mar', amount: 1250 },
  { month: 'Apr', amount: 950 },
  { month: 'May', amount: 1100 },
  { month: 'Jun', amount: 820 },
];

const topDestinations = [
  { name: 'Dubai', value: 42 },
  { name: 'Kuwait', value: 28 },
  { name: 'Cairo', value: 19 },
  { name: 'Beirut', value: 11 },
];

const ReportsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-chamDarkBlue">Performance Reports</h2>
        <div className="flex items-center gap-2 text-chamBlue text-sm">
          <Filter className="h-4 w-4" />
          <span>Last 6 Months</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingTrendsChart data={bookingData} />
        <RevenueChart data={revenueData} />
        <DestinationsChart data={topDestinations} />
        <UpcomingBookingsCard />
      </div>
    </motion.div>
  );
};

export default ReportsSection;
