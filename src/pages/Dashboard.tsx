
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';

// Import components
import ServicesSection from '@/components/dashboard/ServicesSection';
import ReportsSection from '@/components/dashboard/ReportsSection';
import AccountSection from '@/components/dashboard/AccountSection';
import NewsAnnouncement from '@/components/dashboard/NewsAnnouncement';

const Dashboard = () => {
  const { user, requireAuth } = useAuth();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
    
    // Add CommonNinja script
    const script = document.createElement('script');
    script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
    script.defer = true;
    document.head.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      const scriptElement = document.querySelector('script[src="https://cdn.commoninja.com/sdk/latest/commonninja.js"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
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
          
          {/* CommonNinja Widget */}
          <div className="mb-6">
            <div className="commonninja_component pid-5cd7cb42-b80c-4341-81ef-fce67e7645c6"></div>
          </div>
          
          {/* News Announcement - Added at the top */}
          {showAnnouncement && (
            <NewsAnnouncement
              title="Announcements"
              content="A new interline booking feature is now available at our Travel Hub. This will enable Travel Agents to make reservations on the spot."
              onDismiss={() => setShowAnnouncement(false)}
            />
          )}
          
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
