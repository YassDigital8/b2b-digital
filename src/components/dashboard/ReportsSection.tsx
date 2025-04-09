
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import ReportCard from './ReportCard';

// Mock data for reports
const reports = [
  {
    id: 'booking-trends',
    title: 'Booking Trends',
    description: 'View monthly patterns and growth in your booking activity',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '/reports/booking-trends',
    color: 'bg-indigo-100',
    buttonText: 'View Trends'
  },
  {
    id: 'revenue-analysis',
    title: 'Revenue Analysis',
    description: 'Track your financial performance and revenue growth',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '/reports/revenue',
    color: 'bg-emerald-100',
    buttonText: 'View Revenue'
  },
  {
    id: 'top-destinations',
    title: 'Popular Destinations',
    description: 'Discover the most requested travel destinations',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '/reports/destinations',
    color: 'bg-amber-100',
    buttonText: 'View Destinations'
  },
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard 
            key={report.id}
            {...report}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ReportsSection;
