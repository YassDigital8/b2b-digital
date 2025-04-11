
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountBalanceProps {
  balance: number;
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ balance }) => {
  return (
    <Card className="border-none shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-chamDarkBlue">Account Balance</CardTitle>
        <CardDescription>Available funds for interline bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-chamDarkBlue">${balance.toLocaleString()}</p>
          </div>
          
          <div className="bg-chamGold/10 px-4 py-2 rounded-lg">
            <p className="text-sm text-chamGold font-medium">
              Use your balance to book interline tickets with Cham Wings and partner airlines
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
