export const kundliContent = {
  en: {
    // Loading state
    loadingText: 'Loading Kundli Analysis...',

    // No data state
    pageTitle: 'Kundli Analysis',
    noDataTitle: 'No Kundli Data Found',
    noDataText: 'Please generate a kundli first from the Astrology and Vastu page.',
    generateButton: 'Generate Kundli',

    // Header labels
    nameLabel: 'Name',
    dateLabel: 'Date',
    timeLabel: 'Time',
    placeLabel: 'Place',

    // Tab navigation
    chartTab: 'Birth Chart',
    planetsTab: 'Planetary Positions',
    housesTab: 'House Analysis',
    yogasTab: 'Yoga Analysis',
    nakshatraTab: 'Nakshatra Details',
    panchangTab: 'Panchang Details',

    // Chart section
    traditionalChartTitle: 'Traditional Birth Chart',
    traditionalChartDesc: 'Traditional North Indian style birth chart showing planetary positions in houses with authentic Vedic formatting',
    navamsaChartTitle: 'Navamsa Chart (D9)',
    navamsaChartDesc: 'Traditional divisional chart for marriage and spiritual life analysis',

    // Planets section
    planetsTitle: 'Planetary Positions',
    planetsDesc: 'Detailed planetary positions in your birth chart',
    planetHeader: 'Planet',
    signHeader: 'Sign',
    houseHeader: 'House',
    degreeHeader: 'Degree',
    longitudeHeader: 'Longitude',
    shadowPlanet: 'Shadow Planet',
    luminary: 'Luminary',
    planet: 'Planet',

    // Houses section
    housesTitle: 'House Analysis',
    housePrefix: 'House',
    planetsCount: 'planets',
    noPlanets: 'No planets in this house',

    // Yogas section
    yogasTitle: 'Yoga Analysis',
    beneficYogas: 'Beneficial Yogas',
    challengingYogas: 'Areas to Focus On',
    totalCombinations: 'Total Combinations',
    beneficLabel: '✅ Beneficial',
    challengingLabel: '⚠️ Challenging',
    planetsInvolved: 'Planets:',
    yogasCalculating: 'Calculating Yogas',
    yogasProcessing: 'Yoga analysis is being processed...',

    // Nakshatra section
    nakshatraTitle: 'Nakshatra Analysis',
    birthNakshatra: 'Birth Nakshatra',
    birthNakshatraDesc: 'Your birth star constellation',
    moonSign: 'Moon Sign',
    moonSignDesc: 'Your emotional nature and instincts',
    sunSign: 'Sun Sign',
    sunSignDesc: 'Your core personality and ego',
    moonPosition: 'Moon Position',
    houseLabel: 'House:',
    longitudeLabel: 'Longitude:',
    calculating: 'Calculating...',
    in: 'in',

    // Panchang section
    panchangTitle: 'Complete Panchang',
    panchangDesc: 'The five essential elements calculated using PyJHora for your birth time',
    tithiTitle: 'Tithi',
    tithiDesc: 'Lunar day',
    nakshatraTitle: 'Nakshatra',
    nakshatraDesc: 'Birth constellation',
    yogaTitle: 'Yoga',
    yogaDesc: 'Planetary combination',
    karanaTitle: 'Karana',
    karanaDesc: 'Half of tithi',
    varaTitle: 'Vara',
    varaDesc: 'Day of week',
    seasonMasa: 'Season and Month',
    season: 'Season:',
    month: 'Month:',
    unknown: 'Unknown',
    aboutPanchang: 'About Panchang',
    panchangInfo: 'Panchang consists of five essential elements used in Vedic astrology: Tithi (lunar day), Nakshatra (constellation), Yoga (planetary combination), Karana (half tithi), and Vara (day of the week). These elements together provide insights into the cosmic influences at the time of birth and are crucial for muhurta selection and astrological analysis.',

    // Consultation CTA
    detailedAnalysisTitle: 'Want Detailed Analysis?',
    detailedAnalysisText: 'This is a basic computer-generated analysis. For personalized predictions, remedies, and detailed insights, book a consultation with Acharya Hari Om Shastri.',
    bookConsultation: 'Book Consultation',
    whatsappAnalysis: 'Get Analysis on WhatsApp',

    // Actions
    printButton: 'Print Kundli',
    newKundliButton: 'Generate New Kundli',

    // WhatsApp template
    whatsappTemplate: (name: string, dob: string, tob: string, place: string, state: string) =>
      `Hello Acharya Hari Om Shastri,%0A%0AI have generated my Kundli with the following details:%0A%0AName: ${name}%0ADate of Birth: ${dob}%0ATime of Birth: ${tob}%0APlace of Birth: ${place}, ${state}%0A%0AI would like detailed analysis of my birth chart including planetary positions, yoga analysis, career guidance, and remedial measures.%0A%0APlease let me know your availability for consultation.%0A%0AThank you!`
  },

  hi: {
    // Loading state
    loadingText: 'कुंडली विश्लेषण लोड हो रहा है...',

    // No data state
    pageTitle: 'कुंडली विश्लेषण',
    noDataTitle: 'कोई कुंडली डेटा नहीं मिला',
    noDataText: 'कृपया पहले ज्योतिष और वास्तु पृष्ठ से कुंडली तैयार करें।',
    generateButton: 'कुंडली तैयार करें',

    // Header labels
    nameLabel: 'नाम',
    dateLabel: 'तिथि',
    timeLabel: 'समय',
    placeLabel: 'स्थान',

    // Tab navigation
    chartTab: 'जन्म कुंडली',
    planetsTab: 'ग्रह स्थिति',
    housesTab: 'भाव विश्लेषण',
    yogasTab: 'योग विश्लेषण',
    nakshatraTab: 'नक्षत्र विवरण',
    panchangTab: 'पंचांग विवरण',

    // Chart section
    traditionalChartTitle: 'पारंपरिक जन्म कुंडली',
    traditionalChartDesc: 'पारंपरिक उत्तर भारतीय शैली जन्म कुंडली प्रामाणिक वैदिक स्वरूपण के साथ भावों में ग्रहों की स्थिति दर्शाती है',
    navamsaChartTitle: 'नवांश चार्ट (D9)',
    navamsaChartDesc: 'विवाह और आध्यात्मिक जीवन विश्लेषण के लिए पारंपरिक विभागीय चार्ट',

    // Planets section
    planetsTitle: 'ग्रहों की स्थिति',
    planetsDesc: 'आपकी जन्म कुंडली में विस्तृत ग्रह स्थितियां',
    planetHeader: 'ग्रह',
    signHeader: 'राशि',
    houseHeader: 'भाव',
    degreeHeader: 'अंश',
    longitudeHeader: 'देशांतर',
    shadowPlanet: 'छाया ग्रह',
    luminary: 'दीप्तिमान',
    planet: 'ग्रह',

    // Houses section
    housesTitle: 'भाव विश्लेषण',
    housePrefix: 'भाव',
    planetsCount: 'ग्रह',
    noPlanets: 'इस भाव में कोई ग्रह नहीं',

    // Yogas section
    yogasTitle: 'योग विश्लेषण',
    beneficYogas: 'सकारात्मक योग',
    challengingYogas: 'ध्यान देने योग्य क्षेत्र',
    totalCombinations: 'कुल संयोजन',
    beneficLabel: '✅ लाभदायक',
    challengingLabel: '⚠️ चुनौतीपूर्ण',
    planetsInvolved: 'ग्रह:',
    yogasCalculating: 'योग गणना हो रही है',
    yogasProcessing: 'योग विश्लेषण संसाधित किया जा रहा है...',

    // Nakshatra section
    nakshatraTitle: 'नक्षत्र विश्लेषण',
    birthNakshatra: 'जन्म नक्षत्र',
    birthNakshatraDesc: 'आपका जन्म तारा नक्षत्र',
    moonSign: 'चंद्र राशि',
    moonSignDesc: 'आपका भावनात्मक स्वभाव और प्रवृत्ति',
    sunSign: 'सूर्य राशि',
    sunSignDesc: 'आपका मूल व्यक्तित्व और अहंकार',
    moonPosition: 'चंद्र स्थिति',
    houseLabel: 'भाव:',
    longitudeLabel: 'देशांतर:',
    calculating: 'गणना हो रही है...',
    in: 'में',

    // Panchang section
    panchangTitle: 'संपूर्ण पंचांग',
    panchangDesc: 'आपके जन्म समय के लिए PyJHora का उपयोग करके गणना की गई पांच आवश्यक तत्व',
    tithiTitle: 'Tithi',
    tithiDesc: 'चंद्र दिवस',
    nakshatraTitle: 'Nakshatra',
    nakshatraDesc: 'जन्म नक्षत्र',
    yogaTitle: 'Yoga',
    yogaDesc: 'ग्रह संयोजन',
    karanaTitle: 'Karana',
    karanaDesc: 'आधी तिथि',
    varaTitle: 'Vara',
    varaDesc: 'वार',
    seasonMasa: 'ऋतु और मास',
    season: 'ऋतु:',
    month: 'मास:',
    unknown: 'अज्ञात',
    aboutPanchang: 'पंचांग के बारे में',
    panchangInfo: 'पंचांग वैदिक ज्योतिष में उपयोग किए जाने वाले पांच आवश्यक तत्वों से बना है: तिथि (चंद्र दिवस), नक्षत्र (तारामंडल), योग (ग्रह संयोजन), करण (आधी तिथि), और वार (सप्ताह का दिन)। ये तत्व मिलकर जन्म के समय ब्रह्मांडीय प्रभावों के बारे में अंतर्दृष्टि प्रदान करते हैं और मुहूर्त चयन और ज्योतिषीय विश्लेषण के लिए महत्वपूर्ण हैं।',

    // Consultation CTA
    detailedAnalysisTitle: 'विस्तृत विश्लेषण चाहते हैं?',
    detailedAnalysisText: 'यह एक बुनियादी कंप्यूटर-जनित विश्लेषण है। व्यक्तिगत भविष्यवाणियों, उपायों और विस्तृत जानकारी के लिए, आचार्य हरि ओम शास्त्री के साथ परामर्श बुक करें।',
    bookConsultation: 'परामर्श बुक करें',
    whatsappAnalysis: 'WhatsApp पर विश्लेषण पूछें',

    // Actions
    printButton: 'कुंडली प्रिंट करें',
    newKundliButton: 'नई कुंडली तैयार करें',

    // WhatsApp template
    whatsappTemplate: (name: string, dob: string, tob: string, place: string, state: string) =>
      `नमस्ते आचार्य हरि ओम शास्त्री जी,%0A%0Aमैंने निम्नलिखित विवरण के साथ अपनी कुंडली तैयार की है:%0A%0Aनाम: ${name}%0Aजन्म तिथि: ${dob}%0Aजन्म समय: ${tob}%0Aजन्म स्थान: ${place}, ${state}%0A%0Aमुझे अपनी जन्म कुंडली का विस्तृत विश्लेषण चाहिए जिसमें ग्रह स्थिति, योग विश्लेषण, करियर मार्गदर्शन और उपचारात्मक उपाय शामिल हों।%0A%0Aकृपया परामर्श के लिए अपनी उपलब्धता बताएं।%0A%0Aधन्यवाद!`
  }
};
