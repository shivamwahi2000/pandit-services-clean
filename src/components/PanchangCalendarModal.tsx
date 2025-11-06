'use client';

import { useState, useEffect } from 'react';

interface PanchangDay {
  date: number;
  tithi: string;
  nakshatra: string;
  isToday: boolean;
  isAuspicious: boolean;
}

interface PanchangCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate?: Date;
}

export default function PanchangCalendarModal({ isOpen, onClose, currentDate = new Date() }: PanchangCalendarModalProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState<PanchangDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<PanchangDay | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Tithi names for reference
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
  ];

  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];

  useEffect(() => {
    if (isOpen) {
      generateCalendar();
    }
  }, [isOpen, selectedMonth, selectedYear]);

  const generateCalendar = async () => {
    setLoading(true);
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: PanchangDay[] = [];
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({
        date: 0,
        tithi: '',
        nakshatra: '',
        isToday: false,
        isAuspicious: false
      });
    }

    // Generate days for the month
    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(selectedYear, selectedMonth, date);
      const isToday = date === todayDate && selectedMonth === todayMonth && selectedYear === todayYear;

      // Calculate tithi (simplified calculation based on date)
      // In production, this should call the panchang API
      const tithiIndex = (date + selectedMonth * 2) % 15;
      const paksha = Math.floor((date - 1) / 15) % 2 === 0 ? 'Shukla' : 'Krishna';
      const tithiName = tithiIndex === 0 && paksha === 'Shukla' ? 'Purnima' :
                       tithiIndex === 0 && paksha === 'Krishna' ? 'Amavasya' :
                       tithiNames[tithiIndex];

      const nakshatra = nakshatraNames[(date + selectedMonth * 3) % 27];

      // Mark auspicious days (Ekadashi, Purnima, Amavasya)
      const isAuspicious = tithiName === 'Ekadashi' || tithiName === 'Purnima' || tithiName === 'Amavasya';

      days.push({
        date,
        tithi: `${paksha} ${tithiName}`,
        nakshatra,
        isToday,
        isAuspicious
      });
    }

    setCalendarDays(days);
    setLoading(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const handleDayClick = (day: PanchangDay) => {
    if (day.date > 0) {
      setSelectedDay(day);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-line">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-accent p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Panchang Calendar
            </h2>
            <p className="text-white/80 text-sm">View Tithi and Nakshatra for the entire month</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Calendar Content */}
        <div className="p-6">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="px-4 py-2 bg-surface hover:bg-primary/10 rounded-lg border border-line transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-primary">
                {monthNames[selectedMonth]} {selectedYear}
              </h3>
            </div>

            <button
              onClick={() => navigateMonth('next')}
              className="px-4 py-2 bg-surface hover:bg-primary/10 rounded-lg border border-line transition-colors flex items-center gap-2"
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/20 border-2 border-primary rounded"></div>
              <span className="text-text-secondary">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent/20 border border-accent rounded"></div>
              <span className="text-text-secondary">Auspicious Days</span>
            </div>
          </div>

          {/* Calendar Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-text-secondary mt-4">Loading calendar...</p>
            </div>
          ) : (
            <>
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-semibold text-primary py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDayClick(day)}
                    disabled={day.date === 0}
                    className={`
                      p-2 rounded-lg border transition-all min-h-[80px] md:min-h-[100px]
                      ${day.date === 0 ? 'invisible' : ''}
                      ${day.isToday ? 'bg-primary/20 border-primary border-2 shadow-lg' : 'bg-surface border-line hover:border-primary/50'}
                      ${day.isAuspicious ? 'bg-accent/10 border-accent' : ''}
                      ${selectedDay?.date === day.date ? 'ring-2 ring-primary' : ''}
                      disabled:cursor-not-allowed cursor-pointer
                    `}
                  >
                    {day.date > 0 && (
                      <div className="flex flex-col h-full">
                        <div className="font-bold text-lg text-primary mb-1">{day.date}</div>
                        <div className="text-xs text-text-secondary line-clamp-2 flex-1">
                          {day.tithi}
                        </div>
                        {day.isAuspicious && (
                          <div className="text-xs text-accent font-semibold mt-1">✨</div>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Day Details */}
              {selectedDay && selectedDay.date > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <h4 className="font-bold text-primary mb-3">
                    {monthNames[selectedMonth]} {selectedDay.date}, {selectedYear}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Tithi:</span>
                      <span className="ml-2 font-semibold text-primary">{selectedDay.tithi}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Nakshatra:</span>
                      <span className="ml-2 font-semibold text-primary">{selectedDay.nakshatra}</span>
                    </div>
                  </div>
                  {selectedDay.isAuspicious && (
                    <div className="mt-3 text-accent font-semibold flex items-center gap-2">
                      ✨ Auspicious Day for Rituals
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Note */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-text-secondary">
              <strong className="text-primary">Note:</strong> This calendar shows approximate Tithi and Nakshatra data.
              For precise muhurat and ritual timing, please consult with our pandits or use the detailed panchang for specific dates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
