'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen sacred-bg page-load">
      <Header />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-en text-primary mb-6">
                About Kesari Nakshatra
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Preserving Sacred Traditions Through Authentic Vedic Practices
              </p>
            </div>
          </section>

          {/* Founder Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-6">
                  Meet Our Founder
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-accent mb-4">
                  Pt. Hariom Shastri
                </h3>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  Acharya Hariom Shastri, the visionary founder of Kesari Nakshatra, brings decades of deep spiritual wisdom and Vedic knowledge to every ritual and ceremony. Based in Madhya Pradesh, the heart of India's spiritual heritage, Pandit ji has dedicated his life to preserving and sharing the sacred traditions of our ancestors.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary">Educational Excellence</h4>
                      <p className="text-text-secondary">M.A. in Sanskrit from Sampurnanand Sanskrit Vishwavidyalaya, Varanasi with the prestigious title of Acharya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary">Lifelong Devotion</h4>
                      <p className="text-text-secondary">Actively participating in Vedic Anushtans since the tender age of 10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary">Regional Heritage</h4>
                      <p className="text-text-secondary">Based in Madhya Pradesh, the spiritual heartland of India</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-line rounded-lg p-6 glow-border">
                  <blockquote className="text-lg italic text-text-primary">
                    "Every ritual is a bridge between the devotee and the divine. My mission is to ensure that this sacred connection remains pure, authentic, and accessible to all who seek spiritual fulfillment."
                  </blockquote>
                  <cite className="block mt-4 text-primary font-semibold">- Acharya Hariom Shastri</cite>
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
                        // Fallback to placeholder if image not found
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
              <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-8">
                A Journey of Spiritual Excellence
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-elevations rounded-lg p-6 border border-line">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="font-semibold text-text-primary mb-2">Childhood Prodigy</h3>
                  <p className="text-text-secondary text-sm">
                    Began participating in Vedic ceremonies at age 10, showing exceptional aptitude for Sanskrit and ritual practices
                  </p>
                </div>
                
                <div className="bg-elevations rounded-lg p-6 border border-line">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="font-semibold text-text-primary mb-2">Academic Achievement</h3>
                  <p className="text-text-secondary text-sm">
                    Earned M.A. in Sanskrit from the prestigious Sampurnanand Sanskrit Vishwavidyalaya, Varanasi and achieved the esteemed title of Acharya
                  </p>
                </div>
                
                <div className="bg-elevations rounded-lg p-6 border border-line">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h3 className="font-semibold text-text-primary mb-2">Kesari Nakshatra</h3>
                  <p className="text-text-secondary text-sm">
                    Founded this platform to make authentic Vedic rituals accessible to devotees across the nation
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Values */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  At Kesari Nakshatra, we are committed to preserving the sanctity and authenticity of Vedic traditions while making them accessible to modern devotees. Our mission is to bridge the gap between ancient wisdom and contemporary life.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary">Authentic Vedic rituals performed by qualified pandits</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary">Convenient online booking and consultation services</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary">Educational resources about Hindu traditions and festivals</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-6">
                  Our Values
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-surface rounded-lg p-6 border border-line">
                    <h3 className="font-semibold text-primary mb-2">🙏 Authenticity</h3>
                    <p className="text-text-secondary">Every ritual follows traditional Vedic scriptures and methodologies</p>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-6 border border-line">
                    <h3 className="font-semibold text-primary mb-2">📿 Devotion</h3>
                    <p className="text-text-secondary">We approach each ceremony with the utmost reverence and spiritual dedication</p>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-6 border border-line">
                    <h3 className="font-semibold text-primary mb-2">🤝 Accessibility</h3>
                    <p className="text-text-secondary">Making sacred traditions available to all devotees, regardless of location</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 border border-line">
            <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
              Begin Your Spiritual Journey
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Connect with our experienced pandits and bring the divine blessings of authentic Vedic rituals into your life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/book-ritual"
                className="btn-primary px-8 py-3 rounded-full text-lg font-medium inline-block"
              >
                Book a Ritual
              </a>
              
              <a
                href="/contact"
                className="border border-primary text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}