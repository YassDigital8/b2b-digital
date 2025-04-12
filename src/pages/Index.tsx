
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Plane, CreditCard, Users, Globe, Shield } from 'lucide-react';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const features = [
    {
      icon: MapPin,
      title: 'Global Coverage',
      description: 'Operating across multiple countries with various POS systems'
    },
    {
      icon: Plane,
      title: 'Interline Connections',
      description: 'Partnership with Jazeera Airways, Air Arabia, and FlyDubai'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Top up accounts through eCash, Haram, and Fouad'
    },
    {
      icon: Users,
      title: 'B2B Focused',
      description: 'Designed specifically for travel agent needs'
    },
    {
      icon: Globe,
      title: 'International Services',
      description: 'Transportation across Syrian cities and UAE limousine services'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Protected transactions and account management'
    }
  ];

  const partners = [
    { name: 'Jazeera Airways', logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=Jazeera+Airways' },
    { name: 'Air Arabia', logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=Air+Arabia' },
    { name: 'FlyDubai', logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=FlyDubai' },
    { name: 'Ya Marhaba', logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=Ya+Marhaba' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <motion.div style={{ opacity, scale }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-chamBlue/10 to-transparent" />
      </motion.div>

      <Navbar />
      
      <main>
        <Hero />
        
        <FeaturedServices />
        
        <section className="py-24 bg-chamGray relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
          <div className="container mx-auto px-4 relative z-20">
            <div className="text-center mb-16">
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
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white p-6 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-chamBlue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-chamBlue" />
                  </div>
                  <h3 className="text-xl font-semibold text-chamDarkBlue mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-center text-chamDarkBlue mb-12"
            >
              Our Trusted Partners
            </motion.h2>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-12 md:h-16 w-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
