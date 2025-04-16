
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, RefreshCcw, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={cn(
      "border-none overflow-hidden rounded-2xl shadow-lg",
      "bg-gradient-to-br from-blue-500/[0.02] via-white to-purple-500/[0.03]"
    )}>
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-300 to-purple-300 opacity-10 rounded-full blur-3xl -z-10"></div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full shadow-md">
            <Wallet className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-xl bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">Account Balance</CardTitle>
        </div>
        <CardDescription>Available funds for interline bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-baseline gap-1.5">
            <DollarSign className="h-5 w-5 text-green-600 mb-1" />
            <p className="text-3xl font-bold bg-gradient-to-br from-blue-700 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {balance.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> Active
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-3 rounded-xl border border-blue-100/30 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <RefreshCcw className="h-4 w-4 text-blue-600" />
              <p className="text-sm font-medium text-gray-700">
                Use your balance to book interline tickets with Cham Wings and partner airlines
              </p>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
