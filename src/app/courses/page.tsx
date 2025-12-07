'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import WhatsAppEnrollmentModal from '@/components/WhatsAppEnrollmentModal';
import { CourseSchema } from '@/components/StructuredData';

export default function CoursesPage() {
  const { language } = useLanguage();

  const courseSchemaData = [
    {
      name: "Bhagavad Gita Study Course",
      description: "A comprehensive study of the Bhagavad Gita with detailed explanations of each chapter and verse, exploring the profound philosophical teachings.",
      duration: "P10D",
      mode: "online and offline",
      provider: "Kesari Nakshatra",
      url: "https://kesarinakshatra.com/courses"
    },
    {
      name: "Sanskrit Language Course",
      description: "Master the sacred Sanskrit language including Devanagari script, grammar, and reading of religious texts and mantras.",
      duration: "P30D",
      mode: "online and offline",
      provider: "Kesari Nakshatra",
      url: "https://kesarinakshatra.com/courses"
    },
    {
      name: "Musical Instruments Course",
      description: "Learn traditional Indian musical instruments including harmonium, tabla, and other devotional instruments for spiritual practice.",
      duration: "P10D",
      mode: "online and offline",
      provider: "Kesari Nakshatra",
      url: "https://kesarinakshatra.com/courses"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('philosophy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const content = {
    en: {
      title: 'Spiritual Learning Courses',
      subtitle: 'Deepen your spiritual knowledge with our comprehensive courses',
      filterAll: 'All Courses',
      enroll: 'Enroll Now'
    },
    hi: {
      title: 'आध्यात्मिक शिक्षा पाठ्यक्रम',
      subtitle: 'हमारे व्यापक पाठ्यक्रमों के साथ अपने आध्यात्मिक ज्ञान को गहरा करें',
      filterAll: 'सभी पाठ्यक्रम',
      enroll: 'नामांकन करें'
    }
  };

  const categories = {
    en: [
      { id: 'philosophy', name: 'Philosophy', icon: '💭' },
      { id: 'sanskrit', name: 'Sanskrit', icon: '🕉️' },
      { id: 'music', name: 'Musical Instruments', icon: '🎵' }
    ],
    hi: [
      { id: 'philosophy', name: 'दर्शन', icon: '💭' },
      { id: 'sanskrit', name: 'संस्कृत', icon: '🕉️' },
      { id: 'music', name: 'संगीत वाद्य', icon: '🎵' }
    ]
  };

  const courses = {
    en: [
      {
        id: 1,
        title: 'Bhagavad Gita Study Course',
        category: 'philosophy',
        duration: '10 days',
        level: 'All age groups',
        price: '₹8,999',
        mode: 'Online & Offline',
        description: 'A comprehensive study of the Bhagavad Gita with detailed explanations of each chapter and verse, exploring the profound philosophical teachings.',
        features: ['Weekly live sessions', 'Sanskrit pronunciation guide', 'Chapter-wise analysis', 'Practical life applications', 'Digital study materials', 'Certificate of completion'],
        instructor: 'Pandit Hariom Shastri',
        image: '/courses/bhagavad-gita.jpg'
      },
      {
        id: 2,
        title: 'Sanskrit Language Course',
        category: 'sanskrit',
        duration: '30 days',
        level: 'All age groups',
        price: '₹12,999',
        mode: 'Online & Offline',
        description: 'Master the sacred Sanskrit language including Devanagari script, grammar, and reading of religious texts and mantras.',
        features: ['Devanagari script writing', 'Sanskrit grammar basics', 'Mantra pronunciation', 'Religious texts reading', 'Shloka recitation', 'Speaking practice'],
        instructor: 'Pandit Hariom Shastri',
        image: '/courses/sanskrit.jpg'
      },
      {
        id: 3,
        title: 'Musical Instruments Course',
        category: 'music',
        duration: '10 days',
        level: 'All age groups',
        price: '₹6,999',
        mode: 'Online & Offline',
        description: 'Learn traditional Indian musical instruments including harmonium, tabla, and other devotional instruments for spiritual practice.',
        features: ['Harmonium basics', 'Tabla fundamentals', 'Bhajan accompaniment', 'Devotional music', 'Both online and offline classes', 'Flexible timing'],
        instructor: 'Music Acharya',
        image: '/courses/music.jpg'
      }
    ],
    hi: [
      {
        id: 1,
        title: 'भगवद्गीता अध्ययन पाठ्यक्रम',
        category: 'philosophy',
        duration: '10 दिन',
        level: 'सभी आयु समूह',
        price: '₹8,999',
        mode: 'ऑनलाइन और ऑफलाइन',
        description: 'प्रत्येक अध्याय और श्लोक की विस्तृत व्याख्या के साथ भगवद्गीता का व्यापक अध्ययन और गहन दार्शनिक शिक्षाओं की खोज।',
        features: ['साप्ताहिक लाइव सत्र', 'संस्कृत उच्चारण गाइड', 'अध्यायवार विश्लेषण', 'व्यावहारिक जीवन अनुप्रयोग', 'डिजिटल अध्ययन सामग्री', 'पूर्णता प्रमाणपत्र'],
        instructor: 'पंडित हरिओम शास्त्री',
        image: '/courses/bhagavad-gita.jpg'
      },
      {
        id: 2,
        title: 'संस्कृत भाषा पाठ्यक्रम',
        category: 'sanskrit',
        duration: '30 दिन',
        level: 'सभी आयु समूह',
        price: '₹12,999',
        mode: 'ऑनलाइन और ऑफलाइन',
        description: 'देवनागरी लिपि, व्याकरण और धार्मिक ग्रंथों तथा मंत्रों के पठन सहित पवित्र संस्कृत भाषा में निपुणता प्राप्त करें।',
        features: ['देवनागरी लिपि लेखन', 'संस्कृत व्याकरण आधार', 'मंत्र उच्चारण', 'धार्मिक ग्रंथ पठन', 'श्लोक स्मरण', 'बोलचाल अभ्यास'],
        instructor: 'पंडित हरिओम शास्त्री',
        image: '/courses/sanskrit.jpg'
      },
      {
        id: 3,
        title: 'संगीत वाद्य यंत्र पाठ्यक्रम',
        category: 'music',
        duration: '10 दिन',
        level: 'सभी आयु समूह',
        price: '₹6,999',
        mode: 'ऑनलाइन और ऑफलाइन',
        description: 'आध्यात्मिक अभ्यास के लिए हारमोनियम, तबला और अन्य भक्ति वाद्य यंत्रों सहित पारंपरिक भारतीय संगीत वाद्य यंत्र सीखें।',
        features: ['हारमोनियम मूल बातें', 'तबला आधार', 'भजन संगत', 'भक्ति संगीत', 'ऑनलाइन और ऑफलाइन कक्षाएं', 'लचीला समय'],
        instructor: 'संगीत आचार्य',
        image: '/courses/music.jpg'
      }
    ]
  };

  const filteredCourses = courses[language].filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <CourseSchema courses={courseSchemaData} />
      <Header />
      <LanguageToggle />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-12 bg-elevations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

        {/* Courses Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-surface rounded-2xl overflow-hidden border border-line/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-orange-200 to-red-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2 text-orange-600">📚</div>
                        <p className="text-orange-700 font-medium text-sm">Course Image</p>
                      </div>
                    </div>
                    {/* Uncomment when images are available */}
                    {/* <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    /> */}
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                      {course.level}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-bold text-primary ${
                        language === 'hi' ? 'heading-hi' : 'heading-en'
                      }`}>
                        {course.title}
                      </h3>
                      <span className="text-2xl font-bold text-accent">
                        {course.price}
                      </span>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-text-secondary mb-3">
                      <span>📅 {course.duration}</span>
                      <span>💻 {course.mode}</span>
                    </div>
                    <div className="text-sm text-text-secondary mb-3">
                      <span>👨‍🏫 {course.instructor}</span>
                    </div>
                    
                    <p className={`text-text-secondary mb-4 text-sm ${
                      language === 'hi' ? 'body-hi' : ''
                    }`}>
                      {course.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <h4 className={`font-semibold text-primary mb-2 text-sm ${language === 'hi' ? 'body-hi' : ''}`}>
                        {language === 'en' ? 'Course Features:' : 'पाठ्यक्रम विशेषताएं:'}
                      </h4>
                      <ul className={`text-xs text-text-secondary space-y-1 ${language === 'hi' ? 'body-hi' : ''}`}>
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-accent">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsModalOpen(true);
                      }}
                      className="w-full btn-primary py-3 rounded-full font-medium hover:scale-105 transition-transform"
                    >
                      {content[language].enroll}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-text-secondary">
                  {language === 'en' ? 'No courses found in this category.' : 'इस श्रेणी में कोई पाठ्यक्रम नहीं मिला।'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <WhatsAppEnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        language={language}
      />
      
      <Footer />
    </div>
  );
}