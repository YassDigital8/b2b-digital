
import { EmployeeData, EMPTY_EMPLOYEE } from '../../utils/authConstants';

export const addEmployee = (employees: EmployeeData[]): EmployeeData[] => {
  return [...employees, { ...EMPTY_EMPLOYEE }];
};

export const removeEmployee = (employees: EmployeeData[], index: number): EmployeeData[] => {
  return employees.filter((_, i) => i !== index);
};

export const updateEmployee = (
  employees: EmployeeData[], 
  index: number, 
  field: keyof EmployeeData, 
  value: string
): EmployeeData[] => {
  const updatedEmployees = [...employees];
  updatedEmployees[index] = { ...updatedEmployees[index], [field]: value };
  return updatedEmployees;
};

export const formatEmployeeData = (
  employees: EmployeeData[]
): { phone: string }[] => {
  return employees.map(employee => ({
    ...employee,
    phone: `${employee.phoneCode}${employee.phoneNumber}`
  }));
};
