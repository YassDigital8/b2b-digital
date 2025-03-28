
import { EmployeeData } from './authConstants';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmployee = (employee: EmployeeData, index: number) => {
  const errors: Record<string, string> = {};
  
  if (!employee.email) {
    errors[`employee-${index}-email`] = 'Email is required';
  } else if (!isValidEmail(employee.email)) {
    errors[`employee-${index}-email`] = 'Invalid email format';
  }

  if (!employee.phoneCode) {
    errors[`employee-${index}-phoneCode`] = 'Country code is required';
  }

  if (!employee.phoneNumber) {
    errors[`employee-${index}-phoneNumber`] = 'Phone number is required';
  }

  return errors;
};
