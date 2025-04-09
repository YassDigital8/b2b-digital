
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Car, CreditCard, Plane, Clock, CheckCircle2, ArrowRight, 
  TrendingUp, DollarSign, Users, BarChart3, Calendar, Filter
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const { user, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
  // Mock data for services
  const services = [
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Book Ya Marhaba services or arrange limousine for business class passengers',
      icon: Car,
      link: '/transportation',
      color: 'bg-blue-100',
      buttonText: 'Book Transportation'
    },
    {
      id: 'top-up',
      title: 'Top Up Account',
      description: 'Add funds to your account through eCash, Haram, or Fouad',
      icon: CreditCard,
      link: '/top-up',
      color: 'bg-green-100',
      buttonText: 'Top Up Now'
    },
    {
      id: 'interline',
      title: 'Interline Booking',
      description: 'Book tickets with Jazeera Airways, Air Arabia, or FlyDubai',
      icon: Plane,
      link: '/interline',
      color: 'bg-purple-100',
      buttonText: 'Book Flights'
    },
  ];
  
  // Mock data for reports
  const bookingData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 7 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 9 },
    { month: 'May', count: 11 },
    { month: 'Jun', count: 8 },
  ];
  
  const revenueData = [
    { month: 'Jan', amount: 510 },
    { month: 'Feb', amount: 780 },
    { month: 'Mar', amount: 1250 },
    { month: 'Apr', amount: 950 },
    { month: 'May', amount: 1100 },
    { month: 'Jun', amount: 820 },
  ];
  
  const topDestinations = [
    { name: 'Dubai', value: 42 },
    { name: 'Kuwait', value: 28 },
    { name: 'Cairo', value: 19 },
    { name: 'Beirut', value: 11 },
  ];

  const reportConfig = {
    bookings: { color: "#33C3F0", label: "Bookings" },
    revenue: { color: "#9b87f5", label: "Revenue" },
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 bg-gradient-to-b from-chamGray/50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-chamDarkBlue"
            >
              Welcome back, {user.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-gray-600"
            >
              Manage your bookings and services from your dashboard
            </motion.p>
          </div>
          
          {/* Services Section - Positioned at top for more visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-chamDarkBlue">Book Services</h2>
              <p className="text-chamBlue">Select a service to get started</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={service.id} 
                  className="border-none shadow-soft overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className={`${service.color} h-2 w-full`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className={`${service.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
                        <service.icon className="h-6 w-6 text-chamBlue" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-chamBlue/10 text-chamBlue">
                        Available
                      </span>
                    </div>
                    <CardTitle className="text-xl text-chamDarkBlue mt-2">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to={service.link} className="w-full">
                      <Button 
                        className="w-full bg-chamBlue hover:bg-chamBlue/90 flex items-center justify-center gap-2"
                      >
                        {service.buttonText}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
          
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
          
          {/* Reports Section - Replacing the Activities Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-chamDarkBlue">Performance Reports</h2>
              <div className="flex items-center gap-2 text-chamBlue text-sm">
                <Filter className="h-4 w-4" />
                <span>Last 6 Months</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Trends Report Card */}
              <Card className="border-none shadow-soft overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-chamDarkBlue">Booking Trends</CardTitle>
                    <div className="bg-blue-50 p-2 rounded-full">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  <CardDescription>Monthly booking statistics</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 pb-6">
                  <ChartContainer className="h-64" config={reportConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingData} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickCount={5} />
                        <Bar dataKey="count" name="bookings" fill="#33C3F0" radius={[4, 4, 0, 0]} barSize={30} />
                        <ChartTooltip 
                          content={<ChartTooltipContent nameKey="name" labelKey="month" />}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">+23% from last period</span>
                    </div>
                    <div className="text-sm text-gray-500">Total: 52 bookings</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Revenue Report Card */}
              <Card className="border-none shadow-soft overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-chamDarkBlue">Revenue Analysis</CardTitle>
                    <div className="bg-purple-50 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 pb-6">
                  <ChartContainer className="h-64" config={reportConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData} margin={{ top: 20, right: 0, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickCount={5} />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          name="revenue"
                          stroke="#9b87f5"
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent nameKey="name" labelKey="month" />}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">+15% from last period</span>
                    </div>
                    <div className="text-sm text-gray-500">Total: $5,410</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Popular Destinations Card */}
              <Card className="border-none shadow-soft overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-chamDarkBlue">Popular Destinations</CardTitle>
                    <div className="bg-amber-50 p-2 rounded-full">
                      <Plane className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                  <CardDescription>Most booked destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-2">
                    {topDestinations.map((destination, index) => (
                      <div key={destination.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-chamGray flex items-center justify-center text-xs font-medium text-chamDarkBlue">
                            {index + 1}
                          </span>
                          <span className="font-medium text-chamDarkBlue">{destination.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-500 rounded-full" 
                              style={{ width: `${(destination.value / topDestinations[0].value) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{destination.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Bookings Card */}
              <Card className="border-none shadow-soft overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-chamDarkBlue">Upcoming Bookings</CardTitle>
                    <div className="bg-green-50 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <CardDescription>Next 7 days schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-2">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-medium text-chamDarkBlue">FlyDubai: DAM to DXB</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>Jun 20, 2023 - 10:30 AM</span>
                          </div>
                        </div>
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full font-medium">
                          Pending
                        </span>
                      </div>
                    </div>
                    <div className="text-center py-2">
                      <p className="text-gray-500 text-sm">No other upcoming bookings</p>
                    </div>
                    <div className="flex justify-center">
                      <Link to="/interline">
                        <Button variant="outline" className="text-chamBlue">
                          Book New Flight
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
