
import { User } from './types';

// Mock user data for demonstration purposes
export const MOCK_USERS = [
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
