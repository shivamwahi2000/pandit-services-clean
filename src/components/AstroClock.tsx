'use client';

import React, { useState, useEffect } from 'react';
import usePanchang from '@/hooks/usePanchang';

interface AstroClockProps {
  className?: string;
}

const AstroClock: React.FC<AstroClockProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const { panchangData, isCalculating } = usePanchang(true); // Enable auto-fetch for real-time data

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  };

  const getHindiDate = (date: Date) => {
    const hindiMonths = [
      'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
      'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
    ];
    const hindiDays = [
      'रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'
    ];
    
    return `${hindiDays[date.getDay()]}, ${date.getDate()} ${hindiMonths[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Get real panchang data from PyJHora
  const getTithi = () => {
    if (isCalculating) return 'गणना में...';
    return panchangData.tithi || 'अज्ञात';
  };

  const getNakshatra = () => {
    if (isCalculating) return 'गणना में...';
    return panchangData.nakshatra || 'अज्ञात';
  };

  if (!isLoaded) {
    return (
      <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 ${className}`}>
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-amber-200 rounded w-3/4"></div>
          <div className="h-6 bg-amber-100 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-amber-700 font-medium text-sm">Live</span>
        </div>
        <div className="text-amber-600 text-sm font-medium">IST</div>
      </div>

      {/* Time Display */}
      <div className="text-center mb-6">
        <div className="text-4xl md:text-5xl font-bold text-amber-800 font-mono tracking-tight mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-amber-700 font-medium text-lg">
          {formatDate(currentTime)}
        </div>
        <div className="text-amber-600 text-sm mt-1 font-medium">
          {getHindiDate(currentTime)}
        </div>
      </div>

      {/* Panchang Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-xl p-4 border border-amber-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌙</span>
            </div>
            <div>
              <div className="text-xs text-amber-600 font-medium uppercase tracking-wide">तिथि</div>
              <div className="text-amber-800 font-semibold">{getTithi()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/60 rounded-xl p-4 border border-amber-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⭐</span>
            </div>
            <div>
              <div className="text-xs text-amber-600 font-medium uppercase tracking-wide">नक्षत्र</div>
              <div className="text-amber-800 font-semibold">{getNakshatra()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-lg"></div>
    </div>
  );
};

export default AstroClock;