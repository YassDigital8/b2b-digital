
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({
  balance
}) => {
  return (
    <Card className="border-none shadow-lg overflow-hidden rounded-xl bg-gradient-to-br from-white to-violet-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-violet-900 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-violet-600" />
          Account Balance
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col">
          <motion.div 
            className="text-3xl font-bold text-violet-900 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DollarSign className="h-6 w-6 text-amber-500 mr-1" />
            {balance.toLocaleString()}
          </motion.div>
          
          <div className="flex items-center mt-4 text-sm text-green-600 bg-green-50 self-start px-2 py-1 rounded-full">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            <span>Available for booking</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/70 rounded-lg border border-amber-200/60 flex flex-col"
              whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-medium text-amber-800">Recent Transactions</span>
              <span className="text-lg font-semibold text-amber-600">View</span>
            </motion.div>
            
            <motion.div 
              className="p-3 bg-gradient-to-br from-violet-50 to-violet-100/70 rounded-lg border border-violet-200/60 flex flex-col"
              whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-medium text-violet-800">Add Funds</span>
              <span className="text-lg font-semibold text-violet-600">Top Up</span>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
