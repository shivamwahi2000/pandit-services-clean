'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      tagline: 'Sacred Rituals, Divine Blessings',
      description: 'Connecting families with authentic Hindu traditions through experienced pandits across India.',
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
      followUs: 'Follow Us',
      newsletter: 'Newsletter',
      newsletterText: 'Get updates on auspicious dates and special offers',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      sitemap: 'Sitemap'
    },
    hi: {
      tagline: 'पवित्र अनुष्ठान, दिव्य आशीर्वाद',
      description: 'भारत भर के अनुभवी पंडितों के माध्यम से परिवारों को प्रामाणिक हिंदू परंपराओं से जोड़ना।',
      services: 'सेवाएं',
      company: 'कंपनी',
      contact: 'संपर्क',
      followUs: 'हमें फॉलो करें',
      newsletter: 'न्यूज़लेटर',
      newsletterText: 'शुभ दिनों और विशेष ऑफर की अपडेट प्राप्त करें',
      subscribe: 'सब्सक्राइब करें',
      rights: 'सभी अधिकार सुरक्षित।',
      privacy: 'गोपनीयता नीति',
      terms: 'नियम एवं शर्तें',
      sitemap: 'साइटमैप'
    }
  };

  const serviceLinks = {
    en: [
      { name: 'Grih Pravesh', href: '/services/grih-pravesh' },
      { name: 'Satyanarayan Puja', href: '/services/satyanarayan' },
      { name: 'Havan Ceremony', href: '/services/havan' },
      { name: 'Marriage Rituals', href: '/services/marriage' },
      { name: 'Astrology', href: '/services/astrology' },
    ],
    hi: [
      { name: 'गृह प्रवेश', href: '/services/grih-pravesh' },
      { name: 'सत्यनारायण पूजा', href: '/services/satyanarayan' },
      { name: 'हवन संस्कार', href: '/services/havan' },
      { name: 'विवाह संस्कार', href: '/services/marriage' },
      { name: 'ज्योतिष', href: '/services/astrology' },
    ]
  };

  const companyLinks = {
    en: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Pandits', href: '/pandits' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
    ],
    hi: [
      { name: 'हमारे बारे में', href: '/about' },
      { name: 'हमारे पंडित', href: '/pandits' },
      { name: 'प्रशंसापत्र', href: '/testimonials' },
      { name: 'ब्लॉग', href: '/blog' },
      { name: 'सामान्य प्रश्न', href: '/faq' },
    ]
  };

  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-4 mb-6">
              <Image
                src="/logo.png"
                alt="Pandit Services Logo"
                width={80}
                height={80}
                className="w-18 h-18 md:w-20 md:h-20"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold heading-en text-primary">
                  Kesari Nakshatra
                </span>
              </div>
            </Link>
            <p className={`text-sm text-text-secondary mb-4 ${
              language === 'hi' ? 'body-hi' : ''
            }`}>
              {content[language].description.replace('Pandit Services', 'Kesari Nakshatra')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986 6.618 0 11.985-5.368 11.985-11.986C23.985 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.947-1.194-2.25-1.194-3.672 0-1.421.446-2.725 1.194-3.672.749-.948 1.9-1.559 3.197-1.559 1.297 0 2.448.611 3.197 1.559.748.947 1.194 2.251 1.194 3.672 0 1.422-.446 2.725-1.194 3.672-.749.948-1.9 1.559-3.197 1.559z"/>
                </svg>
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              language === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>
              {content[language].services}
            </h3>
            <ul className="space-y-2">
              {serviceLinks[language].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm text-text-secondary hover:text-primary transition-colors ${
                      language === 'hi' ? 'body-hi' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              language === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>
              {content[language].company}
            </h3>
            <ul className="space-y-2">
              {companyLinks[language].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm text-text-secondary hover:text-primary transition-colors ${
                      language === 'hi' ? 'body-hi' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              language === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>
              {content[language].contact}
            </h3>
            <div className="space-y-3 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.57-2.3-.57-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <a href="tel:+919340337323" className="hover:text-primary transition-colors">
                  +91 93403 37323
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:info@panditservices.com" className="hover:text-primary transition-colors">
                  info@panditservices.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-line">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm text-text-secondary ${
              language === 'hi' ? 'body-hi' : ''
            }`}>
              © 2024 Kesari Nakshatra. {content[language].rights}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className={`text-sm text-text-secondary hover:text-primary transition-colors ${
                  language === 'hi' ? 'body-hi' : ''
                }`}
              >
                {content[language].privacy}
              </Link>
              <Link
                href="/terms"
                className={`text-sm text-text-secondary hover:text-primary transition-colors ${
                  language === 'hi' ? 'body-hi' : ''
                }`}
              >
                {content[language].terms}
              </Link>
              <Link
                href="/sitemap"
                className={`text-sm text-text-secondary hover:text-primary transition-colors ${
                  language === 'hi' ? 'body-hi' : ''
                }`}
              >
                {content[language].sitemap}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}