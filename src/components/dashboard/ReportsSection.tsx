
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
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
        <div className="bg-indigo-100 h-2 w-full"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center">
              <div className="bg-indigo-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center">
                <span className="font-bold text-xl text-chamBlue">R</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-chamBlue/10 text-chamBlue">
                Available
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-chamDarkBlue mt-4">Comprehensive Performance Analysis</h3>
            <p className="text-gray-600 mt-2">Access all your key performance metrics in one place. Track booking trends, revenue growth, and popular destinations.</p>
            
            <Link to="/reports" className="mt-6 inline-block w-full">
              <Button 
                className="w-full bg-chamBlue hover:bg-chamBlue/90 flex items-center justify-center gap-2"
              >
                View All Reports
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="md:w-2/5 h-auto">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Performance Reports"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReportsSection;
