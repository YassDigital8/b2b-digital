
import { motion } from 'framer-motion';

const partners = [
  { 
    name: 'Jazeera Airways', 
    logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=Jazeera+Airways',
    delay: 0.1
  },
  { 
    name: 'Air Arabia', 
    logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=Air+Arabia',
    delay: 0.2
  },
  { 
    name: 'FlyDubai', 
    logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=FlyDubai',
    delay: 0.3
  },
  { 
    name: 'Ya Marhaba', 
    logo: 'https://placehold.co/200x80/e2e8f0/64748b?text=Ya+Marhaba',
    delay: 0.4
  }
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-chamGray/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-chamGold/10 text-chamDarkBlue text-sm font-medium rounded-full"
          >
            Strategic Partnerships
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-center text-chamDarkBlue mb-4"
          >
            Our Trusted Partners
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-700 max-w-2xl mx-auto mb-8"
          >
            We collaborate with leading airlines and transportation services to provide you with the best travel solutions
          </motion.p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-soft">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
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
                <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm border border-gray-100">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-12 md:h-16 w-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
