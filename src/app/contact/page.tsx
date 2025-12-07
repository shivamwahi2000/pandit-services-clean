'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactContent } from '@/utils/contactContent';
import { FAQSchema } from '@/components/StructuredData';

export default function ContactPage() {
  const { language } = useLanguage();
  const content = contactContent[language];

  const faqData = [
    {
      question: content.faq1Q,
      answer: content.faq1A
    },
    {
      question: content.faq2Q,
      answer: content.faq2A
    },
    {
      question: content.faq3Q,
      answer: content.faq3A
    },
    {
      question: content.faq4Q,
      answer: content.faq4A
    },
    {
      question: content.faq5Q,
      answer: content.faq5A
    },
    {
      question: content.faq6Q,
      answer: content.faq6A
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    ritualType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate WhatsApp message
    const whatsappMessage = `🙏 *New Contact Query from Website*

*Contact Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}

*Ritual Type:* ${formData.ritualType || 'Not specified'}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

----
Query from Kesari Nakshatra website`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919340337323?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      ritualType: ''
    });
  };

  return (
    <div className="min-h-screen sacred-bg page-load">
      <FAQSchema faqs={faqData} />
      <Header />
      <LanguageToggle />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 ${
                language === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                {content.heroTitle}
              </h1>
              <p className={`text-xl md:text-2xl text-text-secondary leading-relaxed ${
                language === 'hi' ? 'body-hi' : ''
              }`}>
                {content.heroSubtitle}
              </p>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Contact Form */}
            <div className="bg-surface rounded-2xl p-8 border border-line glow-border">
              <h2 className={`text-2xl md:text-3xl font-bold text-primary mb-6 ${
                language === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                {content.formHeading}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium text-text-primary mb-2 ${
                      language === 'hi' ? 'body-hi' : ''
                    }`}>
                      {content.nameLabel} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder={content.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium text-text-primary mb-2 ${
                      language === 'hi' ? 'body-hi' : ''
                    }`}>
                      {content.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder={content.phonePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium text-text-primary mb-2 ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}>
                    {content.emailLabel} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    placeholder={content.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="ritualType" className={`block text-sm font-medium text-text-primary mb-2 ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}>
                    {content.serviceTypeLabel}
                  </label>
                  <select
                    id="ritualType"
                    name="ritualType"
                    value={formData.ritualType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                  >
                    <option value="">{content.selectService}</option>
                    {content.ritualTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium text-text-primary mb-2 ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}>
                    {content.subjectLabel} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    placeholder={content.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium text-text-primary mb-2 ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}>
                    {content.messageLabel} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background resize-vertical"
                    placeholder={content.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    language === 'hi' ? 'heading-hi' : ''
                  }`}
                >
                  <span>📱</span>
                  <span>{content.submitButton}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Quick Contact */}
              <div className="bg-elevations rounded-2xl p-8 border border-line">
                <h2 className="text-2xl md:text-3xl font-bold heading-en text-primary mb-6">
                  संपर्क में रहें
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">फोन</h3>
                      <a href="tel:+919340337323" className="text-text-secondary hover:text-primary transition-colors">
                        +91 93403 37323
                      </a>
                      <p className="text-sm text-text-secondary mt-1">सुबह 7 बजे - रात 9 बजे तक उपलब्ध</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/919340337323"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-success transition-colors"
                      >
                        +91 93403 37323
                      </a>
                      <p className="text-sm text-text-secondary mt-1">WhatsApp पर त्वरित प्रतिक्रिया</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">ईमेल</h3>
                      <a href="mailto:kesarinakshatra@yahoo.com" className="text-text-secondary hover:text-primary transition-colors">
                        kesarinakshatra@yahoo.com
                      </a>
                      <p className="text-sm text-text-secondary mt-1">विस्तृत पूछताछ के लिए</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Instagram</h3>
                      <a
                        href="https://www.instagram.com/kesarinakshatra/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-pink-500 transition-colors"
                      >
                        @kesarinakshatra
                      </a>
                      <p className="text-sm text-text-secondary mt-1">आध्यात्मिक अपडेट के लिए फॉलो करें</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-deep-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">स्थान</h3>
                      <p className="text-text-secondary">मध्य प्रदेश, भारत</p>
                      <p className="text-sm text-text-secondary mt-1">हम पूरे भारत में सेवा प्रदान करते हैं</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-line">
                <h3 className="text-xl font-bold heading-en text-primary mb-4">
                  त्वरित कार्रवाई
                </h3>
                
                <div className="space-y-3">
                  <a
                    href="/book-ritual"
                    className="block w-full btn-primary py-3 px-4 rounded-lg text-center font-medium"
                  >
                    ऑनलाइन अनुष्ठान बुक करें
                  </a>

                  <a
                    href="https://wa.me/919340337323?text=Hello, I would like to inquire about your services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-success hover:bg-success/90 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
                  >
                    WhatsApp पर संपर्क करें
                  </a>

                  <a
                    href="tel:+919340337323"
                    className="block w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
                  >
                    सीधे कॉल करें
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-surface rounded-2xl p-8 border border-line">
                <h3 className="text-xl font-bold heading-en text-primary mb-4">
                  कार्य समय
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary">सोमवार - शुक्रवार</span>
                    <span className="text-text-secondary">सुबह 7:00 - रात 9:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary">शनिवार</span>
                    <span className="text-text-secondary">सुबह 7:00 - रात 8:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary">रविवार</span>
                    <span className="text-text-secondary">सुबह 8:00 - शाम 7:00</span>
                  </div>
                  <div className="pt-3 border-t border-line">
                    <p className="text-sm text-text-secondary">
                      🙏 <strong>विशेष त्यौहारों पर:</strong> प्रमुख हिंदू त्योहारों के दौरान विस्तारित समय
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-line">
            <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-8 text-center">
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">मुझे कितने दिन पहले बुक करना चाहिए?</h3>
                  <p className="text-text-secondary text-sm">
                    हम विशेष रूप से प्रमुख संस्कारों के लिए कम से कम 7-10 दिन पहले बुकिंग की सलाह देते हैं। त्योहारों के दौरान शुभ तिथियों के लिए 2-3 सप्ताह पहले बुक करें।
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-2">क्या आप सभी पूजा सामग्री प्रदान करते हैं?</h3>
                  <p className="text-text-secondary text-sm">
                    हां, हम फूल, फल, मिठाई और अनुष्ठान सामग्री सहित सभी आवश्यक पूजा सामग्री प्रदान करते हैं। यदि आप कुछ सामग्री स्वयं व्यवस्थित करना पसंद करते हैं तो विस्तृत सूची भी मांग सकते हैं।
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-2">क्या आप ऑनलाइन पूजा कर सकते हैं?</h3>
                  <p className="text-text-secondary text-sm">
                    बिल्कुल! हम वर्चुअल पूजा सेवाएं प्रदान करते हैं जहां आप वीडियो कॉल के माध्यम से भाग ले सकते हैं। यह उन लोगों के लिए आदर्श है जो शारीरिक रूप से उपस्थित नहीं हो सकते या दूर स्थित हैं।
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">आप किन क्षेत्रों में सेवा प्रदान करते हैं?</h3>
                  <p className="text-text-secondary text-sm">
                    हालांकि हम मध्य प्रदेश में स्थित हैं, हम पूरे भारत में ग्राहकों को सेवा प्रदान करते हैं। दूर के स्थानों के लिए, हम अपने नेटवर्क से स्थानीय योग्य पंडितों की व्यवस्था कर सकते हैं या ऑनलाइन संस्कार आयोजित कर सकते हैं।
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-2">अनुष्ठान का समय कैसे तय होता है?</h3>
                  <p className="text-text-secondary text-sm">
                    सभी अनुष्ठान समय वैदिक ज्योतिष के आधार पर गणना किए जाते हैं, आपके विशिष्ट संस्कार और स्थान के लिए सबसे शुभ मुहूर्त पर विचार करते हुए। हम बुकिंग पर विस्तृत समय जानकारी प्रदान करते हैं।
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-2">यदि मुझे समय बदलना हो तो क्या करूं?</h3>
                  <p className="text-text-secondary text-sm">
                    हम समझते हैं कि योजनाएं बदल सकती हैं। कृपया समय परिवर्तन के लिए निर्धारित समय से कम से कम 48 घंटे पहले हमसे संपर्क करें। हम आपके संस्कार के लिए अगला शुभ समय खोजने में मदद करेंगे।
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}