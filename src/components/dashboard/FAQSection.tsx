
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Book, MessageCircle, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

// FAQ items data with icons
const faqItems = [
  {
    id: 'interline-booking',
    question: 'How do I book interline flights?',
    answer: 'You can book interline flights with our partner airlines including FlyDubai, Emirates, Air Arabia and more through our Interline Booking platform. Simply navigate to the Interline section, select your destinations, dates, and passenger details to view available flights and complete your booking.',
    icon: <Book className="h-5 w-5" />,
    color: 'text-purple-500 bg-purple-100',
    link: '/interline',
    linkText: 'Go to Interline Booking'
  },
  {
    id: 'account-top-up',
    question: 'How can I add funds to my account?',
    answer: 'To add funds to your account, navigate to the Top Up Account section from the dashboard. We offer multiple payment methods including eCash, Haram, and Fouad. Select your preferred payment method, enter the amount you wish to add, and follow the instructions to complete the transaction.',
    icon: <Info className="h-5 w-5" />,
    color: 'text-blue-500 bg-blue-100',
    link: '/top-up',
    linkText: 'Top Up Your Account'
  },
  {
    id: 'ya-marhaba',
    question: 'What is the Ya Marhaba service?',
    answer: 'Ya Marhaba is our premium transportation service for passengers. It includes meet and greet services, assistance with luggage, and transportation between airports and destinations. For Business Class passengers in the UAE, we offer complimentary limousine services.',
    icon: <MessageCircle className="h-5 w-5" />,
    color: 'text-green-500 bg-green-100',
    link: null,
    linkText: null
  },
  {
    id: 'cham-miles',
    question: 'How does the Cham Miles Program work?',
    answer: 'The Cham Miles Program is our loyalty program that rewards passengers for flying with Cham Wings. Enroll your passengers to earn miles on every flight, which can be redeemed for flight upgrades, complimentary tickets, and exclusive benefits like priority check-in and boarding.',
    icon: <HelpCircle className="h-5 w-5" />,
    color: 'text-amber-500 bg-amber-100',
    link: '/enroll-cham-miles',
    linkText: 'Enroll in Cham Miles'
  },
  {
    id: 'business-reports',
    question: 'How can I access my booking reports?',
    answer: 'You can access detailed reports on bookings, revenue, and performance metrics through our Reports section. These reports can be filtered by date range, booking type, and destination to give you valuable insights into your business performance with Cham Wings.',
    icon: <MessageSquare className="h-5 w-5" />,
    color: 'text-rose-500 bg-rose-100',
    link: '/reports',
    linkText: 'View Reports'
  },
];

const FAQSection = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const handleItemOpen = (itemId: string) => {
    setActiveItem(itemId === activeItem ? null : itemId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-chamDarkBlue flex items-center gap-2">
            Frequently Asked Questions
            <HelpCircle className="h-5 w-5 text-chamBlue" />
          </h2>
          <p className="text-gray-600 mt-1">Quick answers to common questions</p>
        </div>
      </div>
      
      <Card className="overflow-hidden border-none shadow-soft">
        <Accordion 
          type="single" 
          collapsible 
          className="bg-white rounded-lg"
          value={activeItem || undefined}
          onValueChange={(value) => setActiveItem(value || null)}
        >
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id} 
              className={`border-b border-gray-100 last:border-0 overflow-hidden transition-colors duration-300 ${
                activeItem === item.id ? 'bg-chamGray/10' : ''
              } ${
                hoveredItem === item.id && activeItem !== item.id ? 'bg-chamGray/5' : ''
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <AccordionTrigger 
                onClick={() => handleItemOpen(item.id)}
                className="py-4 px-6 font-medium text-chamDarkBlue hover:bg-chamGray/5 hover:no-underline group"
              >
                <div className="flex items-center">
                  <div className={`mr-3 p-2 rounded-lg ${item.color} transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <span className="text-left">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AnimatePresence>
                <AccordionContent className="px-6 pb-4 text-gray-700">
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-2 pb-1"
                  >
                    <div className="border-l-4 border-chamBlue/30 pl-4">
                      <p>{item.answer}</p>
                      
                      {item.link && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                        >
                          <a 
                            href={item.link} 
                            className="inline-flex items-center mt-3 px-4 py-2 rounded-md text-sm font-medium bg-chamBlue/10 text-chamBlue hover:bg-chamBlue/20 transition-colors"
                          >
                            {item.linkText} →
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </AccordionContent>
              </AnimatePresence>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </motion.div>
  );
};

export default FAQSection;
