
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { EmployeeData } from '@/components/auth/utils/authConstants';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'admin' | 'manager' | 'accountant' | 'supervisor' | 'other';
  agency?: string;
  country?: string;
  phone?: string;
  balance: number;
  managerId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  logout: () => void;
}

interface SignUpData {
  name: string;
  email: string;
  password?: string; // Made optional since it will be auto-generated
  agency: string;
  country: string;
  phone?: string;
  employees?: EmployeeData[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@chamwings.com',
    password: 'password123',
    name: 'Demo Agent',
    role: 'agent' as const,
    agency: 'Global Travel Agency',
    country: 'United Arab Emirates',
    phone: '+971501234567',
    balance: 5000
  },
  {
    id: '2',
    email: 'admin@chamwings.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    balance: 10000
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('chamWingsUser');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('chamWingsUser');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Create a user object without the password
        const userWithoutPassword: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          balance: foundUser.balance
        };
        
        // Add optional properties if they exist
        if ('agency' in foundUser) {
          userWithoutPassword.agency = foundUser.agency;
        }
        
        if ('country' in foundUser) {
          userWithoutPassword.country = foundUser.country;
        }

        if ('phone' in foundUser) {
          userWithoutPassword.phone = foundUser.phone;
        }
        
        setUser(userWithoutPassword);
        localStorage.setItem('chamWingsUser', JSON.stringify(userWithoutPassword));
        toast.success('Welcome back!');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to login');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: SignUpData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }

      // Generate a random password (in a real app, this would be done server-side)
      const generatedPassword = Math.random().toString(36).slice(-8);
      
      // In a real app, you would send an email with the generated password here
      console.log(`Generated password for ${userData.email}: ${generatedPassword}`);
      
      // Create new user (in a real app, this would be handled by the backend)
      const newUserId = `${MOCK_USERS.length + 1}`;
      const newUser: User = {
        id: newUserId,
        email: userData.email,
        name: userData.name,
        role: 'manager', // Set the main account as a manager role
        agency: userData.agency,
        country: userData.country,
        phone: userData.phone,
        balance: 0
      };

      // Handle employee accounts if they exist
      if (userData.employees && userData.employees.length > 0) {
        // In a real implementation, we would create accounts for employees here
        // and send them emails with their login credentials
        
        // Log the employee accounts for demonstration
        userData.employees.forEach((employee, index) => {
          const employeePassword = Math.random().toString(36).slice(-8);
          console.log(`Created employee account for ${employee.name} (${employee.email})`);
          console.log(`Generated password for ${employee.email}: ${employeePassword}`);
          
          // In a real app, these would be saved to the database
          // For now, we'll just log them
        });
        
        // Show a success toast that includes info about employee accounts
        toast.success(
          `Account created! ${userData.employees.length} employee account${
            userData.employees.length > 1 ? 's' : ''
          } also created. Check email for login details.`
        );
      } else {
        // Notify user about password email (only for the main account)
        toast.success('Account created! Check your email for your password.');
      }

      // In a real app, we would save this to the backend
      setUser(newUser);
      localStorage.setItem('chamWingsUser', JSON.stringify(newUser));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create account');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chamWingsUser');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
