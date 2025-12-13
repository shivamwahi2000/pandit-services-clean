'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';

export default function RitualCategories() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const categories = {
    en: [
      {
        title: 'Grih Pravesh',
        description: 'Sacred home entry ceremonies',
        icon: '🏠',
        href: '/services/grih-pravesh'
      },
      {
        title: 'Satyanarayan Puja',
        description: 'Divine blessings for prosperity',
        icon: '🙏',
        href: '/services/satyanarayan'
      },
      {
        title: 'Havan Ceremony',
        description: 'Purifying fire rituals',
        icon: '🔥',
        href: '/services/havan'
      },
      {
        title: 'Marriage Rituals',
        description: 'Complete wedding ceremonies',
        icon: '💒',
        href: '/services/marriage'
      },
      {
        title: 'Naamkaran',
        description: 'Sacred naming ceremonies',
        icon: '👶',
        href: '/services/naamkaran'
      },
      {
        title: 'Shradh Karma',
        description: 'Ancestral peace rituals',
        icon: '🕉️',
        href: '/services/shradh'
      }
    ],
    hi: [
      {
        title: 'गृह प्रवेश',
        description: 'पवित्र घर प्रवेश संस्कार',
        icon: '🏠',
        href: '/services/grih-pravesh'
      },
      {
        title: 'सत्यनारायण पूजा',
        description: 'समृद्धि के लिए दिव्य आशीर्वाद',
        icon: '🙏',
        href: '/services/satyanarayan'
      },
      {
        title: 'हवन संस्कार',
        description: 'पवित्रीकरण अग्नि अनुष्ठान',
        icon: '🔥',
        href: '/services/havan'
      },
      {
        title: 'विवाह संस्कार',
        description: 'संपूर्ण विवाह अनुष्ठान',
        icon: '💒',
        href: '/services/marriage'
      },
      {
        title: 'नामकरण',
        description: 'पवित्र नामकरण संस्कार',
        icon: '👶',
        href: '/services/naamkaran'
      },
      {
        title: 'श्राद्ध कर्म',
        description: 'पितृ शांति अनुष्ठान',
        icon: '🕉️',
        href: '/services/shradh'
      }
    ]
  };

  return (
    <section className="py-20 bg-elevations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            language === 'hi' ? 'heading-hi' : 'heading-en'
          }`}>
            {language === 'en' ? 'Sacred Ritual Categories' : 'पवित्र अनुष्ठान श्रेणियां'}
          </h2>
          <p className={`text-lg text-text-secondary max-w-2xl mx-auto ${
            language === 'hi' ? 'body-hi' : ''
          }`}>
            {language === 'en' 
              ? 'Choose from our comprehensive collection of traditional Hindu ceremonies'
              : 'पारंपरिक हिंदू संस्कारों के हमारे व्यापक संग्रह में से चुनें'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories[language].map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group bg-surface rounded-2xl p-6 hover:bg-surface/80 transition-all duration-300 hover:scale-105 glow-border hover:shadow-lg"
            >
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className={`text-xl font-semibold group-hover:text-primary transition-colors ${
                  language === 'hi' ? 'heading-hi' : 'heading-en'
                }`}>
                  {category.title}
                </h3>
                <p className={`text-text-secondary ${
                  language === 'hi' ? 'body-hi' : ''
                }`}>
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}