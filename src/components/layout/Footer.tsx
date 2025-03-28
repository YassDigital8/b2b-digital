
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Globe, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { dir, language } = useLanguage();
  const isRTL = dir === 'rtl';
  
  return (
    <footer className="bg-chamDarkBlue text-white pt-16 pb-8" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/be6b5036-ad2d-47ab-a9c4-07b9ce420119.png" 
                alt="Cham Wings Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-white">
                {isRTL ? 'مركز السفر' : 'Travel Hub'}
              </span>
            </div>
            <p className="text-gray-300 mt-4">
              {isRTL 
                ? 'منصة متميزة للشركات لوكلاء السفر أجنحة الشام لتعزيز تجارب السفر وإدارة الحجوزات بسلاسة.'
                : 'A premium B2B platform for Cham Wings travel agents to enhance travel experiences and manage bookings seamlessly.'}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-chamGold transition-colors" aria-label="Website">
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'الخدمات' : 'Services'}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/transportation" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'المواصلات' : 'Transportation'}
                </Link>
              </li>
              <li>
                <Link to="/top-up" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'شحن الحساب' : 'Account Top Up'}
                </Link>
              </li>
              <li>
                <Link to="/interline" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'حجز الخطوط المشتركة' : 'Interline Booking'}
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'مزايا درجة رجال الأعمال' : 'Business Class Benefits'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'روابط سريعة' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'تسجيل الدخول' : 'Login'}
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'إنشاء حساب' : 'Register'}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-chamGold transition-colors">
                  {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{isRTL ? 'اتصل بنا' : 'Contact'}</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={20} className="text-chamGold shrink-0 mt-1" />
                <span className="text-gray-300">
                  {isRTL 
                    ? 'مقر شركة أجنحة الشام للطيران،\nدمشق، سوريا'
                    : 'Cham Wings Airlines Headquarters,\nDamascus, Syria'}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={20} className="text-chamGold shrink-0" />
                <span className="text-gray-300" dir="ltr">+963 11 2335030</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={20} className="text-chamGold shrink-0" />
                <span className="text-gray-300">info@chamwings.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {isRTL ? 'مركز سفر أجنحة الشام للطيران. جميع الحقوق محفوظة.' : 'Cham Wings Airlines Travel Hub. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
