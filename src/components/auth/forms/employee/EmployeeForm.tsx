
import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRY_CODES, EMPLOYEE_ROLES, EmployeeData } from '../../utils/authConstants';

interface EmployeeFormProps {
  employee: EmployeeData;
  index: number;
  errors: Record<string, string>;
  onUpdate: (index: number, field: keyof EmployeeData, value: string) => void;
  onRemove: (index: number) => void;
}

export const EmployeeForm = ({ 
  employee, 
  index, 
  errors, 
  onUpdate, 
  onRemove 
}: EmployeeFormProps) => {
  
  const handleEmployeeCountryCodeChange = (value: string) => {
    onUpdate(index, 'phoneCode', value);
  };

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
        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-name`}>Employee Name</Label>
          <Input
            id={`employee-${index}-name`}
            value={employee.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            placeholder="Full Name"
            className={errors[`employee-${index}-name`] ? "border-red-500" : ""}
          />
          {errors[`employee-${index}-name`] && (
            <p className="text-red-500 text-sm">{errors[`employee-${index}-name`]}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-email`}>Employee Email</Label>
          <Input
            id={`employee-${index}-email`}
            type="email"
            value={employee.email}
            onChange={(e) => onUpdate(index, 'email', e.target.value)}
            placeholder="employee@example.com"
            className={errors[`employee-${index}-email`] ? "border-red-500" : ""}
          />
          {errors[`employee-${index}-email`] && (
            <p className="text-red-500 text-sm">{errors[`employee-${index}-email`]}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-role`}>Role</Label>
          <Select
            value={employee.role}
            onValueChange={(value) => onUpdate(index, 'role', value)}
          >
            <SelectTrigger id={`employee-${index}-role`}>
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
        </div>

        <div className="space-y-2">
          <Label htmlFor={`employee-${index}-phone`}>Phone Number</Label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <Select 
                value={employee.phoneCode} 
                onValueChange={(value) => handleEmployeeCountryCodeChange(value)}
              >
                <SelectTrigger 
                  id={`employee-${index}-phone-code`} 
                  className={errors[`employee-${index}-phoneCode`] ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent enableSearch={true}>
                  {COUNTRY_CODES.map(c => (
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
                onChange={(e) => onUpdate(index, 'phoneNumber', e.target.value.replace(/\D/g, ''))}
                className={errors[`employee-${index}-phoneNumber`] ? "border-red-500" : ""}
              />
            </div>
          </div>
          {(errors[`employee-${index}-phoneCode`] || errors[`employee-${index}-phoneNumber`]) && (
            <p className="text-red-500 text-sm">
              {errors[`employee-${index}-phoneCode`] || errors[`employee-${index}-phoneNumber`]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
