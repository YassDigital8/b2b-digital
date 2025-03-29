
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

  // Format data for API
  return {
    travel_agent_office: formData.name,
    pos: formData.country === 'Syria' ? 'SYR' : formData.country,
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
