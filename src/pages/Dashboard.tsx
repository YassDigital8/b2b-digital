
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';

// Import components
import ServicesSection from '@/components/dashboard/ServicesSection';
import ReportsSection from '@/components/dashboard/ReportsSection';
import AccountSection from '@/components/dashboard/AccountSection';

const Dashboard = () => {
  const { user, requireAuth } = useAuth();

  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
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
          
          {/* Static News Ticker Image */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full border border-blue-200 rounded-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/052ec344-d2e0-4af7-b2ff-2c93877c8875.png"
                alt="Travel Hub News Ticker"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          
          {/* Account Section - First section */}
          <AccountSection user={user} />
          
          {/* Services Section - Second section (for booking services) */}
          <ServicesSection />
          
          {/* Reports Section - Third section */}
          <ReportsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
