
import { User } from './types';
import { MOCK_USERS } from './mockData';
import { toast } from 'sonner';

export const getUserFromStorage = (): User | null => {
  const storedUser = localStorage.getItem('chamWingsUser');
  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      localStorage.removeItem('chamWingsUser');
    }
  }
  return null;
};

export const saveUserToStorage = (user: User): void => {
  localStorage.setItem('chamWingsUser', JSON.stringify(user));
};

export const removeUserFromStorage = (): void => {
  localStorage.removeItem('chamWingsUser');
};

export const findUserByCredentials = (email: string, password: string) => {
  return MOCK_USERS.find(u => u.email === email && u.password === password);
};

export const createUserWithoutPassword = (user: any): User => {
  // Create a user object without the password
  const userWithoutPassword: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    balance: user.balance
  };
  
  // Add optional properties if they exist
  if ('agency' in user) {
    userWithoutPassword.agency = user.agency;
  }
  
  if ('country' in user) {
    userWithoutPassword.country = user.country;
  }

  if ('phone' in user) {
    userWithoutPassword.phone = user.phone;
  }
  
  return userWithoutPassword;
};

export const checkIfEmailExists = (email: string): boolean => {
  return MOCK_USERS.some(u => u.email === email);
};

export const generatePassword = (): string => {
  return Math.random().toString(36).slice(-8);
};

export const handleEmployeeAccounts = (employees: any[] | undefined): void => {
  if (!employees || employees.length === 0) return;
  
  // Log the employee accounts for demonstration
  employees.forEach((employee, index) => {
    const employeePassword = generatePassword();
    console.log(`Created employee account for ${employee.name} (${employee.email})`);
    console.log(`Generated password for ${employee.email}: ${employeePassword}`);
    console.log(`Employee phone: ${employee.phone || 'Not provided'}`);
  });
  
  // Show a success toast that includes info about employee accounts
  toast.success(
    `Account created! ${employees.length} employee account${
      employees.length > 1 ? 's' : ''
    } also created. Check email for login details.`
  );
};
