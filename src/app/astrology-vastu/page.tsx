'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import usePanchang from '@/hooks/usePanchang';
import LocationPicker from '@/components/LocationPicker';
import ClockTimePicker from '@/components/ClockTimePicker';
import { Location, DEFAULT_LOCATION } from '@/utils/locations';
import { ServiceSchema } from '@/components/StructuredData';
import PanchangCalendarModal from '@/components/PanchangCalendarModal';

export default function AstrologyVastuPage() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const serviceSchemaData = [
    {
      name: "Vedic Astrology Consultation",
      description: "Comprehensive kundli analysis, planetary positions, doshas, yogas, and personalized predictions for career, marriage, health, and life guidance.",
      serviceType: "Astrology Consultation",
      price: "2999"
    },
    {
      name: "Marriage Compatibility Analysis",
      description: "Detailed horoscope matching for marriage, Ashtakoot compatibility, Mangal Dosha analysis, and relationship guidance.",
      serviceType: "Astrology Consultation",
      price: "1999"
    },
    {
      name: "Career Guidance Astrology",
      description: "Career path analysis based on planetary positions, best career options, business timing, and professional success guidance.",
      serviceType: "Astrology Consultation",
      price: "2499"
    },
    {
      name: "Vastu Consultation for Home",
      description: "Complete Vastu analysis for residential properties, room placement, entrance direction, and remedies for Vastu doshas.",
      serviceType: "Vastu Consultation",
      price: "4999"
    },
    {
      name: "Vastu for Business & Office",
      description: "Professional Vastu consultation for commercial properties, office layout, cash counter placement, and business prosperity.",
      serviceType: "Vastu Consultation",
      price: "7999"
    },
    {
      name: "Online Kundli Analysis",
      description: "Detailed birth chart analysis with planetary positions, yogas, doshas, dasha predictions, and remedies through video consultation.",
      serviceType: "Online Astrology Service",
      price: "1999"
    }
  ];

  const [activeTab, setActiveTab] = useState<'astrology' | 'vastu'>('astrology');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { panchangData, refreshPanchang } = usePanchang(true); // Enable auto-fetch on this page
  
  // Kundli form state
  const [kundliForm, setKundliForm] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    ayanamsa: '1', // Lahiri Ayanamsa (default)
    language: 'en',
    result_type: 'basic'
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [kundliLoading, setKundliLoading] = useState(false);
  const [kundliResult, setKundliResult] = useState<any>(null);

  // Consultation form location state
  const [consultationLocation, setConsultationLocation] = useState<Location | null>(null);

  // Convert PyJhora data to traditional chart format
  const convertToTraditionalFormat = (kundliData: any) => {
    if (!kundliData?.data?.planets) return [];

    const planets = [];
    const planetsData = kundliData.data.planets;

    // Map PyJhora planet data to our format
    for (const [planetName, planetInfo] of Object.entries(planetsData)) {
      if (typeof planetInfo === 'object' && planetInfo !== null) {
        const info = planetInfo as any;
        planets.push({
          planet: planetName,
          house: info.house || 1,
          sign: info.sign || '',
          degree: info.longitude || 0,
          retrograde: info.retrograde || false
        });
      }
    }

    return planets;
  };

  const generateKundli = async () => {
    if (!kundliForm.name || !kundliForm.dateOfBirth || !kundliForm.timeOfBirth || !selectedLocation) {
      alert('Please fill in all required fields including place of birth');
      return;
    }

    // Check if coordinates are valid (not 0,0)
    if (selectedLocation.latitude === 0 && selectedLocation.longitude === 0) {
      alert('Selected location does not have valid coordinates. Please try a different location or select a major city nearby.');
      return;
    }

    setKundliLoading(true);
    setKundliResult(null);

    try {
      // Combine date and time in ISO 8601 format with timezone
      const datetime = `${kundliForm.dateOfBirth}T${kundliForm.timeOfBirth}:00+05:30`;
      
      // Use selected location (validation ensures it exists)
      const location = selectedLocation;
      
      const response = await fetch('/api/kundli', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: kundliForm.name,
          datetime: datetime,
          latitude: location.latitude,
          longitude: location.longitude,
          timezone: 'Asia/Kolkata'
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to generate Kundli';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('=== KUNDLI API RESPONSE ===');
      console.log('Full result:', result);
      console.log('Result.data:', result.data);
      if (result.data) {
        console.log('Available fields in result.data:');
        Object.keys(result.data).forEach(key => {
          console.log(`${key}:`, typeof result.data[key], result.data[key]);
        });
      }
      console.log('=== END API RESPONSE ===');
      setKundliResult(result);
    } catch (error) {
      console.error('Error generating Kundli:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate Kundli. Please try again.';
      alert(errorMessage);
    } finally {
      setKundliLoading(false);
    }
  };

  const astrologyServices = [
    {
      id: 'kundli-analysis',
      title: 'Kundli & Birth Chart Analysis',
      icon: '🔮',
      description: 'Complete Janam Kundli preparation with detailed planetary analysis',
      features: [
        'Complete birth chart preparation',
        'Planetary positions analysis',
        'Dasha predictions (Mahadasha, Antardasha)',
        'Yoga formations identification',
        'Remedial measures for afflictions'
      ],
      price: '₹2,100',
      duration: '60-90 minutes'
    },
    {
      id: 'marriage-compatibility',
      title: 'Marriage Compatibility',
      icon: '💕',
      description: 'Complete Gun Milan and compatibility analysis for marriage',
      features: [
        'Ashtakoot Gun Milan (36 points)',
        'Manglik Dosha analysis',
        'Nadi, Bhakoot & Gana matching',
        'Post-marriage life predictions',
        'Remedies for doshas'
      ],
      price: '₹1,500',
      duration: '45-60 minutes'
    },
    {
      id: 'career-guidance',
      title: 'Career & Business Guidance',
      icon: '💼',
      description: 'Professional path predictions and business timing guidance',
      features: [
        'Career path analysis',
        'Business timing consultation',
        'Job change predictions',
        'Partnership compatibility',
        'Success remedies'
      ],
      price: '₹1,800',
      duration: '60 minutes'
    },
    {
      id: 'annual-predictions',
      title: 'Annual Predictions (Varshphal)',
      icon: '📅',
      description: 'Complete yearly forecast with monthly breakdowns',
      features: [
        'Year-long detailed predictions',
        'Monthly highlights',
        'Auspicious periods identification',
        'Challenges and remedies',
        'Important dates and festivals'
      ],
      price: '₹2,500',
      duration: '90 minutes'
    },
    {
      id: 'remedial-solutions',
      title: 'Remedial Solutions',
      icon: '💎',
      description: 'Personalized remedies for planetary afflictions',
      features: [
        'Gemstone recommendations',
        'Mantra & Stotra prescriptions',
        'Yantra suggestions',
        'Charity & donation guidance',
        'Puja & Havan recommendations'
      ],
      price: '₹1,200',
      duration: '30-45 minutes'
    },
    {
      id: 'health-astrology',
      title: 'Health Astrology',
      icon: '🌿',
      description: 'Medical astrology insights for health and wellness',
      features: [
        'Health analysis from birth chart',
        'Disease prediction and timing',
        'Remedial measures for health',
        'Lifestyle recommendations',
        'Preventive guidance'
      ],
      price: '₹1,600',
      duration: '45-60 minutes'
    }
  ];

  const vastuServices = [
    {
      id: 'residential-vastu',
      title: 'Residential Vastu Consultation',
      icon: '🏠',
      description: 'Complete home Vastu analysis and recommendations',
      features: [
        'Existing home analysis',
        'Plot selection guidance',
        'Floor plans review',
        'Room-wise recommendations',
        'Entrance positioning advice'
      ],
      price: '₹3,000',
      duration: '2-3 hours'
    },
    {
      id: 'commercial-vastu',
      title: 'Commercial Vastu',
      icon: '🏢',
      description: 'Office, shop, and business establishment Vastu',
      features: [
        'Office layout optimization',
        'Shop placement guidance',
        'Factory & industry consultation',
        'Warehouse planning',
        'Business growth remedies'
      ],
      price: '₹4,500',
      duration: '3-4 hours'
    },
    {
      id: 'vastu-remedies',
      title: 'Vastu Dosh Nivaran',
      icon: '🔧',
      description: 'Defect correction without reconstruction',
      features: [
        'Vastu defect identification',
        'Crystal & pyramid placement',
        'Color therapy recommendations',
        'Plant & tree suggestions',
        'Water feature positioning'
      ],
      price: '₹2,000',
      duration: '90 minutes'
    },
    {
      id: 'construction-vastu',
      title: 'Construction Vastu',
      icon: '🔨',
      description: 'New construction guidance from foundation to completion',
      features: [
        'Bhumi Pujan timing',
        'Foundation laying guidance',
        'Construction phase consultation',
        'Griha Pravesh muhurat',
        'Interior design compliance'
      ],
      price: '₹5,000',
      duration: '4-5 hours'
    },
    {
      id: 'plot-selection',
      title: 'Plot & Property Selection',
      icon: '📍',
      description: 'Guidance for selecting the right property',
      features: [
        'Plot evaluation criteria',
        'Direction analysis',
        'Neighborhood assessment',
        'Future prospects evaluation',
        'Investment timing guidance'
      ],
      price: '₹2,500',
      duration: '2 hours'
    },
    {
      id: 'vastu-audit',
      title: 'Complete Vastu Audit',
      icon: '📋',
      description: 'Comprehensive property analysis with detailed report',
      features: [
        'Room-by-room analysis',
        'Detailed written report',
        'Priority-wise recommendations',
        'Cost-effective solutions',
        'Follow-up consultation'
      ],
      price: '₹6,000',
      duration: '4-6 hours'
    }
  ];

  const consultationModes = [
    {
      id: 'in-person',
      title: 'In-Person Visit',
      icon: '🏡',
      description: 'Direct consultation at your location',
      features: ['On-site analysis', 'Detailed examination', 'Immediate guidance'],
      additionalCost: '+ Travel charges'
    },
    {
      id: 'video-call',
      title: 'Video Consultation',
      icon: '📹',
      description: 'Detailed online consultation with screen sharing',
      features: ['HD video call', 'Document sharing', 'Recording available'],
      additionalCost: 'No extra charges'
    },
    {
      id: 'phone-call',
      title: 'Phone Consultation',
      icon: '📞',
      description: 'Voice consultation for quick guidance',
      features: ['Direct phone call', 'Quick solutions', 'Follow-up support'],
      additionalCost: 'No extra charges'
    },
    {
      id: 'written-report',
      title: 'Written Report',
      icon: '📄',
      description: 'Detailed PDF analysis delivered via email',
      features: ['Comprehensive report', 'Charts & diagrams', 'Remedy suggestions'],
      additionalCost: 'No extra charges'
    }
  ];

  return (
    <div className="min-h-screen sacred-bg page-load">
      <ServiceSchema services={serviceSchemaData} />
      <Header />
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-en text-primary mb-6">
                Astrology & Vastu Shastra
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-8">
                Ancient Wisdom for Modern Life - Unlock Your Destiny with Authentic Vedic Sciences
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#consultation-form"
                  className="btn-primary px-8 py-3 rounded-full text-lg font-medium inline-block"
                >
                  Book Consultation
                </a>
                
                <a
                  href="https://wa.me/919340337323?text=Hello, I would like to know about astrology and vastu services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-primary text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  WhatsApp Now
                </a>
              </div>
            </div>
          </section>

          {/* Service Tabs */}
          <section className="mb-16">
            <div className="flex justify-center mb-8">
              <div className="bg-surface rounded-full p-2 border border-line">
                <button
                  onClick={() => setActiveTab('astrology')}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'astrology'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-text-primary hover:bg-elevations'
                  }`}
                >
                  🔮 Astrology Services
                </button>
                <button
                  onClick={() => setActiveTab('vastu')}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'vastu'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-text-primary hover:bg-elevations'
                  }`}
                >
                  🏠 Vastu Shastra
                </button>
              </div>
            </div>

            {/* Astrology Services */}
            {activeTab === 'astrology' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                    Vedic Astrology Services
                  </h2>
                  <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    Discover your life's purpose through ancient Vedic astrology. Get personalized insights 
                    into your past, present, and future with authentic astrological consultations.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {astrologyServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-surface rounded-2xl p-6 border border-line hover:glow-border transition-all cursor-pointer group"
                      onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3">{service.icon}</div>
                        <h3 className="text-xl font-bold heading-en text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                          {service.description}
                        </p>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{service.price}</span>
                          <span className="text-sm text-text-secondary">{service.duration}</span>
                        </div>
                      </div>

                      {selectedService === service.id && (
                        <div className="border-t border-line pt-4 space-y-2">
                          <h4 className="font-semibold text-text-primary mb-2">What's Included:</h4>
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-text-secondary">{feature}</span>
                            </div>
                          ))}
                          
                          <div className="pt-4 space-y-2">
                            <a
                              href="#consultation-form"
                              className="block w-full btn-primary py-2 px-4 rounded-lg text-center text-sm font-medium"
                            >
                              Book This Service
                            </a>
                            <a
                              href={`https://wa.me/919340337323?text=Hello, I would like to book ${service.title} consultation.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-success hover:bg-success/90 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors"
                            >
                              WhatsApp to Book
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vastu Services */}
            {activeTab === 'vastu' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                    Vastu Shastra Services
                  </h2>
                  <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    Create harmony between your living space and natural energies. Get expert Vastu guidance 
                    for homes, offices, and commercial properties.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vastuServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-surface rounded-2xl p-6 border border-line hover:glow-border transition-all cursor-pointer group"
                      onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3">{service.icon}</div>
                        <h3 className="text-xl font-bold heading-en text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                          {service.description}
                        </p>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{service.price}</span>
                          <span className="text-sm text-text-secondary">{service.duration}</span>
                        </div>
                      </div>

                      {selectedService === service.id && (
                        <div className="border-t border-line pt-4 space-y-2">
                          <h4 className="font-semibold text-text-primary mb-2">What's Included:</h4>
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-text-secondary">{feature}</span>
                            </div>
                          ))}
                          
                          <div className="pt-4 space-y-2">
                            <a
                              href="#consultation-form"
                              className="block w-full btn-primary py-2 px-4 rounded-lg text-center text-sm font-medium"
                            >
                              Book This Service
                            </a>
                            <a
                              href={`https://wa.me/919340337323?text=Hello, I would like to book ${service.title} consultation.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-success hover:bg-success/90 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors"
                            >
                              WhatsApp to Book
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Consultation Modes */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                Consultation Options
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Choose the consultation format that works best for you. All options provide 
                the same quality of authentic guidance from Acharya Hari Om Shastri.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultationModes.map((mode) => (
                <div key={mode.id} className="bg-elevations rounded-xl p-6 border border-line text-center">
                  <div className="text-3xl mb-4">{mode.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">{mode.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">{mode.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {mode.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2">
                        <svg className="w-3 h-3 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm font-medium text-primary">{mode.additionalCost}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-line">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                  Why Choose Kesari Nakshatra?
                </h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                  Experience authentic Vedic wisdom with modern convenience and personalized guidance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    📜
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Authentic Vedic Methods</h3>
                  <p className="text-text-secondary text-sm">Traditional calculations and interpretations following ancient scriptures</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🎓
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Expert Guidance</h3>
                  <p className="text-text-secondary text-sm">Acharya Hari Om Shastri's 25+ years of experience in Vedic sciences</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    💯
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Accurate Predictions</h3>
                  <p className="text-text-secondary text-sm">Precise calculations using traditional methods and modern tools</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-deep-accent rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🤝
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Ongoing Support</h3>
                  <p className="text-text-secondary text-sm">Follow-up guidance and clarifications for all consultations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Content */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                Daily Spiritual Guidance
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Access daily panchang, auspicious timings, and practical Vastu tips for everyday life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Today's Panchang - Expanded */}
              <div className="bg-surface rounded-2xl p-6 border border-line">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-2xl font-bold heading-en text-primary mb-2">Today's Panchang</h3>
                  <p className="text-text-secondary text-sm">Real-time Vedic Calendar</p>
                  <p className="text-text-secondary text-xs mt-1">{panchangData.date}</p>
                  {panchangData.isLoading && (
                    <div className="inline-flex items-center mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      <span className="text-xs text-text-secondary">Updating...</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-elevations rounded-lg p-3">
                      <span className="text-text-secondary text-sm block">Tithi</span>
                      <span className="text-text-primary font-semibold">{panchangData.tithi}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-3">
                      <span className="text-text-secondary text-sm block">Nakshatra</span>
                      <span className="text-text-primary font-semibold">{panchangData.nakshatra}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-3">
                      <span className="text-text-secondary text-sm block">Yoga</span>
                      <span className="text-text-primary font-semibold">{panchangData.yoga}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-3">
                      <span className="text-text-secondary text-sm block">Karana</span>
                      <span className="text-text-primary font-semibold">{panchangData.karana}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-line pt-4 space-y-3">
                    <div className="bg-success/10 rounded-lg p-3 border border-success/30">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary text-sm">Day</span>
                        <span className="text-success font-semibold">{panchangData.day}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-elevations rounded-lg p-3">
                        <span className="text-text-secondary text-xs block">Sunrise</span>
                        <span className="text-text-primary font-medium text-sm">{panchangData.sunrise}</span>
                      </div>
                      <div className="bg-elevations rounded-lg p-3">
                        <span className="text-text-secondary text-xs block">Sunset</span>
                        <span className="text-text-primary font-medium text-sm">{panchangData.sunset}</span>
                      </div>
                      <div className="bg-elevations rounded-lg p-3">
                        <span className="text-text-secondary text-xs block">Moonrise</span>
                        <span className="text-text-primary font-medium text-sm">{panchangData.moonrise}</span>
                      </div>
                      <div className="bg-elevations rounded-lg p-3">
                        <span className="text-text-secondary text-xs block">Moonset</span>
                        <span className="text-text-primary font-medium text-sm">{panchangData.moonset}</span>
                      </div>
                    </div>
                    
                    <div className="bg-accent/10 rounded-lg p-3 border border-accent/30">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary text-xs">Nakshatra Lord</span>
                        <span className="text-accent font-medium text-xs">{panchangData.nakshatraLord}</span>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary text-xs">Paksha</span>
                        <span className="text-primary font-medium text-xs">{panchangData.paksha}</span>
                      </div>
                    </div>

                    {panchangData.error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-xs text-center">{panchangData.error}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* End Times */}
                <div className="border-t border-line pt-4 space-y-2">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">End Times</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-elevations rounded-lg p-2">
                      <span className="text-text-secondary text-xs block">Tithi Ends</span>
                      <span className="text-text-primary font-medium text-xs">{panchangData.tithiEnd}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-2">
                      <span className="text-text-secondary text-xs block">Nakshatra Ends</span>
                      <span className="text-text-primary font-medium text-xs">{panchangData.nakshatraEnd}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-2">
                      <span className="text-text-secondary text-xs block">Yoga Ends</span>
                      <span className="text-text-primary font-medium text-xs">{panchangData.yogaEnd}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-2">
                      <span className="text-text-secondary text-xs block">Karana Ends</span>
                      <span className="text-text-primary font-medium text-xs">{panchangData.karanaEnd}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={refreshPanchang}
                    className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                    disabled={panchangData.isLoading}
                  >
                    {panchangData.isLoading ? 'Calculating...' : 'Refresh Data'}
                  </button>
                  <button
                    onClick={() => setIsCalendarModalOpen(true)}
                    className="flex-1 btn-primary py-3 px-4 rounded-lg text-sm font-medium"
                  >
                    View Detailed Panchang
                  </button>
                </div>
                
                <p className="text-xs text-text-secondary text-center mt-2">
                  🔮 Powered by PyJHora • {panchangData.error ? 'Connection Error' : 'Live Data'}
                </p>
              </div>

              {/* Quick Kundli Generator */}
              <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl p-6 border border-red-200 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">🔮</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Quick Kundli Generator</h3>
                  <p className="text-deep-accent text-sm font-medium">Generate accurate birth chart instantly with PyJHora</p>
                </div>
                
                {!kundliResult ? (
                  <>
                    <div className="space-y-4">
                      {/* Name Input */}
                      <div className="relative">
                        <label className="block text-primary text-sm font-medium mb-2">
                          👤 Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={kundliForm.name}
                          onChange={(e) => setKundliForm({...kundliForm, name: e.target.value})}
                          className="w-full px-4 py-3 bg-white border-2 border-red-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                          required
                        />
                      </div>

                      {/* Date and Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <label className="block text-primary text-sm font-medium mb-2">
                            📅 Date of Birth *
                          </label>
                          <input
                            type="date"
                            value={kundliForm.dateOfBirth}
                            onChange={(e) => setKundliForm({...kundliForm, dateOfBirth: e.target.value})}
                            className="w-full px-4 py-3 bg-white border-2 border-red-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                            required
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-primary text-sm font-medium mb-2">
                            🕐 Time of Birth *
                          </label>
                          <ClockTimePicker
                            value={kundliForm.timeOfBirth}
                            onChange={(time) => setKundliForm({...kundliForm, timeOfBirth: time})}
                          />
                        </div>
                      </div>
                      {/* Location */}
                      <div className="relative">
                        <label className="block text-primary text-sm font-medium mb-2">
                          📍 Place of Birth *
                        </label>
                        <LocationPicker
                          value={kundliForm.placeOfBirth}
                          onChange={(location) => {
                            setSelectedLocation(location);
                            setKundliForm({...kundliForm, placeOfBirth: location ? `${location.name}, ${location.state}` : ''});
                          }}
                          placeholder="Enter PIN code or district name"
                          className="w-full px-4 py-3 bg-white border-2 border-red-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                      
                      {/* Advanced Options */}
                      <details className="group">
                        <summary className="cursor-pointer text-xs text-text-secondary hover:text-primary transition-colors">
                          ⚙️ Advanced Options
                        </summary>
                        <div className="mt-2 space-y-2 pl-4 border-l-2 border-line">
                          <select
                            value={kundliForm.ayanamsa}
                            onChange={(e) => setKundliForm({...kundliForm, ayanamsa: e.target.value})}
                            className="w-full px-2 py-1 border border-line rounded text-xs bg-background focus:ring-1 focus:ring-primary"
                          >
                            <option value="1">Lahiri Ayanamsa</option>
                            <option value="3">KP Ayanamsa</option>
                            <option value="5">Yukteshwar Ayanamsa</option>
                          </select>
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={kundliForm.language}
                              onChange={(e) => setKundliForm({...kundliForm, language: e.target.value})}
                              className="w-full px-2 py-1 border border-line rounded text-xs bg-background focus:ring-1 focus:ring-primary"
                            >
                              <option value="en">English</option>
                              <option value="hi">हिंदी</option>
                            </select>
                            <select
                              value={kundliForm.result_type}
                              onChange={(e) => setKundliForm({...kundliForm, result_type: e.target.value})}
                              className="w-full px-2 py-1 border border-line rounded text-xs bg-background focus:ring-1 focus:ring-primary"
                            >
                              <option value="basic">Basic (Yoga Counts Only)</option>
                              <option value="advanced">Advanced (Detailed Yoga Names)</option>
                            </select>
                          </div>
                        </div>
                      </details>
                    </div>
                    
                    <button 
                      onClick={generateKundli}
                      disabled={kundliLoading}
                      className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-deep-accent text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {kundliLoading ? (
                        <span className="flex items-center justify-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span className="text-lg">Calculating Cosmic Positions...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2 text-lg">
                          <span>✨</span>
                          <span>Generate My Kundli</span>
                          <span>🔮</span>
                        </span>
                      )}
                    </button>
                    
                    <div className="mt-2 space-y-1">
                      {selectedLocation && (
                        <p className="text-xs text-success text-center">
                          📍 {selectedLocation.name}, {selectedLocation.state}
                        </p>
                      )}
                      <p className="text-xs text-text-secondary text-center">
                        *For detailed analysis, book a consultation
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center border-b border-line pb-3">
                      <h4 className="font-semibold text-primary">{kundliResult.name || 'Kundli Generated'}</h4>
                      <p className="text-xs text-text-secondary">Basic Birth Chart Summary</p>
                    </div>
                    
                    {/* Kundli Summary Display */}
                    <div className="space-y-3">
                      {/* Birth Information */}
                      <div className="bg-elevations rounded-lg p-3">
                        <h5 className="text-sm font-medium text-text-primary mb-2 text-center">Birth Information</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center">
                            <span className="text-text-secondary block">Name</span>
                            <span className="text-primary font-medium">{kundliResult.name || kundliForm.name}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-text-secondary block">Date of Birth</span>
                            <span className="text-text-primary font-medium">{kundliForm.dateOfBirth}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-text-secondary block">Time</span>
                            <span className="text-text-primary font-medium">{kundliForm.timeOfBirth}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-text-secondary block">Place</span>
                            <span className="text-text-primary font-medium">{selectedLocation?.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Extract and display actual astrological data using PyJHora structure */}
                      {(() => {
                        const data = kundliResult.data;
                        
                        // Extract data using PyJHora API structure
                        const extractAstroData = () => {
                          const astroData = {
                            nakshatra: null,
                            nakshatraLord: null,
                            moonSign: null,
                            sunSign: null,
                            zodiacSign: null,
                            mangalDosha: null,
                            yogaCount: 0,
                            hasComplexData: false,
                            availableFields: [] as string[]
                          };
                          
                          if (!data) return astroData;
                          
                          astroData.availableFields = Object.keys(data);
                          astroData.hasComplexData = astroData.availableFields.length > 0;
                          
                          // Extract from PyJHora nakshatra_details
                          if (data.nakshatra_details) {
                            astroData.nakshatra = data.nakshatra_details.birth_nakshatra;
                            astroData.moonSign = data.nakshatra_details.moon_sign;
                            astroData.sunSign = data.nakshatra_details.sun_sign;
                          }
                          
                          // Extract from planets data
                          if (data.planets) {
                            if (data.planets.Moon) {
                              astroData.moonSign = data.planets.Moon.sign;
                            }
                            if (data.planets.Sun) {
                              astroData.sunSign = data.planets.Sun.sign;
                            }
                          }
                          
                          // Count yogas from PyJHora
                          if (data.yogas && Array.isArray(data.yogas)) {
                            astroData.yogaCount = data.yogas.length;
                          }
                          
                          // Count special combinations
                          if (data.special_combinations && Array.isArray(data.special_combinations)) {
                            astroData.yogaCount += data.special_combinations.length;
                          }
                          
                          // Get yoga summary if available
                          if (data.yoga_summary) {
                            astroData.yogaCount = data.yoga_summary.total_yogas || astroData.yogaCount;
                          }
                          
                          return astroData;
                        };
                        
                        const astroData = extractAstroData();
                        
                        return (
                          <>
                            {/* Key Astrological Details */}
                            <div className="bg-elevations rounded-lg p-3">
                              <h5 className="text-sm font-medium text-text-primary mb-3 text-center">🌟 Your Birth Chart Highlights</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-text-secondary text-xs">Birth Star</span>
                                  <span className="text-primary font-semibold text-sm">
                                    {astroData.nakshatra || 'Loading...'}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-text-secondary text-xs">Moon Sign</span>
                                  <span className="text-accent font-semibold text-sm">
                                    {astroData.moonSign || 'Loading...'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            
                            {/* Yoga Analysis - Show actual PyJHora yoga names */}
                            {(() => {
                              const yogas = data?.yogas || [];
                              const specialCombinations = data?.special_combinations || [];
                              const allYogas = [...yogas, ...specialCombinations];
                              
                              if (allYogas.length > 0) {
                                const beneficYogas = allYogas.filter(yoga => yoga.benefic !== false);
                                const challengingYogas = allYogas.filter(yoga => yoga.benefic === false);
                                
                                return (
                                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3">
                                    <div className="flex justify-between items-center mb-2">
                                      <h5 className="text-sm font-medium text-purple-800">🧘 Yoga Analysis</h5>
                                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                        {allYogas.length} Yogas Found
                                      </span>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      {beneficYogas.length > 0 && (
                                        <div>
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-purple-700 text-xs">Positive Yogas</span>
                                            <span className="text-green-700 font-semibold text-sm bg-green-100 px-2 py-1 rounded">
                                              {beneficYogas.length}
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            {beneficYogas.slice(0, 2).map((yoga, index) => (
                                              <div key={index} className="bg-green-50 rounded p-2">
                                                <p className="text-xs font-medium text-green-800">{yoga.name}</p>
                                                <p className="text-xs text-green-600">{yoga.description}</p>
                                                {yoga.planets_involved && (
                                                  <p className="text-xs text-green-500 mt-1">
                                                    Planets: {yoga.planets_involved.join(', ')}
                                                  </p>
                                                )}
                                              </div>
                                            ))}
                                            {beneficYogas.length > 2 && (
                                              <p className="text-xs text-green-700 text-center">
                                                +{beneficYogas.length - 2} more positive combinations
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      
                                      {challengingYogas.length > 0 && (
                                        <div>
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-purple-700 text-xs">Areas to Focus</span>
                                            <span className="text-orange-700 font-semibold text-sm bg-orange-100 px-2 py-1 rounded">
                                              {challengingYogas.length}
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            {challengingYogas.slice(0, 1).map((yoga, index) => (
                                              <div key={index} className="bg-orange-50 rounded p-2">
                                                <p className="text-xs font-medium text-orange-800">{yoga.name}</p>
                                                <p className="text-xs text-orange-600">{yoga.description}</p>
                                                {yoga.planets_involved && (
                                                  <p className="text-xs text-orange-500 mt-1">
                                                    Planets: {yoga.planets_involved.join(', ')}
                                                  </p>
                                                )}
                                              </div>
                                            ))}
                                            {challengingYogas.length > 1 && (
                                              <p className="text-xs text-orange-700 text-center">
                                                +{challengingYogas.length - 1} more to review
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                      
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-sm font-medium text-purple-800">🧘 Yoga Analysis</h5>
                                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                      Calculating...
                                    </span>
                                  </div>
                                  <div className="bg-white rounded p-2">
                                    <p className="text-xs text-purple-700 text-center">
                                      <span className="font-medium">🔮 PyJHora calculating your yogas</span>
                                      <br />
                                      <span className="text-purple-600">Detailed combinations will appear here</span>
                                    </p>
                                  </div>
                                </div>
                              );
                            })()}
                          </>
                        );
                      })()}
                      

                      {/* Call to Action */}
                      <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-3 border border-primary/30 text-center">
                        <p className="text-primary font-medium text-sm mb-1">🔮 View Complete Analysis</p>
                        <p className="text-text-secondary text-xs mb-2">
                          See detailed birth chart with planetary positions, yoga analysis, and comprehensive predictions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => {
                          setKundliResult(null); 
                          setKundliForm({
                            name: '', 
                            dateOfBirth: '', 
                            timeOfBirth: '', 
                            placeOfBirth: '',
                            ayanamsa: '1',
                            language: 'en',
                            result_type: 'basic'
                          });
                          setSelectedLocation(null);
                        }}
                        className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                      >
                        Generate New
                      </button>
                      <button 
                        onClick={() => {
                          // Store kundli data in localStorage for the detailed page
                          // Save kundli data to localStorage and navigate to analysis page
                          localStorage.setItem('kundliData', JSON.stringify({
                            result: kundliResult,
                            form: kundliForm,
                            location: selectedLocation
                          }));
                          window.location.href = '/kundli-analysis';
                        }}
                        className="flex-1 btn-primary py-2 px-3 rounded-lg text-xs font-medium"
                      >
                        View Full Analysis →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Consultation Booking Form */}
          <section id="consultation-form" className="mb-16">
            <div className="bg-surface rounded-2xl p-8 border border-line glow-border">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                  Book Your Consultation
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Get personalized guidance from Acharya Hari Om Shastri. Fill out the form below 
                  and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder="+91 93403 37323"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Service Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    >
                      <option value="">Select Service</option>
                      <optgroup label="Astrology Services">
                        <option value="kundli-analysis">Kundli & Birth Chart Analysis</option>
                        <option value="marriage-compatibility">Marriage Compatibility</option>
                        <option value="career-guidance">Career & Business Guidance</option>
                        <option value="annual-predictions">Annual Predictions</option>
                        <option value="remedial-solutions">Remedial Solutions</option>
                        <option value="health-astrology">Health Astrology</option>
                      </optgroup>
                      <optgroup label="Vastu Services">
                        <option value="residential-vastu">Residential Vastu</option>
                        <option value="commercial-vastu">Commercial Vastu</option>
                        <option value="vastu-remedies">Vastu Dosh Nivaran</option>
                        <option value="construction-vastu">Construction Vastu</option>
                        <option value="plot-selection">Plot Selection</option>
                        <option value="vastu-audit">Complete Vastu Audit</option>
                      </optgroup>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Consultation Mode *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    >
                      <option value="">Select Mode</option>
                      <option value="in-person">In-Person Visit</option>
                      <option value="video-call">Video Consultation</option>
                      <option value="phone-call">Phone Consultation</option>
                      <option value="written-report">Written Report</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Time of Birth
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Place of Birth
                    </label>
                    <LocationPicker
                      value={consultationLocation ? `${consultationLocation.name}, ${consultationLocation.state}` : ''}
                      onChange={setConsultationLocation}
                      placeholder="Enter PIN code or district name"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Specific Questions or Requirements
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background resize-vertical"
                    placeholder="Please describe your specific questions, concerns, or requirements for the consultation..."
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn-primary py-3 px-8 rounded-lg font-medium text-lg"
                  >
                    Book Consultation
                  </button>
                </div>

                <p className="text-sm text-text-secondary text-center">
                  💫 All consultations are conducted with complete confidentiality and respect for your privacy.
                </p>
              </form>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold heading-en text-primary mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Read how our authentic Vedic guidance has transformed lives and brought positive changes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-elevations rounded-xl p-6 border border-line">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    RS
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-text-primary">Rajesh S.</h4>
                    <p className="text-text-secondary text-sm">Business Owner, Mumbai</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  "Pandit ji's Vastu consultation completely transformed my office space. Within 3 months 
                  of implementing the changes, my business revenue increased by 40%. The energy in the 
                  office is so much more positive now."
                </p>
                <div className="flex text-accent">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              <div className="bg-elevations rounded-xl p-6 border border-line">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    PM
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-text-primary">Priya M.</h4>
                    <p className="text-text-secondary text-sm">Software Engineer, Bangalore</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  "The marriage compatibility analysis was incredibly accurate. Pandit ji not only 
                  confirmed our compatibility but also suggested remedies that strengthened our 
                  relationship. We're happily married now!"
                </p>
                <div className="flex text-accent">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              <div className="bg-elevations rounded-xl p-6 border border-line">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    AK
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-text-primary">Amit K.</h4>
                    <p className="text-text-secondary text-sm">Doctor, Delhi</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  "The career guidance consultation was a game-changer. Pandit ji predicted the exact 
                  timing for my promotion and suggested remedies. Everything happened exactly as 
                  predicted. Truly amazing!"
                </p>
                <div className="flex text-accent">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* Panchang Calendar Modal */}
      <PanchangCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </div>
  );
}