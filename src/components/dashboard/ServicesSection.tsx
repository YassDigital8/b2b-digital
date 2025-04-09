
import { motion } from 'framer-motion';
import { Car, CreditCard, Plane } from 'lucide-react';
import ServiceCard from './ServiceCard';

// Mock data for services
const services = [
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Book Ya Marhaba services or arrange limousine for business class passengers',
    icon: Car,
    link: '/transportation',
    color: 'bg-blue-100',
    buttonText: 'Book Transportation'
  },
  {
    id: 'top-up',
    title: 'Top Up Account',
    description: 'Add funds to your account through eCash, Haram, or Fouad',
    icon: CreditCard,
    link: '/top-up',
    color: 'bg-green-100',
    buttonText: 'Top Up Now'
  },
  {
    id: 'interline',
    title: 'Interline Booking',
    description: 'Book tickets with Jazeera Airways, Air Arabia, or FlyDubai',
    icon: Plane,
    link: '/interline',
    color: 'bg-purple-100',
    buttonText: 'Book Flights'
  },
];

const ServicesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-chamDarkBlue">Book Services</h2>
        <p className="text-chamBlue">Select a service to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            {...service}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesSection;
