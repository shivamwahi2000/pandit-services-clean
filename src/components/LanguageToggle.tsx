'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed top-24 right-6 z-50 flex items-center gap-2 bg-surface/95 backdrop-blur-sm border border-line rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-shadow">
      <span className={`text-sm font-medium transition-colors ${
        language === 'en' ? 'text-primary' : 'text-text-secondary'
      }`}>
        EN
      </span>
      <button
        onClick={toggleLanguage}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          language === 'hi' ? 'bg-primary' : 'bg-line'
        }`}
        aria-label="Toggle language"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
            language === 'hi' ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${
        language === 'hi' ? 'text-primary' : 'text-text-secondary'
      }`}>
        हिं
      </span>
    </div>
  );
}
