'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MusicalInstrumentsBannerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'square';
  onLearnMore?: (serviceName: string) => void;
  onBookService?: (serviceName: string) => void;
}

const MusicalInstrumentsBanner: React.FC<MusicalInstrumentsBannerProps> = ({ 
  className = '', 
  orientation = 'horizontal',
  onLearnMore,
  onBookService
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
      {/* Background with musical theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        
        {/* Background image with low opacity */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/banners/music_course_background.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Course badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          LEARN MUSIC
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
          <div className="text-6xl text-amber-600">🎵</div>
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10">
          <div className="text-4xl text-amber-600">🎹</div>
        </div>
        <div className="absolute top-1/2 right-8 w-8 h-8 opacity-10">
          <div className="text-2xl text-amber-600">🥁</div>
        </div>
        
        {/* Golden border design */}
        <div className="absolute inset-2 border-2 border-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-xl opacity-25"></div>
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
              src="/banners/music_course.jpg"
              alt="Musical Instruments"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent mb-1">
            Musical Instruments Course
          </h1>
          <p className="text-sm text-amber-700 font-medium mb-2">
            Learn Harmonium, Tabla & Devotional Music
          </p>
          <p className="text-xs text-amber-700 italic mb-2">
            "Express devotion through divine melodies"
          </p>
          <p className="text-xs text-amber-500 font-medium mb-3">
            Online & Offline Classes • Beginner to Advanced
          </p>
          <div className="flex flex-col gap-2 mb-3">
            <Link href="/courses?category=music" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-xl text-center">
              Enroll Now
            </Link>
            <Link href="/courses?category=music" className="bg-white text-amber-600 border border-amber-400 px-4 py-2 rounded-full font-semibold text-xs shadow-lg text-center">
              Learn More
            </Link>
          </div>
          <div className="text-amber-500 text-xs font-medium">
            <div className="flex flex-wrap justify-center gap-3">
              <span>Harmonium</span>
              <span>Tabla</span>
              <span>Bhajans</span>
              <span>Online/Offline</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center h-full gap-8 pl-24 pr-8">
          <div className="flex-shrink-0 ml-16">
            <div className="relative">
              <div className="relative w-60 h-60 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/banners/music_course.jpg"
                  alt="Musical Instruments"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 py-8 pl-8">
          
          {/* Top tagline */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
              MUSIC COURSE
            </span>
            <p className="text-amber-600 text-sm font-medium tracking-wide">
Learn Sacred Music & Devotional Instruments
            </p>
          </div>
          
          {/* Main headline */}
          <h1 className="mb-4">
            <span className="block text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent leading-tight">
              Musical Instruments Course
            </span>
            <span className="block text-lg lg:text-xl text-amber-700 font-semibold mt-1">
              Learn Harmonium, Tabla & Devotional Music
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-amber-700 text-base font-medium italic leading-relaxed mb-2">
            "Express your devotion through divine melodies and sacred rhythms"
          </p>
          <p className="text-amber-500 text-sm font-medium mb-5">
Online & Offline Classes • Beginner to Advanced • ₹6,999
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mb-4">
            <Link href="/courses?category=music" className="group bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden text-center">
              <span className="flex items-center gap-2 relative z-10">
                Enroll Now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
            
            <Link href="/courses?category=music" className="bg-white hover:bg-amber-50 text-amber-600 border-2 border-amber-400 px-5 py-3 rounded-full font-semibold text-base shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
              Learn More
            </Link>
          </div>

          {/* Info */}
          <div className="text-amber-500 text-xs font-medium">
            <div className="flex gap-4 items-center">
              <span>Harmonium</span>
              <span>Tabla</span>
              <span>Devotional Music</span>
              <span>Online & Offline</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Decorative elements overlay */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-amber-100/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-yellow-200/30 to-transparent rounded-full blur-xl"></div>
      
      {/* Subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/5 to-transparent animate-pulse"></div>
    </div>
  );
}

export default MusicalInstrumentsBanner;