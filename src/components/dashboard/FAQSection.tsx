
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

// FAQ items data
const faqItems = [
  {
    id: 'interline-booking',
    question: 'How do I book interline flights?',
    answer: 'You can book interline flights with our partner airlines including FlyDubai, Emirates, Air Arabia and more through our Interline Booking platform. Simply navigate to the Interline section, select your destinations, dates, and passenger details to view available flights and complete your booking.',
  },
  {
    id: 'account-top-up',
    question: 'How can I add funds to my account?',
    answer: 'To add funds to your account, navigate to the Top Up Account section from the dashboard. We offer multiple payment methods including eCash, Haram, and Fouad. Select your preferred payment method, enter the amount you wish to add, and follow the instructions to complete the transaction.',
  },
  {
    id: 'ya-marhaba',
    question: 'What is the Ya Marhaba service?',
    answer: 'Ya Marhaba is our premium transportation service for passengers. It includes meet and greet services, assistance with luggage, and transportation between airports and destinations. For Business Class passengers in the UAE, we offer complimentary limousine services.',
  },
  {
    id: 'cham-miles',
    question: 'How does the Cham Miles Program work?',
    answer: 'The Cham Miles Program is our loyalty program that rewards passengers for flying with Cham Wings. Enroll your passengers to earn miles on every flight, which can be redeemed for flight upgrades, complimentary tickets, and exclusive benefits like priority check-in and boarding.',
  },
  {
    id: 'business-reports',
    question: 'How can I access my booking reports?',
    answer: 'You can access detailed reports on bookings, revenue, and performance metrics through our Reports section. These reports can be filtered by date range, booking type, and destination to give you valuable insights into your business performance with Cham Wings.',
  },
];

const FAQSection = () => {
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
        <Accordion type="single" collapsible className="bg-white rounded-lg">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-gray-100 last:border-0">
              <AccordionTrigger className="py-4 px-6 font-medium text-chamDarkBlue hover:bg-chamGray/5 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-700">
                <div className="pt-2 pb-1">
                  <p>{item.answer}</p>
                </div>
                {item.id === 'interline-booking' && (
                  <a href="/interline" className="inline-block mt-3 text-sm font-medium text-chamBlue hover:underline">
                    Go to Interline Booking →
                  </a>
                )}
                {item.id === 'account-top-up' && (
                  <a href="/top-up" className="inline-block mt-3 text-sm font-medium text-chamBlue hover:underline">
                    Top Up Your Account →
                  </a>
                )}
                {item.id === 'cham-miles' && (
                  <a href="/enroll-cham-miles" className="inline-block mt-3 text-sm font-medium text-chamBlue hover:underline">
                    Enroll in Cham Miles →
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </motion.div>
  );
};

export default FAQSection;
