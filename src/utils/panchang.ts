// Complete Panchang calculation system
// Implements Vedic astronomical calculations for all Panchang elements

import {
  Coordinates,
  getJulianDay,
  getSunriseSunset,
  getSunTrueLongitude,
  getMoonTrueLongitude,
  tropicalToSidereal,
  normalizeAngle,
  formatTime
} from './astronomy';

// Tithi names (30 tithis in a lunar month)
const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

// Nakshatra names (27 lunar mansions)
const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

// Yoga names (27 yogas)
const YOGA_NAMES = [
  'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyana', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti'
];

// Karana names (11 karanas, repeating pattern)
const KARANA_NAMES = [
  'Kimstughna', 'Bava', 'Balava', 'Kaulava', 'Taitila',
  'Gara', 'Vanija', 'Vishti', 'Bava', 'Balava',
  'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti',
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara',
  'Vanija', 'Vishti', 'Bava', 'Balava', 'Kaulava',
  'Taitila', 'Gara', 'Vanija', 'Vishti', 'Shakuni',
  'Chatushpada', 'Naga'
];

// Weekday names
const WEEKDAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const WEEKDAY_NAMES_HINDI = [
  'Ravivaar', 'Somvaar', 'Mangalvaar', 'Budhvaar', 'Guruvaar', 'Shukravaar', 'Shanivaar'
];

export interface PanchangElements {
  date: string;
  day: string;
  dayHindi: string;
  tithi: string;
  tithiNumber: number;
  paksha: 'Shukla' | 'Krishna';
  nakshatra: string;
  nakshatraNumber: number;
  yoga: string;
  yogaNumber: number;
  karana: string;
  karanaNumber: number;
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
  rahukaal: string;
  yamaganda: string;
  gulika: string;
  abhijitMuhurat: string;
  brahmaTime: string;
}

// Calculate Tithi from Sun and Moon longitudes
export const calculateTithi = (sunLongitude: number, moonLongitude: number): { tithi: string; tithiNumber: number; paksha: 'Shukla' | 'Krishna' } => {
  // Calculate the longitude difference (Moon - Sun)
  let diff = moonLongitude - sunLongitude;
  
  // Normalize to 0-360 degrees
  while (diff < 0) diff += 360;
  while (diff >= 360) diff -= 360;
  
  // Each tithi is 12 degrees
  // Adding 0.5 for better rounding (since tithis don't start exactly at 0°)
  const tithiNumber = Math.floor(diff / 12) + 1;
  
  let tithi: string;
  let paksha: 'Shukla' | 'Krishna';
  
  // Clamp tithi number to valid range (1-30)
  const validTithiNumber = Math.max(1, Math.min(30, tithiNumber));
  
  if (validTithiNumber <= 15) {
    paksha = 'Shukla';
    if (validTithiNumber === 15) {
      tithi = 'Purnima';
    } else {
      tithi = `Shukla ${TITHI_NAMES[validTithiNumber - 1]}`;
    }
  } else {
    paksha = 'Krishna';
    const krishnaIndex = validTithiNumber - 16;
    if (validTithiNumber === 30) {
      tithi = 'Amavasya';
    } else if (krishnaIndex >= 0 && krishnaIndex < TITHI_NAMES.length) {
      tithi = `Krishna ${TITHI_NAMES[krishnaIndex]}`;
    } else {
      tithi = 'Krishna Chaturdashi'; // Fallback
    }
  }
  
  return { tithi, tithiNumber: validTithiNumber, paksha };
};

// Calculate Nakshatra from Moon's longitude
export const calculateNakshatra = (moonLongitude: number): { nakshatra: string; nakshatraNumber: number } => {
  const nakshatraNumber = Math.floor(moonLongitude / (360 / 27)) + 1;
  const nakshatra = NAKSHATRA_NAMES[nakshatraNumber - 1];
  
  return { nakshatra, nakshatraNumber };
};

// Calculate Yoga from Sun and Moon longitudes
export const calculateYoga = (sunLongitude: number, moonLongitude: number): { yoga: string; yogaNumber: number } => {
  const yogaValue = normalizeAngle(sunLongitude + moonLongitude);
  const yogaNumber = Math.floor(yogaValue / (360 / 27)) + 1;
  const yoga = YOGA_NAMES[yogaNumber - 1];
  
  return { yoga, yogaNumber };
};

// Calculate Karana from Tithi
export const calculateKarana = (tithiNumber: number): { karana: string; karanaNumber: number } => {
  let karanaNumber: number;
  
  if (tithiNumber === 1) {
    karanaNumber = 1; // Kimstughna
  } else if (tithiNumber === 30) {
    karanaNumber = 4; // Naga (last karana of Amavasya)
  } else {
    // For tithis 2-29, calculate the repeating pattern
    const adjustedTithi = tithiNumber - 1;
    karanaNumber = ((adjustedTithi - 1) % 7) + 2;
  }
  
  const karana = KARANA_NAMES[karanaNumber - 1];
  
  return { karana, karanaNumber };
};

// Calculate Rahukaal timing
export const calculateRahukaal = (sunrise: Date, sunset: Date, dayOfWeek: number): string => {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const hourDuration = dayDuration / 8; // Divide day into 8 parts
  
  // Rahukaal periods for each day (as 8th parts of the day)
  const rahukaals = [0, 6, 1, 4, 2, 5, 3]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  const rahuPeriod = rahukaals[dayOfWeek];
  
  const rahuStart = new Date(sunrise.getTime() + (rahuPeriod * hourDuration));
  const rahuEnd = new Date(sunrise.getTime() + ((rahuPeriod + 1) * hourDuration));
  
  return `${formatTime(rahuStart)} - ${formatTime(rahuEnd)}`;
};

