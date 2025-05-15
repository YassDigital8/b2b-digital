
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  return (
    <Card className="border-none shadow-soft overflow-hidden">
      {/* <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50 to-transparent"></div> */}
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-chamDarkBlue flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-chamBlue" />
              Account Balance
            </CardTitle>
            <CardDescription>Available funds for interline bookings</CardDescription>
          </div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block bg-gradient-to-r from-chamBlue/10 to-chamGold/10 rounded-lg p-1"
          >
            <div className="bg-white rounded-md px-3 py-1 text-xs text-chamBlue flex items-center gap-1 shadow-sm">
              <TrendingUp className="h-3 w-3" />
              <span>Balance History</span>
            </div>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
      <CardContent className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-chamDarkBlue flex items-center gap-1">
              <DollarSign className="h-6 w-6 text-green-500" />
              {balance.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-chamGold/20 to-chamGold/10 px-4 py-2 rounded-lg border border-chamGold/20">
            <p className="text-sm text-chamDarkBlue/90 font-medium">
              Use your balance to book interline tickets with Cham Wings and partner airlines
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
