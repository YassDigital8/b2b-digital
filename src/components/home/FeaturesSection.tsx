
import { motion } from 'framer-motion';
import { MapPin, Plane, CreditCard, Users, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Global Coverage',
    description: 'Operating across multiple countries with various POS systems',
    delay: 0.1
  },
  {
    icon: Plane,
    title: 'Interline Connections',
    description: 'Partnership with Jazeera Airways, Air Arabia, and FlyDubai',
    delay: 0.2
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Top up accounts through eCash, Haram, and Fouad',
    delay: 0.3
  },
  {
    icon: Users,
    title: 'B2B Focused',
    description: 'Designed specifically for travel agent needs',
    delay: 0.4
  },
  {
    icon: Globe,
    title: 'International Services',
    description: 'Transportation across Syrian cities and UAE limousine services',
    delay: 0.5
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Protected transactions and account management',
    delay: 0.6
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-chamGray/20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-chamGold/10 text-chamDarkBlue text-sm font-medium rounded-full"
          >
            Platform Benefits
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4"
          >
            Why Choose Cham Wings Travel Hub
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A comprehensive platform designed to streamline travel management for agents
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-chamBlue/10 to-chamGold/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-chamBlue" />
              </div>
              <h3 className="text-xl font-semibold text-chamDarkBlue mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
