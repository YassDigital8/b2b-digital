
import { motion } from 'framer-motion';

const partners = [
  { 
    name: 'Jazeera Airways', 
    logo: 'https://placehold.co/200x80/e2e8f0/273c75?text=Jazeera+Airways&font=roboto',
    delay: 0.1
  },
  { 
    name: 'Air Arabia', 
    logo: 'https://placehold.co/200x80/e2e8f0/273c75?text=Air+Arabia&font=roboto',
    delay: 0.2
  },
  { 
    name: 'FlyDubai', 
    logo: 'https://placehold.co/200x80/e2e8f0/273c75?text=FlyDubai&font=roboto',
    delay: 0.3
  },
  { 
    name: 'Ya Marhaba', 
    logo: 'https://placehold.co/200x80/e2e8f0/273c75?text=Ya+Marhaba&font=roboto',
    delay: 0.4
  }
];

const PartnersSection = () => {
  return (
    <section className="py-24 bg-chamGray/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-chamGold/20 text-chamDarkBlue text-sm font-medium rounded-full"
          >
            Airline Alliances
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-center text-chamDarkBlue mb-4"
          >
            Our Strategic Airline Partners
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-700 max-w-2xl mx-auto mb-10"
          >
            We've established partnerships with leading airlines to offer you comprehensive travel solutions and competitive rates
          </motion.p>
        </div>
        
        <div className="bg-white rounded-2xl p-10 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 items-center">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: partner.delay, duration: 0.5 }}
                className="flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm border border-gray-100 w-full">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-12 w-auto mx-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            *Additional airline partnerships are continuously being added to our network
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
