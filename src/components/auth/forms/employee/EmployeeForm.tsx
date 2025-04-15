
import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRY_CODES, EMPLOYEE_ROLES, EmployeeData } from '../../utils/authConstants';
import { FieldErrors } from 'react-hook-form';
import { SignUpFormValues } from '../../hooks/useSignUpForm';

interface EmployeeFormProps {
  employee: EmployeeData;
  index: number;
  formik: any;  // Add formik here if you're passing the formik object directly

  onUpdate: (index: number, field: keyof EmployeeData, value: string) => void;
  onRemove: (index: number) => void;
}
export const EmployeeForm = ({
  employee,
  index,
  formik,
  onUpdate,
  onRemove,
}: EmployeeFormProps) => {
  const handleEmployeeCountryCodeChange = (value: string) => {
    onUpdate(index, 'phoneCode', value);
  };

  const employeeErrors = formik.errors.employees?.[index] || {};
  const employeeTouched = formik.touched.employees?.[index] || {};
  console.log('employeeTouched', employeeTouched);

  return (
    <div className="border rounded-md p-4 mb-4 relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
        onClick={() => onRemove(index)}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-email`}>Employee Email</Label>
          <Input
            id={`employee-${index}-email`}
            type="email"
            value={employee.email}
            onChange={(e) => onUpdate(index, 'email', e.target.value)}
            placeholder="employee@example.com"
            onBlur={() => formik.setFieldTouched(`employees[${index}].email`)}
            className={employeeTouched.email && employeeErrors.email ? 'border-red-500' : ''}
          />
          {employeeTouched.email && employeeErrors.email && (
            <p className="text-red-500 text-sm">{employeeErrors.email}</p>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-role`}>Role</Label>
          <Select
            value={employee.role}
            onValueChange={(value) => {
              onUpdate(index, 'role', value);
              formik.setFieldTouched(`employees[${index}].role`);
            }}
          >
            <SelectTrigger
              id={`employee-${index}-role`}
              className={employeeTouched.role && employeeErrors.role ? 'border-red-500' : ''}
            >
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYEE_ROLES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {employeeTouched.role && employeeErrors.role && (
            <p className="text-red-500 text-sm">{employeeErrors.role}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-phone`}>Phone Number</Label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <Select
                value={employee.phoneCode}
                onValueChange={handleEmployeeCountryCodeChange}
                // onBlur={() => formik.setFieldTouched(`employees[${index}].phoneCode`)}
              >
                <SelectTrigger
                  id={`employee-${index}-phone-code`}
                  className={employeeTouched.phoneCode && employeeErrors.phoneCode ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent enableSearch={true}>
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} - {c.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-2/3">
              <Input
                id={`employee-${index}-phone-number`}
                type="tel"
                placeholder="Phone number"
                value={employee.phoneNumber}
                onChange={(e) =>
                  onUpdate(index, 'phoneNumber', e.target.value.replace(/\D/g, ''))
                }
                onBlur={() => formik.setFieldTouched(`employees[${index}].phoneNumber`)}
                className={employeeTouched.phoneNumber && employeeErrors.phoneNumber ? 'border-red-500' : ''}
              />
            </div>
          </div>
          {(employeeTouched.phoneCode || employeeTouched.phoneNumber) && (
            <p className="text-red-500 text-sm">
              {employeeErrors.phoneCode || employeeErrors.phoneNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

