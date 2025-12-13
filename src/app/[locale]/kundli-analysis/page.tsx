'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TraditionalKundli from '@/components/TraditionalKundli';
import PyJhoraChart from '@/components/PyJhoraChart';
import { useLocale, useTranslations } from 'next-intl';

export default function KundliAnalysisPage() {
  const locale = useLocale();
  const t = useTranslations('kundli');
  const [kundliData, setKundliData] = useState<{
    result: {
      data: {
        planets: Record<string, {
          sign: string;
          house: number;
          longitude: number;
          degrees_in_sign: number;
        }>;
        houses: Record<string, {
          house_number: number;
          planets: string[];
          planet_count: number;
        }>;
        yogas: Array<{
          name: string;
          description: string;
          benefic: boolean;
          planets_involved: string[];
        }>;
        nakshatra_details: {
          birth_nakshatra: string;
          moon_sign: string;
          sun_sign: string;
        };
        yoga_summary: {
          total_yogas: number;
          benefic_yogas: number;
          challenging_yogas: number;
        };
      };
      name: string;
    };
    form: {
      name: string;
      dateOfBirth: string;
      timeOfBirth: string;
    };
    location: {
      name: string;
      state: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chart');

  useEffect(() => {
    const storedData = localStorage.getItem('kundliData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setKundliData(parsedData);
      } catch (error) {
        console.error('Error parsing kundli data:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen sacred-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className={`text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{t('loadingText')}</p>
        </div>
      </div>
    );
  }

  if (!kundliData) {
    return (
      <div className="min-h-screen sacred-bg page-load">
        <Header />
        <main className="pt-8 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className={`text-3xl font-bold text-primary mb-4 ${
              locale === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>{t('pageTitle')}</h1>
            <div className="bg-surface rounded-2xl p-8 border border-line">
              <div className="text-6xl mb-4">📊</div>
              <h2 className={`text-xl font-semibold text-text-primary mb-2 ${
                locale === 'hi' ? 'heading-hi' : ''
              }`}>{t('noDataTitle')}</h2>
              <p className={`text-text-secondary mb-6 ${
                locale === 'hi' ? 'body-hi' : ''
              }`}>
                {t('noDataText')}
              </p>
              <a
                href="/astrology-vastu"
                className={`btn-primary px-6 py-3 rounded-lg font-medium inline-block ${
                  locale === 'hi' ? 'heading-hi' : ''
                }`}
              >
                {t('generateButton')}
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { result, form, location } = kundliData;
  const data = result?.data;

  // Convert PyJhora data to traditional chart format
  const convertToTraditionalFormat = (data: any) => {
    console.log('Converting PyJhora data:', data);
    
    if (!data?.planets) {
      console.log('No planets data found in:', data);
      return [];
    }

    const planets = [];
    const planetsData = data.planets;
    console.log('PyJhora planets data:', planetsData);

    // Map PyJhora planet data to our format
    for (const [planetName, planetInfo] of Object.entries(planetsData)) {
      if (typeof planetInfo === 'object' && planetInfo !== null) {
        const info = planetInfo as any;
        console.log(`Processing planet ${planetName}:`, info);
        
        // Ensure we have valid house number (PyJhora uses 1-12)
        const houseNumber = parseInt(info.house) || 1;
        
        const planetData = {
          planet: planetName,
          house: houseNumber,
          sign: info.sign || '',
          degree: info.degrees_in_sign || info.longitude || 0,
          retrograde: info.retrograde || false
        };
        
        console.log(`Converted ${planetName} to:`, planetData);
        planets.push(planetData);
      }
    }
    
    console.log('Final converted planets:', planets);
    // Sort by house number for consistent display
    return planets.sort((a, b) => a.house - b.house);
  };

  const getPlanetSymbol = (planet: string) => {
    const symbols: { [key: string]: string } = {
      'Sun': '☉', 'Moon': '☽', 'Mars': '♂', 'Mercury': '☿',
      'Jupiter': '♃', 'Venus': '♀', 'Saturn': '♄', 'Rahu': '☊', 'Ketu': '☋'
    };
    return symbols[planet] || '●';
  };

  const tabs = [
    { id: 'chart', label: t('chartTab'), icon: '📊' },
    { id: 'planets', label: t('planetsTab'), icon: '🪐' },
    { id: 'houses', label: t('housesTab'), icon: '🏠' },
    { id: 'yogas', label: t('yogasTab'), icon: '🧘' },
    { id: 'nakshatra', label: t('nakshatraTab'), icon: '⭐' },
    { id: 'panchang', label: t('panchangTab'), icon: '📅' }
  ];

  return (
    <div className="min-h-screen sacred-bg page-load">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <section className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold text-primary mb-4 ${
              locale === 'hi' ? 'heading-hi' : 'heading-en'
            }`}>
              {t('pageTitle')}
            </h1>

            <div className="bg-surface rounded-xl p-4 border border-line max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('nameLabel')}</span>
                  <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'heading-hi' : ''}`}>{result.name || form.name}</span>
                </div>
                <div>
                  <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('dateLabel')}</span>
                  <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'heading-hi' : ''}`}>{form.dateOfBirth}</span>
                </div>
                <div>
                  <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('timeLabel')}</span>
                  <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'heading-hi' : ''}`}>{form.timeOfBirth}</span>
                </div>
                <div>
                  <span className={`text-text-secondary block ${locale === 'hi' ? 'body-hi' : ''}`}>{t('placeLabel')}</span>
                  <span className={`text-text-primary font-semibold ${locale === 'hi' ? 'heading-hi' : ''}`}>{location?.name}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <section className="mb-8">
            <div className="bg-surface rounded-xl p-2 border border-line">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-text-secondary hover:text-text-primary hover:bg-elevations'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tab Content */}
          {result.data && (
            <section className="mb-12">
              
              {/* Traditional Birth Chart */}
              {activeTab === 'chart' && data?.planets && (
                <div className="space-y-8">
                  <div className="bg-surface rounded-xl p-6 border border-line">
                    <h2 className={`text-2xl font-bold text-primary mb-6 flex items-center gap-3 ${
                      locale === 'hi' ? 'heading-hi' : 'heading-en'
                    }`}>
                      🔶 {t('traditionalChartTitle')}
                    </h2>
                    <p className={`text-text-secondary mb-6 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('traditionalChartDesc')}</p>
                    
                    <div className="flex justify-center">
                      <TraditionalKundli
                        planets={convertToTraditionalFormat(data)}
                        className="max-w-full"
                      />
                    </div>
                  </div>
                  
                  {/* Navamsa Chart if available */}
                  {typeof data === 'object' && data !== null && 'navamsa_chart' in data && (data as any).navamsa_chart && Object.keys((data as any).navamsa_chart).length > 0 && (
                    <div className="bg-surface rounded-xl p-6 border border-line">
                      <h2 className={`text-2xl font-bold text-primary mb-6 flex items-center gap-3 ${
                        locale === 'hi' ? 'heading-hi' : 'heading-en'
                      }`}>
                        🔶 {t('navamsaChartTitle')}
                      </h2>
                      <p className={`text-text-secondary mb-6 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('navamsaChartDesc')}</p>
                      
                      <div className="flex justify-center">
                        <TraditionalKundli
                          planets={convertToTraditionalFormat((data as any).navamsa_chart)}
                          className="max-w-full scale-90"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Planetary Positions Table */}
              {activeTab === 'planets' && data?.planets && (
                <div className="bg-surface rounded-xl border border-line overflow-hidden">
                  <div className="p-6 border-b border-line">
                    <h2 className={`text-2xl font-bold text-primary flex items-center gap-3 ${
                      locale === 'hi' ? 'heading-hi' : 'heading-en'
                    }`}>
                      🪐 {t('planetsTitle')}
                    </h2>
                    <p className={`text-text-secondary mt-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('planetsDesc')}</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-elevations">
                        <tr>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('planetHeader')}</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('signHeader')}</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('houseHeader')}</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('degreeHeader')}</th>
                          <th className={`px-6 py-4 text-left text-sm font-semibold text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('longitudeHeader')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {Object.entries(data.planets).map(([planetName, planetData], index) => (
                          <tr key={planetName} className={`hover:bg-elevations/50 transition-colors ${
                            index % 2 === 0 ? 'bg-background/30' : 'bg-surface'
                          }`}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{getPlanetSymbol(planetName)}</span>
                                <div>
                                  <div className={`font-semibold text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{planetName}</div>
                                  <div className={`text-xs text-text-secondary capitalize ${locale === 'hi' ? 'body-hi' : ''}`}>
                                    {planetName === 'Rahu' || planetName === 'Ketu' ? t('shadowPlanet') :
                                     ['Sun', 'Moon'].includes(planetName) ? t('luminary') : t('planet')}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-medium text-accent">{planetData.sign || 'N/A'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary ${
                                locale === 'hi' ? 'heading-hi' : ''
                              }`}>
                                {t('housePrefix')} {planetData.house || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <div className="font-medium text-text-primary">
                                  {planetData.degrees_in_sign ? `${planetData.degrees_in_sign.toFixed(2)}°` : 'N/A'}
                                </div>
                                <div className="text-xs text-text-secondary">
                                  in {planetData.sign}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-text-secondary font-mono">
                                {planetData.longitude ? `${planetData.longitude.toFixed(3)}°` : 'N/A'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* House Analysis */}
              {activeTab === 'houses' && data?.houses && (
                <div className="bg-surface rounded-xl p-6 border border-line">
                  <h2 className={`text-2xl font-bold text-primary mb-6 flex items-center gap-3 ${
                    locale === 'hi' ? 'heading-hi' : 'heading-en'
                  }`}>
                    🏠 {t('housesTitle')}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => {
                      const houseKey = `house_${houseNum}`;
                      const houseData = data.houses[houseKey];
                      const hasplanets = houseData?.planet_count > 0;
                      
                      return (
                        <div key={houseNum} className={`rounded-lg p-4 border-2 transition-all ${
                          hasplanets 
                            ? 'bg-primary/5 border-primary/30 shadow-md' 
                            : 'bg-elevations border-line/50'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className={`font-bold text-lg text-text-primary ${
                              locale === 'hi' ? 'heading-hi' : ''
                            }`}>{t('housePrefix')} {houseNum}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              hasplanets ? 'bg-primary text-white' : 'bg-line text-text-secondary'
                            } ${locale === 'hi' ? 'heading-hi' : ''}`}>
                              {houseData?.planet_count || 0} {t('planetsCount')}
                            </span>
                          </div>

                          {hasplanets ? (
                            <div className="space-y-2">
                              {houseData.planets.map((planet: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-background rounded">
                                  <span className="text-lg">{getPlanetSymbol(planet)}</span>
                                  <span className={`font-medium text-text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>{planet}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className={`text-text-secondary text-sm italic ${locale === 'hi' ? 'body-hi' : ''}`}>{t('noPlanets')}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Yoga Analysis */}
              {activeTab === 'yogas' && (
                <div className="bg-surface rounded-xl p-6 border border-line">
                  <h2 className={`text-2xl font-bold text-primary mb-6 flex items-center gap-3 ${
                    locale === 'hi' ? 'heading-hi' : 'heading-en'
                  }`}>
                    🧘 {t('yogasTitle')}
                  </h2>

                  {data?.yogas && data.yogas.length > 0 ? (
                    <>
                      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div>
                            <span className="block text-3xl font-bold text-green-600">{data.yoga_summary?.benefic_yogas || 0}</span>
                            <span className={`text-sm text-green-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('beneficYogas')}</span>
                          </div>
                          <div>
                            <span className="block text-3xl font-bold text-orange-600">{data.yoga_summary?.challenging_yogas || 0}</span>
                            <span className={`text-sm text-orange-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('challengingYogas')}</span>
                          </div>
                          <div>
                            <span className="block text-3xl font-bold text-blue-600">{data.yoga_summary?.total_yogas || 0}</span>
                            <span className={`text-sm text-blue-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('totalCombinations')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {data.yogas.map((yoga, index: number) => (
                          <div key={index} className={`rounded-xl p-6 border-l-4 shadow-sm hover:shadow-md transition-all ${
                            yoga.benefic !== false 
                              ? 'bg-green-50 border-green-400 hover:bg-green-100' 
                              : 'bg-orange-50 border-orange-400 hover:bg-orange-100'
                          }`}>
                            <div className="flex justify-between items-start mb-4">
                              <h3 className={`font-bold text-xl text-text-primary ${
                                locale === 'hi' ? 'heading-hi' : ''
                              }`}>{yoga.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                yoga.benefic !== false ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                              } ${locale === 'hi' ? 'heading-hi' : ''}`}>
                                {yoga.benefic !== false ? t('beneficLabel') : t('challengingLabel')}
                              </span>
                            </div>

                            <p className={`text-text-secondary mb-4 leading-relaxed ${locale === 'hi' ? 'body-hi' : ''}`}>{yoga.description}</p>

                            {yoga.planets_involved && yoga.planets_involved.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                <span className={`text-sm text-text-secondary font-medium ${locale === 'hi' ? 'body-hi' : ''}`}>{t('planetsInvolved')}</span>
                                {yoga.planets_involved.map((planet: string, planetIndex: number) => (
                                  <span 
                                    key={planetIndex}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                                  >
                                    <span>{getPlanetSymbol(planet)}</span>
                                    {planet}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🔮</div>
                      <h3 className={`text-xl font-semibold text-text-primary mb-2 ${
                        locale === 'hi' ? 'heading-hi' : ''
                      }`}>{t('yogasCalculating')}</h3>
                      <p className={`text-text-secondary ${locale === 'hi' ? 'body-hi' : ''}`}>{t('yogasProcessing')}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Nakshatra Details */}
              {activeTab === 'nakshatra' && (
                <div className="bg-surface rounded-xl p-6 border border-line">
                  <h2 className={`text-2xl font-bold text-primary mb-6 flex items-center gap-3 ${
                    locale === 'hi' ? 'heading-hi' : 'heading-en'
                  }`}>
                    ⭐ {t('nakshatraTitle')}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                        <h3 className={`font-bold text-lg text-blue-800 mb-3 ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('birthNakshatra')}</h3>
                        <p className={`text-2xl font-bold text-primary mb-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                          {data?.nakshatra_details?.birth_nakshatra || t('calculating')}
                        </p>
                        <p className={`text-sm text-blue-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('birthNakshatraDesc')}</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border border-green-200">
                        <h3 className={`font-bold text-lg text-green-800 mb-3 ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('moonSign')}</h3>
                        <p className={`text-2xl font-bold text-success mb-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                          {data?.nakshatra_details?.moon_sign || data?.planets?.Moon?.sign || t('calculating')}
                        </p>
                        <p className={`text-sm text-green-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('moonSignDesc')}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                        <h3 className={`font-bold text-lg text-orange-800 mb-3 ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('sunSign')}</h3>
                        <p className={`text-2xl font-bold text-deep-accent mb-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                          {data?.nakshatra_details?.sun_sign || data?.planets?.Sun?.sign || t('calculating')}
                        </p>
                        <p className={`text-sm text-orange-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('sunSignDesc')}</p>
                      </div>

                      {data?.planets?.Moon && (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                          <h3 className={`font-bold text-lg text-purple-800 mb-3 ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('moonPosition')}</h3>
                          <p className={`text-xl font-bold text-accent mb-1 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                            {data.planets.Moon.degrees_in_sign?.toFixed(2)}° {data.planets.Moon.sign} {t('in')}
                          </p>
                          <p className={`text-sm text-purple-700 mb-2 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('houseLabel')} {data.planets.Moon.house}</p>
                          <p className={`text-xs text-purple-600 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('longitudeLabel')} {data.planets.Moon.longitude?.toFixed(3)}°</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Panchang Details */}
              {activeTab === 'panchang' && (
                <div className="bg-surface rounded-xl p-6 border border-line">
                  <h2 className={`text-2xl font-bold text-primary mb-6 flex items-center gap-3 ${
                    locale === 'hi' ? 'heading-hi' : 'heading-en'
                  }`}>
                    📅 {t('panchangTitle')}
                  </h2>
                  <p className={`text-text-secondary mb-6 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('panchangDesc')}</p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tithi */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
                      <h3 className={`font-bold text-lg text-red-800 mb-3 flex items-center gap-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        🌙 {t('tithiTitle')}
                      </h3>
                      <p className={`text-xl font-bold text-primary mb-1 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        {(data as any)?.nakshatra_details?.tithi || (data as any)?.panchang?.tithi?.name || t('calculating')}
                      </p>
                      <p className={`text-sm text-red-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('tithiDesc')}</p>
                      {(data as any)?.panchang?.tithi?.paksha && (
                        <p className="text-xs text-red-600 mt-1">
                          {(data as any).panchang.tithi.paksha} Paksha
                        </p>
                      )}
                    </div>

                    {/* Nakshatra */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                      <h3 className={`font-bold text-lg text-blue-800 mb-3 flex items-center gap-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        ⭐ {t('nakshatraTitle')}
                      </h3>
                      <p className={`text-xl font-bold text-primary mb-1 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        {data?.nakshatra_details?.birth_nakshatra || (data as any)?.panchang?.nakshatra?.name || t('calculating')}
                      </p>
                      <p className={`text-sm text-blue-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('nakshatraDesc')}</p>
                    </div>

                    {/* Yoga */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                      <h3 className={`font-bold text-lg text-green-800 mb-3 flex items-center gap-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        🧘 {t('yogaTitle')}
                      </h3>
                      <p className={`text-xl font-bold text-primary mb-1 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        {(data as any)?.nakshatra_details?.yoga || (data as any)?.panchang?.yoga?.name || t('calculating')}
                      </p>
                      <p className={`text-sm text-green-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('yogaDesc')}</p>
                    </div>

                    {/* Karana */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                      <h3 className={`font-bold text-lg text-yellow-800 mb-3 flex items-center gap-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        ⚡ {t('karanaTitle')}
                      </h3>
                      <p className={`text-xl font-bold text-primary mb-1 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        {(data as any)?.nakshatra_details?.karana || (data as any)?.panchang?.karana?.name || t('calculating')}
                      </p>
                      <p className={`text-sm text-yellow-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('karanaDesc')}</p>
                    </div>

                    {/* Vara */}
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6 border border-purple-200">
                      <h3 className={`font-bold text-lg text-purple-800 mb-3 flex items-center gap-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        📆 {t('varaTitle')}
                      </h3>
                      <p className={`text-xl font-bold text-primary mb-1 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        {(data as any)?.nakshatra_details?.vara || (data as any)?.panchang?.vara?.name || t('calculating')}
                      </p>
                      <p className={`text-sm text-purple-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('varaDesc')}</p>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
                      <h3 className={`font-bold text-lg text-teal-800 mb-3 flex items-center gap-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>
                        🌿 {t('seasonMasa')}
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className={`text-sm font-medium text-teal-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('season')}</p>
                          <p className={`text-lg font-bold text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>
                            {(data as any)?.nakshatra_details?.ritu || (data as any)?.panchang?.ritu || t('unknown')}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm font-medium text-teal-700 ${locale === 'hi' ? 'body-hi' : ''}`}>{t('month')}</p>
                          <p className={`text-lg font-bold text-primary ${locale === 'hi' ? 'heading-hi' : ''}`}>
                            {(data as any)?.nakshatra_details?.masa || (data as any)?.panchang?.masa || t('unknown')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h4 className={`font-semibold text-primary mb-2 ${locale === 'hi' ? 'heading-hi' : ''}`}>{t('aboutPanchang')}</h4>
                    <p className={`text-sm text-text-secondary leading-relaxed ${locale === 'hi' ? 'body-hi' : ''}`}>
                      {t('panchangInfo')}
                    </p>
                  </div>
                </div>
              )}
              
            </section>
          )}


          {/* Consultation CTA */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-line text-center">
              <h2 className={`text-2xl font-bold text-primary mb-4 ${
                locale === 'hi' ? 'heading-hi' : 'heading-en'
              }`}>{t('detailedAnalysisTitle')}</h2>
              <p className={`text-text-secondary mb-6 max-w-2xl mx-auto ${
                locale === 'hi' ? 'body-hi' : ''
              }`}>
                {t('detailedAnalysisText')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/astrology-vastu#consultation-form"
                  className={`btn-primary px-6 py-3 rounded-lg font-medium ${
                    locale === 'hi' ? 'heading-hi' : ''
                  }`}
                >
                  {t('bookConsultation')}
                </a>
                <a
                  href={`https://wa.me/919340337323?text=${encodeURIComponent(
                    t('whatsappTemplate', {
                      name: result.name || form.name,
                      dateOfBirth: form.dateOfBirth,
                      timeOfBirth: form.timeOfBirth,
                      locationName: location?.name || '',
                      locationState: location?.state || ''
                    })
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-success hover:bg-success/90 text-white px-6 py-3 rounded-lg font-medium transition-colors ${
                    locale === 'hi' ? 'heading-hi' : ''
                  }`}
                >
                  {t('whatsappAnalysis')}
                </a>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className={`border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-colors ${
                  locale === 'hi' ? 'heading-hi' : ''
                }`}
              >
                {t('printButton')}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('kundliData');
                  window.location.href = '/astrology-vastu';
                }}
                className={`border border-line text-text-primary hover:bg-elevations px-6 py-3 rounded-lg font-medium transition-colors ${
                  locale === 'hi' ? 'heading-hi' : ''
                }`}
              >
                {t('newKundliButton')}
              </button>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}