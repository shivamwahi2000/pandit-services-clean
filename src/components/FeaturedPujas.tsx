'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeaturedPujas() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const pujas = {
    en: [
      {
        title: 'Grih Pravesh Puja',
        description: 'Sacred home entry ceremony for peace and prosperity',
        duration: '2-3 hours',
        rating: 4.9,
        reviews: 156
      },
      {
        title: 'Satyanarayan Puja',
        description: 'Divine blessings and gratitude ceremony',
        duration: '1-2 hours',
        rating: 4.8,
        reviews: 243
      },
      {
        title: 'Havan Ceremony',
        description: 'Purifying fire ritual for spiritual cleansing',
        duration: '2-4 hours',
        rating: 4.9,
        reviews: 189
      }
    ],
    hi: [
      {
        title: 'गृह प्रवेश पूजा',
        description: 'शांति और समृद्धि के लिए पवित्र गृह प्रवेश संस्कार',
        duration: '2-3 घंटे',
        rating: 4.9,
        reviews: 156
      },
      {
        title: 'सत्यनारायण पूजा',
        description: 'दिव्य आशीर्वाद और कृतज्ञता संस्कार',
        duration: '1-2 घंटे',
        rating: 4.8,
        reviews: 243
      },
      {
        title: 'हवन संस्कार',
        description: 'आध्यात्मिक शुद्धिकरण के लिए पवित्रीकरण अग्नि अनुष्ठान',
        duration: '2-4 घंटे',
        rating: 4.9,
        reviews: 189
      }
    ]
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            language === 'hi' ? 'heading-hi' : 'heading-en'
          }`}>
            {language === 'en' ? 'Featured Pujas' : 'विशेष पूजाएं'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pujas[language].map((puja, index) => (
            <div key={index} className="bg-surface rounded-2xl p-6 glow-border hover:scale-105 transition-transform">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent">⭐</span>
                    ))}
                    <span className="text-sm text-text-secondary ml-1">
                      ({puja.reviews})
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary">{puja.duration}</span>
                </div>
                
                <h3 className={`text-xl font-semibold ${
                  language === 'hi' ? 'heading-hi' : 'heading-en'
                }`}>
                  {puja.title}
                </h3>
                
                <p className={`text-text-secondary ${
                  language === 'hi' ? 'body-hi' : ''
                }`}>
                  {puja.description}
                </p>
                
                <div className="flex justify-center">
                  <Link
                    href="/book-puja"
                    className="btn-primary px-6 py-2 rounded-full text-sm font-medium"
                  >
                    {language === 'en' ? 'Book Now' : 'बुक करें'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}