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

  // Format data for API - sending fields as arrays as required by the API
  const apiData = {
    travel_agent_office: formData.name.trim(),
    pos: formData.country === 'Syria' ? 'SYR' : formData.country.trim(),
    email: [formData.email.trim()], // Convert to array
    phone: [formData.phoneNumber.trim()], // Convert to array
    code: [formData.phoneCode.trim()], // Convert to array
    user_name: formData.agency.trim()
  };

  // Add employee data to the arrays if employees exist
  if (hasEmployees && employees.length > 0) {
    // Filter out any employees with empty required fields
    const validEmployees = employees.filter(emp => 
      emp.email.trim() && emp.phoneNumber.trim() && emp.phoneCode.trim()
    );

    // Add employee emails to the email array
    validEmployees.forEach(emp => {
      if (emp.email.trim()) {
        apiData.email.push(emp.email.trim());
      }
      if (emp.phoneNumber.trim()) {
        apiData.phone.push(emp.phoneNumber.trim());
      }
      if (emp.phoneCode.trim()) {
        apiData.code.push(emp.phoneCode.trim());
      }
    });
  }

  return apiData;
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
