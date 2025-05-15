import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
interface AccountBalanceProps {
  balance: number;
}
const AccountBalance: React.FC<AccountBalanceProps> = ({
  balance
}) => {
  return <Card className="border-none shadow-lg overflow-hidden rounded-xl bg-gradient-to-br from-white to-blue-50">
      
      
    </Card>;
};
export default AccountBalance;