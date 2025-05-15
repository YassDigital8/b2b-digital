
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
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
        <AspectRatio ratio={16/3} className="bg-gradient-to-r from-chamBlue to-chamDarkBlue h-20 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-semibold">Cham Wings</h3>
            <p className="text-xs opacity-80">Travel Hub Portal</p>
          </div>
        </AspectRatio>
        
        <CardHeader className="text-center pt-6 pb-2">
          <CardTitle className="text-2xl text-chamDarkBlue mb-2 font-bold">
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
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/80 p-1.5 rounded-lg">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-white data-[state=active]:text-chamBlue data-[state=active]:shadow-md rounded-md py-2.5 font-medium"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="data-[state=active]:bg-white data-[state=active]:text-chamBlue data-[state=active]:shadow-md rounded-md py-2.5 font-medium"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="login" className="m-0">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="register" className="m-0">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default AuthModal;
