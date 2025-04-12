
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Travel Agency Owner",
    company: "Global Journeys",
    text: "Cham Wings Travel Hub has transformed how we manage bookings. The interline feature is a game-changer for our business.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    delay: 0.1
  },
  {
    name: "Mohammed Al-Faisal",
    role: "Business Development Manager",
    company: "Elite Travel Solutions",
    text: "The transportation booking system is seamless and our clients love the premium services we can now offer them.",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    delay: 0.3
  },
  {
    name: "Leila Karimi",
    role: "Operations Director",
    company: "Horizon Travel",
    text: "The account top-up feature has made financial management much easier for our agency. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    delay: 0.5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-chamGray/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 pt-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-chamBlue/10 text-chamBlue font-medium rounded-full"
          >
            Success Stories
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-chamDarkBlue mb-4"
          >
            What Our Partners Say
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 w-24 mx-auto bg-gradient-to-r from-chamBlue to-chamGold"
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: testimonial.delay, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-none shadow-soft relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-gradient-to-br from-chamBlue/10 to-chamGold/10 rounded-full"></div>
                <div className="absolute top-4 right-4">
                  <Quote className="h-8 w-8 text-chamGold/20" />
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="h-12 w-12 rounded-full object-cover border-2 border-chamBlue/20"
                    />
                    <div>
                      <p className="font-semibold text-chamDarkBlue">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
