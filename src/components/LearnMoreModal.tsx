'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Service {
  name: string;
  category: string;
  duration: string;
  description: string;
}

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  language: 'en' | 'hi';
}

export default function LearnMoreModal({ isOpen, onClose, service, language }: LearnMoreModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !service) return null;

  // Detailed content for each service
  const serviceDetails = {
    // Katha Vachan Services
    'bhagwat katha': {
      en: {
        title: 'Bhagwat Katha',
        subtitle: 'Sacred narration of Lord Krishna stories',
        description: `The Bhagwat Katha is one of the most revered spiritual discourses in Hindu tradition. This sacred narration unfolds the divine stories of Lord Krishna, as described in the Bhagwat Purana.

**What is Bhagwat Katha?**
The Bhagwat Katha is a spiritual discourse that narrates the life and teachings of Lord Krishna. It is believed that listening to this sacred story with devotion can bring spiritual awakening and divine blessings.

**Benefits:**
• Spiritual purification and inner peace
• Removal of negative karma and obstacles
• Strengthening of devotion and faith
• Family harmony and prosperity
• Protection from evil influences

**What to Expect:**
• Traditional Vedic recitation
• Authentic storytelling by experienced Pandits
• Sacred rituals and ceremonies
• Distribution of prasadam
• Spiritual guidance and blessings

**Duration:** 7 days

**Best Time:** Can be organized throughout the year`,
        image: '/rituals/bhagwat-katha-detail.jpg'
      }
    },
    'hanumant katha': {
      en: {
        title: 'Hanumant Katha',
        subtitle: 'Divine tales of Lord Hanuman',
        description: `Hanumant Katha celebrates the divine stories and teachings of Lord Hanuman, the epitome of devotion, strength, and service.

**What is Hanumant Katha?**
This sacred discourse narrates the heroic deeds, unwavering devotion, and spiritual teachings of Lord Hanuman. It inspires courage, removes obstacles, and strengthens faith.

**Benefits:**
• Courage and strength in difficult times
• Protection from negative energies
• Success in endeavors
• Mental peace and spiritual growth
• Removal of fears and anxieties

**What to Expect:**
• Recitation of Hanuman Chalisa
• Narration of divine stories
• Traditional prayers and rituals
• Prasadam distribution
• Blessings for strength and protection

**Duration:** 3 days

**Special:** Tuesday is considered auspicious`,
        image: '/rituals/hanumant-katha-detail.jpg'
      }
    },
    'shree durga path': {
      en: {
        title: 'Shree Durga Path',
        subtitle: 'Goddess Durga divine recitation',
        description: `Shree Durga Path is a powerful recitation dedicated to Goddess Durga, the divine mother who protects her devotees from all evils and grants strength and prosperity.

**What is Durga Path?**
This sacred recitation involves chanting the 700 verses of Durga Saptashati, which narrates the divine exploits of Goddess Durga in defeating demons and protecting the righteous.

**Benefits:**
• Protection from negative forces
• Empowerment and inner strength
• Removal of obstacles and fears
• Success in endeavors
• Blessings of the Divine Mother

**What to Expect:**
• Recitation of Durga Saptashati
• Traditional mantras and hymns
• Sacred fire rituals (if applicable)
• Prasadam offering
• Divine blessings and protection

**Duration:** 1 day

**Best Time:** Navratri period is especially auspicious`,
        image: '/rituals/durga-path-detail.jpg'
      }
    },
    'ramayana path': {
      en: {
        title: 'Ramayana Path',
        subtitle: 'Epic tale of Lord Rama',
        description: `Ramayana Path is the sacred recitation of the epic tale of Lord Rama, embodying the ideals of righteousness, devotion, and dharma.

**What is Ramayana Path?**
This involves the complete or selective recitation of Valmiki Ramayana or Tulsidas Ramcharitmanas, narrating the divine story of Lord Rama's life and teachings.

**Benefits:**
• Purification of mind and heart
• Strengthening of moral values
• Family harmony and peace
• Removal of sins and negative karma
• Divine blessings and protection

**What to Expect:**
• Melodious recitation of Ramayana
• Explanation of moral teachings
• Devotional singing and prayers
• Sacred rituals and ceremonies
• Distribution of prasadam

**Duration:** 5 days

**Special:** Ram Navami period is most auspicious`,
        image: '/rituals/ramayana-path-detail.jpg'
      }
    },
    'vishnu puran katha': {
      en: {
        title: 'Vishnu Puran Katha',
        subtitle: 'Lord Vishnu sacred stories',
        description: `Vishnu Puran Katha narrates the divine stories and incarnations of Lord Vishnu, the preserver of the universe and protector of dharma.

**What is Vishnu Puran Katha?**
This sacred discourse covers the various avatars of Lord Vishnu, his divine leelas, and the spiritual teachings that guide humanity towards righteousness.

**Benefits:**
• Divine protection and blessings
• Spiritual enlightenment
• Peace and prosperity
• Removal of difficulties
• Strengthening of faith and devotion

**What to Expect:**
• Stories of Vishnu's incarnations
• Spiritual discourses and teachings
• Traditional prayers and mantras
• Sacred rituals and offerings
• Divine blessings and prasadam

**Duration:** 4 days

**Best Time:** Ekadashi and Vishnu-related festivals`,
        image: '/rituals/vishnu-puran-detail.jpg'
      }
    },

    // Home Puja Services
    'grih pravesh puja': {
      en: {
        title: 'Grih Pravesh Puja',
        subtitle: 'Sacred home entry ceremony',
        description: `Grih Pravesh Puja is an auspicious ceremony performed before entering a new home to invoke divine blessings and ensure prosperity, peace, and protection.

**What is Grih Pravesh Puja?**
This is a Vedic ritual performed to purify and sanctify a new home, removing any negative energies and inviting positive vibrations and divine blessings.

**Benefits:**
• Purification of the new home
• Protection from negative energies
• Prosperity and abundance
• Peace and harmony in family
• Divine blessings for new beginnings

**What to Expect:**
• Ganesh Puja for removing obstacles
• Vastu Puja for home sanctification
• Havan (fire ceremony) for purification
• Kalash sthapana and other rituals
• Prasadam and blessings

**Duration:** 2-3 hours

**Best Time:** Auspicious muhurat as per Hindu calendar`,
        image: '/rituals/grih-pravesh-detail.jpg'
      }
    },
    'satyanarayan puja': {
      en: {
        title: 'Satyanarayan Puja',
        subtitle: 'Divine blessings ceremony',
        description: `Satyanarayan Puja is dedicated to Lord Vishnu in his Satyanarayan form, performed to seek divine blessings for prosperity, peace, and fulfillment of wishes.

**What is Satyanarayan Puja?**
This is a popular Vedic ritual where devotees worship Lord Satyanarayan (a form of Vishnu) with devotion, seeking his blessings for happiness and prosperity.

**Benefits:**
• Fulfillment of desires and wishes
• Prosperity and abundance
• Family harmony and peace
• Protection from difficulties
• Spiritual purification

**What to Expect:**
• Detailed puja rituals
• Recitation of Satyanarayan Katha
• Traditional mantras and hymns
• Prasadam preparation and distribution
• Divine blessings

**Duration:** 1-2 hours

**Best Time:** Full moon day (Purnima) is especially auspicious`,
        image: '/rituals/satyanarayan-detail.jpg'
      }
    }
  };

  const getServiceKey = (serviceName: string) => {
    return serviceName.toLowerCase().replace(/\s+/g, ' ');
  };

  const details = serviceDetails[getServiceKey(service.name)]?.[language] || {
    title: service.name,
    subtitle: service.description,
    description: `This is a traditional Vedic ritual with deep spiritual significance. 

    **About this Service:**
    ${service.description}

    **Duration:** ${service.duration}
    **Category:** ${service.category}

    **Benefits:**
    • Spiritual blessings and divine grace
    • Peace and harmony in life
    • Fulfillment of desires
    • Protection from negative influences
    • Mental and spiritual purification

    **What to Expect:**
    • Authentic Vedic procedures
    • Experienced and qualified Pandits
    • All necessary materials provided
    • Traditional rituals and ceremonies
    • Divine blessings and prasadam`,
    image: '/rituals/default-ritual.jpg'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999999] p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
          <h2 className="text-2xl md:text-3xl font-bold">{details.title}</h2>
          <p className="text-orange-100 mt-2">{details.subtitle}</p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-[calc(90vh-120px)]">
          {/* Left Column - Image */}
          <div className="w-full md:w-80 bg-orange-50 flex items-center justify-center p-6">
            <div className="relative w-full h-64 md:h-full rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-orange-600">🕉️</div>
                  <p className="text-orange-700 font-medium">Ritual Image</p>
                  <p className="text-orange-500 text-sm mt-2">Sacred ceremony illustration</p>
                </div>
              </div>
              {/* Uncomment when images are available */}
              {/* <Image
                src={details.image}
                alt={details.title}
                fill
                className="object-cover"
              /> */}
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="prose prose-orange max-w-none">
              {details.description.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-lg font-bold text-orange-700 mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.includes('**')) {
                  // Handle inline bold text
                  const parts = paragraph.split(/(\*\*.*?\*\*)/);
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className="font-bold text-orange-700">{part.replace(/\*\*/g, '')}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  );
                }
                if (paragraph.includes('•')) {
                  const lines = paragraph.split('\n');
                  const title = lines[0];
                  const items = lines.slice(1).filter(line => line.includes('•'));
                  return (
                    <div key={index} className="mb-4">
                      {title && <h4 className="font-semibold text-orange-700 mb-3">{title}</h4>}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                        {items.map((item, i) => (
                          <div key={i} className="text-gray-700">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Close
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full font-medium">
            Book This Service
          </button>
        </div>
      </div>
    </div>
  );
}