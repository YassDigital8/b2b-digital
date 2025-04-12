
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-chamDarkBlue to-chamBlue text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-lg">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-2/3"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to elevate your travel business?</h2>
            <p className="text-white/90 mb-6 max-w-xl">
              Join Cham Wings Travel Hub today and access exclusive services for travel agents.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {['Exclusive partnerships', 'Dedicated support', 'Streamlined bookings', 'Revenue growth'].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-chamGold" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4 md:w-1/3"
          >
            <Link to="/signup" className="w-full">
              <Button size="lg" className="w-full bg-chamGold hover:bg-chamGold/90 text-white font-medium">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full">
              <Button size="lg" variant="outline" className="w-full border-white hover:bg-white/10 text-white font-medium">
                Contact Sales
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
