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
        title: 'Shreemad Bhagwat Katha',
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
        title: 'Akhand Ramayan Path',
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
    },
    'ganesh puja': {
      en: {
        title: 'Ganesh Puja',
        subtitle: 'Lord Ganesha worship ceremony',
        description: `Ganesh Puja is dedicated to Lord Ganesha, the remover of obstacles and the lord of beginnings. This auspicious ceremony is performed to seek blessings for new ventures and success.

**What is Ganesh Puja?**
This sacred ritual involves worshipping Lord Ganesha with traditional offerings, mantras, and ceremonies to remove obstacles and ensure success in all endeavors.

**Benefits:**
• Removal of obstacles and difficulties
• Success in new ventures and projects
• Wisdom and intelligence enhancement
• Prosperity and good fortune
• Divine protection and blessings

**What to Expect:**
• Traditional Ganesh idol worship
• Recitation of Ganesh mantras and prayers
• Offering of modak and laddu
• Aarti and devotional songs
• Prasadam distribution

**Duration:** 1 hour

**Best Time:** Ganesh Chaturthi and Wednesdays are especially auspicious`,
        image: '/rituals/ganesh-puja-detail.jpg'
      }
    },
    'lakshmi puja': {
      en: {
        title: 'Lakshmi Puja',
        subtitle: 'Goddess Lakshmi worship ceremony',
        description: `Lakshmi Puja is dedicated to Goddess Lakshmi, the deity of wealth, prosperity, and abundance. This sacred ceremony invites divine blessings for financial stability and prosperity.

**What is Lakshmi Puja?**
This ritual involves worshipping Goddess Lakshmi with traditional offerings, mantras, and ceremonies to attract wealth, prosperity, and good fortune into your life.

**Benefits:**
• Financial prosperity and abundance
• Removal of poverty and debts
• Business growth and success
• Material and spiritual wealth
• Divine blessings for prosperity

**What to Expect:**
• Beautiful Lakshmi idol decoration
• Recitation of Lakshmi mantras and prayers
• Offering of lotus flowers and sweets
• Gold and silver ornament worship
• Aarti and devotional songs

**Duration:** 1-2 hours

**Best Time:** Diwali, Fridays, and Dhanteras are especially auspicious`,
        image: '/rituals/lakshmi-puja-detail.jpg'
      }
    },
    'saraswati puja': {
      en: {
        title: 'Saraswati Puja',
        subtitle: 'Goddess Saraswati worship ceremony',
        description: `Saraswati Puja is dedicated to Goddess Saraswati, the deity of knowledge, wisdom, and arts. This ceremony is performed to seek blessings for education, creativity, and intellectual growth.

**What is Saraswati Puja?**
This sacred ritual involves worshipping Goddess Saraswati with traditional offerings and ceremonies to enhance learning, wisdom, and artistic abilities.

**Benefits:**
• Enhanced learning and wisdom
• Success in education and exams
• Improvement in arts and creativity
• Mental clarity and focus
• Spiritual knowledge and enlightenment

**What to Expect:**
• Saraswati idol worship with white flowers
• Recitation of Saraswati mantras
• Offering of books, pens, and musical instruments
• Traditional prayers and hymns
• Prasadam distribution

**Duration:** 1-2 hours

**Best Time:** Vasant Panchami and before important exams`,
        image: '/rituals/saraswati-puja-detail.jpg'
      }
    },
    'mahamrityunjay jaap': {
      en: {
        title: 'Mahamrityunjay Jaap',
        subtitle: 'Powerful healing and protection mantra',
        description: `Mahamrityunjay Jaap is the recitation of one of the most powerful mantras in Hinduism, dedicated to Lord Shiva. This sacred chanting provides healing, protection, and spiritual strength.

**What is Mahamrityunjay Jaap?**
This sacred practice involves the continuous recitation of the Mahamrityunjay mantra "Om Tryambakam Yajamahe..." which is believed to have incredible healing powers and provides protection from negativity, diseases, and untimely death.

**Benefits:**
• Healing from illnesses and health issues
• Protection from accidents and dangers
• Removal of negative energies and fear
• Mental peace and emotional stability
• Spiritual strength and divine grace

**What to Expect:**
• Sacred setup with Shiva Lingam or picture
• Continuous mantra chanting by experienced priests
• Use of rudraksha beads for counting
• Offering of water, milk, and bilva leaves
• Powerful spiritual vibrations and energy

**Duration:** 1-2 hours

**Best Time:** Mondays, during illness, or when seeking protection`,
        image: '/rituals/mahamrityunjay-jaap-detail.jpg'
      }
    },
    'navgraha jaap': {
      en: {
        title: 'Navgraha Jaap',
        subtitle: 'Nine planetary deities mantra recitation',
        description: `Navgraha Jaap involves the recitation of mantras dedicated to the nine planetary deities (Navagraha) to balance planetary influences and remove astrological doshas.

**What is Navgraha Jaap?**
This comprehensive ritual includes chanting specific mantras for each of the nine planets - Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu - to harmonize their cosmic influences on your life.

**Benefits:**
• Balancing of planetary influences
• Removal of graha doshas and malefic effects
• Improvement in career and finances
• Better relationships and family harmony
• Overall life stability and success

**What to Expect:**
• Individual mantras for all nine planets
• Specific offerings for each planetary deity
• Use of appropriate gemstones and colors
• Detailed astrological assessment
• Comprehensive cosmic energy balancing

**Duration:** 2-3 hours

**Best Time:** Based on astrological consultation and planetary positions`,
        image: '/rituals/navgraha-jaap-detail.jpg'
      }
    },
    'temple abhishek': {
      en: {
        title: 'Temple Abhishek',
        subtitle: 'Sacred bathing ceremony at temple',
        description: `Temple Abhishek is a divine ritual where the deity is ceremonially bathed with sacred substances like water, milk, honey, and other auspicious materials to invoke divine blessings.

**What is Temple Abhishek?**
This ancient Vedic ritual involves the sacred bathing of the deity with various pure substances while chanting specific mantras. It is believed to purify the devotees and bring divine grace and blessings.

**Benefits:**
• Purification of mind, body, and soul
• Removal of sins and negative karma
• Divine blessings and spiritual upliftment
• Fulfillment of desires and wishes
• Peace and prosperity in life

**What to Expect:**
• Sacred bathing of the deity with milk, water, honey
• Chanting of specific mantras and hymns
• Offering of flowers, fruits, and sacred items
• Aarti and devotional prayers
• Distribution of blessed prasadam

**Duration:** 1 hour

**Best Time:** Early morning hours, auspicious days, and festivals`,
        image: '/rituals/temple-abhishek-detail.jpg'
      }
    },
    'aarti at temple': {
      en: {
        title: 'Aarti at Temple',
        subtitle: 'Temple evening prayers ceremony',
        description: `Aarti at Temple is a devotional ritual performed with lighted lamps while singing hymns of praise. This beautiful ceremony creates a divine atmosphere and connects devotees with the divine.

**What is Temple Aarti?**
This sacred ceremony involves waving lighted lamps in circular motions before the deity while singing devotional songs and hymns. It symbolizes the removal of darkness and the welcoming of divine light.

**Benefits:**
• Spiritual purification and divine connection
• Removal of negative thoughts and energies
• Peace of mind and emotional healing
• Blessings for prosperity and happiness
• Strengthening of faith and devotion

**What to Expect:**
• Traditional oil lamps and incense lighting
• Melodious devotional singing and music
• Community participation in prayers
• Beautiful temple atmosphere with divine energy
• Distribution of blessed aarti prasadam

**Duration:** 30 minutes

**Best Time:** Evening hours during sunset, especially during festivals`,
        image: '/rituals/aarti-at-temple-detail.jpg'
      }
    },
    'prasad distribution': {
      en: {
        title: 'Prasad Distribution',
        subtitle: 'Sacred food offering ceremony',
        description: `Prasad Distribution is the sacred practice of offering blessed food to the deity and then distributing it among devotees as divine grace and blessings.

**What is Prasad Distribution?**
This beautiful tradition involves preparing special food offerings for the deity, which are then blessed through prayers and mantras before being distributed to devotees as prasadam - a symbol of divine grace.

**Benefits:**
• Receiving divine blessings through sacred food
• Purification through blessed consumption
• Community bonding and spiritual sharing
• Gratitude and devotion enhancement
• Material and spiritual nourishment

**What to Expect:**
• Preparation of traditional sacred foods
• Offering ceremony before the deity
• Blessing of food with mantras and prayers
• Organized distribution to all devotees
• Sharing of divine grace and community spirit

**Duration:** 1 hour

**Best Time:** After puja ceremonies, during festivals, and auspicious occasions`,
        image: '/rituals/prasad-distribution-detail.jpg'
      }
    },
    'temple decoration': {
      en: {
        title: 'Temple Decoration',
        subtitle: 'Festive temple decoration setup',
        description: `Temple Decoration is the artistic and devotional practice of beautifying the temple and deity with flowers, lights, fabrics, and ornaments during festivals and special occasions.

**What is Temple Decoration?**
This creative spiritual practice involves adorning the temple premises and deity with beautiful decorations using fresh flowers, colorful fabrics, intricate rangoli patterns, and traditional ornaments to create a divine festive atmosphere.

**Benefits:**
• Enhanced spiritual atmosphere and divine energy
• Expression of devotion through artistic service
• Community participation and joy
• Cultural tradition preservation
• Increased devotional experience

**What to Expect:**
• Beautiful flower arrangements and garlands
• Colorful fabric draping and ornamental display
• Traditional rangoli and artistic patterns
• Lighting arrangements with diyas and decorations
• Collaborative community decoration efforts

**Duration:** 2 hours

**Best Time:** Before major festivals, special occasions, and deity celebrations`,
        image: '/rituals/temple-decoration-detail.jpg'
      }
    },
    'marriage ceremony': {
      en: {
        title: 'Marriage Ceremony',
        subtitle: 'Complete wedding rituals',
        description: `Marriage Ceremony is the sacred Hindu wedding ritual that unites two souls in the divine bond of matrimony through traditional Vedic customs and ceremonies.

**What is Marriage Ceremony?**
This comprehensive ritual includes multiple ceremonies like Ganesh Puja, Mandap decoration, Saat Phere (seven vows), Kanyadaan, and other traditional customs that sanctify the union of bride and groom.

**Benefits:**
• Divine blessings for the married couple
• Spiritual and social union sanctification
• Family harmony and prosperity
• Traditional customs preservation
• Community celebration and joy

**What to Expect:**
• Complete Vedic wedding rituals and ceremonies
• Saat Phere around sacred fire
• Kanyadaan and other traditional customs
• Mandap decoration and setup
• Family participation and blessings

**Duration:** 6-8 hours

**Best Time:** Auspicious muhurat as per Hindu calendar and astrology`,
        image: '/rituals/marriage-ceremony-detail.jpg'
      }
    },
    'naamkaran sanskar': {
      en: {
        title: 'Naamkaran Sanskar',
        subtitle: 'Baby naming ceremony',
        description: `Naamkaran Sanskar is the traditional Hindu ceremony for naming a newborn baby, performed to invoke divine blessings and establish the child's spiritual identity.

**What is Naamkaran Sanskar?**
This sacred ceremony involves choosing an auspicious name for the baby based on astrological calculations, followed by traditional rituals and prayers for the child's well-being and prosperous future.

**Benefits:**
• Divine blessings for the newborn
• Spiritual identity establishment
• Astrological harmony and good fortune
• Family unity and celebration
• Traditional values preservation

**What to Expect:**
• Astrological consultation for name selection
• Sacred fire ceremony and mantras
• Name announcement and celebration
• Blessings from elders and family
• Traditional sweets and prasadam distribution

**Duration:** 2 hours

**Best Time:** Between 12th day to 1 year after birth, preferably on auspicious days`,
        image: '/rituals/naamkaran-sanskar-detail.jpg'
      }
    },
    'mundan ceremony': {
      en: {
        title: 'Mundan Ceremony',
        subtitle: 'First haircut ritual',
        description: `Mundan Ceremony is the traditional Hindu ritual of the child's first haircut, performed to promote healthy hair growth and invoke divine blessings for the child's development.

**What is Mundan Ceremony?**
This sacred ceremony involves the ritual shaving of a child's hair, usually performed at a temple or sacred place, followed by prayers and offerings for the child's health, growth, and prosperity.

**Benefits:**
• Promotes healthy hair growth
• Removal of negative energies
• Divine protection and blessings
• Cultural tradition preservation
• Family bonding and celebration

**What to Expect:**
• Sacred hair cutting ceremony
• Temple visit and prayers
• Offering of hair to deity
• Traditional rituals and mantras
• Family celebration and blessings

**Duration:** 1-2 hours

**Best Time:** Between 1-3 years of age, preferably during auspicious periods`,
        image: '/rituals/mundan-ceremony-detail.jpg'
      }
    },
    'thread ceremony': {
      en: {
        title: 'Thread Ceremony',
        subtitle: 'Sacred thread initiation',
        description: `Thread Ceremony (Yajnopavit Sanskar) is the sacred initiation ritual where a boy receives the holy thread, marking his entry into spiritual learning and Brahmacharya ashram.

**What is Thread Ceremony?**
This ancient ceremony involves the investiture of the sacred thread (Janeu) across the boy's body, symbolizing his spiritual rebirth and commitment to learning, righteousness, and spiritual duties.

**Benefits:**
• Spiritual initiation and rebirth
• Beginning of formal spiritual education
• Divine protection and guidance
• Cultural tradition continuation
• Family pride and celebration

**What to Expect:**
• Sacred thread investiture ceremony
• Vedic mantras and fire rituals
• Guru-disciple relationship establishment
• Traditional teachings and vows
• Community celebration and blessings

**Duration:** 4 hours

**Best Time:** Between 8-16 years of age, during auspicious muhurat`,
        image: '/rituals/thread-ceremony-detail.jpg'
      }
    },
    'shradh karma': {
      en: {
        title: 'Shradh Karma',
        subtitle: 'Ancestral peace ritual',
        description: `Shradh Karma is the sacred ritual performed to honor deceased ancestors and ensure their souls' peace and spiritual progression in the afterlife.

**What is Shradh Karma?**
This important ceremony involves offering food, water, and prayers to departed ancestors, ensuring their spiritual satisfaction and seeking their blessings for family prosperity and harmony.

**Benefits:**
• Peace and satisfaction for departed souls
• Ancestral blessings for family
• Removal of Pitru Dosha
• Family harmony and prosperity
• Spiritual merit and good karma

**What to Expect:**
• Sacred food offerings to ancestors
• Brahmin feeding and donations
• Mantras for ancestral peace
• Pind Daan and water offerings
• Prayers for family welfare

**Duration:** 2-3 hours

**Best Time:** During Pitru Paksha, death anniversary, or as per astrological guidance`,
        image: '/rituals/shradh-karma-detail.jpg'
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
              <Image
                src={details.image}
                alt={details.title}
                fill
                className="object-cover"
              />
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