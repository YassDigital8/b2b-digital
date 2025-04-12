
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, Plane, CreditCard, Car, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'transportation',
    title: 'Premium Transportation',
    description: 'Book exclusive Ya Marhaba transportation across Syrian cities, or arrange complimentary limousine services for Business Class passengers in the UAE.',
    icon: Car,
    link: '/transportation',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3',
    color: 'from-blue-500/40 to-blue-600/40'
  },
  {
    id: 'top-up',
    title: 'Account Management',
    description: 'Seamlessly manage your finances with multiple top-up channels including eCash, Haram, and Fouad payment methods for maximum flexibility.',
    icon: CreditCard,
    link: '/top-up',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3',
    color: 'from-green-500/40 to-green-600/40'
  },
  {
    id: 'interline',
    title: 'Interline Booking Platform',
    description: 'Access exclusive interline rates and book seamless connections with Jazeera Airways, Air Arabia, and FlyDubai through your Cham Wings account.',
    icon: Plane,
    link: '/interline',
    image: 'https://images.unsplash.com/photo-1610642472639-1b2b1e04a026?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3',
    color: 'from-purple-500/40 to-purple-600/40'
  },
];

const FeaturedServices = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-chamGray/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-chamBlue/20 text-chamBlue text-sm font-medium rounded-full"
          >
            Travel Agency Solutions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4"
          >
            Premium Travel Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Discover our exclusive B2B solutions designed specifically for travel professionals
          </motion.p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="h-full">
              <Card className="overflow-hidden h-full flex flex-col card-hover border-none shadow-lg hover:shadow-xl relative">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-chamBlue to-chamGold z-10"></div>
                <div className="relative h-52 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`}></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                        <service.icon className="h-5 w-5 text-chamBlue" />
                      </div>
                      <h3 className="text-white font-semibold text-lg drop-shadow-md">{service.title}</h3>
                    </div>
                  </div>
                </div>
                
                <CardContent className="flex-grow p-6 bg-white">
                  <p className="text-gray-700">{service.description}</p>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 bg-white">
                  <Link to={service.link} className="w-full">
                    <Button variant="outline" className="w-full border-chamBlue text-chamBlue hover:bg-chamBlue hover:text-white group font-medium">
                      <span>Access Service</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-chamGray/30 to-transparent"></div>
    </section>
  );
};

export default FeaturedServices;
