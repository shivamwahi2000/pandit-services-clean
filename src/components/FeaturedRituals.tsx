'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FeaturedRituals() {
  const { language } = useLanguage();

  const rituals = {
    en: [
      {
        name: 'Shreemad Bhagwat Katha',
        image: '/rituals/bhagwat-katha.jpg',
        description: 'Sacred narration of Lord Krishna\'s divine stories'
      },
      {
        name: 'Shree Hanumant Katha',
        image: '/rituals/hanumant-katha.jpg', 
        description: 'Divine tales of Lord Hanuman\'s devotion and strength'
      },
      {
        name: 'Shree Durga Path',
        image: '/rituals/dugra-path.jpg',
        description: 'Sacred recitation of Goddess Durga\'s divine verses'
      }
    ],
    hi: [
      {
        name: 'श्रीमद् भागवत कथा',
        image: '/rituals/bhagwat-katha.jpg',
        description: 'भगवान कृष्ण की दिव्य कथाओं का पवित्र वर्णन'
      },
      {
        name: 'श्री हनुमत कथा', 
        image: '/rituals/hanumant-katha.jpg',
        description: 'भगवान हनुमान की भक्ति और शक्ति की दिव्य कथाएं'
      },
      {
        name: 'श्री दुर्गा पाठ',
        image: '/rituals/dugra-path.jpg', 
        description: 'देवी दुर्गा के दिव्य श्लोकों का पवित्र पाठ'
      }
    ]
  };

  const content = {
    en: {
      heading: 'Sacred Rituals We Offer',
      subheading: 'Experience divine blessings through authentic Vedic ceremonies',
      seeMore: 'See All Vedic Services',
      book: 'Book Now'
    },
    hi: {
      heading: 'हमारे द्वारा संपन्न पवित्र अनुष्ठान',
      subheading: 'प्रामाणिक वैदिक संस्कारों के माध्यम से दिव्य आशीर्वाद प्राप्त करें',
      seeMore: 'सभी वैदिक और ज्योतिषीय सेवाएं देखें',
      book: 'बुक करें'
    }
  };

  return (
    <section className="py-20 bg-elevations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-primary ${
            language === 'hi' ? 'heading-hi' : 'heading-en'
          }`}>
            {content[language].heading}
          </h2>
          <p className={`text-lg text-text-secondary max-w-2xl mx-auto ${
            language === 'hi' ? 'body-hi' : ''
          }`}>
            {content[language].subheading}
          </p>
        </div>

        {/* Rituals List */}
        <div className="space-y-8 mb-12">
          {rituals[language].map((ritual, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-line/50"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Image */}
                <div className="w-full md:w-48 h-48 relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0">
                  <Image
                    src={ritual.image}
                    alt={ritual.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-3 text-primary ${
                    language === 'hi' ? 'heading-hi' : 'heading-en'
                  }`}>
                    {ritual.name}
                  </h3>
                  <p className={`text-text-secondary mb-4 ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}>
                    {ritual.description}
                  </p>
                  <Link
                    href="/book-ritual"
                    className="inline-flex items-center px-6 py-3 btn-primary rounded-full font-semibold hover:scale-105 transition-transform"
                  >
                    {content[language].book}
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Link */}
        <div className="text-center">
          <Link
            href="/book-ritual"
            className="inline-flex items-center px-8 py-4 bg-gradient-secondary text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {content[language].seeMore}
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}