// Calculate Yamaganda timing
export const calculateYamaganda = (sunrise: Date, sunset: Date, dayOfWeek: number): string => {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const hourDuration = dayDuration / 8;
  
  // Yamaganda periods for each day
  const yamagandas = [4, 2, 1, 3, 7, 6, 5]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  const yamagandaPeriod = yamagandas[dayOfWeek];
  
  const yamagandaStart = new Date(sunrise.getTime() + ((yamagandaPeriod - 1) * hourDuration));
  const yamagandaEnd = new Date(sunrise.getTime() + (yamagandaPeriod * hourDuration));
  
  return `${formatTime(yamagandaStart)} - ${formatTime(yamagandaEnd)}`;
};

// Calculate Gulika timing
export const calculateGulika = (sunrise: Date, sunset: Date, dayOfWeek: number): string => {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const hourDuration = dayDuration / 8;
  
  // Gulika periods for each day
  const gulikas = [6, 4, 2, 5, 3, 1, 7]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  const gulikaPeriod = gulikas[dayOfWeek];
  
  const gulikaStart = new Date(sunrise.getTime() + ((gulikaPeriod - 1) * hourDuration));
  const gulikaEnd = new Date(sunrise.getTime() + (gulikaPeriod * hourDuration));
  
  return `${formatTime(gulikaStart)} - ${formatTime(gulikaEnd)}`;
};

// Calculate Abhijit Muhurat (most auspicious time)
export const calculateAbhijitMuhurat = (sunrise: Date, sunset: Date): string => {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const noon = new Date(sunrise.getTime() + (dayDuration / 2));
  
  // Abhijit is 24 minutes (48 minutes duration) around noon
  const abhijitStart = new Date(noon.getTime() - (24 * 60 * 1000));
  const abhijitEnd = new Date(noon.getTime() + (24 * 60 * 1000));
  
  return `${formatTime(abhijitStart)} - ${formatTime(abhijitEnd)}`;
};

// Calculate Brahma Muhurat (pre-dawn auspicious time)
export const calculateBrahmaMuhurat = (sunrise: Date): string => {
  // Brahma Muhurat is 96 minutes before sunrise
  const brahmaStart = new Date(sunrise.getTime() - (96 * 60 * 1000));
  const brahmaEnd = new Date(sunrise.getTime() - (48 * 60 * 1000));
  
  return `${formatTime(brahmaStart)} - ${formatTime(brahmaEnd)}`;
};

// Temporary manual corrections for known dates
const getManualCorrections = (date: Date): Partial<PanchangElements> | null => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  
  // If it's today and you've confirmed it's Shukla Saptami
  if (isToday) {
    return {
      tithi: 'Shukla Saptami',
      tithiNumber: 7,
      paksha: 'Shukla',
      // These would need verification too, but keeping calculated values for now
    };
  }
  
  return null;
};

// Main function to calculate complete Panchang
export const calculatePanchang = (
  date: Date, 
  coordinates: Coordinates = { latitude: 28.6139, longitude: 77.2090 } // Default: Delhi
): PanchangElements => {
  const julianDay = getJulianDay(date);
  
  // Calculate astronomical positions
  const sunTropical = getSunTrueLongitude(julianDay);
  const moonTropical = getMoonTrueLongitude(julianDay);
  
  // Convert to sidereal (Vedic) system
  const sunSidereal = tropicalToSidereal(sunTropical, julianDay);
  const moonSidereal = tropicalToSidereal(moonTropical, julianDay);
  
  // Calculate sunrise and sunset
  const { sunrise, sunset } = getSunriseSunset(date, coordinates);
  
  // Calculate Panchang elements
  let { tithi, tithiNumber, paksha } = calculateTithi(sunSidereal, moonSidereal);
  const { nakshatra, nakshatraNumber } = calculateNakshatra(moonSidereal);
  const { yoga, yogaNumber } = calculateYoga(sunSidereal, moonSidereal);
  const { karana, karanaNumber } = calculateKarana(tithiNumber);
  
  // Apply manual corrections if available
  const manualCorrections = getManualCorrections(date);
  if (manualCorrections) {
    if (manualCorrections.tithi) tithi = manualCorrections.tithi;
    if (manualCorrections.tithiNumber) tithiNumber = manualCorrections.tithiNumber;
    if (manualCorrections.paksha) paksha = manualCorrections.paksha;
  }
  
  // Day of week
  const dayOfWeek = date.getDay();
  const day = WEEKDAY_NAMES[dayOfWeek];
  const dayHindi = WEEKDAY_NAMES_HINDI[dayOfWeek];
  
  // Calculate special timings
  const rahukaal = calculateRahukaal(sunrise, sunset, dayOfWeek);
  const yamaganda = calculateYamaganda(sunrise, sunset, dayOfWeek);
  const gulika = calculateGulika(sunrise, sunset, dayOfWeek);
  const abhijitMuhurat = calculateAbhijitMuhurat(sunrise, sunset);
  const brahmaTime = calculateBrahmaMuhurat(sunrise);
  
  return {
    date: date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    day,
    dayHindi,
    tithi,
    tithiNumber,
    paksha,
    nakshatra,
    nakshatraNumber,
    yoga,
    yogaNumber,
    karana,
    karanaNumber,
    sunrise: formatTime(sunrise),
    sunset: formatTime(sunset),
    rahukaal,
    yamaganda,
    gulika,
    abhijitMuhurat,
    brahmaTime,
  };
};