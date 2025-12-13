'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    const currentPath = window.location.pathname;
    // Remove current locale prefix if exists
    const pathWithoutLocale = currentPath.replace(/^\/(en|hi)/, '');
    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="fixed top-24 right-6 z-50 flex items-center gap-2 bg-surface/95 backdrop-blur-sm border border-line rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-shadow">
      <span className={`text-sm font-medium transition-colors ${
        locale === 'en' ? 'text-primary' : 'text-text-secondary'
      }`}>
        EN
      </span>
      <button
        onClick={toggleLanguage}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          locale === 'hi' ? 'bg-primary' : 'bg-line'
        }`}
        aria-label="Toggle language"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
            locale === 'hi' ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${
        locale === 'hi' ? 'text-primary' : 'text-text-secondary'
      }`}>
        हिं
      </span>
    </div>
  );
}
