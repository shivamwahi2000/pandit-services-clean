'use client';

import { useLocale } from 'next-intl';

export default function TrustSignals() {
  const locale = useLocale();

  const signals = {
    en: [
      { number: '15+', label: 'Years of Practice' },
      { number: '1000+', label: 'Happy Families' },
      { number: '50+', label: 'Cities Covered' },
      { number: '4.9', label: 'Average Rating' }
    ],
    hi: [
      { number: '15+', label: 'वर्षों का अभ्यास' },
      { number: '1000+', label: 'खुश परिवार' },
      { number: '50+', label: 'शहर कवर किए गए' },
      { number: '4.9', label: 'औसत रेटिंग' }
    ]
  };

  return (
    <section className="py-20 bg-elevations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {signals[locale as keyof typeof signals].map((signal, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {signal.number}
              </div>
              <div className={`text-text-secondary ${
                locale === 'hi' ? 'body-hi' : ''
              }`}>
                {signal.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}