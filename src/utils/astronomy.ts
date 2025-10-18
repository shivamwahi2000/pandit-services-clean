// Core astronomical calculation utilities for Vedic Panchang
// Based on traditional Vedic astronomy and modern astronomical formulas

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AstronomicalData {
  julianDay: number;
  sunLongitude: number;
  moonLongitude: number;
  sunrise: Date;
  sunset: Date;
}

// Convert degrees to radians
export const degToRad = (degrees: number): number => degrees * Math.PI / 180;

// Convert radians to degrees
export const radToDeg = (radians: number): number => radians * 180 / Math.PI;

// Normalize angle to 0-360 degrees
export const normalizeAngle = (angle: number): number => {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
};

// Calculate Julian Day from Date
export const getJulianDay = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  const decimal_day = day + (hour + minute/60 + second/3600) / 24;
  
  let a = Math.floor((14 - month) / 12);
  let y = year - a;
  let m = month + 12 * a - 3;
  
  let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + decimal_day - 1524.5;
  
  // Julian calendar correction
  if (jd >= 2299161) {
    let b = Math.floor(y / 100);
    jd += 2 - b + Math.floor(b / 4);
  }
  
  return jd;
};

// Calculate the equation of time (solar correction)
export const getEquationOfTime = (julianDay: number): number => {
  const n = julianDay - 2451545.0;
  const L = normalizeAngle(280.460 + 0.9856474 * n);
  const g = degToRad(normalizeAngle(357.528 + 0.9856003 * n));
  const lambda = degToRad(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  
  const alpha = radToDeg(Math.atan2(Math.cos(degToRad(23.439)) * Math.sin(lambda), Math.cos(lambda)));
  const eot = 4 * (L - alpha);
  
  return eot;
};

// Calculate solar declination
export const getSolarDeclination = (julianDay: number): number => {
  const n = julianDay - 2451545.0;
  const L = normalizeAngle(280.460 + 0.9856474 * n);
  const g = degToRad(normalizeAngle(357.528 + 0.9856003 * n));
  const lambda = degToRad(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  
  const declination = radToDeg(Math.asin(Math.sin(degToRad(23.439)) * Math.sin(lambda)));
  
  return declination;
};

// Calculate hour angle for sunrise/sunset
export const getHourAngle = (latitude: number, declination: number): number => {
  const latRad = degToRad(latitude);
  const decRad = degToRad(declination);
  
  const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(decRad));
  return radToDeg(hourAngle);
};

// Calculate sunrise and sunset times
export const getSunriseSunset = (date: Date, coordinates: Coordinates): { sunrise: Date; sunset: Date } => {
  const julianDay = getJulianDay(date);
  const declination = getSolarDeclination(julianDay);
  const eot = getEquationOfTime(julianDay);
  const hourAngle = getHourAngle(coordinates.latitude, declination);
  
  // Convert to minutes from solar noon
  const sunriseMinutes = (hourAngle * 4) - eot - (4 * coordinates.longitude);
  const sunsetMinutes = -(hourAngle * 4) - eot - (4 * coordinates.longitude);
  
  // Solar noon is at 12:00 + timezone offset
  const solarNoon = 12 * 60; // in minutes
  
  const sunriseTime = solarNoon + sunriseMinutes;
  const sunsetTime = solarNoon + sunsetMinutes;
  
  const sunrise = new Date(date);
  sunrise.setHours(0, 0, 0, 0);
  sunrise.setMinutes(sunriseTime);
  
  const sunset = new Date(date);
  sunset.setHours(0, 0, 0, 0);
  sunset.setMinutes(sunsetTime);
  
  return { sunrise, sunset };
};

// Calculate mean longitude of the Sun
export const getSunMeanLongitude = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  const L0 = 280.4664567 + 36000.76982779 * T + 0.0003032 * T * T;
  return normalizeAngle(L0);
};

// Calculate true longitude of the Sun (simplified)
export const getSunTrueLongitude = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  const L0 = getSunMeanLongitude(julianDay);
  const M = normalizeAngle(357.5291092 + 35999.0502909 * T - 0.0001537 * T * T);
  const C = 1.9146 * Math.sin(degToRad(M)) + 0.0200 * Math.sin(degToRad(2 * M));
  
  return normalizeAngle(L0 + C);
};

