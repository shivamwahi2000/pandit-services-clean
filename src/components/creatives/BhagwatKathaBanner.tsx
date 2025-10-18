'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BhagwatKathaBannerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'square';
}

const BhagwatKathaBanner: React.FC<BhagwatKathaBannerProps> = ({ 
  className = '', 
  orientation = 'horizontal' 
}) => {
  const getOrientationClasses = () => {
    switch (orientation) {
      case 'vertical':
        return 'flex-col h-[600px] w-[400px] md:h-[600px] md:w-[400px]';
      case 'square':
        return 'flex-col h-[500px] w-[500px] md:h-[500px] md:w-[500px]';
      default: // horizontal
        return 'min-h-[450px] md:h-[350px] w-full max-w-[1100px] mx-auto';
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${getOrientationClasses()} ${className}`}>
      {/* Background with temple/divine theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        
        {/* Background image with low opacity */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/banners/bhagwat-katha.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10">
          <div className="text-4xl text-orange-600">🪔</div>
        </div>
        <div className="absolute top-1/2 right-8 w-8 h-8 opacity-10">
          <div className="text-2xl text-orange-600">🪶</div>
        </div>
        
        {/* Golden border design */}
        <div className="absolute inset-2 border-2 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-xl opacity-20"></div>
        <div className="absolute inset-4 border border-yellow-300 rounded-lg opacity-30"></div>
      </div>

      {/* Content - Mobile Optimized Layout */}
      <div className="relative z-10 h-full">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="relative w-28 h-28 rounded-lg shadow-xl overflow-hidden mb-3">
            <Image
              src="/banners/bhagwat-katha.jpg"
              alt="Pt. Hariom Shastri Ji"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent mb-1">
            Bhagwat Katha
          </h1>
          <p className="text-sm text-orange-700 font-medium mb-2">
            by Pt. Hariom Shastri Ji (Vrindavan)
          </p>
          <p className="text-xs text-orange-700 italic mb-2">
            "Where words become Bhakti and Bhakti becomes Blessing."
          </p>
          <p className="text-xs text-orange-500 font-medium mb-3">
            🌺 Authentic Vrindavan Tradition 🌺
          </p>
          <div className="flex flex-col gap-2 mb-3">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-xl">
              📅 Schedule Katha
            </button>
            <Link href="/learn-more#bhagwat-katha" className="bg-white text-orange-600 border border-orange-400 px-4 py-2 rounded-full font-semibold text-xs shadow-lg text-center">
              Learn More
            </Link>
          </div>
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex flex-wrap justify-center gap-3">
              <span>🕐 Flexible timing</span>
              <span>🏠 In-home service</span>
              <span>📿 Traditional rituals</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center h-full gap-8 pl-24 pr-8">
          <div className="flex-shrink-0 ml-16">
            <div className="relative">
              <div className="relative w-60 h-60 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/banners/bhagwat-katha.jpg"
                  alt="Pt. Hariom Shastri Ji"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 py-8 pl-8">
          
          {/* Top tagline */}
          <p className="text-orange-600 text-sm font-medium tracking-wide mb-3">
            ✨ Invite Divine Wisdom to Your Home ✨
          </p>
          
          {/* Main headline - Controlled sizes */}
          <h1 className="mb-4">
            <span className="block text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent leading-tight">
              Bhagwat Katha
            </span>
            <span className="block text-lg lg:text-xl text-orange-700 font-semibold mt-1">
              by Pt. Hariom Shastri Ji (Vrindavan)
            </span>
          </h1>

          {/* Subtitle - Compact */}
          <p className="text-orange-700 text-base font-medium italic leading-relaxed mb-2">
            "Where words become Bhakti and Bhakti becomes Blessing."
          </p>
          <p className="text-orange-500 text-sm font-medium mb-5">
            🌺 Authentic Vrindavan Tradition 🌺
          </p>

          {/* Buttons - Smaller */}
          <div className="flex gap-3 mb-4">
            <button className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-bold text-base shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                📅 Schedule Katha
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
            
            <Link href="/learn-more#bhagwat-katha" className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-400 px-5 py-3 rounded-full font-semibold text-base shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Learn More
            </Link>
          </div>

          {/* Info - Compact */}
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex gap-4 items-center">
              <span>🕐 Flexible timing</span>
              <span>🏠 In-home service</span>
              <span>📿 Traditional rituals</span>
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
}

export default BhagwatKathaBanner;