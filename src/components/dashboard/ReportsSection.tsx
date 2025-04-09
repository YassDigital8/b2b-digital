
import { motion } from 'framer-motion';
import { Filter, BarChart2, TrendingUp, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
      
      <Card className="border-none shadow-soft overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="bg-gradient-to-r from-indigo-200 to-blue-200 h-2 w-full"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-3 rounded-lg w-14 h-14 flex items-center justify-center shadow-sm">
                <BarChart2 className="h-7 w-7 text-chamBlue" />
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-chamBlue/10 text-chamBlue border border-chamBlue/20">
                Available Now
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-chamDarkBlue mt-5 mb-2">Comprehensive Performance Analysis</h3>
            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              Access all your key performance metrics in one centralized dashboard. Track booking trends, revenue growth, 
              and identify popular destinations to optimize your business strategy.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Revenue Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <PieChart className="h-4 w-4 text-blue-500" />
                <span>Market Insights</span>
              </div>
            </div>
            
            <Link to="/reports" className="mt-8 inline-block w-full">
              <Button 
                className="w-full bg-chamBlue hover:bg-chamBlue/90 text-white shadow-sm flex items-center justify-center gap-2 py-6"
              >
                View All Reports
                <ArrowRight className="h-5 w-5 animate-pulse" />
              </Button>
            </Link>
          </div>
          
          <div className="md:w-2/5 h-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-chamBlue/20 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Performance Reports"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReportsSection;
