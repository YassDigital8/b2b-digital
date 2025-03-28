import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
interface AuthModalProps {
  defaultTab?: string;
}
const COUNTRIES = ['United Arab Emirates', 'Syria', 'Lebanon', 'Jordan', 'Kuwait', 'Saudi Arabia', 'Qatar', 'Iraq', 'Egypt', 'Sudan', 'Other'];
const AuthModal = ({
  defaultTab = 'login'
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agency, setAgency] = useState('');
  const [country, setCountry] = useState('');

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    login,
    signUp
  } = useAuth();
  const navigate = useNavigate();
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!loginEmail) newErrors.loginEmail = 'Email is required';
    if (!loginPassword) newErrors.loginPassword = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateSignUpForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agency) newErrors.agency = 'Agency name is required';
    if (!country) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;
    setIsSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUpForm()) return;
    setIsSubmitting(true);
    try {
      await signUp({
        name,
        email,
        password,
        agency,
        country
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} className="w-full max-w-md">
      <Card className="border-none shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-chamBlue mb-2">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {activeTab === 'login' ? 'Sign in to access the Cham Wings Travel Hub' : 'Register to join the Cham Wings Travel Hub'}
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="login" className="m-0">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className={errors.loginEmail ? "border-red-500" : ""} />
                  {errors.loginEmail && <p className="text-red-500 text-sm">{errors.loginEmail}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className={errors.loginPassword ? "border-red-500" : ""} />
                  {errors.loginPassword && <p className="text-red-500 text-sm">{errors.loginPassword}</p>}
                </div>
                <Button type="button" variant="link" className="px-0 text-chamBlue hover:text-chamGold" onClick={() => navigate('/forgot-password')}>
                  Forgot your password?
                </Button>
              </CardContent>
              <CardFooter className="flex-col">
                <Button type="submit" className="w-full bg-chamBlue hover:bg-chamBlue/90" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </> : 'Sign In'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="m-0">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Travel Agency Name</Label>
                  <Input id="name" placeholder="Your Office Name" value={name} onChange={e => setName(e.target.value)} className={errors.name ? "border-red-500" : ""} />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className={errors.email ? "border-red-500" : ""} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  
                  
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency">AccelAero Username</Label>
                  <Input id="agency" placeholder="Your AccelAero Sign Username" value={agency} onChange={e => setAgency(e.target.value)} className={errors.agency ? "border-red-500" : ""} />
                  {errors.agency && <p className="text-red-500 text-sm">{errors.agency}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">POS | Point of Sale</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger id="country" className={errors.country ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(c => <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex-col">
                <Button type="submit" className="w-full bg-chamBlue hover:bg-chamBlue/90" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </> : 'Create Account'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>;
};
export default AuthModal;