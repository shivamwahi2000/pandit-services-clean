'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BhagwadGeetaBannerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'square';
  onLearnMore?: (serviceName: string) => void;
}

const BhagwadGeetaBanner: React.FC<BhagwadGeetaBannerProps> = ({ 
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
      {/* Background with enhanced prominence */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        
        {/* Background image with low opacity */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/banners/bhagwad-geeta.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Special prominence indicators */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ MOST POPULAR
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
          <div className="text-6xl text-orange-600">🏺</div>
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10">
          <div className="text-4xl text-orange-600">🪔</div>
        </div>
        <div className="absolute top-1/2 right-8 w-8 h-8 opacity-10">
          <div className="text-2xl text-orange-600">📿</div>
        </div>
        
        {/* Enhanced golden border design */}
        <div className="absolute inset-2 border-2 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-xl opacity-25"></div>
        <div className="absolute inset-4 border border-yellow-300 rounded-lg opacity-35"></div>
        
        {/* Subtle glow effect for prominence */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-200/10 via-transparent to-transparent"></div>
      </div>

      {/* Content - Mobile Optimized Layout */}
      <div className="relative z-10 h-full">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="relative w-28 h-28 rounded-lg shadow-xl overflow-hidden mb-3">
            <Image
              src="/banners/bhagwad-geeta.jpg"
              alt="Geeta Acharya"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent mb-1">
            Shreemad Bhagwadgeeta
          </h1>
          <p className="text-sm text-orange-700 font-medium mb-2">
            Complete Life Philosophy Course
          </p>
          <p className="text-xs text-orange-700 italic mb-2">
            "Yada yada hi dharmasya glanir bhavati bharata"
          </p>
          <p className="text-xs text-orange-500 font-medium mb-3">
            🌺 18 Chapters • 700 Verses • Life Transformation 🌺
          </p>
          <div className="flex flex-col gap-2 mb-3">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-xl">
              📚 Start Learning Geeta
            </button>
            <Link href="/book-ritual?category=katha-vachan&learn=shreemad-bhagwadgeeta" className="bg-white text-orange-600 border border-orange-400 px-4 py-2 rounded-full font-semibold text-xs shadow-lg text-center">
              Learn More
            </Link>
          </div>
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex flex-wrap justify-center gap-3">
              <span>📖 18 Chapters</span>
              <span>🎯 Life Lessons</span>
              <span>🕉️ Spiritual Growth</span>
              <span>⭐ Most Popular</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center h-full gap-8 pl-24 pr-8">
          <div className="flex-shrink-0 ml-16">
            <div className="relative">
              <div className="relative w-60 h-60 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/banners/bhagwad-geeta.jpg"
                  alt="Geeta Acharya"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 py-8 pl-8">
          
          {/* Top tagline with prominence */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
              FEATURED COURSE
            </span>
            <p className="text-orange-600 text-sm font-medium tracking-wide">
              🌟 Transform Your Life with Divine Knowledge 🌟
            </p>
          </div>
          
          {/* Main headline - Enhanced size for prominence */}
          <h1 className="mb-4">
            <span className="block text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent leading-tight">
              Shreemad Bhagwadgeeta
            </span>
            <span className="block text-lg lg:text-xl text-orange-700 font-semibold mt-1">
              Complete Life Philosophy Course
            </span>
          </h1>

          {/* Enhanced spiritual tagline */}
          <p className="text-orange-700 text-base font-medium italic leading-relaxed mb-2">
            "Yada yada hi dharmasya glanir bhavati bharata - Whenever righteousness declines..."
          </p>
          <p className="text-orange-500 text-sm font-medium mb-5">
            🌺 18 Chapters • 700 Verses • Life Transformation 🌺
          </p>

          {/* Enhanced buttons for prominent course */}
          <div className="flex gap-3 mb-4">
            <button className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <span className="flex items-center gap-2 relative z-10">
                📚 Start Learning Geeta
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              {/* Shimmer effect for prominence */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            <Link href="/book-ritual?category=katha-vachan&learn=shreemad-bhagwadgeeta" className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-400 px-5 py-3 rounded-full font-semibold text-base shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Learn More
            </Link>
          </div>

          {/* Enhanced info for course */}
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex gap-4 items-center">
              <span>📖 18 Chapters</span>
              <span>🎯 Life Lessons</span>
              <span>🕉️ Spiritual Growth</span>
              <span>⭐ Most Popular</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Enhanced decorative elements overlay */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-orange-100/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-yellow-200/30 to-transparent rounded-full blur-xl"></div>
      
      {/* Subtle animation for prominence */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/5 to-transparent animate-pulse"></div>
    </div>
  );
}

export default BhagwadGeetaBanner;