
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'admin';
  agency?: string;
  country?: string;
  balance: number;
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
  password: string;
  agency: string;
  country: string;
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

      // Create new user (in a real app, this would be handled by the backend)
      const newUser: User = {
        id: `${MOCK_USERS.length + 1}`,
        email: userData.email,
        name: userData.name,
        role: 'agent',
        agency: userData.agency,
        country: userData.country,
        balance: 0
      };

      // In a real app, we would save this to the backend
      setUser(newUser);
      localStorage.setItem('chamWingsUser', JSON.stringify(newUser));
      toast.success('Account created successfully!');
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
