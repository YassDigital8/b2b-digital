
import React from 'react';
import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { EmployeeData, EMPTY_EMPLOYEE } from '../../utils/authConstants';
import { EmployeeForm } from './EmployeeForm';
import { motion, AnimatePresence } from 'framer-motion';
import { FieldErrors } from 'react-hook-form';
import { SignUpFormValues } from '../../hooks/useSignUpForm';

interface EmployeeSectionProps {
  hasEmployees: boolean;
  employees: EmployeeData[];
  errors: FieldErrors<SignUpFormValues>;
  onHasEmployeesChange: (checked: boolean) => void;
  onAddEmployee: () => void;
  onRemoveEmployee: (index: number) => void;
  onUpdateEmployee: (index: number, field: keyof EmployeeData, value: string) => void;
}

export const EmployeeSection = ({
  hasEmployees,
  employees,
  errors,
  onHasEmployeesChange,
  onAddEmployee,
  onRemoveEmployee,
  onUpdateEmployee
}: EmployeeSectionProps) => {
  return (
    <>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox 
          id="has-employees" 
          checked={hasEmployees}
          onCheckedChange={(checked) => onHasEmployeesChange(checked === true)}
        />
        <label
          htmlFor="has-employees"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I want to create accounts for my employees
        </label>
      </div>

      {hasEmployees && (
        <Accordion type="single" collapsible className="border rounded-md" defaultValue="employees">
          <AccordionItem value="employees" className="border-none">
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Employee Accounts ({employees.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <AnimatePresence>
                {employees.map((employee, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EmployeeForm 
                      employee={employee} 
                      index={index} 
                      errors={errors}
                      onUpdate={onUpdateEmployee}
                      onRemove={onRemoveEmployee}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={onAddEmployee}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
              
              <p className="text-xs text-muted-foreground mt-2">
                Login credentials will be automatically generated and sent to each employee email address.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};
