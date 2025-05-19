
import { Award, ArrowRight, Plus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpcomingBookingsCard = () => {
  return (
    <Card className="border-none shadow-soft overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-chamDarkBlue">Cham Miles Program</CardTitle>
          <div className="bg-chamGold/20 p-2 rounded-full">
            <Award className="h-5 w-5 text-chamGold" />
          </div>
        </div>
        <CardDescription>Loyalty rewards for your passengers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {/* Main Enrollment CTA Banner */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-chamBlue/10 to-chamGold/10 border border-chamBlue/20">
            <div className="flex items-center gap-3">
              <div className="bg-chamGold p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-chamDarkBlue">Enroll Your Passenger to Cham Miles</p>
                <p className="text-xs text-gray-600 mt-1">Earn miles on every flight and enjoy exclusive benefits</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Link to="/enroll-cham-miles">
                <Button size="sm" className="bg-chamGold hover:bg-chamGold/90 text-white">
                  Enroll Now
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Benefits List */}
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <h4 className="font-medium text-chamDarkBlue mb-2">Program Benefits</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                <span>Earn miles on every Cham Wings flight</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                <span>Redeem miles for flights and upgrades</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-chamGold"></div>
                <span>Priority check-in and boarding</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center gap-2 mt-2">
            <Link to="/enroll-cham-miles">
              <Button className="bg-chamBlue hover:bg-chamBlue/90 text-white flex items-center gap-1">
                <Plus className="h-4 w-4" />
                New Enrollment
              </Button>
            </Link>
            
            <Link to="/cham-miles-members">
              <Button variant="outline" className="text-chamBlue border-chamBlue/30 hover:bg-chamBlue/5">
                View Members
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBookingsCard;
