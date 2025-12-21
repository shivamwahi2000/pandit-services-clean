'use client';

import Image from 'next/image';
import React from 'react';

interface OneQuestionOfferBannerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical' | 'square';
  onClaimOffer?: () => void;
}

const OneQuestionOfferBanner: React.FC<OneQuestionOfferBannerProps> = ({
  className = '',
  orientation = 'horizontal',
  onClaimOffer
}) => {
  const getOrientationClasses = () => {
    switch (orientation) {
      case 'vertical':
        return 'flex-col h-[700px] w-[500px] md:h-[750px] md:w-[550px]';
      case 'square':
        return 'flex-col h-[600px] w-[600px] md:h-[650px] md:w-[650px]';
      default:
        return 'min-h-[480px] md:h-[360px] w-full max-w-[1240px] mx-auto';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-2xl ${getOrientationClasses()} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-200">
        <div className="absolute inset-0 bg-gradient-radial from-amber-200/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 border border-yellow-200 rounded-2xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 h-full">
        <div className="md:hidden flex flex-col items-center justify-center gap-6 h-full px-6 py-8 text-center">
          <div className="relative w-36 h-36 rounded-full shadow-xl overflow-hidden">
            <Image
              src="/founder/pt-hari-om-shastri.jpg"
              alt="Acharya Hariom Shastri"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
              ⚡ Limited Offer
            </span>
            <h2 className="mt-4 text-2xl font-bold text-orange-800 leading-tight">
              Ask 1 question for just ₹20
            </h2>
            <p className="mt-3 text-orange-600 text-sm leading-relaxed">
              सिर्फ ₹20 में एक सवाल पूछें और पाएं वैदिक उत्तर, मुहूर्त सलाह या साधनात्मक सुझाव।
              हमारे पंडित अनुभवी मंत्रों से तत्काल मार्गदर्शन भेजते हैं।
            </p>
            <p className="mt-2 text-orange-500 text-xs leading-relaxed">
              उदाहरण: “आज मेरा मुहर्त कैसा है?”, “इस सप्ताह नौकरी कब ठीक रहेगा?”, “स्वास्थ्य कैसे बेहतर बनाएं?”
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-wrap justify-center gap-3 text-xs text-orange-700 font-semibold">
              <span className="bg-white/80 px-3 py-1 rounded-full shadow">✅ वैदिक मुहूर्त</span>
              <span className="bg-white/80 px-3 py-1 rounded-full shadow">📿 प्रश्न विश्लेषण</span>
              <span className="bg-white/80 px-3 py-1 rounded-full shadow">💬 तुरंत उत्तर</span>
            </div>
            <button
              type="button"
              onClick={onClaimOffer}
              className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg uppercase tracking-widest transition hover:brightness-110"
            >
              ✨ Claim ₹20 Question
            </button>
            <p className="text-xs text-orange-700 text-center">आधे घंटे में जवाब • 24x7 सेवा</p>
          </div>
        </div>

        <div className="hidden md:flex items-center h-full gap-8 px-8 py-10">
          <div className="flex-shrink-0">
            <div className="relative w-72 h-72 rounded-2xl shadow-xl overflow-hidden">
              <Image
                src="/founder/pt-hari-om-shastri.jpg"
                alt="Acharya Hariom Shastri"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-orange-600">
              ⚡ Limited Offer
            </span>
            <div>
              <h2 className="text-4xl font-bold text-orange-800 leading-tight">Ask 1 question for just ₹20</h2>
              <p className="mt-3 text-orange-600 text-base leading-relaxed max-w-2xl">
                सिर्फ ₹20 में एक सवाल पूछें और पाएं वैदिक उत्तर, मुहूर्त सलाह या साधनात्मक सुझाव।
                हमारे पंडित अनुभवी मंत्रों से तत्काल मार्गदर्शन भेजते हैं।
              </p>
              <p className="mt-2 text-orange-500 text-sm leading-relaxed max-w-2xl">
                उदाहरण: “आज मेरा मुहर्त कैसा है?”, “इस सप्ताह नौकरी के लिए कब अच्छा रहेगा?” या “मां और बच्चों के स्वास्थ्य को कैसे बेहतर बनाएं?”
                छोटे सवालों के लिए तत्काल उत्तर मिलेगा, लंबी सलाहों के लिए वैदिक काउंसलिंग अपॉइंटमेंट.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-orange-700 font-semibold">
              <span className="bg-white/80 px-3 py-1 rounded-full shadow">✅ वैदिक मुहूर्त</span>
              <span className="bg-white/80 px-3 py-1 rounded-full shadow">📿 प्रश्न विश्लेषण</span>
              <span className="bg-white/80 px-3 py-1 rounded-full shadow">💬 तुरंत उत्तर</span>
            </div>
            <div className="text-orange-600 text-sm leading-relaxed max-w-2xl">
              शामिल: ज्योतिष पत्ता, चार्ट कन्फ़र्मेशन और एक लाइन उत्तर + शांति मंत्र। अति जानकारी चाहते हैं तो वैदिक काउंसलिंग बुक करें।
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onClaimOffer}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-xl text-sm md:text-base flex items-center justify-center gap-2 hover:translate-y-0.5 transition duration-200"
              >
                ✨ Claim ₹20 Question
                <span className="text-sm font-normal">→</span>
              </button>
              <span className="text-xs text-orange-700">आधे घंटे में जवाब पाएं • 24x7 सेवा</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneQuestionOfferBanner;
