'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { language } = useLanguage();

  const content = {
    en: {
      headline: 'Sacred Rituals, Divine Blessings',
      subheadline: 'Book authentic pujas and ceremonies with experienced pandits across India',
      primaryCTA: 'Book Puja Now',
      secondaryCTA: 'Explore Rituals',
      videoAlt: 'Sacred Hindu Rituals Video Introduction',
    },
    hi: {
      headline: 'पवित्र अनुष्ठान, दिव्य आशीर्वाद',
      subheadline: 'भारत भर में अनुभवी पंडितों के साथ प्रामाणिक पूजा और संस्कार बुक करें',
      primaryCTA: 'पूजा बुक करें',
      secondaryCTA: 'अनुष्ठान देखें',
      videoAlt: 'पवित्र हिंदू अनुष्ठान वीडियो परिचय',
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Sacred Geometry Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-elevations to-background"></div>
        
        {/* Sacred geometry patterns */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary animate-pulse">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M50,5 L95,50 L50,95 L5,50 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
        
        <div className="absolute top-3/4 right-1/4 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent animate-pulse delay-1000">
            <polygon points="50,10 90,35 90,65 50,90 10,65 10,35" fill="none" stroke="currentColor" strokeWidth="1"/>
            <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        <div className="absolute top-1/2 right-1/6 w-20 h-20 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-deep-accent animate-pulse delay-500">
            <path d="M50,10 L61.8,38.2 L90,38.2 L68.1,61.8 L79.9,90 L50,70 L20.1,90 L31.9,61.8 L10,38.2 L38.2,38.2 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                language === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {content[language].headline}
                </span>
              </h1>
              
              <p className={`text-lg md:text-xl text-text-secondary max-w-2xl ${
                language === 'hi' ? 'body-hi' : ''
              }`}>
                {content[language].subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/book-puja"
                className="btn-primary px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
              >
                <span>{content[language].primaryCTA}</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <Link
                href="/services"
                className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>{content[language].secondaryCTA}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>{language === 'en' ? '15+ Years Experience' : '15+ वर्षों का अनुभव'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>{language === 'en' ? '1000+ Happy Families' : '1000+ खुश परिवार'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>{language === 'en' ? 'Pan India Service' : 'पैन इंडिया सेवा'}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden glow-border bg-gradient-to-br from-surface to-elevations">
              {/* YouTube Video Embed */}
              <iframe
                src="https://www.youtube.com/embed/b6UMt_Cfxc8"
                title={content[language].videoAlt}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 text-white/30">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 text-white/30">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}