
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MapPin, Plane, CreditCard, Car } from 'lucide-react';

const services = [
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Book Ya Marhaba transportation services across Syrian cities, or arrange free limousine services for Business Class passengers in the UAE.',
    icon: Car,
    link: '/transportation',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'
  },
  {
    id: 'top-up',
    title: 'Account Top Up',
    description: 'Easily top up your Cham Wings account through multiple channels including eCash, Haram, and Fouad payment methods.',
    icon: CreditCard,
    link: '/top-up',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'
  },
  {
    id: 'interline',
    title: 'Interline Booking',
    description: 'Book interline tickets for Jazeera Airways, Air Arabia, and FlyDubai using your Cham Wings account.',
    icon: Plane,
    link: '/interline',
    image: 'https://images.unsplash.com/photo-1610642472639-1b2b1e04a026?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4"
          >
            Our Premium Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore the exclusive services available for Cham Wings travel agents
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
              <Card className="overflow-hidden h-full flex flex-col card-hover border-none shadow-soft">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <service.icon className="h-6 w-6 text-chamBlue" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-chamDarkBlue">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Link to={service.link} className="w-full">
                    <Button variant="outline" className="w-full border-chamBlue text-chamBlue hover:bg-chamBlue hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServices;
