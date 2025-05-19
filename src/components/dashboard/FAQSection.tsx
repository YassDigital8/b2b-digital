
import { useState } from 'react';
import { HelpCircle, Book, MessageCircle, Info, MessageSquare } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// FAQ items data with icons
const faqItems = [
  {
    id: 'interline-booking',
    question: 'How do I book interline flights?',
    answer: 'You can book interline flights with our partner airlines including FlyDubai, Emirates, Air Arabia and more through our Interline Booking platform. Simply navigate to the Interline section, select your destinations, dates, and passenger details to view available flights and complete your booking.',
    icon: <Book className="h-5 w-5" />,
    color: 'text-purple-500 bg-purple-100',
    link: '/interline',
    linkText: 'Go to Interline Booking',
    gradient: 'from-purple-500/20 to-purple-50'
  },
  {
    id: 'account-top-up',
    question: 'How can I add funds to my account?',
    answer: 'To add funds to your account, navigate to the Top Up Account section from the dashboard. We offer multiple payment methods including eCash, Haram, and Fouad. Select your preferred payment method, enter the amount you wish to add, and follow the instructions to complete the transaction.',
    icon: <Info className="h-5 w-5" />,
    color: 'text-blue-500 bg-blue-100',
    link: '/top-up',
    linkText: 'Top Up Your Account',
    gradient: 'from-blue-500/20 to-blue-50'
  },
  {
    id: 'ya-marhaba',
    question: 'What is the Ya Marhaba service?',
    answer: 'Ya Marhaba is our premium transportation service for passengers. It includes meet and greet services, assistance with luggage, and transportation between airports and destinations. For Business Class passengers in the UAE, we offer complimentary limousine services.',
    icon: <MessageCircle className="h-5 w-5" />,
    color: 'text-green-500 bg-green-100',
    link: null,
    linkText: null,
    gradient: 'from-green-500/20 to-green-50'
  },
  {
    id: 'cham-miles',
    question: 'How does the Cham Miles Program work?',
    answer: 'The Cham Miles Program is our loyalty program that rewards passengers for flying with Cham Wings. Enroll your passengers to earn miles on every flight, which can be redeemed for flight upgrades, complimentary tickets, and exclusive benefits like priority check-in and boarding.',
    icon: <HelpCircle className="h-5 w-5" />,
    color: 'text-amber-500 bg-amber-100',
    link: '/enroll-cham-miles',
    linkText: 'Enroll in Cham Miles',
    gradient: 'from-amber-500/20 to-amber-50'
  },
  {
    id: 'business-reports',
    question: 'How can I access my booking reports?',
    answer: 'You can access detailed reports on bookings, revenue, and performance metrics through our Reports section. These reports can be filtered by date range, booking type, and destination to give you valuable insights into your business performance with Cham Wings.',
    icon: <MessageSquare className="h-5 w-5" />,
    color: 'text-rose-500 bg-rose-100',
    link: '/reports',
    linkText: 'View Reports',
    gradient: 'from-rose-500/20 to-rose-50'
  },
];

const FAQSection = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Handle click on accordion item - completely separate from the Accordion's internal state
  const handleItemClick = (itemId: string) => {
    setActiveItem(prev => prev === itemId ? null : itemId);
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 
            className="text-2xl font-bold text-chamDarkBlue flex items-center gap-2"
          >
            Frequently Asked Questions
            <div>
              <HelpCircle className="h-5 w-5 text-chamBlue" />
            </div>
          </h2>
          <p className="text-gray-600 mt-1">Quick answers to common questions</p>
        </div>
      </div>
      
      <Card className="overflow-hidden border-none shadow-soft rounded-xl">
        <div className="bg-gradient-to-r from-white to-chamGray/10 p-0.5 rounded-xl">
          <Accordion 
            type="single" 
            collapsible 
            className="bg-white/85 backdrop-blur-sm rounded-lg"
            value={activeItem || undefined}
          >
            {faqItems.map((item) => (
              <div
                key={item.id}
              >
                <AccordionItem 
                  value={item.id} 
                  className={`border-b border-gray-100 last:border-0 overflow-hidden transition-all duration-300 ${
                    activeItem === item.id ? 'bg-gradient-to-r ' + item.gradient : ''
                  } ${
                    hoveredItem === item.id && activeItem !== item.id ? 'bg-chamGray/5' : ''
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <AccordionTrigger 
                    className="py-5 px-6 font-medium text-chamDarkBlue hover:no-underline group"
                    onClick={(e) => {
                      // Stop propagation to prevent the default AccordionTrigger behavior
                      e.stopPropagation();
                      // Then handle the click manually
                      handleItemClick(item.id);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className={`p-2.5 rounded-xl ${item.color} transition-all duration-300`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-left font-medium transition-all duration-300 group-hover:translate-x-1">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-6 pb-5 text-gray-700">
                    <div>
                      <div className="pl-12 py-2">
                        <div className="rounded-lg bg-white/80 backdrop-blur-sm p-4 border-l-4 border-r border-t border-b border-l-solid"
                             style={{ borderLeftColor: item.color.split(' ')[0].replace('text-', 'var(--')}}
                        >
                          <p className="text-gray-700">{item.answer}</p>
                          
                          {item.link && (
                            <div>
                              <a 
                                href={item.link} 
                                className={`inline-flex items-center mt-4 px-4 py-2 rounded-md text-sm font-medium bg-chamBlue/10 text-chamBlue hover:bg-chamBlue/20 transition-all`}
                              >
                                {item.linkText} →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </Card>
    </div>
  );
};

export default FAQSection;
