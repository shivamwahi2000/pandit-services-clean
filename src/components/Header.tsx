'use client';

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const menuItemRef = useRef<HTMLDivElement>(null);

  const handleDropdownEnter = (itemName: string) => {
    setActiveDropdown(itemName);
    
    // Calculate position for portal
    if (menuItemRef.current) {
      const rect = menuItemRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY - 5, // Overlap slightly to prevent gap
        left: rect.left + window.scrollX
      });
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const navigation = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'Astrology & Vastu', href: '/astrology-vastu' },
      { name: 'Book a Ritual', href: '/book-ritual', hasDropdown: true },
      { name: 'Courses', href: '/courses' },
      { name: 'Seva', href: '/seva' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    hi: [
      { name: 'होम', href: '/' },
      { name: 'ज्योतिष और वास्तु', href: '/astrology-vastu' },
      { name: 'अनुष्ठान बुक करें', href: '/book-ritual', hasDropdown: true },
      { name: 'पाठ्यक्रम', href: '/courses' },
      { name: 'सेवा', href: '/seva' },
      { name: 'हमारे बारे में', href: '/about' },
      { name: 'संपर्क', href: '/contact' },
    ],
  };

  const ritualCategories = {
    en: [
      {
        id: 'home-puja',
        name: 'Puja at Home',
        services: [
          { name: 'Grih Pravesh Puja', href: '/book-ritual?category=home-puja&service=grih-pravesh-puja' },
          { name: 'Satyanarayan Puja', href: '/book-ritual?category=home-puja&service=satyanarayan-puja' },
          { name: 'Ganesh Puja', href: '/book-ritual?category=home-puja&service=ganesh-puja' },
          { name: 'Lakshmi Puja', href: '/book-ritual?category=home-puja&service=lakshmi-puja' },
          { name: 'Saraswati Puja', href: '/book-ritual?category=home-puja&service=saraswati-puja' }
        ]
      },
      {
        id: 'katha-vachan',
        name: 'Katha Vachan',
        services: [
          { name: 'Bhagwat Katha', href: '/book-ritual?category=katha-vachan&service=bhagwat-katha' },
          { name: 'Hanumant Katha', href: '/book-ritual?category=katha-vachan&service=hanumant-katha' },
          { name: 'Shree Durga Path', href: '/book-ritual?category=katha-vachan&service=shree-durga-path' },
          { name: 'Ramayana Path', href: '/book-ritual?category=katha-vachan&service=ramayana-path' },
          { name: 'Vishnu Puran Katha', href: '/book-ritual?category=katha-vachan&service=vishnu-puran-katha' }
        ]
      },
      {
        id: 'temple-services',
        name: 'Temple Services',
        services: [
          { name: 'Temple Abhishek', href: '/book-ritual?category=temple-services&service=temple-abhishek' },
          { name: 'Aarti at Temple', href: '/book-ritual?category=temple-services&service=aarti-at-temple' },
          { name: 'Prasad Distribution', href: '/book-ritual?category=temple-services&service=prasad-distribution' },
          { name: 'Temple Decoration', href: '/book-ritual?category=temple-services&service=temple-decoration' }
        ]
      },
      {
        id: 'life-events',
        name: 'Life Events',
        services: [
          { name: 'Marriage Ceremony', href: '/book-ritual?category=life-events&service=marriage-ceremony' },
          { name: 'Naamkaran Sanskar', href: '/book-ritual?category=life-events&service=naamkaran-sanskar' },
          { name: 'Mundan Ceremony', href: '/book-ritual?category=life-events&service=mundan-ceremony' },
          { name: 'Thread Ceremony', href: '/book-ritual?category=life-events&service=thread-ceremony' },
          { name: 'Shradh Karma', href: '/book-ritual?category=life-events&service=shradh-karma' }
        ]
      },
      {
        id: 'online-services',
        name: 'Online Services',
        services: [
          { name: 'Virtual Puja', href: '/book-ritual?category=online-services&service=virtual-puja' },
          { name: 'Online Consultation', href: '/book-ritual?category=online-services&service=online-consultation' },
          { name: 'Digital Aarti', href: '/book-ritual?category=online-services&service=digital-aarti' },
          { name: 'E-Prasad Booking', href: '/book-ritual?category=online-services&service=e-prasad-booking' }
        ]
      }
    ],
    hi: [
      {
        id: 'home-puja',
        name: 'घर की पूजा',
        services: [
          { name: 'गृह प्रवेश पूजा', href: '/book-ritual?category=home-puja&service=grih-pravesh-puja' },
          { name: 'सत्यनारायण पूजा', href: '/book-ritual?category=home-puja&service=satyanarayan-puja' },
          { name: 'गणेश पूजा', href: '/book-ritual?category=home-puja&service=ganesh-puja' },
          { name: 'लक्ष्मी पूजा', href: '/book-ritual?category=home-puja&service=lakshmi-puja' },
          { name: 'सरस्वती पूजा', href: '/book-ritual?category=home-puja&service=saraswati-puja' }
        ]
      },
      {
        id: 'katha-vachan',
        name: 'कथा वाचन',
        services: [
          { name: 'भागवत कथा', href: '/book-ritual?category=katha-vachan&service=bhagwat-katha' },
          { name: 'हनुमत कथा', href: '/book-ritual?category=katha-vachan&service=hanumant-katha' },
          { name: 'श्री दुर्गा पाठ', href: '/book-ritual?category=katha-vachan&service=shree-durga-path' },
          { name: 'रामायण पाठ', href: '/book-ritual?category=katha-vachan&service=ramayana-path' },
          { name: 'विष्णु पुराण कथा', href: '/book-ritual?category=katha-vachan&service=vishnu-puran-katha' }
        ]
      },
      {
        id: 'temple-services',
        name: 'मंदिर सेवाएं',
        services: [
          { name: 'मंदिर अभिषेक', href: '/book-ritual?category=temple-services&service=temple-abhishek' },
          { name: 'मंदिर आरती', href: '/book-ritual?category=temple-services&service=aarti-at-temple' },
          { name: 'प्रसाद वितरण', href: '/book-ritual?category=temple-services&service=prasad-distribution' },
          { name: 'मंदिर सजावट', href: '/book-ritual?category=temple-services&service=temple-decoration' }
        ]
      },
      {
        id: 'life-events',
        name: 'जीवन संस्कार',
        services: [
          { name: 'विवाह संस्कार', href: '/book-ritual?category=life-events&service=marriage-ceremony' },
          { name: 'नामकरण संस्कार', href: '/book-ritual?category=life-events&service=naamkaran-sanskar' },
          { name: 'मुंडन संस्कार', href: '/book-ritual?category=life-events&service=mundan-ceremony' },
          { name: 'यज्ञोपवीत संस्कार', href: '/book-ritual?category=life-events&service=thread-ceremony' },
          { name: 'श्राद्ध कर्म', href: '/book-ritual?category=life-events&service=shradh-karma' }
        ]
      },
      {
        id: 'online-services',
        name: 'ऑनलाइन सेवाएं',
        services: [
          { name: 'वर्चुअल पूजा', href: '/book-ritual?category=online-services&service=virtual-puja' },
          { name: 'ऑनलाइन परामर्श', href: '/book-ritual?category=online-services&service=online-consultation' },
          { name: 'डिजिटल आरती', href: '/book-ritual?category=online-services&service=digital-aarti' },
          { name: 'ई-प्रसाद बुकिंग', href: '/book-ritual?category=online-services&service=e-prasad-booking' }
        ]
      }
    ]
  };

  const quickActions = {
    en: {
      bookRitual: 'Book Ritual',
      whatsapp: 'WhatsApp',
      call: 'Call',
    },
    hi: {
      bookRitual: 'अनुष्ठान बुक करें',
      whatsapp: 'व्हाट्सऐप',
      call: 'कॉल',
    },
  };

  const tagline = {
    en: 'Sacred Rituals, Divine Blessings',
    hi: 'पवित्र अनुष्ठान, दिव्य आशीर्वाद'
  };

  return (
    <header className="sticky top-0 z-[99999] bg-background/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28 md:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Pandit Services Logo"
              width={120}
              height={120}
              className="w-24 h-24 md:w-28 md:h-28"
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold heading-en text-primary">
                Kesari Nakshatra
              </span>
              <span className={`text-sm md:text-base text-text-secondary ${language === 'hi' ? 'body-hi' : ''}`}>
                {tagline[language]}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation[language].map((item) => (
              <div
                key={item.name}
                ref={item.hasDropdown ? menuItemRef : null}
                className="relative"
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    handleDropdownEnter(item.name);
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) {
                    // Only close if mouse is really leaving the entire area
                    setTimeout(() => {
                      if (!document.querySelector('.dropdown-container:hover') && !menuItemRef.current?.matches(':hover')) {
                        handleDropdownLeave();
                      }
                    }, 50);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-sm px-2 py-1 rounded border border-line hover:bg-surface transition-colors"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>


            <a
              href="https://wa.me/919340337323"
              target="_blank"
              rel="noopener noreferrer"
              className="text-success hover:text-success/80 transition-colors"
              title={quickActions[language].whatsapp}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/kesarinakshatra/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors"
              title="Follow on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="tel:+919340337323"
              className="text-primary hover:text-primary-hover transition-colors"
              title={quickActions[language].call}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.57-2.3-.57-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-line">
            <div className="flex flex-col space-y-4">
              {navigation[language].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    language === 'hi' ? 'body-hi' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-line">
                <button
                  onClick={toggleLanguage}
                  className="text-sm px-3 py-2 rounded border border-line hover:bg-surface transition-colors"
                >
                  {language === 'en' ? 'हिं' : 'EN'}
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Portal Dropdown - Rendered outside header DOM */}
      {activeDropdown && typeof window !== 'undefined' && createPortal(
        <div 
          className="dropdown-container fixed w-64 bg-white border border-gray-300 rounded-lg shadow-2xl"
          style={{ 
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 2147483647,
            position: 'fixed',
            backgroundColor: 'white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            paddingTop: '8px'
          }}
          onMouseEnter={() => {
            // Keep dropdown open when hovering over it
          }}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="p-4">
            {ritualCategories[language].map((category) => (
              <button
                key={category.id}
                className={`w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors ${
                  language === 'hi' ? 'body-hi' : ''
                }`}
                onClick={() => {
                  setActiveDropdown(null);
                  router.push(`/book-ritual?category=${category.id}`);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}