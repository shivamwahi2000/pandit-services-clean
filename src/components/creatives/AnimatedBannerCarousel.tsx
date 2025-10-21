'use client';

import React, { useState, useEffect } from 'react';
import BhagwatKathaBanner from './BhagwatKathaBanner';
import AkhandRamayanBanner from './AkhandRamayanBanner';
import ShivPuranBanner from './ShivPuranBanner';
import BhagwadGeetaBanner from './BhagwadGeetaBanner';
import HanumanKathaBanner from './HanumanKathaBanner';
import AstrologicalConsultationBanner from './AstrologicalConsultationBanner';
import MusicalInstrumentsBanner from './MusicalInstrumentsBanner';

interface AnimatedBannerCarouselProps {
  className?: string;
  autoPlayInterval?: number; // in milliseconds
  onLearnMore?: (serviceName: string) => void;
}

const AnimatedBannerCarousel: React.FC<AnimatedBannerCarouselProps> = ({ 
  className = '',
  autoPlayInterval = 6000, // 6 seconds
  onLearnMore
}) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const banners = [
    { 
      component: <AstrologicalConsultationBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Astrological Consultation',
      color: 'from-orange-500 to-red-500'
    },
    { 
      component: <BhagwadGeetaBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Shreemad Bhagwadgeeta',
      color: 'from-orange-500 to-red-500'
    },
    { 
      component: <BhagwatKathaBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Bhagwat Katha',
      color: 'from-orange-500 to-red-500'
    },
    { 
      component: <AkhandRamayanBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Akhand Ramayan Path',
      color: 'from-orange-500 to-red-500'
    },
    { 
      component: <ShivPuranBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Shiv Maha Puran Katha',
      color: 'from-orange-500 to-red-500'
    },
    { 
      component: <HanumanKathaBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Hanumant Katha',
      color: 'from-orange-500 to-red-500'
    },
    { 
      component: <MusicalInstrumentsBanner orientation="horizontal" onLearnMore={onLearnMore} />, 
      name: 'Musical Instruments Course',
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentBanner, autoPlayInterval]);

  const nextBanner = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToBanner = (index: number) => {
    if (isAnimating || index === currentBanner) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentBanner(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Banner Display with Animation */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className={`transition-all duration-500 ease-in-out transform ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {banners[currentBanner].component}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-4">
        {banners.map((banner, index) => (
          <button
            key={index}
            onClick={() => goToBanner(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentBanner 
                ? `bg-gradient-to-r ${banner.color} shadow-lg scale-125` 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
          </button>
        ))}
      </div>

      {/* Manual Navigation Arrows (Optional) */}
      <button
        onClick={nextBanner}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        onClick={() => goToBanner((currentBanner - 1 + banners.length) % banners.length)}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};

export default AnimatedBannerCarousel;