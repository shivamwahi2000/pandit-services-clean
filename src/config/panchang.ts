// Panchang calculation configuration

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// Pre-configured major Indian cities for Panchang calculations
export const MAJOR_CITIES: Location[] = [
  { name: 'Delhi', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { name: 'Pune', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
  { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
  { name: 'Lucknow', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata' },
  { name: 'Varanasi', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
  { name: 'Haridwar', latitude: 29.9457, longitude: 78.1642, timezone: 'Asia/Kolkata' },
  { name: 'Rishikesh', latitude: 30.0869, longitude: 78.2676, timezone: 'Asia/Kolkata' },
  { name: 'Ujjain', latitude: 23.1765, longitude: 75.7885, timezone: 'Asia/Kolkata' },
  { name: 'Nashik', latitude: 19.9975, longitude: 73.7898, timezone: 'Asia/Kolkata' },
];

// Default calculation settings
export const PANCHANG_CONFIG = {
  // Default location (Delhi)
  defaultLocation: MAJOR_CITIES[0],
  
  // Update intervals
  updateIntervalMinutes: 15,
  dailyUpdateHour: 0, // Midnight for new day calculations
  
  // Accuracy settings
  useHighAccuracyLocation: false,
  locationTimeoutMs: 5000,
  
  // Ayanamsa settings (Lahiri/Chitrapaksha)
  ayanamsaType: 'LAHIRI',
  
  // Calculation precision
  precisionDecimals: 4,
  
  // Time formatting
  timeFormat12Hour: true,
  includeSeconds: false,
};

// Get coordinates for a city by name
export const getCityCoordinates = (cityName: string): Location | undefined => {
  return MAJOR_CITIES.find(city => 
    city.name.toLowerCase() === cityName.toLowerCase()
  );
};

// Get the nearest city based on coordinates
export const getNearestCity = (latitude: number, longitude: number): Location => {
  let nearestCity = MAJOR_CITIES[0];
  let minDistance = Infinity;
  
  for (const city of MAJOR_CITIES) {
    const distance = Math.sqrt(
      Math.pow(city.latitude - latitude, 2) + 
      Math.pow(city.longitude - longitude, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city;
    }
  }
  
  return nearestCity;
};