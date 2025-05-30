
export const COUNTRIES = [
  'United Arab Emirates', 
  'Syria', 
  'Lebanon', 
  'Jordan', 
  'Kuwait', 
  'Saudi Arabia', 
  'Qatar', 
  'Iraq', 
  'Egypt', 
  'Sudan', 
  'Bahrain', 
  'Oman', 
  'Yemen', 
  'Libya', 
  'Algeria', 
  'Morocco', 
  'Tunisia', 
  'Palestine', 
  'Turkey', 
  'Iran', 
  'Other'
];

export const COUNTRY_CODES = [
  { country: 'United Arab Emirates', code: '+971' },
  { country: 'Syria', code: '+963' },
  { country: 'Lebanon', code: '+961' },
  { country: 'Jordan', code: '+962' },
  { country: 'Kuwait', code: '+965' },
  { country: 'Saudi Arabia', code: '+966' },
  { country: 'Qatar', code: '+974' },
  { country: 'Iraq', code: '+964' },
  { country: 'Egypt', code: '+20' },
  { country: 'Sudan', code: '+249' },
  { country: 'Bahrain', code: '+973' },
  { country: 'Oman', code: '+968' },
  { country: 'Yemen', code: '+967' },
  { country: 'Libya', code: '+218' },
  { country: 'Algeria', code: '+213' },
  { country: 'Morocco', code: '+212' },
  { country: 'Tunisia', code: '+216' },
  { country: 'Palestine', code: '+970' },
  { country: 'Turkey', code: '+90' },
  { country: 'Iran', code: '+98' },
  { country: 'Other', code: '+' },
];

export interface EmployeeData {
  email: string;
  role: string;
  phoneCode: string;
  phoneNumber: string;
}

export const EMPLOYEE_ROLES = [
  { value: 'agent', label: 'Booking Agent' },
  { value: 'accountant', label: 'Accountant' },
  { value: 'manager', label: 'Manager' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'other', label: 'Other' }
];

export const EMPTY_EMPLOYEE: EmployeeData = {
  email: '',
  role: 'agent',
  phoneCode: '',
  phoneNumber: ''
};
