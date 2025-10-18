// Location utilities for geocoding and major Indian cities

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  state?: string;
  country?: string;
  pincode?: string;
  district?: string;
}

// No hardcoded cities - using India Post API for comprehensive coverage

// Search locations using multiple reliable APIs
export const searchLocations = async (query: string): Promise<Location[]> => {
  if (!query || query.length < 2) return [];
  
  // Only run on client side
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    // Check if it's a PIN code (complete)
    if (/^\d{6}$/.test(query)) {
      try {
        const pincodeResults = await searchByPincode(query);
        if (pincodeResults.length > 0) {
          // Get coordinates for PIN code results using OpenStreetMap
          const enhancedResults = await Promise.all(
            pincodeResults.slice(0, 5).map(async (location) => {
              try {
                const coords = await getCoordinatesFromOSM(location.name, location.state);
                return {
                  ...location,
                  latitude: coords?.latitude || 0,
                  longitude: coords?.longitude || 0
                };
              } catch (error) {
                console.warn(`Failed to get coordinates for ${location.name}:`, error);
                return location;
              }
            })
          );
          return enhancedResults;
        }
        return [];
      } catch (error) {
        console.warn('PIN code search failed:', error);
        return [];
      }
    }
    
    // For location names, use OpenStreetMap as primary source
    if (query.length >= 2) {
      const osmResults = await searchWithOpenStreetMap(query);
      if (osmResults.length > 0) {
        return osmResults.slice(0, 10);
      }
      
      // Fallback: try India Post API and enhance with coordinates
      try {
        const postResults = await searchByLocationName(query);
        if (postResults.length > 0) {
          const enhancedResults = await Promise.all(
            postResults.slice(0, 5).map(async (location) => {
              try {
                const coords = await getCoordinatesFromOSM(location.name, location.state);
                return {
                  ...location,
                  latitude: coords?.latitude || 0,
                  longitude: coords?.longitude || 0
                };
              } catch (error) {
                console.warn(`Failed to get coordinates for ${location.name}:`, error);
                return location;
              }
            })
          );
          return enhancedResults;
        }
      } catch (error) {
        console.warn('India Post API fallback failed:', error);
      }
    }
    
    return [];
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};


// Get exact city by name using API
export const getCityByName = async (name: string): Promise<Location | null> => {
  if (!name || typeof window === 'undefined') return null;
  
  try {
    const results = await searchByLocationName(name);
    return results.find(city => 
      city.name.toLowerCase() === name.toLowerCase()
    ) || (results.length > 0 ? results[0] : null);
  } catch (error) {
    console.error('Get city error:', error);
    return null;
  }
};

// Get coordinates for a city name
export const getCoordinates = async (cityName: string): Promise<{ latitude: number; longitude: number } | null> => {
  const city = await getCityByName(cityName);
  if (city && city.latitude && city.longitude) {
    return { latitude: city.latitude, longitude: city.longitude };
  }
  return null;
};

// Format city display name
export const formatCityName = (city: Location): string => {
  return city.state ? `${city.name}, ${city.state}` : city.name;
};

// Get nearest city based on coordinates (simplified - would need a broader database)
export const getNearestCity = async (latitude: number, longitude: number): Promise<Location | null> => {
  // For now, return a default fallback or use reverse geocoding
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&countrycodes=in`
    );
    const data = await response.json();
    
    if (data && data.display_name) {
      const placeName = data.display_name.split(',')[0];
      return {
        name: placeName,
        latitude: latitude,
        longitude: longitude,
        country: 'India'
      };
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
  }
  
  return null;
};

// India Post PIN Code API interfaces
interface PostalData {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

interface PostalApiResponse {
  Message: string;
  Status: string;
  PostOffice: PostalData[] | null;
}

// Search by PIN code using India Post API (client-side only)
export const searchByPincode = async (pincode: string): Promise<Location[]> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    if (!/^\d{6}$/.test(pincode)) {
      return [];
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`India Post API returned ${response.status} for PIN code: ${pincode}`);
      return [];
    }

    const data: PostalApiResponse[] = await response.json();
    
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice) {
      return data[0].PostOffice.map(po => ({
        name: po.Name,
        latitude: 0, // PIN code API doesn't provide coordinates
        longitude: 0,
        state: po.State,
        country: po.Country,
        pincode: po.Pincode,
        district: po.District
      }));
    }
    
    return [];
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('India Post API request timed out for PIN code:', pincode);
      } else {
        console.warn('India Post API error for PIN code:', pincode, error.message);
      }
    }
    return [];
  }
};

// Search by location name using India Post API (client-side only)
export const searchByLocationName = async (locationName: string): Promise<Location[]> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    if (locationName.length < 3) {
      return [];
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(locationName)}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`India Post API returned ${response.status} for query: ${locationName}`);
      return [];
    }

    const data: PostalApiResponse[] = await response.json();
    
    if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice) {
      return data[0].PostOffice.map(po => ({
        name: po.Name,
        latitude: 0,
        longitude: 0,
        state: po.State,
        country: po.Country,
        pincode: po.Pincode,
        district: po.District
      }));
    }
    
    return [];
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('India Post API request timed out for query:', locationName);
      } else {
        console.warn('India Post API error for query:', locationName, error.message);
      }
    }
    return [];
  }
};

// Enhanced geocoding with India Post API + OpenStreetMap fallback
export const geocodeLocation = async (locationName: string): Promise<Location | null> => {
  try {
    // Check if it's a PIN code
    if (/^\d{6}$/.test(locationName)) {
      const pincodeResults = await searchByPincode(locationName);
      if (pincodeResults.length > 0) {
        // Get coordinates from OpenStreetMap for the first result
        const location = pincodeResults[0];
        const coordinates = await getCoordinatesFromOSM(location.name, location.state);
        return {
          ...location,
          latitude: coordinates?.latitude || 0,
          longitude: coordinates?.longitude || 0
        };
      }
    }

    // Try India Post API for location name
    const postResults = await searchByLocationName(locationName);
    if (postResults.length > 0) {
      const location = postResults[0];
      const coordinates = await getCoordinatesFromOSM(location.name, location.state);
      return {
        ...location,
        latitude: coordinates?.latitude || 0,
        longitude: coordinates?.longitude || 0
      };
    }

    // Fallback to OpenStreetMap
    const coordinates = await getCoordinatesFromOSM(locationName);
    if (coordinates) {
      return {
        name: locationName,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        country: 'India'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// Search with OpenStreetMap Nominatim API (client-side only)
const searchWithOpenStreetMap = async (query: string): Promise<Location[]> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const searchQuery = `${query}, India`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in&limit=10&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error('OSM search failed');
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
      return data.map((result: any) => {
        const address = result.address || {};
        const state = address.state || address.state_district || '';
        const district = address.state_district || address.county || '';
        
        return {
          name: result.display_name.split(',')[0].trim(),
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          state: state,
          country: 'India',
          district: district !== state ? district : undefined
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('OSM search error:', error);
    return [];
  }
};

// Helper function to get coordinates from OpenStreetMap (client-side only)
const getCoordinatesFromOSM = async (locationName: string, state?: string): Promise<{latitude: number, longitude: number} | null> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const query = state ? `${locationName}, ${state}, India` : `${locationName}, India`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('OSM geocoding failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon)
      };
    }
    
    return null;
  } catch (error) {
    console.error('OSM geocoding error:', error);
    return null;
  }
};

// Default location (Delhi) for fallback
export const DEFAULT_LOCATION: Location = {
  name: 'Delhi',
  latitude: 28.6139,
  longitude: 77.2090,
  state: 'Delhi',
  country: 'India'
};