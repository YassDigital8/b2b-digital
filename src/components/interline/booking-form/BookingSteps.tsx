
import { Check } from 'lucide-react';

interface BookingStepsProps {
  currentStep: number;
}

const BookingSteps = ({ currentStep }: BookingStepsProps) => {
  const steps = [
    { id: 1, name: 'Passenger Details' },
    { id: 2, name: 'Contact Information' },
    { id: 3, name: 'Confirmation' },
  ];

  return (
    <div className="px-6 py-6 border-b">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <div className="flex items-center">
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${currentStep > step.id 
                  ? 'bg-green-600 border-green-600' 
                  : currentStep === step.id 
                    ? 'border-chamBlue text-chamBlue' 
                    : 'border-gray-300 text-gray-400'}`}
              >
                {currentStep > step.id ? (
                  <Check className="h-6 w-6 text-white" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-full flex-1 mx-2 ${
                  currentStep > step.id + 1 
                    ? 'bg-green-600' 
                    : 'bg-gray-300'
                }`} />
              )}
            </div>
            <span className={`mt-2 text-sm font-medium ${
              currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
