'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocale, useTranslations } from 'next-intl';
import usePanchang from '@/hooks/usePanchang';
import LocationPicker from '@/components/LocationPicker';
import ClockTimePicker from '@/components/ClockTimePicker';
import { Location, DEFAULT_LOCATION } from '@/utils/locations';
import { ServiceSchema } from '@/components/StructuredData';
import PanchangCalendarModal from '@/components/PanchangCalendarModal';

export default function AstrologyVastuPage() {
  const locale = useLocale();
  const t = useTranslations('astrologyVastu');
  const tCommon = useTranslations('common');

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
  const { panchangData, refreshPanchang } = usePanchang(true);

  // Kundli form state
  const [kundliForm, setKundliForm] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    ayanamsa: '1',
    language: 'en',
    result_type: 'basic'
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [kundliLoading, setKundliLoading] = useState(false);
  const [kundliResult, setKundliResult] = useState<any>(null);

  // Consultation form location state
  const [consultationLocation, setConsultationLocation] = useState<Location | null>(null);
  const [consultationPlaceOfBirth, setConsultationPlaceOfBirth] = useState('');

  // Consultation form state
  const [consultationForm, setConsultationForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    consultationMode: '',
    dateOfBirth: '',
    timeOfBirth: '',
    preferredDateTime: '',
    requirements: ''
  });

  // Handle consultation form submission
  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message
    let message = `🙏 Namaste Pandit Ji,\n\nI would like to book a consultation.\n\n`;
    message += `*Personal Details:*\n`;
    message += `Name: ${consultationForm.fullName}\n`;
    message += `Phone: ${consultationForm.phone}\n`;
    message += `Email: ${consultationForm.email}\n\n`;

    message += `*Service Details:*\n`;
    message += `Service: ${consultationForm.serviceType}\n`;
    message += `Mode: ${consultationForm.consultationMode}\n\n`;

    if (consultationForm.dateOfBirth || consultationForm.timeOfBirth || consultationLocation) {
      message += `*Birth Details:*\n`;
      if (consultationForm.dateOfBirth) message += `Date of Birth: ${consultationForm.dateOfBirth}\n`;
      if (consultationForm.timeOfBirth) message += `Time of Birth: ${consultationForm.timeOfBirth}\n`;
      if (consultationLocation) message += `Place of Birth: ${consultationLocation.name}, ${consultationLocation.state}\n`;
      message += `\n`;
    }

    if (consultationForm.preferredDateTime) {
      message += `*Preferred Date & Time:*\n${new Date(consultationForm.preferredDateTime).toLocaleString('en-IN')}\n\n`;
    }

    if (consultationForm.requirements) {
      message += `*Requirements:*\n${consultationForm.requirements}\n\n`;
    }

    message += `Looking forward to your guidance.\n\nDhanyavaad 🙏`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919340337323?text=${encodedMessage}`, '_blank');
  };

  const convertToTraditionalFormat = (kundliData: any) => {
    if (!kundliData?.data?.planets) return [];

    const planets = [];
    const planetsData = kundliData.data.planets;

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

    if (selectedLocation.latitude === 0 && selectedLocation.longitude === 0) {
      alert('Selected location does not have valid coordinates. Please try a different location or select a major city nearby.');
      return;
    }

    setKundliLoading(true);
    setKundliResult(null);

    try {
      const datetime = `${kundliForm.dateOfBirth}T${kundliForm.timeOfBirth}:00+05:30`;
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

  // Define astrology services array using translations
  const astrologyServices = [
    {
      id: 'kundli-analysis',
      icon: '🔮',
      titleKey: 'astrologyServices.services.kundliAnalysis.title',
      descriptionKey: 'astrologyServices.services.kundliAnalysis.description',
      priceKey: 'astrologyServices.services.kundliAnalysis.price',
      durationKey: 'astrologyServices.services.kundliAnalysis.duration',
      featuresKey: 'astrologyServices.services.kundliAnalysis.features'
    },
    {
      id: 'marriage-compatibility',
      icon: '💕',
      titleKey: 'astrologyServices.services.marriageCompatibility.title',
      descriptionKey: 'astrologyServices.services.marriageCompatibility.description',
      priceKey: 'astrologyServices.services.marriageCompatibility.price',
      durationKey: 'astrologyServices.services.marriageCompatibility.duration',
      featuresKey: 'astrologyServices.services.marriageCompatibility.features'
    },
    {
      id: 'career-guidance',
      icon: '💼',
      titleKey: 'astrologyServices.services.careerGuidance.title',
      descriptionKey: 'astrologyServices.services.careerGuidance.description',
      priceKey: 'astrologyServices.services.careerGuidance.price',
      durationKey: 'astrologyServices.services.careerGuidance.duration',
      featuresKey: 'astrologyServices.services.careerGuidance.features'
    },
    {
      id: 'annual-predictions',
      icon: '📅',
      titleKey: 'astrologyServices.services.annualPredictions.title',
      descriptionKey: 'astrologyServices.services.annualPredictions.description',
      priceKey: 'astrologyServices.services.annualPredictions.price',
      durationKey: 'astrologyServices.services.annualPredictions.duration',
      featuresKey: 'astrologyServices.services.annualPredictions.features'
    },
    {
      id: 'remedial-solutions',
      icon: '💎',
      titleKey: 'astrologyServices.services.remedialSolutions.title',
      descriptionKey: 'astrologyServices.services.remedialSolutions.description',
      priceKey: 'astrologyServices.services.remedialSolutions.price',
      durationKey: 'astrologyServices.services.remedialSolutions.duration',
      featuresKey: 'astrologyServices.services.remedialSolutions.features'
    },
    {
      id: 'health-astrology',
      icon: '🌿',
      titleKey: 'astrologyServices.services.healthAstrology.title',
      descriptionKey: 'astrologyServices.services.healthAstrology.description',
      priceKey: 'astrologyServices.services.healthAstrology.price',
      durationKey: 'astrologyServices.services.healthAstrology.duration',
      featuresKey: 'astrologyServices.services.healthAstrology.features'
    }
  ];

  const vastuServices = [
    {
      id: 'residential-vastu',
      icon: '🏠',
      titleKey: 'vastuServices.services.residential.title',
      descriptionKey: 'vastuServices.services.residential.description',
      priceKey: 'vastuServices.services.residential.price',
      durationKey: 'vastuServices.services.residential.duration',
      featuresKey: 'vastuServices.services.residential.features'
    },
    {
      id: 'commercial-vastu',
      icon: '🏢',
      titleKey: 'vastuServices.services.commercial.title',
      descriptionKey: 'vastuServices.services.commercial.description',
      priceKey: 'vastuServices.services.commercial.price',
      durationKey: 'vastuServices.services.commercial.duration',
      featuresKey: 'vastuServices.services.commercial.features'
    },
    {
      id: 'vastu-remedies',
      icon: '🔧',
      titleKey: 'vastuServices.services.remedies.title',
      descriptionKey: 'vastuServices.services.remedies.description',
      priceKey: 'vastuServices.services.remedies.price',
      durationKey: 'vastuServices.services.remedies.duration',
      featuresKey: 'vastuServices.services.remedies.features'
    },
    {
      id: 'construction-vastu',
      icon: '🔨',
      titleKey: 'vastuServices.services.construction.title',
      descriptionKey: 'vastuServices.services.construction.description',
      priceKey: 'vastuServices.services.construction.price',
      durationKey: 'vastuServices.services.construction.duration',
      featuresKey: 'vastuServices.services.construction.features'
    },
    {
      id: 'plot-selection',
      icon: '📍',
      titleKey: 'vastuServices.services.plotSelection.title',
      descriptionKey: 'vastuServices.services.plotSelection.description',
      priceKey: 'vastuServices.services.plotSelection.price',
      durationKey: 'vastuServices.services.plotSelection.duration',
      featuresKey: 'vastuServices.services.plotSelection.features'
    },
    {
      id: 'vastu-audit',
      icon: '📋',
      titleKey: 'vastuServices.services.audit.title',
      descriptionKey: 'vastuServices.services.audit.description',
      priceKey: 'vastuServices.services.audit.price',
      durationKey: 'vastuServices.services.audit.duration',
      featuresKey: 'vastuServices.services.audit.features'
    }
  ];

  const consultationModes = [
    {
      id: 'in-person',
      icon: '🏡',
      titleKey: 'consultationModes.modes.inPerson.title',
      descriptionKey: 'consultationModes.modes.inPerson.description',
      featuresKey: 'consultationModes.modes.inPerson.features',
      costKey: 'consultationModes.modes.inPerson.cost'
    },
    {
      id: 'video-call',
      icon: '📹',
      titleKey: 'consultationModes.modes.videoCall.title',
      descriptionKey: 'consultationModes.modes.videoCall.description',
      featuresKey: 'consultationModes.modes.videoCall.features',
      costKey: 'consultationModes.modes.videoCall.cost'
    },
    {
      id: 'phone-call',
      icon: '📞',
      titleKey: 'consultationModes.modes.phoneCall.title',
      descriptionKey: 'consultationModes.modes.phoneCall.description',
      featuresKey: 'consultationModes.modes.phoneCall.features',
      costKey: 'consultationModes.modes.phoneCall.cost'
    },
    {
      id: 'written-report',
      icon: '📄',
      titleKey: 'consultationModes.modes.writtenReport.title',
      descriptionKey: 'consultationModes.modes.writtenReport.description',
      featuresKey: 'consultationModes.modes.writtenReport.features',
      costKey: 'consultationModes.modes.writtenReport.cost'
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
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                {t('heroTitle')}
              </h1>
              <p className={`text-xl md:text-2xl text-text-secondary leading-relaxed mb-8 ${locale === 'hi' ? 'body-hi' : ''}`}>
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#consultation-form"
                  className={`btn-primary px-8 py-3 rounded-full text-lg font-medium inline-block ${locale === 'hi' ? 'body-hi' : ''}`}
                >
                  {tCommon('bookConsultation')}
                </a>

                <a
                  href={locale === 'hi'
                    ? "https://wa.me/919340337323?text=नमस्ते, मैं ज्योतिष और वास्तु सेवाओं के बारे में जानना चाहता हूं।"
                    : "https://wa.me/919340337323?text=Hello, I would like to know about astrology and vastu services."}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border border-primary text-primary px-8 py-3 rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-colors ${locale === 'hi' ? 'body-hi' : ''}`}
                >
                  {tCommon('whatsappUs')}
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
                  } ${locale === 'hi' ? 'body-hi' : ''}`}
                >
                  {t('tabs.astrology')}
                </button>
                <button
                  onClick={() => setActiveTab('vastu')}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'vastu'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-text-primary hover:bg-elevations'
                  } ${locale === 'hi' ? 'body-hi' : ''}`}
                >
                  {t('tabs.vastu')}
                </button>
              </div>
            </div>

            {/* Astrology Services */}
            {activeTab === 'astrology' && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                    {t('astrologyServices.title')}
                  </h2>
                  <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {t('astrologyServices.subtitle')}
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
                        <h3 className={`text-xl font-bold text-primary mb-2 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                          {t.raw(service.titleKey)}
                        </h3>
                        <p className={`text-text-secondary text-sm mb-4 ${locale === 'hi' ? 'body-hi' : ''}`}>
                          {t.raw(service.descriptionKey)}
                        </p>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{t.raw(service.priceKey)}</span>
                          <span className={`text-sm text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(service.durationKey)}</span>
                        </div>
                      </div>

                      {selectedService === service.id && (
                        <div className="border-t border-line pt-4 space-y-2">
                          <h4 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('common.whatsIncluded')}</h4>
                          {(t.raw(service.featuresKey) as string[]).map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className={`text-sm text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{feature}</span>
                            </div>
                          ))}

                          <div className="pt-4 space-y-2">
                            <a
                              href="#consultation-form"
                              className={`block w-full btn-primary py-2 px-4 rounded-lg text-center text-sm font-medium ${locale === 'hi' ? 'body-hi' : ''}`}
                            >
                              {t('common.bookThisService')}
                            </a>
                            <a
                              href={`https://wa.me/919340337323?text=${locale === 'hi' ? 'नमस्ते' : 'Hello'}, I would like to book ${t.raw(service.titleKey)} consultation.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block w-full bg-success hover:bg-success/90 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors ${locale === 'hi' ? 'body-hi' : ''}`}
                            >
                              {t('common.whatsappToBook')}
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
                  <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                    {t('vastuServices.title')}
                  </h2>
                  <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {t('vastuServices.subtitle')}
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
                        <h3 className={`text-xl font-bold text-primary mb-2 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                          {t.raw(service.titleKey)}
                        </h3>
                        <p className={`text-text-secondary text-sm mb-4 ${locale === 'hi' ? 'body-hi' : ''}`}>
                          {t.raw(service.descriptionKey)}
                        </p>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{t.raw(service.priceKey)}</span>
                          <span className={`text-sm text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(service.durationKey)}</span>
                        </div>
                      </div>

                      {selectedService === service.id && (
                        <div className="border-t border-line pt-4 space-y-2">
                          <h4 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('common.whatsIncluded')}</h4>
                          {(t.raw(service.featuresKey) as string[]).map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className={`text-sm text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{feature}</span>
                            </div>
                          ))}

                          <div className="pt-4 space-y-2">
                            <a
                              href="#consultation-form"
                              className={`block w-full btn-primary py-2 px-4 rounded-lg text-center text-sm font-medium ${locale === 'hi' ? 'body-hi' : ''}`}
                            >
                              {t('common.bookThisService')}
                            </a>
                            <a
                              href={`https://wa.me/919340337323?text=${locale === 'hi' ? 'नमस्ते' : 'Hello'}, I would like to book ${t.raw(service.titleKey)} consultation.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block w-full bg-success hover:bg-success/90 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors ${locale === 'hi' ? 'body-hi' : ''}`}
                            >
                              {t('common.whatsappToBook')}
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
              <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                {t('consultationModes.title')}
              </h2>
              <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                {t('consultationModes.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consultationModes.map((mode) => (
                <div key={mode.id} className="bg-elevations rounded-xl p-6 border border-line text-center">
                  <div className="text-3xl mb-4">{mode.icon}</div>
                  <h3 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(mode.titleKey)}</h3>
                  <p className={`text-text-secondary text-sm mb-4 ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(mode.descriptionKey)}</p>

                  <div className="space-y-2 mb-4">
                    {(t.raw(mode.featuresKey) as string[]).map((feature, index) => (
                      <div key={index} className="flex items-center justify-center space-x-2">
                        <svg className="w-3 h-3 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`text-xs text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`text-sm font-medium text-primary ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(mode.costKey)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-line">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                  {t('whyChoose.title')}
                </h2>
                <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                  {t('whyChoose.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    📜
                  </div>
                  <h3 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.authentic.title')}</h3>
                  <p className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.authentic.description')}</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🎓
                  </div>
                  <h3 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.expert.title')}</h3>
                  <p className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.expert.description')}</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    💯
                  </div>
                  <h3 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.accurate.title')}</h3>
                  <p className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.accurate.description')}</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-deep-accent rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🤝
                  </div>
                  <h3 className={`font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.support.title')}</h3>
                  <p className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t('whyChoose.reasons.support.description')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Daily Guidance - Panchang & Kundli Generator */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                {t('dailyGuidance.title')}
              </h2>
              <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                {t('dailyGuidance.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Today's Panchang */}
              <div className="bg-surface rounded-2xl p-6 border border-line">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className={`text-2xl font-bold text-primary mb-2 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>{t('dailyGuidance.panchang.title')}</h3>
                  <p className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.subtitle')}</p>
                  <p className={`text-text-secondary text-xs mt-1 ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.date}</p>
                  {panchangData.isLoading && (
                    <div className="inline-flex items-center mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      <span className={`text-xs text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.updating')}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-elevations rounded-lg p-3">
                      <span className={`text-text-secondary text-sm block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.tithi')}</span>
                      <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.tithi}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-3">
                      <span className={`text-text-secondary text-sm block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.nakshatra')}</span>
                      <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.nakshatra}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-3">
                      <span className={`text-text-secondary text-sm block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.yoga')}</span>
                      <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.yoga}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-3">
                      <span className={`text-text-secondary text-sm block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.karana')}</span>
                      <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.karana}</span>
                    </div>
                  </div>

                  <div className="border-t border-line pt-4 space-y-3">
                    <div className="bg-success/10 rounded-lg p-3 border border-success/30">
                      <div className="flex justify-between items-center">
                        <span className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.day')}</span>
                        <span className={`text-success font-semibold ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.day}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-elevations rounded-lg p-3">
                        <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.sunrise')}</span>
                        <span className={`text-text-primary font-medium text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.sunrise}</span>
                      </div>
                      <div className="bg-elevations rounded-lg p-3">
                        <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.sunset')}</span>
                        <span className={`text-text-primary font-medium text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.sunset}</span>
                      </div>
                      <div className="bg-elevations rounded-lg p-3">
                        <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.moonrise')}</span>
                        <span className={`text-text-primary font-medium text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.moonrise}</span>
                      </div>
                      <div className="bg-elevations rounded-lg p-3">
                        <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.moonset')}</span>
                        <span className={`text-text-primary font-medium text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.moonset}</span>
                      </div>
                    </div>

                    <div className="bg-accent/10 rounded-lg p-3 border border-accent/30">
                      <div className="flex justify-between items-center">
                        <span className={`text-text-secondary text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.nakshatraLord')}</span>
                        <span className={`text-accent font-medium text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.nakshatraLord}</span>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                      <div className="flex justify-between items-center">
                        <span className={`text-text-secondary text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.paksha')}</span>
                        <span className={`text-primary font-medium text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.paksha}</span>
                      </div>
                    </div>

                    {panchangData.error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className={`text-red-600 text-xs text-center ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.error}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* End Times */}
                <div className="border-t border-line pt-4 mt-4 space-y-2">
                  <h4 className={`text-sm font-semibold text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.endTimes')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-elevations rounded-lg p-2">
                      <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.tithiEnds')}</span>
                      <span className={`text-text-primary font-medium text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.tithiEnd}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-2">
                      <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.nakshatraEnds')}</span>
                      <span className={`text-text-primary font-medium text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.nakshatraEnd}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-2">
                      <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.yogaEnds')}</span>
                      <span className={`text-text-primary font-medium text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.yogaEnd}</span>
                    </div>
                    <div className="bg-elevations rounded-lg p-2">
                      <span className={`text-text-secondary text-xs block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.panchang.karanaEnds')}</span>
                      <span className={`text-text-primary font-medium text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{panchangData.karanaEnd}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={refreshPanchang}
                    className={`flex-1 border border-primary text-primary hover:bg-primary hover:text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors ${locale === 'hi' ? 'body-hi' : ''}`}
                    disabled={panchangData.isLoading}
                  >
                    {panchangData.isLoading ? t('dailyGuidance.panchang.calculating') : t('dailyGuidance.panchang.refreshData')}
                  </button>
                  <button
                    onClick={() => setIsCalendarModalOpen(true)}
                    className={`flex-1 btn-primary py-3 px-4 rounded-lg text-sm font-medium ${locale === 'hi' ? 'body-hi' : ''}`}
                  >
                    {t('dailyGuidance.panchang.viewDetailed')}
                  </button>
                </div>

                <p className={`text-xs text-text-secondary text-center mt-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                  🔮 {t('dailyGuidance.panchang.poweredBy')} • {panchangData.error ? t('dailyGuidance.panchang.connectionError') : t('dailyGuidance.panchang.liveData')}
                </p>
              </div>

              {/* Quick Kundli Generator */}
              <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl p-6 border border-red-200 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">🔮</span>
                  </div>
                  <h3 className={`text-2xl font-bold text-primary mb-2 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>{t('dailyGuidance.kundliGenerator.title')}</h3>
                  <p className={`text-deep-accent text-sm font-medium ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.subtitle')}</p>
                </div>

                {!kundliResult ? (
                  <>
                    <div className="space-y-4">
                      {/* Name Input */}
                      <div className="relative">
                        <label className={`block text-primary text-sm font-medium mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                          {t('dailyGuidance.kundliGenerator.fullName')} *
                        </label>
                        <input
                          type="text"
                          placeholder={locale === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                          value={kundliForm.name}
                          onChange={(e) => setKundliForm({...kundliForm, name: e.target.value})}
                          className={`w-full px-4 py-3 bg-white border-2 border-red-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm ${locale === 'hi' ? 'body-hi' : ''}`}
                          required
                        />
                      </div>

                      {/* Date and Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <label className={`block text-primary text-sm font-medium mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                            {t('dailyGuidance.kundliGenerator.dateOfBirth')} *
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
                          <label className={`block text-primary text-sm font-medium mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                            {t('dailyGuidance.kundliGenerator.timeOfBirth')} *
                          </label>
                          <ClockTimePicker
                            value={kundliForm.timeOfBirth}
                            onChange={(time) => setKundliForm({...kundliForm, timeOfBirth: time})}
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="relative">
                        <label className={`block text-primary text-sm font-medium mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                          {t('dailyGuidance.kundliGenerator.placeOfBirth')} *
                        </label>
                        <LocationPicker
                          value={kundliForm.placeOfBirth}
                          onChange={(location) => {
                            setSelectedLocation(location);
                            setKundliForm({...kundliForm, placeOfBirth: location ? `${location.name}, ${location.state}` : ''});
                          }}
                          placeholder={locale === 'hi' ? 'PIN कोड या जिला नाम दर्ज करें' : 'Enter PIN code or district name'}
                          className="w-full px-4 py-3 bg-white border-2 border-red-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                        />
                      </div>

                      {/* Advanced Options */}
                      <details className="group">
                        <summary className={`cursor-pointer text-xs text-text-secondary hover:text-primary transition-colors ${locale === 'hi' ? 'body-hi' : ''}`}>
                          {t('dailyGuidance.kundliGenerator.advancedOptions')}
                        </summary>
                        <div className="mt-2 space-y-2 pl-4 border-l-2 border-line">
                          <select
                            value={kundliForm.ayanamsa}
                            onChange={(e) => setKundliForm({...kundliForm, ayanamsa: e.target.value})}
                            className={`w-full px-2 py-1 border border-line rounded text-xs bg-background focus:ring-1 focus:ring-primary ${locale === 'hi' ? 'body-hi' : ''}`}
                          >
                            <option value="1">{t('dailyGuidance.kundliGenerator.lahiriAyanamsa')}</option>
                            <option value="3">{t('dailyGuidance.kundliGenerator.kpAyanamsa')}</option>
                            <option value="5">{t('dailyGuidance.kundliGenerator.yukteshwarAyanamsa')}</option>
                          </select>
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={kundliForm.language}
                              onChange={(e) => setKundliForm({...kundliForm, language: e.target.value})}
                              className={`w-full px-2 py-1 border border-line rounded text-xs bg-background focus:ring-1 focus:ring-primary ${locale === 'hi' ? 'body-hi' : ''}`}
                            >
                              <option value="en">{t('dailyGuidance.kundliGenerator.english')}</option>
                              <option value="hi">{t('dailyGuidance.kundliGenerator.hindi')}</option>
                            </select>
                            <select
                              value={kundliForm.result_type}
                              onChange={(e) => setKundliForm({...kundliForm, result_type: e.target.value})}
                              className={`w-full px-2 py-1 border border-line rounded text-xs bg-background focus:ring-1 focus:ring-primary ${locale === 'hi' ? 'body-hi' : ''}`}
                            >
                              <option value="basic">{t('dailyGuidance.kundliGenerator.basicResult')}</option>
                              <option value="advanced">{t('dailyGuidance.kundliGenerator.advancedResult')}</option>
                            </select>
                          </div>
                        </div>
                      </details>
                    </div>

                    <button
                      onClick={generateKundli}
                      disabled={kundliLoading}
                      className={`w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-deep-accent text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${locale === 'hi' ? 'body-hi' : ''}`}
                    >
                      {kundliLoading ? (
                        <span className="flex items-center justify-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span className="text-lg">{t('dailyGuidance.kundliGenerator.calculating')}</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2 text-lg">
                          <span>✨</span>
                          <span>{t('dailyGuidance.kundliGenerator.generateButton')}</span>
                          <span>🔮</span>
                        </span>
                      )}
                    </button>

                    <div className="mt-2 space-y-1">
                      {selectedLocation && (
                        <p className={`text-xs text-success text-center ${locale === 'hi' ? 'body-hi' : ''}`}>
                          📍 {selectedLocation.name}, {selectedLocation.state}
                        </p>
                      )}
                      <p className={`text-xs text-text-secondary text-center ${locale === 'hi' ? 'body-hi' : ''}`}>
                        {t('dailyGuidance.kundliGenerator.disclaimer')}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center border-b border-line pb-3">
                      <h4 className={`font-semibold text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{kundliResult.name || locale === 'hi' ? 'कुंडली तैयार' : 'Kundli Generated'}</h4>
                      <p className={`text-xs text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{locale === 'hi' ? 'मूल जन्म कुंडली सारांश' : 'Basic Birth Chart Summary'}</p>
                    </div>

                    {/* Kundli Summary Display */}
                    <div className="space-y-3">
                      {/* Birth Information */}
                      <div className="bg-elevations rounded-lg p-3">
                        <h5 className={`text-sm font-medium text-text-primary mb-2 text-center ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.birthInfo')}</h5>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center">
                            <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.name')}</span>
                            <span className={`text-primary font-medium ${locale === 'hi' ? 'body-hi' : ''}`}>{kundliResult.name || kundliForm.name}</span>
                          </div>
                          <div className="text-center">
                            <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.date')}</span>
                            <span className="text-text-primary font-medium">{kundliForm.dateOfBirth}</span>
                          </div>
                          <div className="text-center">
                            <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.time')}</span>
                            <span className="text-text-primary font-medium">{kundliForm.timeOfBirth}</span>
                          </div>
                          <div className="text-center">
                            <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.place')}</span>
                            <span className={`text-text-primary font-medium ${locale === 'hi' ? 'body-hi' : ''}`}>{selectedLocation?.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Extract and display actual astrological data */}
                      {(() => {
                        const data = kundliResult.data;

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

                          if (data.nakshatra_details) {
                            astroData.nakshatra = data.nakshatra_details.birth_nakshatra;
                            astroData.moonSign = data.nakshatra_details.moon_sign;
                            astroData.sunSign = data.nakshatra_details.sun_sign;
                          }

                          if (data.planets) {
                            if (data.planets.Moon) {
                              astroData.moonSign = data.planets.Moon.sign;
                            }
                            if (data.planets.Sun) {
                              astroData.sunSign = data.planets.Sun.sign;
                            }
                          }

                          if (data.yogas && Array.isArray(data.yogas)) {
                            astroData.yogaCount = data.yogas.length;
                          }

                          if (data.special_combinations && Array.isArray(data.special_combinations)) {
                            astroData.yogaCount += data.special_combinations.length;
                          }

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
                              <h5 className={`text-sm font-medium text-text-primary mb-3 text-center ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.birthChartHighlights')}</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className={`text-text-secondary text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.birthStar')}</span>
                                  <span className={`text-primary font-semibold text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>
                                    {astroData.nakshatra || t('dailyGuidance.kundliGenerator.loading')}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className={`text-text-secondary text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.moonSign')}</span>
                                  <span className={`text-accent font-semibold text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>
                                    {astroData.moonSign || t('dailyGuidance.kundliGenerator.loading')}
                                  </span>
                                </div>
                              </div>
                            </div>


                            {/* Yoga Analysis */}
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
                                      <h5 className={`text-sm font-medium text-purple-800 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.yogaAnalysis')}</h5>
                                      <span className={`text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full ${locale === 'hi' ? 'body-hi' : ''}`}>
                                        {allYogas.length} {t('dailyGuidance.kundliGenerator.yogasFound')}
                                      </span>
                                    </div>

                                    <div className="space-y-2">
                                      {beneficYogas.length > 0 && (
                                        <div>
                                          <div className="flex justify-between items-center mb-1">
                                            <span className={`text-purple-700 text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.positiveYogas')}</span>
                                            <span className="text-green-700 font-semibold text-sm bg-green-100 px-2 py-1 rounded">
                                              {beneficYogas.length}
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            {beneficYogas.slice(0, 2).map((yoga, index) => (
                                              <div key={index} className="bg-green-50 rounded p-2">
                                                <p className={`text-xs font-medium text-green-800 ${locale === 'hi' ? 'body-hi' : ''}`}>{yoga.name}</p>
                                                <p className={`text-xs text-green-600 ${locale === 'hi' ? 'body-hi' : ''}`}>{yoga.description}</p>
                                                {yoga.planets_involved && (
                                                  <p className={`text-xs text-green-500 mt-1 ${locale === 'hi' ? 'body-hi' : ''}`}>
                                                    {t('dailyGuidance.kundliGenerator.planets')} {yoga.planets_involved.join(', ')}
                                                  </p>
                                                )}
                                              </div>
                                            ))}
                                            {beneficYogas.length > 2 && (
                                              <p className={`text-xs text-green-700 text-center ${locale === 'hi' ? 'body-hi' : ''}`}>
                                                +{beneficYogas.length - 2} {t('dailyGuidance.kundliGenerator.morePositive')}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {challengingYogas.length > 0 && (
                                        <div>
                                          <div className="flex justify-between items-center mb-1">
                                            <span className={`text-purple-700 text-xs ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.areasToFocus')}</span>
                                            <span className="text-orange-700 font-semibold text-sm bg-orange-100 px-2 py-1 rounded">
                                              {challengingYogas.length}
                                            </span>
                                          </div>
                                          <div className="space-y-1">
                                            {challengingYogas.slice(0, 1).map((yoga, index) => (
                                              <div key={index} className="bg-orange-50 rounded p-2">
                                                <p className={`text-xs font-medium text-orange-800 ${locale === 'hi' ? 'body-hi' : ''}`}>{yoga.name}</p>
                                                <p className={`text-xs text-orange-600 ${locale === 'hi' ? 'body-hi' : ''}`}>{yoga.description}</p>
                                                {yoga.planets_involved && (
                                                  <p className={`text-xs text-orange-500 mt-1 ${locale === 'hi' ? 'body-hi' : ''}`}>
                                                    {t('dailyGuidance.kundliGenerator.planets')} {yoga.planets_involved.join(', ')}
                                                  </p>
                                                )}
                                              </div>
                                            ))}
                                            {challengingYogas.length > 1 && (
                                              <p className={`text-xs text-orange-700 text-center ${locale === 'hi' ? 'body-hi' : ''}`}>
                                                +{challengingYogas.length - 1} {t('dailyGuidance.kundliGenerator.moreToReview')}
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
                                    <h5 className={`text-sm font-medium text-purple-800 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.yogaAnalysis')}</h5>
                                    <span className={`text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full ${locale === 'hi' ? 'body-hi' : ''}`}>
                                      {t('dailyGuidance.kundliGenerator.calculating')}
                                    </span>
                                  </div>
                                  <div className="bg-white rounded p-2">
                                    <p className={`text-xs text-purple-700 text-center ${locale === 'hi' ? 'body-hi' : ''}`}>
                                      <span className="font-medium">{t('dailyGuidance.kundliGenerator.calculatingYogas')}</span>
                                      <br />
                                      <span className="text-purple-600">{t('dailyGuidance.kundliGenerator.detailsWillAppear')}</span>
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
                        <p className={`text-primary font-medium text-sm mb-1 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dailyGuidance.kundliGenerator.viewCompleteAnalysis')}</p>
                        <p className={`text-text-secondary text-xs mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                          {t('dailyGuidance.kundliGenerator.completeAnalysisDesc')}
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
                        className={`flex-1 border border-primary text-primary hover:bg-primary hover:text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors ${locale === 'hi' ? 'body-hi' : ''}`}
                      >
                        {t('dailyGuidance.kundliGenerator.generateNew')}
                      </button>
                      <button
                        onClick={() => {
                          localStorage.setItem('kundliData', JSON.stringify({
                            result: kundliResult,
                            form: kundliForm,
                            location: selectedLocation
                          }));
                          window.location.href = `/${locale}/kundli-analysis`;
                        }}
                        className={`flex-1 btn-primary py-2 px-3 rounded-lg text-xs font-medium ${locale === 'hi' ? 'body-hi' : ''}`}
                      >
                        {t('dailyGuidance.kundliGenerator.viewFullAnalysis')}
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
                <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                  {t('bookingForm.title')}
                </h2>
                <p className={`text-lg text-text-secondary max-w-2xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                  {t('bookingForm.subtitle')}
                </p>
              </div>

              <form onSubmit={handleConsultationSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.fullName')} {t('bookingForm.required')}
                    </label>
                    <input
                      type="text"
                      required
                      value={consultationForm.fullName}
                      onChange={(e) => setConsultationForm({...consultationForm, fullName: e.target.value})}
                      className={`w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background ${locale === 'hi' ? 'body-hi' : ''}`}
                      placeholder={t('bookingForm.fullNamePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.phoneNumber')} {t('bookingForm.required')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                      placeholder={t('bookingForm.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {t('bookingForm.emailAddress')} {t('bookingForm.required')}
                  </label>
                  <input
                    type="email"
                    required
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    placeholder={t('bookingForm.emailPlaceholder')}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.serviceType')} {t('bookingForm.required')}
                    </label>
                    <select
                      required
                      value={consultationForm.serviceType}
                      onChange={(e) => setConsultationForm({...consultationForm, serviceType: e.target.value})}
                      className={`w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background ${locale === 'hi' ? 'body-hi' : ''}`}
                    >
                      <option value="">{t('bookingForm.selectService')}</option>
                      <optgroup label={t('bookingForm.serviceGroups.astrology')}>
                        {astrologyServices.map((service) => (
                          <option key={service.id} value={`${t.raw(service.titleKey)} (${t.raw(service.priceKey)})`}>
                            {t.raw(service.titleKey)} ({t.raw(service.priceKey)})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label={t('bookingForm.serviceGroups.vastu')}>
                        {vastuServices.map((service) => (
                          <option key={service.id} value={`${t.raw(service.titleKey)} (${t.raw(service.priceKey)})`}>
                            {t.raw(service.titleKey)} ({t.raw(service.priceKey)})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.consultationMode')} {t('bookingForm.required')}
                    </label>
                    <select
                      required
                      value={consultationForm.consultationMode}
                      onChange={(e) => setConsultationForm({...consultationForm, consultationMode: e.target.value})}
                      className={`w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background ${locale === 'hi' ? 'body-hi' : ''}`}
                    >
                      <option value="">{t('bookingForm.selectMode')}</option>
                      {consultationModes.map((mode) => (
                        <option key={mode.id} value={t.raw(mode.titleKey)}>
                          {t.raw(mode.titleKey)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.dateOfBirth')}
                    </label>
                    <input
                      type="date"
                      value={consultationForm.dateOfBirth}
                      onChange={(e) => setConsultationForm({...consultationForm, dateOfBirth: e.target.value})}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.timeOfBirth')}
                    </label>
                    <input
                      type="time"
                      value={consultationForm.timeOfBirth}
                      onChange={(e) => setConsultationForm({...consultationForm, timeOfBirth: e.target.value})}
                      className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('bookingForm.placeOfBirth')}
                    </label>
                    <LocationPicker
                      value={consultationPlaceOfBirth}
                      onChange={(location) => {
                        setConsultationLocation(location);
                        setConsultationPlaceOfBirth(location ? `${location.name}, ${location.state}` : '');
                      }}
                      placeholder={t('bookingForm.placeholderPlace')}
                      className=""
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {t('bookingForm.preferredDateTime')}
                  </label>
                  <input
                    type="datetime-local"
                    value={consultationForm.preferredDateTime}
                    onChange={(e) => setConsultationForm({...consultationForm, preferredDateTime: e.target.value})}
                    className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium text-text-primary mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {t('bookingForm.requirements')}
                  </label>
                  <textarea
                    rows={4}
                    value={consultationForm.requirements}
                    onChange={(e) => setConsultationForm({...consultationForm, requirements: e.target.value})}
                    className={`w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background resize-vertical ${locale === 'hi' ? 'body-hi' : ''}`}
                    placeholder={t('bookingForm.requirementsPlaceholder')}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`btn-primary py-3 px-8 rounded-lg font-medium text-lg ${locale === 'hi' ? 'body-hi' : ''}`}
                  >
                    {t('bookingForm.submitButton')}
                  </button>
                </div>

                <p className={`text-sm text-text-secondary text-center ${locale === 'hi' ? 'body-hi' : ''}`}>
                  {t('bookingForm.privacyNote')}
                </p>
              </form>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${locale === 'hi' ? 'heading-hi' : 'heading-en'}`}>
                {t('successStories.title')}
              </h2>
              <p className={`text-lg text-text-secondary max-w-3xl mx-auto ${locale === 'hi' ? 'body-hi' : ''}`}>
                {t('successStories.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {['rajesh', 'priya', 'amit'].map((key) => (
                <div key={key} className="bg-elevations rounded-xl p-6 border border-line">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.raw(`successStories.stories.${key}.name`).split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <h4 className={`font-semibold text-text-primary ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(`successStories.stories.${key}.name`)}</h4>
                      <p className={`text-text-secondary text-sm ${locale === 'hi' ? 'body-hi' : ''}`}>{t.raw(`successStories.stories.${key}.location`)}</p>
                    </div>
                  </div>
                  <p className={`text-text-secondary text-sm mb-4 ${locale === 'hi' ? 'body-hi' : ''}`}>
                    {t.raw(`successStories.stories.${key}.testimonial`)}
                  </p>
                  <div className="flex text-accent">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              ))}
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
// Force rebuild
