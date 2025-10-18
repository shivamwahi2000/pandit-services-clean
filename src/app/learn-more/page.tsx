'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LearnMorePage = () => {
  const services = [
    {
      id: 'akhand-ramayan',
      title: 'Akhand Ramayan Path',
      subtitle: 'Sacred Continuous Recitation',
      description: 'Experience the divine epic of Lord Rama through unbroken recitation of the holy Ramayan. Our expert pandits conduct this sacred 24-hour path with complete devotion and traditional rituals.',
      image: '/banners/akhand-ramayan.jpg',
      features: [
        '24-Hour Continuous Path',
        'Group Recitation by Expert Pandits',
        'Complete Ritual Setup',
        'Traditional Puja Items Included',
        'Prasad Distribution',
        'Sacred Atmosphere Creation'
      ],
      quote: '"Where devotion flows like the sacred Ganga, unbroken and pure."',
      icon: '🏹',
      duration: '24 Hours',
      participants: '5-8 Pandits',
      benefits: 'Peace, Prosperity, Divine Blessings'
    },
    {
      id: 'bhagwad-geeta',
      title: 'Shreemad Bhagwadgeeta',
      subtitle: 'Complete Life Philosophy Course',
      description: 'Dive deep into the timeless wisdom of the Bhagwad Geeta with our comprehensive course. Learn the 18 chapters that contain 700 verses of life-transforming knowledge.',
      image: '/banners/bhagwad-geeta.jpg',
      features: [
        '18 Comprehensive Chapters',
        '700 Sacred Verses',
        'Life Philosophy Teachings',
        'Practical Application Guidance',
        'Interactive Discussion Sessions',
        'Study Materials Provided'
      ],
      quote: '"Yada yada hi dharmasya glanir bhavati bharata - Whenever righteousness declines..."',
      icon: '📚',
      duration: 'Flexible Schedule',
      participants: 'Individual/Group',
      benefits: 'Spiritual Growth, Life Clarity, Inner Peace',
      popular: true
    },
    {
      id: 'bhagwat-katha',
      title: 'Bhagwat Katha',
      subtitle: 'by Pt. Hariom Shastri Ji (Vrindavan)',
      description: 'Join the divine discourse of Bhagwat Katha led by the renowned Pt. Hariom Shastri Ji from Vrindavan. Experience the sacred stories that transform hearts and minds.',
      image: '/banners/bhagwat-katha.jpg',
      features: [
        'Authentic Vrindavan Tradition',
        'Expert Kathakar from Vrindavan',
        'Flexible Timing Options',
        'In-home Service Available',
        'Traditional Rituals',
        'Complete Spiritual Experience'
      ],
      quote: '"Where words become Bhakti and Bhakti becomes Blessing."',
      icon: '📅',
      duration: '3-7 Days',
      participants: 'Family/Community',
      benefits: 'Divine Blessings, Spiritual Awakening'
    },
    {
      id: 'shiv-puran',
      title: 'Shiv Maha Puran Katha',
      subtitle: 'Sacred Stories of Lord Shiva',
      description: 'Immerse yourself in the divine tales of Lord Shiva through the sacred Shiv Maha Puran. Each story resonates with the powerful vibrations of Om Namah Shivaya.',
      image: '/banners/shiv-puran.jpg',
      features: [
        'Ancient Wisdom & Stories',
        'Sacred Recitation',
        'Traditional Rituals',
        'Spiritual Blessings',
        'Complete Puja Setup',
        'Divine Atmosphere'
      ],
      quote: '"Where every tale resonates with Om Namah Shivaya."',
      icon: '🔱',
      duration: '5-7 Days',
      participants: 'Family/Community',
      benefits: 'Divine Protection, Spiritual Power'
    },
    {
      id: 'hanuman-katha',
      title: 'Hanumant Katha',
      subtitle: 'Divine Stories of Bajrang Bali',
      description: 'Experience the divine strength and courage of Lord Hanuman through sacred stories that inspire devotion and fearlessness. Each tale resonates with the power of Bajrang Bali\'s blessings.',
      image: '/banners/Hanumant-Katha.jpg',
      features: [
        'Divine Strength Stories',
        'Courage & Faith Building',
        'Traditional Recitation',
        'Spiritual Power Enhancement',
        'Complete Ritual Setup',
        'Sacred Atmosphere Creation'
      ],
      quote: '"Where devotion meets divine strength and courage."',
      icon: '⚡',
      duration: '3-5 Days',
      participants: 'Family/Community',
      benefits: 'Divine Strength, Courage, Protection'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-700 via-red-600 to-orange-800 bg-clip-text text-transparent mb-6">
            Our Sacred Services
          </h1>
          <p className="text-xl text-orange-700 mb-8 max-w-2xl mx-auto">
            Discover the divine wisdom and spiritual experiences we offer through authentic Vedic traditions and expert guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="bg-white hover:bg-orange-50 text-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                {service.icon} {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
            >
              {/* Service Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Image Section */}
              <div className="lg:w-1/2 h-64 lg:h-auto relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-orange-800 mb-2">
                  {service.title}
                </h2>
                <p className="text-lg text-orange-600 font-semibold mb-4">
                  {service.subtitle}
                </p>
                
                <blockquote className="text-orange-700 italic text-lg mb-6 border-l-4 border-orange-300 pl-4">
                  {service.quote}
                </blockquote>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-800">Duration</div>
                    <div className="text-sm text-orange-600">{service.duration}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-800">Participants</div>
                    <div className="text-sm text-orange-600">{service.participants}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-800">Benefits</div>
                    <div className="text-sm text-orange-600">{service.benefits}</div>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">What's Included:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="text-orange-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/book-ritual"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full font-bold text-center shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {service.icon} Book Now
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-400 px-8 py-3 rounded-full font-semibold text-center shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Ask Questions
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-800 mb-6">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl text-orange-700 mb-8">
            Contact us to discuss your requirements and schedule your preferred service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-ritual"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🙏 Book Your Service
            </Link>
            <Link
              href="/contact"
              className="bg-white hover:bg-orange-50 text-orange-600 border-2 border-orange-400 px-10 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              📞 Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMorePage;