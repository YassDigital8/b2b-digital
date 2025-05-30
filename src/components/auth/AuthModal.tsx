
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './forms/LoginForm';
import { SignUpForm } from './forms/SignUpForm';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface AuthModalProps {
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const AuthModal = ({
  defaultTab = 'login',
  onTabChange
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (value: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(value);
      if (onTabChange) {
        onTabChange(value);
      }
      setIsTransitioning(false);
    }, 150);
  };

  // Initialize with default tab
  useEffect(() => {
    if (defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4
      }}
      className="w-full max-w-md"
    >
      <Card className="border-none shadow-lg overflow-hidden bg-white/95 backdrop-blur-lg">
        <AspectRatio ratio={16/3} className="bg-gradient-to-r from-chamBlue to-blue-500 h-20 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-semibold">Cham Wings</h3>
            <p className="text-xs opacity-80">Travel Hub Portal</p>
          </div>
        </AspectRatio>
        
        <CardHeader className="text-center pt-6 pb-2">
          <CardTitle className="text-2xl mb-2 font-bold bg-gradient-to-r from-chamBlue to-blue-600 bg-clip-text text-transparent">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {activeTab === 'login' 
              ? 'Sign in to access the Cham Wings Travel Hub' 
              : 'Register to join the Cham Wings Travel Hub'
            }
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/80 p-1.5 rounded-xl">
              <TabsTrigger 
                value="login" 
                className={`relative group transition-all px-6 duration-300 ${isTransitioning ? 'opacity-50' : ''}`}
              >
                <span className="relative z-10">Sign In</span>
                <span className={`absolute inset-0 bg-white rounded-lg shadow-md transform transition-transform duration-300 ease-in-out ${activeTab === 'login' ? 'opacity-100' : 'opacity-0'}`}></span>
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className={`relative group transition-all px-6 duration-300 ${isTransitioning ? 'opacity-50' : ''}`}
              >
                <span className="relative z-10">Sign Up</span>
                <span className={`absolute inset-0 bg-white rounded-lg shadow-md transform transition-transform duration-300 ease-in-out ${activeTab === 'register' ? 'opacity-100' : 'opacity-0'}`}></span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="login" className="m-0">
                <LoginForm />
              </TabsContent>
              
              <TabsContent value="register" className="m-0">
                <SignUpForm />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default AuthModal;
