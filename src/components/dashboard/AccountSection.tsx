
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, User, MapPin, Building, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AccountSectionProps {
  user: {
    name: string;
    balance: number;
    agency?: string;
    country?: string;
  };
}

const AccountSection = ({ user }: AccountSectionProps) => {
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="h-full border-none shadow-soft overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-chamBlue to-blue-400 w-full"></div>
      <div className="pt-6 pb-4 px-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-chamBlue to-blue-500 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg text-chamDarkBlue">{user.name}</CardTitle>
            <CardDescription className="text-xs flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>Verified Account</span>
            </CardDescription>
          </div>
        </div>
        <Link to="/profile">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Settings className="h-3.5 w-3.5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <Building className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Agency</p>
              <p className="font-medium text-chamDarkBlue">{user.agency || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="bg-green-50 p-2 rounded-full">
              <MapPin className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Country</p>
              <p className="font-medium text-chamDarkBlue">{user.country || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Status</p>
              <div className="flex items-center gap-2 text-green-600">
                <span className="font-medium">Active</span>
                <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">Good Standing</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSection;
