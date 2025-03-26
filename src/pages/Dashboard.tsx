
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
import { Car, CreditCard, Plane, Clock, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { user, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
  // Mock data
  const recentBookings = [
    {
      id: 'B-1234',
      type: 'Transportation',
      description: 'Ya Marhaba: Damascus to Aleppo',
      date: '2023-06-15',
      status: 'Completed',
      amount: 50
    },
    {
      id: 'B-1235',
      type: 'Interline',
      description: 'Jazeera Airways: DAM to KWI',
      date: '2023-06-10',
      status: 'Completed',
      amount: 320
    },
    {
      id: 'B-1236',
      type: 'Transportation',
      description: 'Limousine Service: Dubai Airport',
      date: '2023-06-05',
      status: 'Completed',
      amount: 0
    }
  ];
  
  const pendingServices = [
    {
      id: 'P-5678',
      type: 'Interline',
      description: 'FlyDubai: DAM to DXB',
      date: '2023-06-20',
      status: 'Pending',
      amount: 280
    }
  ];
  
  const services = [
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Book Ya Marhaba services or arrange limousine for business class passengers',
      icon: Car,
      link: '/transportation',
      color: 'bg-blue-100'
    },
    {
      id: 'top-up',
      title: 'Top Up Account',
      description: 'Add funds to your account through eCash, Haram, or Fouad',
      icon: CreditCard,
      link: '/top-up',
      color: 'bg-green-100'
    },
    {
      id: 'interline',
      title: 'Interline Booking',
      description: 'Book tickets with Jazeera, Air Arabia, or FlyDubai',
      icon: Plane,
      link: '/interline',
      color: 'bg-purple-100'
    },
  ];
  
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
              transition={{ delay: 0.3, duration: 0.5 }}
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-chamDarkBlue mb-6">Quick Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Link key={service.id} to={service.link}>
                  <Card className={`h-full border-none shadow-soft card-hover cursor-pointer`}>
                    <CardHeader className="pb-0">
                      <div className={`${service.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-2`}>
                        <service.icon className="h-6 w-6 text-chamBlue" />
                      </div>
                      <CardTitle className="text-xl text-chamDarkBlue">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-chamDarkBlue">Your Activities</h2>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
              </div>
              
              <Card className="border-none shadow-soft">
                <TabsContent value="overview" className="m-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-chamDarkBlue">Recent Activities</CardTitle>
                    <CardDescription>Your recent bookings and transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-2 md:mb-0">
                            <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                              {booking.type === 'Transportation' ? (
                                <Car className="h-4 w-4 text-chamBlue" />
                              ) : booking.type === 'Interline' ? (
                                <Plane className="h-4 w-4 text-chamBlue" />
                              ) : (
                                <CreditCard className="h-4 w-4 text-chamBlue" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-chamDarkBlue">{booking.description}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{booking.id}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="text-green-600 font-medium text-sm bg-green-50 px-2 py-1 rounded-full">
                              {booking.status}
                            </span>
                            <span className="font-bold text-chamDarkBlue ml-auto md:ml-0">
                              {booking.amount > 0 ? `$${booking.amount}` : 'Free'}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {pendingServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-2 md:mb-0">
                            <div className="bg-orange-100 p-2 rounded-full mt-1">
                              {service.type === 'Transportation' ? (
                                <Car className="h-4 w-4 text-orange-500" />
                              ) : service.type === 'Interline' ? (
                                <Plane className="h-4 w-4 text-orange-500" />
                              ) : (
                                <CreditCard className="h-4 w-4 text-orange-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-chamDarkBlue">{service.description}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{service.id}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(service.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="text-orange-600 font-medium text-sm bg-orange-50 px-2 py-1 rounded-full">
                              {service.status}
                            </span>
                            <span className="font-bold text-chamDarkBlue ml-auto md:ml-0">
                              ${service.amount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="bookings" className="m-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-chamDarkBlue">Completed Bookings</CardTitle>
                    <CardDescription>History of your completed bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-2 md:mb-0">
                            <div className="bg-chamBlue/10 p-2 rounded-full mt-1">
                              {booking.type === 'Transportation' ? (
                                <Car className="h-4 w-4 text-chamBlue" />
                              ) : booking.type === 'Interline' ? (
                                <Plane className="h-4 w-4 text-chamBlue" />
                              ) : (
                                <CreditCard className="h-4 w-4 text-chamBlue" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-chamDarkBlue">{booking.description}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{booking.id}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <span className="text-green-600 font-medium text-sm bg-green-50 px-2 py-1 rounded-full">
                              {booking.status}
                            </span>
                            <span className="font-bold text-chamDarkBlue ml-auto md:ml-0">
                              {booking.amount > 0 ? `$${booking.amount}` : 'Free'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-chamDarkBlue">Pending Services</CardTitle>
                    <CardDescription>Your upcoming and pending service requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingServices.length > 0 ? (
                      <div className="space-y-4">
                        {pendingServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-start gap-3 mb-2 md:mb-0">
                              <div className="bg-orange-100 p-2 rounded-full mt-1">
                                {service.type === 'Transportation' ? (
                                  <Car className="h-4 w-4 text-orange-500" />
                                ) : service.type === 'Interline' ? (
                                  <Plane className="h-4 w-4 text-orange-500" />
                                ) : (
                                  <CreditCard className="h-4 w-4 text-orange-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-chamDarkBlue">{service.description}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>{service.id}</span>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{new Date(service.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                              <span className="text-orange-600 font-medium text-sm bg-orange-50 px-2 py-1 rounded-full">
                                {service.status}
                              </span>
                              <span className="font-bold text-chamDarkBlue ml-auto md:ml-0">
                                ${service.amount}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">You don't have any pending services</p>
                      </div>
                    )}
                  </CardContent>
                </TabsContent>
              </Card>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
