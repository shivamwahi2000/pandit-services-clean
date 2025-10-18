'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ClockTimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

const ClockTimePicker: React.FC<ClockTimePickerProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [manualInput, setManualInput] = useState('');

  // Parse initial value
  useEffect(() => {
    if (value) {
      // Parse 24-hour format (HH:MM)
      const [h, m] = value.split(':').map(Number);
      if (h !== undefined && m !== undefined) {
        const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        const period = h >= 12 ? 'PM' : 'AM';
        setHours(hour12);
        setMinutes(m);
        setPeriod(period);
      }
    }
  }, [value]);

  // Update parent when user changes time (not on initial load)
  const updateParent = React.useCallback(() => {
    const time24 = convert12to24(hours, minutes, period);
    if (time24 !== value) {
      onChange(time24);
    }
  }, [hours, minutes, period, value, onChange]);

  // Auto-populate when AM/PM is selected
  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod);
    // If no time is set yet, auto-populate with current time
    if (!value || value === '') {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const hour12 = currentHour === 0 ? 12 : currentHour > 12 ? currentHour - 12 : currentHour;
      const currentPeriod = currentHour >= 12 ? 'PM' : 'AM';
      
      setHours(hour12);
      setMinutes(currentMinute);
      setPeriod(newPeriod);
      
      setTimeout(() => {
        const time24 = convert12to24(hour12, currentMinute, newPeriod);
        onChange(time24);
      }, 50);
    } else {
      setTimeout(updateParent, 50);
    }
  };

  // Handle manual input
  const handleManualInput = (input: string) => {
    setManualInput(input);
    
    // Parse manual input (formats: HH:MM, H:MM, HH:MM AM/PM, H:MM AM/PM)
    const timeRegex = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i;
    const match = input.match(timeRegex);
    
    if (match) {
      const [, hourStr, minuteStr, periodStr] = match;
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      if (hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59) {
        setHours(hour);
        setMinutes(minute);
        
        if (periodStr) {
          setPeriod(periodStr.toUpperCase() as 'AM' | 'PM');
        }
        
        // Auto-open modal when time is entered in main input
        if (!isOpen && input.includes(':')) {
          setIsOpen(true);
        }
        
        setTimeout(() => {
          const time24 = convert12to24(hour, minute, periodStr?.toUpperCase() as 'AM' | 'PM' || period);
          onChange(time24);
        }, 50);
      }
    }
  };

  const convert12to24 = (h: number, m: number, p: 'AM' | 'PM') => {
    let hour24 = h;
    if (p === 'AM' && h === 12) hour24 = 0;
    if (p === 'PM' && h !== 12) hour24 = h + 12;
    return `${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const formatDisplayTime = () => {
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };


  const renderScrollableWheel = (type: 'hours' | 'minutes') => {
    const baseValues = type === 'hours' 
      ? Array.from({length: 12}, (_, i) => i + 1)
      : Array.from({length: 60}, (_, i) => i);
    
    // Create infinite scroll effect by repeating values
    const values = [...baseValues, ...baseValues, ...baseValues];
    const currentValue = type === 'hours' ? hours : minutes;
    
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm font-semibold text-red-700 mb-3 capitalize">
          {type === 'hours' ? 'Hour' : 'Min'}
        </div>
        <div className="relative w-20 h-40 bg-white rounded-xl border-2 border-red-200 shadow-lg overflow-hidden">
          {/* Selection indicator */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-10 bg-red-600/10 border-y border-red-400 pointer-events-none z-10"></div>
          
          {/* Scrollable container */}
          <div 
            className="h-full overflow-y-auto scroll-smooth px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: 'none'
            } as React.CSSProperties}
          >
            {/* Top padding */}
            <div className="h-15"></div>
            
            {values.map((value, index) => {
              const normalizedValue = type === 'hours' 
                ? value === 0 ? 12 : value
                : value;
              const isSelected = normalizedValue === currentValue;
              
              return (
                <div
                  key={`${value}-${index}`}
                  onClick={() => {
                    if (type === 'hours') {
                      setHours(normalizedValue);
                    } else {
                      setMinutes(normalizedValue);
                    }
                    setTimeout(updateParent, 50);
                  }}
                  className={`h-10 flex items-center justify-center cursor-pointer font-mono text-xl font-bold transition-all duration-150 ${
                    isSelected 
                      ? 'text-red-600 scale-110 font-black' 
                      : 'text-gray-500 hover:text-red-500 hover:scale-105'
                  }`}
                >
                  {normalizedValue.toString().padStart(2, '0')}
                </div>
              );
            })}
            
            {/* Bottom padding */}
            <div className="h-15"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Time Display Input */}
      <div className="relative">
        <input
          type="text"
          value={manualInput || (value ? formatDisplayTime() : '')}
          onChange={(e) => handleManualInput(e.target.value)}
          onFocus={(e) => {
            setIsOpen(true);
            setManualInput(value ? formatDisplayTime() : '');
            e.target.select();
          }}
          onBlur={() => {
            if (!manualInput.match(/^\d{1,2}:\d{2}\s*(AM|PM)?$/i)) {
              setManualInput('');
            }
          }}
          placeholder="Select birth time"
          className="w-full px-4 py-3 pr-12 bg-white border-2 border-red-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-600 transition-colors"
        >
          <div className="flex items-center space-x-1">
            <span className="text-lg">🕐</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Clock Picker Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-red-200 p-6 z-50 max-w-sm mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Select Birth Time</h3>
            <input
              type="text"
              value={manualInput || formatDisplayTime()}
              onChange={(e) => handleManualInput(e.target.value)}
              onFocus={(e) => {
                setManualInput(formatDisplayTime());
                e.target.select();
              }}
              onBlur={() => {
                if (!manualInput.match(/^\d{1,2}:\d{2}\s*(AM|PM)?$/i)) {
                  setManualInput('');
                }
              }}
              className="w-48 text-2xl font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-4 text-center focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
            />
          </div>

          {/* Digital Time Picker */}
          <div className="mb-6">
            <div className="flex justify-center items-center gap-8">
              {renderScrollableWheel('hours')}
              <div className="text-3xl font-bold text-red-400 mt-8">:</div>
              {renderScrollableWheel('minutes')}
            </div>
          </div>

          {/* AM/PM Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-50 rounded-xl p-1 flex border border-red-200">
              <button
                type="button"
                onClick={() => handlePeriodChange('AM')}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  period === 'AM'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-red-600 hover:bg-red-100'
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => handlePeriodChange('PM')}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  period === 'PM'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-red-600 hover:bg-red-100'
                }`}
              >
                PM
              </button>
            </div>
          </div>

          {/* Done Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Set Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockTimePicker;