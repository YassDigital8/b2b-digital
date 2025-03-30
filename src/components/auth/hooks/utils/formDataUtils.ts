
import { SignUpFormValues } from '../form/signUpFormSchema';
import { EmployeeData } from '../../utils/authConstants';

export const prepareSignUpApiData = (
  formData: SignUpFormValues, 
  hasEmployees: boolean, 
  employees: EmployeeData[]
) => {
  // Validate required fields
  if (!formData.name.trim()) {
    throw new Error("Travel Agent Office name is required");
  }
  
  if (!formData.country.trim()) {
    throw new Error("Country (POS) is required");
  }
  
  if (!formData.agency.trim()) {
    throw new Error("AccelAero username is required");
  }

  if (!formData.email.trim()) {
    throw new Error("Email is required");
  }

  if (!formData.phoneNumber.trim()) {
    throw new Error("Phone number is required");
  }

  if (!formData.phoneCode.trim()) {
    throw new Error("Country code is required");
  }

  // Format data for API - sending data as the server expects it
  // Now sending single values instead of arrays for the main user
  return {
    travel_agent_office: formData.name.trim(),
    pos: formData.country === 'Syria' ? 'SYR' : formData.country.trim(),
    email: formData.email.trim(),
    phone: formData.phoneNumber.trim(),
    code: formData.phoneCode.trim(),
    user_name: formData.agency.trim(),
    // Include governate with a default value
    governate: "Damascus" // Default value since it's required but not in the form
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
  
  // Validate the form data before sending to API
  if (!formData.name || !formData.email || !formData.agency || !formData.country || 
      !formData.phoneCode || !formData.phoneNumber) {
    throw new Error("Please fill in all required fields");
  }
  
  // Use the existing function to prepare data for the API
  return prepareSignUpApiData(formData, hasEmployees, employees);
};
