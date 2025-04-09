
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AccountSectionProps {
  user: {
    name: string;
    balance: number;
    agency?: string;
    country?: string;
  };
}

const AccountSection = ({ user }: AccountSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="col-span-2"
      >
        <Card className="h-full border-none shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-chamDarkBlue">Account Balance</CardTitle>
            <CardDescription>Your current account balance with Cham Wings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Available Balance</p>
                <p className="text-4xl font-bold text-chamDarkBlue">${user.balance.toLocaleString()}</p>
              </div>
              <Link to="/top-up">
                <Button className="bg-chamBlue hover:bg-chamBlue/90">Top Up Account</Button>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monthly Spending Limit</span>
                <span className="font-medium text-chamDarkBlue">${user.balance < 10000 ? user.balance : 10000}</span>
              </div>
              <Progress value={user.balance < 10000 ? (user.balance / 10000) * 100 : 100} className="h-2 bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="h-full border-none shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-chamDarkBlue">Agency Details</CardTitle>
            <CardDescription>Your travel agency information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Agency Name</p>
                <p className="font-medium text-chamDarkBlue">{user.agency || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Country</p>
                <p className="font-medium text-chamDarkBlue">{user.country || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AccountSection;
