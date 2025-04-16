
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
      "border-none shadow-soft overflow-hidden",
      "bg-gradient-to-r from-chamDarkBlue/5 to-chamGold/5"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-chamGold/20 rounded-full">
            <Wallet className="h-5 w-5 text-chamGold" />
          </div>
          <CardTitle className="text-xl text-chamDarkBlue">Account Balance</CardTitle>
        </div>
        <CardDescription>Available funds for interline bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-baseline gap-1.5">
            <DollarSign className="h-5 w-5 text-green-600 mb-1" />
            <p className="text-3xl font-bold text-chamDarkBlue">{balance.toLocaleString()}</p>
            <p className="text-sm text-green-600 font-medium flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> Active
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-chamGold/10 to-chamBlue/10 px-4 py-2.5 rounded-lg border border-chamGold/10"
          >
            <div className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4 text-chamBlue" />
              <p className="text-sm font-medium text-chamDarkBlue">
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
