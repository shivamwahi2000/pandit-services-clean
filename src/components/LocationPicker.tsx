'use client';

import { useState, useEffect, useRef } from 'react';
import { searchLocations as searchLocationAPI, formatCityName, type Location } from '@/utils/locations';

interface LocationPickerProps {
  value: string;
  onChange: (location: Location | null) => void;
  placeholder?: string;
  className?: string;
}

export default function LocationPicker({ value, onChange, placeholder = "Enter PIN code or district name", className = "" }: LocationPickerProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const searchLocations = async () => {
      // Don't search if a location was just selected
      if (isLocationSelected) {
        return;
      }
      
      if (query.length >= 2) {
        setIsLoading(true);
        setHasSearched(false);
        try {
          // Use India Post API search
          const results = await searchLocationAPI(query);
          setSuggestions(results);
          setIsOpen(results.length > 0);
          setSelectedIndex(-1);
          setHasSearched(true);
        } catch (error) {
          console.error('Location search failed:', error);
          setSuggestions([]);
          setIsOpen(false);
          setSelectedIndex(-1);
          setHasSearched(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
        setIsLoading(false);
        setHasSearched(false);
      }
    };

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(searchLocations, 300);
    return () => clearTimeout(timeoutId);
  }, [query, isLocationSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsLocationSelected(false); // Reset selection flag when user types
    
    if (newQuery.length < 2) {
      onChange(null);
    }
  };

  const handleSuggestionClick = (city: Location) => {
    setQuery(formatCityName(city));
    setIsLocationSelected(true); // Mark that a location was selected
    onChange(city);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay closing to allow for suggestion clicks
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => {
          if (suggestions.length > 0 && !isLocationSelected) {
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background"
        autoComplete="off"
      />
      
      {isLoading && (
        <div className="absolute right-3 top-2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-line rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <div
              key={`${city.name}-${city.state}-${city.pincode || index}`}
              ref={el => { suggestionRefs.current[index] = el; }}
              onClick={() => handleSuggestionClick(city)}
              className={`px-3 py-2 cursor-pointer text-sm hover:bg-elevations transition-colors ${
                selectedIndex === index ? 'bg-elevations' : ''
              }`}
            >
              <div className="font-medium text-text-primary">{city.name}</div>
              <div className="text-xs text-text-secondary">
                {city.district && city.district !== city.name && `${city.district}, `}
                {city.state}{city.pincode && ` - ${city.pincode}`}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {query.length >= 2 && suggestions.length === 0 && !isLoading && hasSearched && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-line rounded-lg shadow-lg">
          <div className="px-3 py-2 text-sm text-text-secondary">
            <div className="font-medium mb-1">No locations found</div>
            <div className="text-xs">
              Try searching by:
              <br />• District name (e.g., &quot;Pune&quot;, &quot;Thane&quot;)
              <br />• PIN code (e.g., &quot;400001&quot;, &quot;411001&quot;)
              <br />• City name with state
            </div>
          </div>
        </div>
      )}
    </div>
  );
}