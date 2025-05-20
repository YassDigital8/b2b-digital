
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';

// Import components
import AccountSection from '@/components/dashboard/AccountSection';
import NewsAnnouncement from '@/components/dashboard/NewsAnnouncement';
import UpcomingBookingsCard from '@/components/dashboard/charts/UpcomingBookingsCard';
import FAQSection from '@/components/dashboard/FAQSection';
import ActionBanner from '@/components/dashboard/ActionBanner';

const Dashboard = () => {
  const { user, requireAuth } = useAuth();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

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
      
      <main className="flex-grow pt-20 pb-12 bg-gradient-to-b from-chamGray/30 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-3xl font-bold text-chamDarkBlue">
                  Welcome back, {user.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your bookings and services from your dashboard
                </p>
              </div>
              
              <div className="mt-3 md:mt-0 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <span className="text-sm text-gray-500">Last login:</span>
                <span className="text-sm font-medium text-chamDarkBlue">Today, 09:45 AM</span>
              </div>
            </motion.div>
          </div>
          
          {/* News Announcement - Moving ticker */}
          {showAnnouncement && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <NewsAnnouncement
                title="Travel Updates"
                content="Book Ya Marhaba and make your passenger feel the experience of travel with Cham Wings Airlines. | Our Travel Hub now offers a new interline booking feature, which will enable Travel Agents to make reservations on the spot."
                onDismiss={() => setShowAnnouncement(false)}
              />
            </motion.div>
          )}
          
          {/* Quick Action Banner - Below News Announcement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <ActionBanner />
          </motion.div>
          
          {/* Main dashboard grid - Simplified with only Account and Upcoming Bookings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left column - Account Section */}
            <div className="md:col-span-1">
              <AccountSection user={user} />
            </div>
            
            {/* Right column - Upcoming Bookings */}
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <UpcomingBookingsCard />
              </motion.div>
            </div>
          </div>
          
          {/* FAQ Section - Replacing Services Section */}
          {/* <FAQSection /> */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
