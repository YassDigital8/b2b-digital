
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="px-6 py-5 border-b bg-white">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <div className="flex items-center">
              <motion.div 
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-md
                  ${currentStep > step.id 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600' 
                    : currentStep === step.id 
                      ? 'border-violet-500 text-violet-700 bg-violet-50' 
                      : 'border-gray-300 text-gray-400 bg-gray-50'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.15 + 0.2
                }}
              >
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1
                    }}
                  >
                    <Check className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <span className="font-semibold font-display">{step.id}</span>
                )}
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div 
                  className={`h-0.5 w-full flex-1 mx-2 ${
                    currentStep > step.id + 1 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gray-300'
                  }`}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.15 + 0.4
                  }}
                />
              )}
            </div>
            <motion.span 
              className={`mt-2 text-sm font-medium font-display ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
              }`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.15 + 0.3
              }}
            >
              {step.name}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
