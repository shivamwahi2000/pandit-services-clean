'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HanumanKathaBannerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'square';
  onLearnMore?: (serviceName: string) => void;
}

const HanumanKathaBanner: React.FC<HanumanKathaBannerProps> = ({ 
  className = '', 
  orientation = 'horizontal',
  onLearnMore
}) => {
  const getOrientationClasses = () => {
    switch (orientation) {
      case 'vertical':
        return 'flex-col h-[700px] w-[500px] md:h-[750px] md:w-[550px]';
      case 'square':
        return 'flex-col h-[600px] w-[600px] md:h-[650px] md:w-[650px]';
      default: // horizontal
        return 'min-h-[500px] md:h-[400px] w-full max-w-[1300px] mx-auto';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${getOrientationClasses()} ${className}`}>
      {/* Background with enhanced Hanuman theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        
        {/* Background image with low opacity - positioned to show face */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/banners/Hanumant-katha-background.jpg"
            alt="Background"
            fill
            className="object-cover object-top"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10">
          <div className="text-4xl text-orange-600">🪔</div>
        </div>
        <div className="absolute top-1/2 right-8 w-8 h-8 opacity-10">
          <div className="text-2xl text-orange-600">⚡</div>
        </div>
        
        {/* Enhanced golden border design */}
        <div className="absolute inset-2 border-2 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-xl opacity-25"></div>
        <div className="absolute inset-4 border border-yellow-300 rounded-lg opacity-35"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-200/10 via-transparent to-transparent"></div>
      </div>

      {/* Content - Mobile Optimized Layout */}
      <div className="relative z-10 h-full">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="relative w-28 h-28 rounded-lg shadow-xl overflow-hidden mb-3">
            <Image
              src="/banners/Hanumant-katha.jpg"
              alt="Hanuman Pandit"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent mb-1">
            Shree Hanumant Katha
          </h1>
          <p className="text-sm text-orange-700 font-medium mb-2">
            Divine Stories of Bajrang Bali
          </p>
          <p className="text-xs text-orange-700 italic mb-2">
            "Where devotion meets divine strength and courage."
          </p>
          <p className="text-xs text-orange-500 font-medium mb-3">
            🌺 Blessed by Hanuman Ji's Grace 🌺
          </p>
          <div className="flex flex-col gap-2 mb-3">
            <Link href="/book-ritual?category=katha-vachan&book=hanumant-katha" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-xl text-center">
              ⚡ Book Hanuman Katha
            </Link>
            <Link href="/book-ritual?category=katha-vachan&learn=hanumant-katha" className="bg-white text-orange-600 border border-orange-400 px-4 py-2 rounded-full font-semibold text-xs shadow-lg text-center">
              Learn More
            </Link>
          </div>
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex flex-wrap justify-center gap-3">
              <span>💪 Divine Strength</span>
              <span>🙏 Courage & Faith</span>
              <span>🔥 Spiritual Power</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center h-full gap-8 pl-24 pr-8">
          <div className="flex-shrink-0 ml-16">
            <div className="relative">
              <div className="relative w-60 h-60 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/banners/Hanumant-katha.jpg"
                  alt="Hanuman Pandit"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 py-8 pl-8">
          
          {/* Top tagline */}
          <p className="text-orange-600 text-sm font-medium tracking-wide mb-3">
            ⚡ Invoke the Power of Bajrang Bali ⚡
          </p>
          
          {/* Main headline - Enhanced size for prominence */}
          <h1 className="mb-4">
            <span className="block text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent leading-tight">
              Shree Hanumant Katha
            </span>
            <span className="block text-lg lg:text-xl text-orange-700 font-semibold mt-1">
              Divine Stories of Bajrang Bali
            </span>
          </h1>

          {/* Spiritual tagline */}
          <p className="text-orange-700 text-base font-medium italic leading-relaxed mb-2">
            "Where devotion meets divine strength and courage."
          </p>
          <p className="text-orange-500 text-sm font-medium mb-5">
            🌺 Blessed by Hanuman Ji's Grace 🌺
          </p>

          {/* Enhanced buttons for prominence */}
          <div className="flex gap-3 mb-4">
            <Link href="/book-ritual?category=katha-vachan&book=hanumant-katha" className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden text-center">
              <span className="flex items-center gap-2 relative z-10">
                ⚡ Book Hanuman Katha
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              {/* Shimmer effect for prominence */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            <Link href="/book-ritual?category=katha-vachan&learn=hanumant-katha" className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-400 px-5 py-3 rounded-full font-semibold text-base shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Learn More
            </Link>
          </div>

          {/* Info - Compact */}
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex gap-4 items-center">
              <span>💪 Divine Strength</span>
              <span>🙏 Courage & Faith</span>
              <span>🔥 Spiritual Power</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Decorative elements overlay */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-orange-100/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-yellow-200/20 to-transparent rounded-full blur-xl"></div>
    </div>
  );
};

export default HanumanKathaBanner;