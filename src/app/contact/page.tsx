'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQSchema } from '@/components/StructuredData';

export default function ContactPage() {
  const faqData = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 7-10 days in advance, especially for major ceremonies. For auspicious dates during festivals, book 2-3 weeks ahead."
    },
    {
      question: "Do you provide all puja materials?",
      answer: "Yes, we provide all necessary puja items, including flowers, fruits, sweets, and ceremonial materials. You can also request a detailed list if you prefer to arrange some items yourself."
    },
    {
      question: "Can you perform online pujas?",
      answer: "Absolutely! We offer virtual puja services where you can participate via video call. This is perfect for those who cannot physically attend or are located far away."
    },
    {
      question: "What areas do you serve?",
      answer: "While we're based in Madhya Pradesh, we serve clients across India. For distant locations, we can arrange local qualified pandits from our network or conduct online ceremonies."
    },
    {
      question: "How are the ritual timings decided?",
      answer: "All ritual timings are calculated based on Vedic astrology, considering the most auspicious muhurat for your specific ceremony and location. We provide detailed timing information upon booking."
    },
    {
      question: "What if I need to reschedule?",
      answer: "We understand that plans can change. Please contact us at least 48 hours before the scheduled time for rescheduling. We'll help find the next auspicious time for your ceremony."
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        ritualType: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  const ritualTypes = [
    'Grih Pravesh Puja',
    'Satyanarayan Puja',
    'Ganesh Puja',
    'Marriage Ceremony',
    'Havan/Yajna',
    'Bhagwat Katha',
    'Astrological Consultation',
    'Vastu Consultation',
    'Other'
  ];

  return (
    <div className="min-h-screen sacred-bg page-load">
      <FAQSchema faqs={faqData} />
      <Header />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-en text-primary mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Connect with us for authentic Vedic rituals and spiritual guidance
              </p>
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Contact Form */}
            <div className="bg-surface rounded-2xl p-8 border border-line glow-border">
              <h2 className="text-2xl md:text-3xl font-bold heading-en text-primary mb-6">
                Send us a Message
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-success font-medium">
                    🙏 Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="ritualType" className="block text-sm font-medium text-text-primary mb-2">
                    Type of Service
                  </label>
                  <select
                    id="ritualType"
                    name="ritualType"
                    value={formData.ritualType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                  >
                    <option value="">Select a service</option>
                    {ritualTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background resize-vertical"
                    placeholder="Please describe your requirements, preferred dates, location, and any specific details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 px-6 rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Quick Contact */}
              <div className="bg-elevations rounded-2xl p-8 border border-line">
                <h2 className="text-2xl md:text-3xl font-bold heading-en text-primary mb-6">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                      <a href="tel:+919340337323" className="text-text-secondary hover:text-primary transition-colors">
                        +91 93403 37323
                      </a>
                      <p className="text-sm text-text-secondary mt-1">Available 7 AM - 9 PM</p>
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
                      <p className="text-sm text-text-secondary mt-1">Quick responses via WhatsApp</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                      <a href="mailto:contact@kesarinakshatra.com" className="text-text-secondary hover:text-primary transition-colors">
                        contact@kesarinakshatra.com
                      </a>
                      <p className="text-sm text-text-secondary mt-1">For detailed inquiries</p>
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
                      <p className="text-sm text-text-secondary mt-1">Follow for spiritual updates</p>
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
                      <h3 className="font-semibold text-text-primary mb-1">Location</h3>
                      <p className="text-text-secondary">Madhya Pradesh, India</p>
                      <p className="text-sm text-text-secondary mt-1">We serve across India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-line">
                <h3 className="text-xl font-bold heading-en text-primary mb-4">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <a
                    href="/book-ritual"
                    className="block w-full btn-primary py-3 px-4 rounded-lg text-center font-medium"
                  >
                    Book a Ritual Online
                  </a>
                  
                  <a
                    href="https://wa.me/919340337323?text=Hello, I would like to inquire about your services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-success hover:bg-success/90 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
                  >
                    WhatsApp Us Now
                  </a>

                  <a
                    href="tel:+919340337323"
                    className="block w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
                  >
                    Call Directly
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-surface rounded-2xl p-8 border border-line">
                <h3 className="text-xl font-bold heading-en text-primary mb-4">
                  Business Hours
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary">Monday - Friday</span>
                    <span className="text-text-secondary">7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary">Saturday</span>
                    <span className="text-text-secondary">7:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-primary">Sunday</span>
                    <span className="text-text-secondary">8:00 AM - 7:00 PM</span>
                  </div>
                  <div className="pt-3 border-t border-line">
                    <p className="text-sm text-text-secondary">
                      🙏 <strong>Special festivals:</strong> Extended hours during major Hindu festivals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-line">
            <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">How far in advance should I book?</h3>
                  <p className="text-text-secondary text-sm">
                    We recommend booking at least 7-10 days in advance, especially for major ceremonies. For auspicious dates during festivals, book 2-3 weeks ahead.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Do you provide all puja materials?</h3>
                  <p className="text-text-secondary text-sm">
                    Yes, we provide all necessary puja items, including flowers, fruits, sweets, and ceremonial materials. You can also request a detailed list if you prefer to arrange some items yourself.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Can you perform online pujas?</h3>
                  <p className="text-text-secondary text-sm">
                    Absolutely! We offer virtual puja services where you can participate via video call. This is perfect for those who cannot physically attend or are located far away.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">What areas do you serve?</h3>
                  <p className="text-text-secondary text-sm">
                    While we're based in Madhya Pradesh, we serve clients across India. For distant locations, we can arrange local qualified pandits from our network or conduct online ceremonies.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">How are the ritual timings decided?</h3>
                  <p className="text-text-secondary text-sm">
                    All ritual timings are calculated based on Vedic astrology, considering the most auspicious muhurat for your specific ceremony and location. We provide detailed timing information upon booking.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">What if I need to reschedule?</h3>
                  <p className="text-text-secondary text-sm">
                    We understand that plans can change. Please contact us at least 48 hours before the scheduled time for rescheduling. We'll help find the next auspicious time for your ceremony.
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