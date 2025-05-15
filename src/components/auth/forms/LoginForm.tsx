
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
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getTravelAgentService, logInService } from '@/redux/services/authService';
import { AppDispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/useAppSelector';
import { useAuthContext } from '@/context/auth';
import { loginFormSchema } from '../hooks/form/loginFormSchema';

// Define the form schema - minimal validation to allow most inputs
const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

interface LoginFormProps {
  onSuccess?: () => void;
}


export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  // const { login } = useAuth();
  // const auth = useAuthContext();

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useAppSelector(state => state.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      console.log(values);
      const data = values
      dispatch(logInService(data)).then((action) => {
        if (logInService.fulfilled.match(action)) {

          const data = action.payload
          const { code, token } = data
          dispatch(getTravelAgentService({ code })).then((action) => {
            if (getTravelAgentService.fulfilled.match(action)) {
              navigate('/')
            }
          })

        }
      })
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <CardContent className={`space-y-4 ${isMobile ? 'px-4 pt-3' : 'pt-4'}`}>
        {loginError && (
          <Alert variant="destructive" className="mb-4 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            placeholder="your@email.com"
            autoCapitalize="none"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-red-500">{formik.errors.password}</p>
          )}
        </div>

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
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign In'}

        </Button>
      </CardFooter>
    </form>
  );
};