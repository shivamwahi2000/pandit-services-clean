'use client';

import { useState } from 'react';

export default function FAQ() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = {
    en: [
      {
        question: 'What areas do you serve?',
        answer: 'We provide pandit services across major Indian cities including Delhi, Mumbai, Bangalore, Pune, and surrounding areas.'
      },
      {
        question: 'What materials do you provide?',
        answer: 'We bring all essential puja materials including flowers, incense, sacred items. Only fresh ingredients need to be arranged by the family.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 3-7 days in advance for regular pujas, and 2-3 weeks for major ceremonies like weddings.'
      },
      {
        question: 'What if I need to reschedule?',
        answer: 'Rescheduling is allowed up to 24 hours before the ceremony without additional charges.'
      }
    ],
    hi: [
      {
        question: 'आप किन क्षेत्रों में सेवा प्रदान करते हैं?',
        answer: 'हम दिल्ली, मुंबई, बेंगलुरु, पुणे और आसपास के क्षेत्रों सहित भारत के प्रमुख शहरों में पंडित सेवाएं प्रदान करते हैं।'
      },
      {
        question: 'आप कौन सी सामग्री प्रदान करते हैं?',
        answer: 'हम फूल, धूप, पवित्र वस्तुओं सहित सभी आवश्यक पूजा सामग्री लाते हैं। केवल ताजी सामग्री का प्रबंध परिवार को करना होता है।'
      },
      {
        question: 'मुझे कितने दिन पहले बुक करना चाहिए?',
        answer: 'हम नियमित पूजाओं के लिए कम से कम 3-7 दिन पहले और विवाह जैसे बड़े संस्कारों के लिए 2-3 सप्ताह पहले बुकिंग की सलाह देते हैं।'
      },
      {
        question: 'यदि मुझे समय बदलना हो तो क्या करूं?',
        answer: 'संस्कार से 24 घंटे पहले तक बिना अतिरिक्त शुल्क के समय परिवर्तन की अनुमति है।'
      }
    ]
  };

  return (
    <section className="py-20 bg-elevations">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            language === 'hi' ? 'heading-hi' : 'heading-en'
          }`}>
            {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs[language].map((faq, index) => (
            <div
              key={index}
              className="bg-surface rounded-xl border border-line overflow-hidden"
            >
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-surface/80 transition-colors"
              >
                <span className={`font-semibold ${
                  language === 'hi' ? 'heading-hi' : 'heading-en'
                }`}>
                  {faq.question}
                </span>
                <span className="text-primary text-xl">
                  {openItem === index ? '−' : '+'}
                </span>
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-4">
                  <p className={`text-text-secondary ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}