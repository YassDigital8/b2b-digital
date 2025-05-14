
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  return (
    <Card className="border-none shadow-lg overflow-hidden rounded-xl bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg gradient-text flex items-center gap-2 font-display">
              <CreditCard className="h-5 w-5 text-chamBlue" />
              Account Balance
            </CardTitle>
            <p className="text-sm text-gray-500">Available funds for interline bookings</p>
          </div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-1.5 text-sm text-chamBlue bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Balance History</span>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-2xl font-semibold text-chamDarkBlue flex items-center gap-1 font-display">
              <DollarSign className="h-5 w-5 text-green-500" />
              {balance.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-md border border-blue-200">
            <p className="text-sm text-chamDarkBlue">
              Use your balance to book interline tickets
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
