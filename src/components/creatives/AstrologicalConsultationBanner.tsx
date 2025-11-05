'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AstrologicalConsultationBannerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'square';
  onLearnMore?: (serviceName: string) => void;
}

const AstrologicalConsultationBanner: React.FC<AstrologicalConsultationBannerProps> = ({
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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/banners/astrological-consultatiion-background.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ EXPERT GUIDANCE
        </div>
        
        <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
          <div className="text-6xl text-orange-600">🔮</div>
        </div>
        <div className="absolute bottom-4 right-4 w-12 h-12 opacity-10">
          <div className="text-4xl text-orange-600">⭐</div>
        </div>
        <div className="absolute top-1/2 right-8 w-8 h-8 opacity-10">
          <div className="text-2xl text-orange-600">🌙</div>
        </div>
        
        <div className="absolute inset-2 border-2 border-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-xl opacity-25"></div>
        <div className="absolute inset-4 border border-yellow-300 rounded-lg opacity-35"></div>
        
        <div className="absolute inset-0 bg-gradient-radial from-yellow-200/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 h-full">
        <div className="md:hidden flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="relative w-20 h-20 rounded-full shadow-xl overflow-hidden mb-3">
            <Image
              src="/banners/astrological-consultation.jpg"
              alt="Astrology Consultation"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent mb-1">
            Astrological Consultation
          </h1>
          <p className="text-sm text-orange-700 font-medium mb-2">
            Expert Guidance for Life Decisions
          </p>
          <p className="text-xs text-orange-700 italic mb-2">
            45 min call charge ₹1500
          </p>
          <p className="text-xs text-orange-500 font-medium mb-3">
            🌟 Personalized Reading • Life Insights • Future Guidance 🌟
          </p>
          <div className="flex justify-center mb-3">
            <Link href="/astrology-vastu#consultation-form" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl text-center">
              🔮 Fill Form & Book
            </Link>
          </div>
          <div className="text-orange-500 text-xs font-medium">
            <div className="flex flex-wrap justify-center gap-3">
              <span>🔮 Birth Chart</span>
              <span>💫 Career Guide</span>
              <span>🌟 Future Reading</span>
              <span>⏰ 45 mins</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center h-full gap-8 pl-24 pr-8">
          <div className="flex-shrink-0 ml-16">
            <div className="relative">
              <div className="relative w-60 h-60 rounded-lg shadow-xl overflow-hidden">
                <Image
                  src="/banners/astrological-consultation.jpg"
                  alt="Astrology Consultation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 py-8 pl-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                EXPERT CONSULTATION
              </span>
              <p className="text-orange-600 text-sm font-medium tracking-wide">
                🌟 Get Personalized Astrological Guidance 🌟
              </p>
            </div>
            
            <h1 className="mb-4">
              <span className="block text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent leading-tight">
                Astrological Consultation
              </span>
              <span className="block text-lg lg:text-xl text-orange-700 font-semibold mt-1">
                Expert Guidance for Life Decisions
              </span>
            </h1>

            <p className="text-orange-700 text-base font-medium italic leading-relaxed mb-2">
              "Unlock the secrets of your destiny with personalized astrological insights"
            </p>
            <p className="text-orange-500 text-sm font-medium mb-5">
              🔮 45 min call charge ₹1500 • Personalized Reading • Life Insights 🔮
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex justify-center mb-4">
                  <Link href="/astrology-vastu#consultation-form" className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                    <span className="flex items-center gap-2 relative z-10">
                      🔮 Fill Form & Book
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="text-orange-500 text-sm font-medium space-y-2">
                  <div className="flex items-center gap-2">
                    <span>🌟</span>
                    <span>Personalized Birth Chart Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💫</span>
                    <span>Career & Relationship Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔮</span>
                    <span>Future Predictions & Remedies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏰</span>
                    <span>45 minutes detailed consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-orange-100/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-yellow-200/30 to-transparent rounded-full blur-xl"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/5 to-transparent animate-pulse"></div>
    </div>
  );
};

export default AstrologicalConsultationBanner;