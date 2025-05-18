import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Info, Check, AlertCircle, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const TopUp = () => {
  const { user, requireAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('ecash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Common form state
  const [amount, setAmount] = useState('');
  
  // eCash form state
  const [ecashReference, setEcashReference] = useState('');
  const [ecashPhone, setEcashPhone] = useState('');
  
  // Haram form state
  const [haramReference, setHaramReference] = useState('');
  const [haramReceiptImage, setHaramReceiptImage] = useState<File | null>(null);
  
  // Fouad form state
  const [fouadReference, setFouadReference] = useState('');
  const [fouadBank, setFouadBank] = useState('');
  
  useEffect(() => {
    const isAuthenticated = requireAuth('/login');
    if (isAuthenticated) {
      window.scrollTo(0, 0);
    }
  }, [requireAuth]);
  
  const handleEcashSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !ecashReference || !ecashPhone) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Top-up request of $${amount} submitted successfully`);
      setIsSubmitting(false);
      // Reset form
      setAmount('');
      setEcashReference('');
      setEcashPhone('');
    }, 1500);
  };
  
  const handleHaramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !haramReference || !haramReceiptImage) {
      toast.error('Please fill out all required fields and upload receipt');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Top-up request of $${amount} submitted successfully`);
      setIsSubmitting(false);
      // Reset form
      setAmount('');
      setHaramReference('');
      setHaramReceiptImage(null);
    }, 1500);
  };
  
  const handleFouadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !fouadReference || !fouadBank) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Top-up request of $${amount} submitted successfully`);
      setIsSubmitting(false);
      // Reset form
      setAmount('');
      setFouadReference('');
      setFouadBank('');
    }, 1500);
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setHaramReceiptImage(e.target.files[0]);
    }
  };
  
  const paymentMethods = [
    { id: 'ecash', name: 'eCash', icon: CreditCard },
    { id: 'haram', name: 'Haram', icon: Wallet },
    { id: 'fouad', name: 'Fouad', icon: CreditCard }
  ];
  
  const fouadBanks = [
    'Fouad Exchange',
    'Commercial Bank of Syria',
    'Syria International Islamic Bank',
    'Bank of Syria and Overseas',
    'Qatar National Bank Syria',
    'Byblos Bank Syria',
    'Banque Bemo Saudi Fransi'
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
            <h1 className="text-3xl font-bold text-chamDarkBlue">Account Top Up</h1>
            <p className="text-gray-600">Add funds to your Cham Wings account through multiple payment methods</p>
          </motion.div>
          
          <Tabs defaultValue="ecash" value={activeTab} onValueChange={setActiveTab}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <TabsList className="grid w-full max-w-md grid-cols-3">
                {paymentMethods.map((method) => (
                  <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                    <method.icon className="h-4 w-4" />
                    {method.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="border-none shadow-soft">
                    <TabsContent value="ecash" className="mt-0">
                      <CardHeader>
                        <CardTitle className="text-2xl text-chamDarkBlue">eCash Top Up</CardTitle>
                        <CardDescription>Add funds to your account using eCash payment system</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleEcashSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <Label htmlFor="amount">Amount (USD) *</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  id="amount"
                                  placeholder="Enter amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="ecash-reference">eCash Reference Number *</Label>
                              <Input
                                id="ecash-reference"
                                placeholder="e.g. EC-123456789"
                                value={ecashReference}
                                onChange={(e) => setEcashReference(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="ecash-phone">eCash Registered Phone Number *</Label>
                              <Input
                                id="ecash-phone"
                                placeholder="e.g. +963 11 234 5678"
                                value={ecashPhone}
                                onChange={(e) => setEcashPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-chamBlue font-medium mb-1">How to complete your eCash payment:</p>
                                <ol className="list-decimal list-inside text-xs text-chamBlue/80 space-y-1">
                                  <li>Visit any eCash outlet or use the eCash mobile app</li>
                                  <li>Specify that you want to pay for Cham Wings services</li>
                                  <li>Provide your account email: {user.email}</li>
                                  <li>Pay the amount you wish to add to your account</li>
                                  <li>Get the reference number and enter it above</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Submit eCash Top Up'}
                          </Button>
                        </form>
                      </CardContent>
                    </TabsContent>
                    
                    <TabsContent value="haram" className="mt-0">
                      <CardHeader>
                        <CardTitle className="text-2xl text-chamDarkBlue">Haram Top Up</CardTitle>
                        <CardDescription>Add funds to your account using Haram Exchange</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleHaramSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <Label htmlFor="amount-haram">Amount (USD) *</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  id="amount-haram"
                                  placeholder="Enter amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="haram-reference">Haram Receipt Number *</Label>
                              <Input
                                id="haram-reference"
                                placeholder="e.g. HR-123456789"
                                value={haramReference}
                                onChange={(e) => setHaramReference(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="receipt-upload">Upload Receipt Image *</Label>
                              <Input
                                id="receipt-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="cursor-pointer"
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Please upload a clear image of your Haram Exchange receipt
                              </p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-chamBlue font-medium mb-1">How to complete your Haram Exchange payment:</p>
                                <ol className="list-decimal list-inside text-xs text-chamBlue/80 space-y-1">
                                  <li>Visit any Haram Exchange branch</li>
                                  <li>Inform the teller you want to pay for Cham Wings services</li>
                                  <li>Provide your account email: {user.email}</li>
                                  <li>Pay the amount you wish to add to your account</li>
                                  <li>Get the receipt, take a clear photo, and upload it above</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Submit Haram Top Up'}
                          </Button>
                        </form>
                      </CardContent>
                    </TabsContent>
                    
                    <TabsContent value="fouad" className="mt-0">
                      <CardHeader>
                        <CardTitle className="text-2xl text-chamDarkBlue">Fouad Top Up</CardTitle>
                        <CardDescription>Add funds to your account using Fouad Exchange</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleFouadSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <Label htmlFor="amount-fouad">Amount (USD) *</Label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  id="amount-fouad"
                                  placeholder="Enter amount"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="fouad-reference">Fouad Transfer Number *</Label>
                              <Input
                                id="fouad-reference"
                                placeholder="e.g. FE-123456789"
                                value={fouadReference}
                                onChange={(e) => setFouadReference(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="fouad-bank">Bank Used for Transfer *</Label>
                              <RadioGroup value={fouadBank} onValueChange={setFouadBank}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {fouadBanks.map((bank) => (
                                    <div key={bank} className="flex items-center space-x-2">
                                      <RadioGroupItem value={bank} id={bank.replace(/\s+/g, '-').toLowerCase()} />
                                      <Label htmlFor={bank.replace(/\s+/g, '-').toLowerCase()} className="text-sm">
                                        {bank}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-chamBlue font-medium mb-1">How to complete your Fouad Exchange payment:</p>
                                <ol className="list-decimal list-inside text-xs text-chamBlue/80 space-y-1">
                                  <li>Visit any Fouad Exchange branch or partner bank</li>
                                  <li>Inform the teller you want to pay for Cham Wings services</li>
                                  <li>Provide your account email: {user.email}</li>
                                  <li>Pay the amount you wish to add to your account</li>
                                  <li>Get the transfer number and enter it above</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-chamBlue hover:bg-chamBlue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Processing...' : 'Submit Fouad Top Up'}
                          </Button>
                        </form>
                      </CardContent>
                    </TabsContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="border-none shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-xl text-chamDarkBlue">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium text-chamDarkBlue mb-2">Top Up Process</h3>
                        <p className="text-gray-600 text-sm">
                          Adding funds to your Cham Wings account is a simple process. Choose your
                          preferred payment method, complete the required information, and submit your request.
                          Our team will verify your payment and credit your account, typically within 24 hours.
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-chamDarkBlue mb-2">Available Methods</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CreditCard className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-chamDarkBlue">eCash</p>
                              <p className="text-xs text-gray-600">Fast electronic payments through the eCash network</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Wallet className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-chamDarkBlue">Haram Exchange</p>
                              <p className="text-xs text-gray-600">Cash deposits at Haram Exchange branches</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CreditCard className="h-5 w-5 text-chamBlue shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-chamDarkBlue">Fouad Exchange</p>
                              <p className="text-xs text-gray-600">Bank transfers through Fouad Exchange partners</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800 text-sm">Important Note</p>
                            <p className="text-xs text-yellow-700">
                              Please ensure all information provided is accurate. Incorrect details
                              may delay the processing of your top-up request.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TopUp;
