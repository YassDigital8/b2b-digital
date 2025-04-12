
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <CardContent className={`space-y-4 ${isMobile ? 'px-4 pt-3' : 'pt-4'}`}>
          {loginError && (
            <Alert variant="destructive" className="mb-4 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    {...field} 
                    className="w-full"
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field}
                    className="w-full" 
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button 
            type="button" 
            variant="link" 
            className="px-0 text-chamBlue hover:text-chamGold text-sm h-auto" 
            onClick={() => navigate('/forgot-password')}
          >
            Forgot your password?
          </Button>
        </CardContent>
        <CardFooter className={`flex-col ${isMobile ? 'px-4 pb-4' : ''}`}>
          <Button 
            type="submit" 
            className="w-full bg-chamBlue hover:bg-chamBlue/90 py-5 h-auto font-medium" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : 'Sign In'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
