
import { EmployeeData } from './authConstants';

export interface SignUpFormData {
  name: string;
  email: string;
  agency: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  hasEmployees: boolean;
  employees: EmployeeData[];
}

export const validateSignUpForm = (formData: SignUpFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!formData.name) errors.name = 'Agency name is required';
  if (!formData.email) errors.email = 'Email is required';
  if (!formData.agency) errors.agency = 'AccelAero username is required';
  if (!formData.country) errors.country = 'Country is required';
  if (!formData.phoneCode) errors.phoneCode = 'Country code is required';
  if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
  
  // Validate employees if checkbox is checked
  if (formData.hasEmployees && formData.employees.length > 0) {
    formData.employees.forEach((employee, index) => {
      if (!employee.name) errors[`employee-${index}-name`] = 'Employee name is required';
      if (!employee.email) errors[`employee-${index}-email`] = 'Employee email is required';
      if (!employee.role) errors[`employee-${index}-role`] = 'Employee role is required';
      if (!employee.phoneCode) errors[`employee-${index}-phoneCode`] = 'Employee phone code is required';
      if (!employee.phoneNumber) errors[`employee-${index}-phoneNumber`] = 'Employee phone number is required';
    });
  }
  
  return errors;
};
