
import { motion } from 'framer-motion';
import { MapPin, Plane, CreditCard, Users, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access flights and services across multiple countries with our extensive point-of-sale systems',
    delay: 0.1
  },
  {
    icon: Plane,
    title: 'Airline Partnerships',
    description: 'Exclusive interline agreements with Jazeera Airways, Air Arabia, and FlyDubai',
    delay: 0.2
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Multiple payment methods including eCash, Haram, and Fouad for your convenience',
    delay: 0.3
  },
  {
    icon: Users,
    title: 'Agency-Focused',
    description: 'Specialized tools and services designed for travel agent requirements',
    delay: 0.4
  },
  {
    icon: Car,
    title: 'Premium Transportation',
    description: 'Exclusive ground services across Syrian cities and VIP limousines in UAE',
    delay: 0.5
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security for all transactions and account management',
    delay: 0.6
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-chamGray/20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-chamGold/30 text-chamDarkBlue font-medium rounded-full"
          >
            Platform Advantages
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4"
          >
            Why Travel Agencies Choose Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Our comprehensive platform streamlines travel management for agencies worldwide
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
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="bg-gradient-to-br from-chamBlue/20 to-chamGold/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-chamBlue" />
              </div>
              <h3 className="text-xl font-semibold text-chamDarkBlue mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
