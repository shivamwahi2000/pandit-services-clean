'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HowItWorks() {
  const { language } = useLanguage();

  const steps = {
    en: [
      {
        step: '1',
        title: 'Select Puja',
        description: 'Choose from our comprehensive ritual catalog',
        icon: '📋'
      },
      {
        step: '2',
        title: 'Choose Date & Place',
        description: 'Pick convenient timing and location',
        icon: '📅'
      },
      {
        step: '3',
        title: 'Confirm & Perform',
        description: 'Complete booking and enjoy divine blessings',
        icon: '✨'
      }
    ],
    hi: [
      {
        step: '१',
        title: 'पूजा चुनें',
        description: 'हमारे व्यापक अनुष्ठान कैटलॉग से चुनें',
        icon: '📋'
      },
      {
        step: '२',
        title: 'दिनांक और स्थान चुनें',
        description: 'सुविधाजनक समय और स्थान चुनें',
        icon: '📅'
      },
      {
        step: '३',
        title: 'पुष्टि करें और संपन्न करें',
        description: 'बुकिंग पूरी करें और दिव्य आशीर्वाद प्राप्त करें',
        icon: '✨'
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
            {language === 'en' ? 'How It Works' : 'यह कैसे काम करता है'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps[language].map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-2xl">
                {step.icon}
              </div>
              <h3 className={`text-xl font-semibold ${
                language === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                {step.title}
              </h3>
              <p className={`text-text-secondary ${
                language === 'hi' ? 'body-hi' : ''
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}