
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import { User, Mail, Building, MapPin, Shield, KeyRound, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agency, setAgency] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
      
      // Initialize form with user data
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAgency(user.agency || '');
        setCountry(user.country || '');
        setPhone('');
      }
    }
  }, [requireAuth, user]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !agency || !country) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill out all password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Password updated successfully');
      setIsSubmitting(false);
      // Reset password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };
  
  const COUNTRIES = [
    'United Arab Emirates',
    'Syria',
    'Lebanon',
    'Jordan',
    'Kuwait',
    'Saudi Arabia',
    'Qatar',
    'Iraq',
    'Egypt',
    'Sudan',
    'Other',
  ];
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 bg-gradient-to-b from-chamGray/50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-chamDarkBlue">Your Profile</h1>
            <p className="text-gray-600">Manage your account information and settings</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl text-chamDarkBlue">Account</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <Tabs
                    defaultValue="profile"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    orientation="vertical"
                    className="w-full"
                  >
                    <TabsList className="flex flex-col h-auto bg-transparent space-y-1 items-start w-full">
                      <TabsTrigger
                        value="profile"
                        className="w-full justify-start px-4 data-[state=active]:bg-chamBlue/10 data-[state=active]:text-chamBlue"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Personal Information
                      </TabsTrigger>
                      <TabsTrigger
                        value="security"
                        className="w-full justify-start px-4 data-[state=active]:bg-chamBlue/10 data-[state=active]:text-chamBlue"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Card className="border-none shadow-soft">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="profile" className="m-0">
                    <CardHeader>
                      <CardTitle className="text-2xl text-chamDarkBlue">Personal Information</CardTitle>
                      <CardDescription>Update your account details and information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                              <User className="h-4 w-4 text-chamBlue" />
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-chamBlue" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Your email address"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="agency" className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-chamBlue" />
                              Travel Agency Name *
                            </Label>
                            <Input
                              id="agency"
                              value={agency}
                              onChange={(e) => setAgency(e.target.value)}
                              placeholder="Your agency name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="country" className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-chamBlue" />
                              Country *
                            </Label>
                            <Select value={country} onValueChange={setCountry}>
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                              <SelectContent>
                                {COUNTRIES.map((c) => (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                              Phone Number (Optional)
                            </Label>
                            <Input
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Your contact number"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="security" className="m-0">
                    <CardHeader>
                      <CardTitle className="text-2xl text-chamDarkBlue">Security Settings</CardTitle>
                      <CardDescription>Update your password and security preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordUpdate}>
                        <div className="space-y-6 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="current-password" className="flex items-center gap-2">
                              <KeyRound className="h-4 w-4 text-chamBlue" />
                              Current Password *
                            </Label>
                            <Input
                              id="current-password"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="Your current password"
                            />
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="flex items-center gap-2">
                              <KeyRound className="h-4 w-4 text-chamBlue" />
                              New Password *
                            </Label>
                            <Input
                              id="new-password"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                            />
                            <p className="text-xs text-gray-500">
                              Password must be at least 8 characters long
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-chamBlue" />
                              Confirm New Password *
                            </Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            className="bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Updating Password...' : 'Update Password'}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
