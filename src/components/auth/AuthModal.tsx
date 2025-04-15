
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { LoginForm } from './forms/LoginForm';
import { SignUpForm } from './forms/SignUpForm';

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
      <Card className="border-none shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-chamBlue mb-2">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {activeTab === 'login'
              ? 'Sign in to access the Cham Wings Travel Hub'
              : 'Register to join the Cham Wings Travel Hub'
            }
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
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
