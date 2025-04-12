
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#051A30] to-chamBlue text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white/15 backdrop-blur-sm rounded-2xl p-10 border border-white/30 shadow-lg">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-2/3"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your travel business?</h2>
            <p className="text-white mb-8 text-lg max-w-xl leading-relaxed">
              Join Cham Wings Travel Hub today and gain access to exclusive airline partnerships and premium services designed specifically for travel professionals.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                'Exclusive airline partnerships', 
                'Premium transportation services', 
                'Multiple payment solutions', 
                'Dedicated agency support'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-chamGold" />
                  <span className="text-white text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5 md:w-1/3 w-full"
          >
            <Link to="/signup" className="w-full">
              <Button size="lg" className="w-full bg-chamGold hover:bg-chamGold/90 text-white font-semibold text-lg py-6 h-auto">
                Register Your Agency
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full">
              <Button size="lg" variant="outline" className="w-full border-white bg-white/20 hover:bg-white/30 text-white font-semibold text-lg py-6 h-auto">
                Contact Our Sales Team
              </Button>
            </Link>
            
            <div className="mt-4 text-center text-white text-sm">
              No minimum commitments. Upgrade or cancel anytime.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
