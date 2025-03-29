
import { SignUpFormValues } from '../form/signUpFormSchema';
import { EmployeeData } from '../../utils/authConstants';

export const prepareSignUpApiData = (
  formData: SignUpFormValues, 
  hasEmployees: boolean, 
  employees: EmployeeData[]
) => {
  // Prepare emails array (main user + employees)
  const emails = [formData.email];
  const phones = [formData.phoneNumber];
  const codes = [formData.phoneCode];
  
  // Add employee data if exists
  if (hasEmployees && employees.length > 0) {
    employees.forEach(employee => {
      if (employee.email) {
        emails.push(employee.email);
        phones.push(employee.phoneNumber);
        codes.push(employee.phoneCode);
      }
    });
  }

  // Format data for API - returning the data as the server expects it
  // When there are employees, we need to send arrays, otherwise single values
  return {
    travel_agent_office: formData.name,
    pos: formData.country === 'Syria' ? 'SYR' : formData.country,
    // Always send arrays for these fields regardless of employee count
    email: emails,
    phone: phones,
    code: codes,
    user_name: formData.agency
  };
};

export const prepareSignUpContextData = (
  formData: SignUpFormValues,
  hasEmployees: boolean,
  employees: EmployeeData[]
) => {
  return {
    name: formData.name,
    email: formData.email,
    password: '',
    agency: formData.agency,
    country: formData.country,
    phone: `${formData.phoneCode}${formData.phoneNumber}`,
    employees: hasEmployees ? employees.map(employee => ({
      ...employee,
      phone: `${employee.phoneCode}${employee.phoneNumber}`
    })) : undefined
  };
};

// Function that formats the form data for the API
export const formatFormData = (
  formData: SignUpFormValues,
  employees: EmployeeData[]
) => {
  const hasEmployees = employees.length > 0;
  // Use the existing function to prepare data for the API
  return prepareSignUpApiData(formData, hasEmployees, employees);
};
