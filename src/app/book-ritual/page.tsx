'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppBookingModal from '@/components/WhatsAppBookingModal';
import LearnMoreModal from '@/components/LearnMoreModal';

function BookRitualContent() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('home-puja');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Handle category, learn, and book parameters from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const learnParam = searchParams.get('learn');
    const bookParam = searchParams.get('book');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (learnParam) {
      // Find the service based on the learn parameter
      const serviceMap = {
        'bhagwat-katha': 'Bhagwat Katha',
        'hanumant-katha': 'Hanumant Katha', 
        'shreemad-bhagwadgeeta': 'Shreemad Bhagwadgeeta',
        'ramayana-path': 'Ramayana Path',
        'shiv-puran': 'Shiv Maha Puran Katha',
        'vishnu-puran-katha': 'Vishnu Puran Katha'
      };
      
      const serviceName = serviceMap[learnParam as keyof typeof serviceMap];
      if (serviceName) {
        const service = services[language].find(s => s.name === serviceName);
        if (service) {
          handleLearnMore(service);
        }
      }
    }
    
    if (bookParam) {
      // Find the service based on the book parameter and open booking modal
      const serviceMap = {
        'bhagwat-katha': 'Bhagwat Katha',
        'hanumant-katha': 'Hanumant Katha', 
        'shreemad-bhagwadgeeta': 'Shreemad Bhagwadgeeta',
        'ramayana-path': 'Ramayana Path',
        'shiv-puran': 'Shiv Maha Puran Katha',
        'vishnu-puran-katha': 'Vishnu Puran Katha'
      };
      
      const serviceName = serviceMap[bookParam as keyof typeof serviceMap];
      if (serviceName) {
        const service = services[language].find(s => s.name === serviceName);
        if (service) {
          handleBookService(service);
        }
      }
    }
  }, [searchParams, language]);

  const content = {
    en: {
      title: 'Book Sacred Rituals & Ceremonies',
      subtitle: 'Choose from our comprehensive collection of Vedic and Astrological services',
      filterAll: 'All Services',
      book: 'Book Now'
    },
    hi: {
      title: 'पवित्र अनुष्ठान और संस्कार बुक करें',
      subtitle: 'वैदिक और ज्योतिषीय सेवाओं के हमारे व्यापक संग्रह में से चुनें',
      filterAll: 'सभी सेवाएं',
      book: 'बुक करें'
    }
  };

  const categories = {
    en: [
      { id: 'home-puja', name: 'Puja at Home', icon: '🏠' },
      { id: 'katha-vachan', name: 'Katha Vachan', icon: '📖' },
      { id: 'temple-services', name: 'Temple Services', icon: '🛕' },
      { id: 'life-events', name: 'Life Events', icon: '🎊' },
      { id: 'online-services', name: 'Online Services', icon: '💻' }
    ],
    hi: [
      { id: 'home-puja', name: 'घर की पूजा', icon: '🏠' },
      { id: 'katha-vachan', name: 'कथा वाचन', icon: '📖' },
      { id: 'temple-services', name: 'मंदिर सेवाएं', icon: '🛕' },
      { id: 'life-events', name: 'जीवन संस्कार', icon: '🎊' },
      { id: 'online-services', name: 'ऑनलाइन सेवाएं', icon: '💻' }
    ]
  };

  const services = {
    en: [
      // Home Puja
      { name: 'Grih Pravesh Puja', category: 'home-puja', duration: '2-3 hours', description: 'Sacred home entry ceremony' },
      { name: 'Satyanarayan Puja', category: 'home-puja', duration: '1-2 hours', description: 'Divine blessings ceremony' },
      { name: 'Ganesh Puja', category: 'home-puja', duration: '1 hour', description: 'Lord Ganesha worship' },
      { name: 'Lakshmi Puja', category: 'home-puja', duration: '1-2 hours', description: 'Wealth and prosperity ritual' },
      { name: 'Saraswati Puja', category: 'home-puja', duration: '1-2 hours', description: 'Knowledge and wisdom ceremony' },
      
      // Katha Vachan
      { name: 'Bhagwat Katha', category: 'katha-vachan', duration: '7 days', description: 'Sacred narration of Lord Krishna stories' },
      { name: 'Hanumant Katha', category: 'katha-vachan', duration: '3 days', description: 'Divine tales of Lord Hanuman' },
      { name: 'Shree Durga Path', category: 'katha-vachan', duration: '1 day', description: 'Goddess Durga divine recitation' },
      { name: 'Ramayana Path', category: 'katha-vachan', duration: '5 days', description: 'Epic tale of Lord Rama' },
      { name: 'Vishnu Puran Katha', category: 'katha-vachan', duration: '4 days', description: 'Lord Vishnu sacred stories' },
      
      // Temple Services
      { name: 'Temple Abhishek', category: 'temple-services', duration: '1 hour', description: 'Sacred bathing ceremony at temple' },
      { name: 'Aarti at Temple', category: 'temple-services', duration: '30 mins', description: 'Temple evening prayers' },
      { name: 'Prasad Distribution', category: 'temple-services', duration: '1 hour', description: 'Sacred food offering' },
      { name: 'Temple Decoration', category: 'temple-services', duration: '2 hours', description: 'Festive temple decoration' },
      
      // Life Events
      { name: 'Marriage Ceremony', category: 'life-events', duration: '6-8 hours', description: 'Complete wedding rituals' },
      { name: 'Naamkaran Sanskar', category: 'life-events', duration: '2 hours', description: 'Baby naming ceremony' },
      { name: 'Mundan Ceremony', category: 'life-events', duration: '1-2 hours', description: 'First haircut ritual' },
      { name: 'Thread Ceremony', category: 'life-events', duration: '4 hours', description: 'Sacred thread initiation' },
      { name: 'Shradh Karma', category: 'life-events', duration: '2-3 hours', description: 'Ancestral peace ritual' },
      
      // Online Services
      { name: 'Virtual Puja', category: 'online-services', duration: '1 hour', description: 'Live streamed ceremonies' },
      { name: 'Online Consultation', category: 'online-services', duration: '30 mins', description: 'Video call guidance' },
      { name: 'Digital Aarti', category: 'online-services', duration: '15 mins', description: 'Virtual prayer session' },
      { name: 'E-Prasad Booking', category: 'online-services', duration: 'Delivery', description: 'Blessed items delivery' }
    ],
    hi: [
      // घर की पूजा
      { name: 'गृह प्रवेश पूजा', category: 'home-puja', duration: '2-3 घंटे', description: 'पवित्र गृह प्रवेश संस्कार' },
      { name: 'सत्यनारायण पूजा', category: 'home-puja', duration: '1-2 घंटे', description: 'दिव्य आशीर्वाद संस्कार' },
      { name: 'गणेश पूजा', category: 'home-puja', duration: '1 घंटा', description: 'भगवान गणेश की पूजा' },
      { name: 'लक्ष्मी पूजा', category: 'home-puja', duration: '1-2 घंटे', description: 'धन और समृद्धि अनुष्ठान' },
      { name: 'सरस्वती पूजा', category: 'home-puja', duration: '1-2 घंटे', description: 'ज्ञान और बुद्धि संस्कार' },
      
      // कथा वाचन
      { name: 'भागवत कथा', category: 'katha-vachan', duration: '7 दिन', description: 'भगवान कृष्ण की पवित्र कथा' },
      { name: 'हनुमत कथा', category: 'katha-vachan', duration: '3 दिन', description: 'भगवान हनुमान की दिव्य कथाएं' },
      { name: 'श्री दुर्गा पाठ', category: 'katha-vachan', duration: '1 दिन', description: 'देवी दुर्गा का दिव्य पाठ' },
      { name: 'रामायण पाठ', category: 'katha-vachan', duration: '5 दिन', description: 'भगवान राम की महाकथा' },
      { name: 'विष्णु पुराण कथा', category: 'katha-vachan', duration: '4 दिन', description: 'भगवान विष्णु की पवित्र कथाएं' },
      
      // मंदिर सेवाएं  
      { name: 'मंदिर अभिषेक', category: 'temple-services', duration: '1 घंटा', description: 'मंदिर में पवित्र स्नान संस्कार' },
      { name: 'मंदिर आरती', category: 'temple-services', duration: '30 मिनट', description: 'मंदिर संध्या प्रार्थना' },
      { name: 'प्रसाद वितरण', category: 'temple-services', duration: '1 घंटा', description: 'पवित्र भोजन अर्पण' },
      { name: 'मंदिर सजावट', category: 'temple-services', duration: '2 घंटे', description: 'त्योहारी मंदिर सजावट' },
      
      // जीवन संस्कार
      { name: 'विवाह संस्कार', category: 'life-events', duration: '6-8 घंटे', description: 'संपूर्ण विवाह अनुष्ठान' },
      { name: 'नामकरण संस्कार', category: 'life-events', duration: '2 घंटे', description: 'शिशु नामकरण संस्कार' },
      { name: 'मुंडन संस्कार', category: 'life-events', duration: '1-2 घंटे', description: 'प्रथम केश संस्कार' },
      { name: 'यज्ञोपवीत संस्कार', category: 'life-events', duration: '4 घंटे', description: 'पवित्र सूत्र दीक्षा' },
      { name: 'श्राद्ध कर्म', category: 'life-events', duration: '2-3 घंटे', description: 'पितृ शांति अनुष्ठान' },
      
      // ऑनलाइन सेवाएं
      { name: 'वर्चुअल पूजा', category: 'online-services', duration: '1 घंटा', description: 'लाइव स्ट्रीम संस्कार' },
      { name: 'ऑनलाइन परामर्श', category: 'online-services', duration: '30 मिनट', description: 'वीडियो कॉल मार्गदर्शन' },
      { name: 'डिजिटल आरती', category: 'online-services', duration: '15 मिनट', description: 'वर्चुअल प्रार्थना सत्र' },
      { name: 'ई-प्रसाद बुकिंग', category: 'online-services', duration: 'डिलीवरी', description: 'आशीर्वादित वस्तुओं की डिलीवरी' }
    ]
  };

  const filteredServices = services[language].filter(service => service.category === selectedCategory);

  const handleBookService = (service: any) => {
    setSelectedService({
      ...service,
      category: categories[language].find(cat => cat.id === service.category)?.name || service.category
    });
    setIsModalOpen(true);
  };

  const handleLearnMore = (service: any) => {
    setSelectedService({
      ...service,
      category: categories[language].find(cat => cat.id === service.category)?.name || service.category
    });
    setIsLearnMoreOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-12 bg-elevations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs border border-line hover:bg-surface transition-colors mb-6"
            >
              <span className="mr-2">🌐</span>
              {language === 'en' ? 'हिन्दी में देखें' : 'View in English'}
            </button>
            
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-primary ${
              language === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>
              {content[language].title}
            </h1>
            <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${
              language === 'hi' ? 'body-hi' : ''
            }`}>
              {content[language].subtitle}
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-surface border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories[language].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-background text-text-secondary hover:bg-elevations hover:text-primary'
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  <span className={language === 'hi' ? 'body-hi' : ''}>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-2xl p-6 border border-line/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-xl font-bold text-primary ${
                        language === 'hi' ? 'heading-hi' : 'heading-en'
                      }`}>
                        {service.name}
                      </h3>
                      <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded-full">
                        {service.duration}
                      </span>
                    </div>
                    
                    <p className={`text-text-secondary ${
                      language === 'hi' ? 'body-hi' : ''
                    }`}>
                      {service.description}
                    </p>
                    
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleLearnMore(service)}
                        className="bg-white hover:bg-orange-50 text-orange-600 border border-orange-400 px-4 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                      >
                        Learn More
                      </button>
                      <button
                        onClick={() => handleBookService(service)}
                        className="btn-primary px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                      >
                        {content[language].book}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-text-secondary">
                  {language === 'en' ? 'No services found in this category.' : 'इस श्रेणी में कोई सेवा नहीं मिली।'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* WhatsApp Booking Modal */}
      <WhatsAppBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        language={language}
      />
      
      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
        service={selectedService}
        language={language}
      />
    </div>
  );
}

export default function BookRitualPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <BookRitualContent />
    </Suspense>
  );
}