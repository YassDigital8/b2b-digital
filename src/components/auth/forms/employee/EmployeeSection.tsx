import React from 'react';
import { Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { EmployeeData, EMPTY_EMPLOYEE } from '../../utils/authConstants';
import { EmployeeForm } from './EmployeeForm';
import { motion, AnimatePresence } from 'framer-motion';
import { FieldErrors } from 'react-hook-form';
// import { SignUpFormValues } from '../../hooks/useSignUpForm';
import { useFormikContext } from 'formik';
interface EmployeeSectionProps {
  hasEmployees: boolean;
  employees: EmployeeData[];
  errors: FieldErrors<any>;
  onHasEmployeesChange: (checked: boolean) => void;
  onAddEmployee: () => void;
  onRemoveEmployee: (index: number) => void;
  onUpdateEmployee: (index: number, field: keyof EmployeeData, value: string) => void;
}
export const EmployeeSection = ({ formik }) => {
  const {
    values,
    errors,
    setFieldValue
  } = formik; // or type it properly with your form schema

  const hasEmployees = values.hasEmployees;
  const employees = values.employees || [];

  const handleHasEmployeesChange = (checked: boolean) => {
    setFieldValue('hasEmployees', checked);
    if (!checked) {
      setFieldValue('employees', []);
    }
  };

  const handleAddEmployee = () => {
    const newEmployees = [...employees, { email: '', phoneCode: '', phoneNumber: '' }];
    setFieldValue('employees', newEmployees);
  };

  const handleRemoveEmployee = (index: number) => {
    const updated = employees.filter((_, i) => i !== index);
    setFieldValue('employees', updated);
  };

  const handleUpdateEmployee = (index: number, field: string, value: string) => {
    const updated = [...employees];
    updated[index][field] = value;
    setFieldValue('employees', updated);
  };

  return (
    <>
      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          id="has-employees"
          checked={hasEmployees}
          onCheckedChange={(checked) => handleHasEmployeesChange(checked === true)}
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
                <User className="w-4 h-4 text-chamBlue" />
                <span className="flex items-center text-lg">
                  Employee Accounts
                  <span className="ml-1.5 inline-flex items-center justify-center bg-chamBlue text-white text-xs font-medium rounded-full h-5 min-w-5 px-1.5">
                    {employees.length}
                  </span>
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <AnimatePresence>
                {employees.map((employee: any, index: number) => (
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
                      formik={formik}
                      onUpdate={handleUpdateEmployee}
                      onRemove={handleRemoveEmployee}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2 border-chamBlue text-chamBlue hover:bg-chamBlue/10"
                onClick={handleAddEmployee}
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