// Calculate mean longitude of the Moon
export const getMoonMeanLongitude = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  const L = 218.3164591 + 481267.88134236 * T - 0.0013268 * T * T;
  return normalizeAngle(L);
};

// Calculate Moon's mean anomaly
export const getMoonMeanAnomaly = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  const M = 134.9634114 + 477198.8676313 * T + 0.0089970 * T * T;
  return normalizeAngle(M);
};

// Calculate Sun's mean anomaly
export const getSunMeanAnomaly = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001537 * T * T;
  return normalizeAngle(M);
};

// Calculate argument of latitude (Moon's argument)
export const getMoonArgumentOfLatitude = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  const F = 93.2720993 + 483202.0175273 * T - 0.0034029 * T * T;
  return normalizeAngle(F);
};

// Calculate Moon's longitude (improved accuracy)
export const getMoonTrueLongitude = (julianDay: number): number => {
  const T = (julianDay - 2451545.0) / 36525;
  
  // Moon's mean longitude
  const L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
  
  // Moon's mean anomaly
  const M = 134.9633964 + 477198.8675055 * T + 0.0087472 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
  
  // Sun's mean anomaly
  const Ms = 357.5291092 + 35999.0502909 * T - 0.0001537 * T * T + T * T * T / 24490000;
  
  // Moon's argument of latitude
  const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
  
  // Mean elongation of the Moon from the Sun
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
  
  // Convert to radians
  const MRad = degToRad(normalizeAngle(M));
  const MsRad = degToRad(normalizeAngle(Ms));
  const FRad = degToRad(normalizeAngle(F));
  const DRad = degToRad(normalizeAngle(D));
  
  // Main periodic terms for Moon's longitude (more comprehensive)
  let deltaL = 0;
  deltaL += 6.288774 * Math.sin(MRad);
  deltaL += 1.274027 * Math.sin(2 * DRad - MRad);
  deltaL += 0.658314 * Math.sin(2 * DRad);
  deltaL += 0.213618 * Math.sin(2 * MRad);
  deltaL += -0.185116 * Math.sin(MsRad);
  deltaL += -0.114332 * Math.sin(2 * FRad);
  deltaL += 0.058793 * Math.sin(2 * DRad - 2 * MRad);
  deltaL += 0.057066 * Math.sin(2 * DRad - MsRad - MRad);
  deltaL += 0.053322 * Math.sin(2 * DRad + MRad);
  deltaL += 0.045758 * Math.sin(2 * DRad - MsRad);
  deltaL += -0.040923 * Math.sin(MsRad - MRad);
  deltaL += -0.034720 * Math.sin(DRad);
  deltaL += -0.030383 * Math.sin(MsRad + MRad);
  deltaL += 0.015327 * Math.sin(2 * DRad - 2 * FRad);
  deltaL += -0.012528 * Math.sin(2 * FRad + MRad);
  deltaL += 0.010980 * Math.sin(2 * FRad - MRad);
  deltaL += 0.010675 * Math.sin(4 * DRad - MRad);
  deltaL += 0.010034 * Math.sin(3 * MRad);
  deltaL += 0.008548 * Math.sin(4 * DRad - 2 * MRad);
  
  return normalizeAngle(L + deltaL);
};

// Calculate current Ayanamsa (using Lahiri/Chitrapaksha)
export const getAyanamsa = (julianDay: number): number => {
  // Lahiri Ayanamsa calculation
  // Reference: Spica at 0° Libra on 1956-01-01 (JD 2435040.5)
  const T = (julianDay - 2451545.0) / 36525; // Centuries from J2000.0
  
  // More accurate Lahiri Ayanamsa formula
  let ayanamsa = 23.85 + 50.27 * T + 0.000013 * T * T;
  
  // Apply proper calculation based on reference date
  const daysSince1956 = julianDay - 2435040.5;
  ayanamsa = 23.85 + (daysSince1956 * 50.27) / 365.25 / 3600; // Converting arcseconds to degrees
  
  // Current more accurate formula (as of 2000.0)
  const ayanamsa2000 = 23.85 + 0.013851851 * (julianDay - 2434392.5);
  
  return ayanamsa2000;
};

// Convert tropical longitude to sidereal longitude
export const tropicalToSidereal = (tropicalLongitude: number, julianDay: number): number => {
  const ayanamsa = getAyanamsa(julianDay);
  return normalizeAngle(tropicalLongitude - ayanamsa);
};

// Format time to HH:MM AM/PM
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};