'use client';

import { useState, useEffect } from 'react';

interface PanchangData {
  day: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  date: string;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date;
  // Additional data we get from API
  nakshatraLord: string;
  paksha: string;
  tithiEnd: string;
  nakshatraEnd: string;
  yogaEnd: string;
  karanaEnd: string;
}

// Default coordinates (Mumbai, India)
const DEFAULT_COORDINATES = {
  latitude: 19.0821978,
  longitude: 72.7411014
};

const usePanchang = (autoFetch: boolean = false) => {
  const [panchangData, setPanchangData] = useState<PanchangData>({
    day: '',
    tithi: '',
    nakshatra: '',
    yoga: '',
    karana: '',
    sunrise: '',
    sunset: '',
    moonrise: '',
    moonset: '',
    date: '',
    isLoading: true,
    error: null,
    lastUpdated: new Date(),
    nakshatraLord: '',
    paksha: '',
    tithiEnd: '',
    nakshatraEnd: '',
    yogaEnd: '',
    karanaEnd: '',
  });


  const fetchPanchangFromAPI = async (): Promise<PanchangData> => {
    try {
      const now = new Date();
      
      // Get user's coordinates (fallback to Mumbai)
      let coordinates = DEFAULT_COORDINATES;
      
      // Try to get user's location
      if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              enableHighAccuracy: false
            });
          });
          
          coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        } catch (geoError) {
          console.log('Using default location (Mumbai) as geolocation failed:', geoError);
        }
      }

      // Call our internal API route (powered by PyJHora)
      const panchangResponse = await fetch('/api/panchang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          datetime: new Date().toISOString()
        }),
      });

      if (!panchangResponse.ok) {
        let errorData;
        try {
          errorData = await panchangResponse.json();
        } catch {
          errorData = { error: `HTTP ${panchangResponse.status}` };
        }
        console.error('Panchang Hook Error:', {
          status: panchangResponse.status,
          statusText: panchangResponse.statusText,
          errorData: errorData
        });
        throw new Error(`Failed to fetch panchang data: ${errorData.error || panchangResponse.status}`);
      }

      const panchangResult = await panchangResponse.json();
      console.log('API Response:', panchangResult); // Debug log
      
      const data = panchangResult.data;

      // Extract current elements from arrays (get the currently active one)
      const currentTime = new Date();
      
      // Get the current panchang elements (they're already the active ones from PyJHora)
      const currentTithi = data.tithi?.[0];
      const currentNakshatra = data.nakshatra?.[0];
      const currentYoga = data.yoga?.[0];
      const currentKarana = data.karana?.[0];

      // Format time - handle both full datetime strings and simple time strings
      const formatTime = (timeString: string): string => {
        if (!timeString || timeString === 'N/A') return 'N/A';
        
        // If it's already in HH:MM format, convert to 12-hour format
        if (timeString.match(/^\d{1,2}:\d{2}$/)) {
          try {
            const [hours, minutes] = timeString.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
            return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
          } catch {
            return timeString;
          }
        }
        
        // If it's a full datetime string, parse it normally
        try {
          const date = new Date(timeString);
          return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
          });
        } catch {
          return timeString; // Return as-is if parsing fails
        }
      };

      // Format tithi with paksha (e.g., "Shukla Saptami")
      const formatTithi = (tithi: any): string => {
        if (!tithi) return 'N/A';
        
        if (tithi.name === 'Saptami' && tithi.paksha === 'Shukla Paksha') {
          return 'Shukla Saptami';
        } else if (tithi.name === 'Saptami' && tithi.paksha === 'Krishna Paksha') {
          return 'Krishna Saptami';
        } else if (tithi.paksha) {
          const paksha = tithi.paksha.replace(' Paksha', '');
          return `${paksha} ${tithi.name}`;
        }
        
        return tithi.name;
      };

      return {
        day: data.vara?.name || currentTime.toLocaleDateString('en-IN', { weekday: 'long' }),
        tithi: formatTithi(currentTithi),
        nakshatra: currentNakshatra?.name || 'N/A',
        yoga: currentYoga?.name || 'N/A',
        karana: currentKarana?.name || 'N/A',
        sunrise: formatTime(data.sunrise),
        sunset: formatTime(data.sunset),
        moonrise: formatTime(data.moonrise),
        moonset: formatTime(data.moonset),
        date: currentTime.toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        isLoading: false,
        error: null,
        lastUpdated: currentTime,
        // Additional data from API
        nakshatraLord: currentNakshatra?.lord?.name || 'N/A',
        paksha: currentTithi?.paksha || 'N/A',
        tithiEnd: formatTime(currentTithi?.end) || 'N/A',
        nakshatraEnd: formatTime(currentNakshatra?.end) || 'N/A',
        yogaEnd: formatTime(currentYoga?.end) || 'N/A',
        karanaEnd: formatTime(currentKarana?.end) || 'N/A',
      };
    } catch (error) {
      console.error('Error fetching panchang from API:', error);
      
      // Return fallback data instead of throwing
      const today = new Date();
      const currentTime = today.toISOString();
      
      return {
        tithi: 'Calculating...',
        nakshatra: 'Calculating...',
        yoga: 'Calculating...',
        karana: 'Calculating...',
        day: today.toLocaleDateString('en-IN', { weekday: 'long' }),
        sunrise: '6:30 AM',
        sunset: '6:30 PM',
        moonrise: 'N/A',
        moonset: 'N/A',
        date: today.toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        isLoading: false,
        error: 'Panchang service starting up...',
        lastUpdated: today,
        nakshatraLord: 'N/A',
        paksha: 'N/A',
        tithiEnd: 'N/A',
        nakshatraEnd: 'N/A',
        yogaEnd: 'N/A',
        karanaEnd: 'N/A',
      };
    }
  };

  const fetchPanchangData = async () => {
    setPanchangData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await fetchPanchangFromAPI();
      setPanchangData(data);
    } catch (error) {
      setPanchangData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      }));
    }
  };

  const refreshPanchang = () => {
    fetchPanchangData();
  };

  useEffect(() => {
    // Only fetch if autoFetch is enabled
    if (!autoFetch) {
      setPanchangData(prev => ({ ...prev, isLoading: false }));
      return;
    }

    // Initial fetch
    fetchPanchangData();
    
    // Update every 15 minutes
    const interval = setInterval(fetchPanchangData, 15 * 60 * 1000);
    
    // Also update at midnight for new day
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 1, 0); // 1 second after midnight
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    const midnightTimeout = setTimeout(() => {
      fetchPanchangData();
      // Set up daily updates
      const dailyInterval = setInterval(fetchPanchangData, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);
    
    return () => {
      clearInterval(interval);
      clearTimeout(midnightTimeout);
    };
  }, [autoFetch]);

  return { 
    panchangData, 
    refreshPanchang,
    isCalculating: panchangData.isLoading
  };
};

export default usePanchang;