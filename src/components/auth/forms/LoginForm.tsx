
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LoginFormValues } from '@/context/auth/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

// Define the form schema - minimal validation to allow most inputs
const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoginError(null); // Clear any previous errors
      await login(data);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Failed to login. Please try again.');
      }
    }
  };

  const formAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <CardContent className={`space-y-6 ${isMobile ? 'px-4 pt-3' : 'pt-4'}`}>
          {loginError && (
            <Alert variant="destructive" className="mb-4 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <motion.div 
            {...formAnimation} 
            transition={{ delay: 0.1 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your@email.com" 
                      {...field} 
                      className="w-full h-12 border-gray-200 shadow-sm focus-visible:ring-chamBlue"
                      type="email"
                      inputMode="email"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            {...formAnimation} 
            transition={{ delay: 0.2 }}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        {...field}
                        className="w-full h-12 border-gray-200 shadow-sm pr-10 focus-visible:ring-chamBlue" 
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            {...formAnimation} 
            transition={{ delay: 0.3 }}
          >
            <Button 
              type="button" 
              variant="link" 
              className="px-0 text-chamBlue hover:text-chamGold text-sm h-auto" 
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </Button>
          </motion.div>
        </CardContent>
        <CardFooter className={`flex-col ${isMobile ? 'px-6 pb-8' : 'px-6 pb-8'}`}>
          <motion.div 
            {...formAnimation} 
            className="w-full" 
            transition={{ delay: 0.4 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-chamBlue hover:bg-chamBlue/90 py-6 h-auto font-semibold text-base rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In'}
            </Button>
          </motion.div>
        </CardFooter>
      </form>
    </Form>
  );
};
