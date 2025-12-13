'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen sacred-bg page-load">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
          </section>

          {/* Founder Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {t('founderHeading')}
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-accent mb-4">
                  {t('founderName')}
                </h3>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  {t('founderBio')}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{t('academicExcellence')}</h4>
                      <p className="text-text-secondary">{t('academicDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{t('lifetimeDevotion')}</h4>
                      <p className="text-text-secondary">{t('lifetimeDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{t('regionalHeritage')}</h4>
                      <p className="text-text-secondary">{t('regionalDesc')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-line rounded-lg p-6 glow-border">
                  <blockquote className="text-lg italic text-text-primary">
                    {t('founderQuote')}
                  </blockquote>
                  <cite className="block mt-4 text-primary font-semibold">
                    {t('founderQuoteAuthor')}
                  </cite>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-primary/20 overflow-hidden glow-border bg-gradient-to-br from-primary/10 to-accent/10">
                    <Image
                      src="/founder/pt-hari-om-shastri.jpg"
                      alt="Acharya Hariom Shastri - Founder of Kesari Nakshatra"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-center space-y-4">
                            <div>
                              <div class="text-8xl">🕉️</div>
                              <div class="text-primary font-semibold text-lg">Acharya Hariom Shastri</div>
                              <div class="text-text-secondary">Founder & Chief Pandit</div>
                              <div class="text-xs text-text-secondary mt-2">Add image: /public/founder/pt-hari-om-shastri.jpg</div>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl">
                    📿
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center text-white">
                    🔔
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
                {t('journeyHeading')}
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-elevations rounded-lg p-6 border border-line">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {t('childhoodProdigy')}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {t('childhoodDesc')}
                  </p>
                </div>

                <div className="bg-elevations rounded-lg p-6 border border-line">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {t('academicAchievement')}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {t('academicAchievementDesc')}
                  </p>
                </div>

                <div className="bg-elevations rounded-lg p-6 border border-line">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    {t('kesariNakshatraFoundation')}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {t('foundationDesc')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Values */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {t('missionHeading')}
                </h2>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  {t('missionText')}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary">{t('mission1')}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary">{t('mission2')}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary">{t('mission3')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {t('valuesHeading')}
                </h2>

                <div className="space-y-6">
                  <div className="bg-surface rounded-lg p-6 border border-line">
                    <h3 className="font-semibold text-primary mb-2">
                      {t('authenticity')}
                    </h3>
                    <p className="text-text-secondary">{t('authenticityDesc')}</p>
                  </div>

                  <div className="bg-surface rounded-lg p-6 border border-line">
                    <h3 className="font-semibold text-primary mb-2">
                      {t('devotion')}
                    </h3>
                    <p className="text-text-secondary">{t('devotionDesc')}</p>
                  </div>

                  <div className="bg-surface rounded-lg p-6 border border-line">
                    <h3 className="font-semibold text-primary mb-2">
                      {t('accessibility')}
                    </h3>
                    <p className="text-text-secondary">{t('accessibilityDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 border border-line">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('ctaHeading')}
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              {t('ctaText')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/book-ritual"
                className="btn-primary px-8 py-3 rounded-full text-lg font-medium inline-block"
              >
                {t('ctaBookRitual')}
              </a>

              <a
                href="/contact"
                className="border border-primary text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-colors"
              >
                {t('ctaContact')}
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
