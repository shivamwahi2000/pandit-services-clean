'use client';

import React from 'react';

/** ---------- Types ---------- **/
interface PlanetPosition {
  planet: string;   // "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn" | "Rahu" | "Ketu"
  house: number;    // 1..12 (North-Indian house numbering)
  sign?: string;
  degree?: number;
  retrograde?: boolean;
}

interface TraditionalKundliProps {
  planets?: PlanetPosition[];
  className?: string;
}

/** ---------- Component ---------- **/
const TraditionalKundli: React.FC<TraditionalKundliProps> = ({
  planets = [],
  className = '',
}) => {
  // Debug: Log received planets data
  console.log('TraditionalKundli received planets:', planets);
  
  // Use actual PyJhora planets data - only fallback to test data if no real data
  const activePlanets = planets.length > 0 ? planets : [
    { planet: 'Sun', house: 1 },
    { planet: 'Moon', house: 4 },
    { planet: 'Mars', house: 7 },
    { planet: 'Mercury', house: 10 },
    { planet: 'Jupiter', house: 2 },
    { planet: 'Venus', house: 11 },
    { planet: 'Saturn', house: 5 },
    { planet: 'Rahu', house: 8 },
    { planet: 'Ketu', house: 2 },
  ];
  
  console.log('Using activePlanets:', activePlanets);
  /** PyJhora-style Sanskrit abbreviations (keeping your diamond shape) */
  const planetLabels: Record<string, string> = {
    Sun: 'सू',      // Surya (PyJhora style abbreviation)
    Moon: 'च',      // Chandra  
    Mars: 'मं',      // Mangal
    Mercury: 'बु',   // Budh
    Jupiter: 'गु',   // Guru
    Venus: 'शु',     // Shukra
    Saturn: 'श',     // Shani
    Rahu: 'रा',      // Rahu
    Ketu: 'के',      // Ketu
    // Alternative names that PyJhora might use
    'Sun': 'सू',
    'Moon': 'च',
    'Mars': 'मं',
    'Mercury': 'बु',
    'Jupiter': 'गु',
    'Venus': 'शु',
    'Saturn': 'श',
    'Rahu': 'रा',
    'Ketu': 'के',
    'Ascendant': 'लग्न',
  };

  /** PyJhora-style planet colors (updated for abbreviations) */
  const planetColors: Record<string, string> = {
    सू: '#FF6B35',  // Sun - orange
    च: '#4A90E2',   // Moon - blue
    मं: '#E74C3C',  // Mars - red
    बु: '#2ECC71',  // Mercury - green
    गु: '#F39C12',  // Jupiter - yellow/orange
    शु: '#9B59B6',  // Venus - purple
    श: '#34495E',   // Saturn - dark gray
    रा: '#8E44AD',  // Rahu - purple
    के: '#95A5A6',  // Ketu - gray
    लग्न: '#C53030', // Ascendant - red
  };

  /** Helper: planets for a house */
  const getPlanetsInHouse = (house: number) =>
    activePlanets.filter((p) => p.house === house);



  return (
    <div className={`kundli-wrapper ${className}`}>
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        className="kundli-chart"
        aria-label="Traditional Kundli (empty box)"
      >
        {/* Background - completely empty */}
        <rect width="600" height="600" fill="#F4E4BC" />
        
        {/* Diagonal lines connecting opposite corners */}
        <line x1="0" y1="0" x2="600" y2="600" stroke="#8B0000" strokeWidth="2" />
        <line x1="600" y1="0" x2="0" y2="600" stroke="#8B0000" strokeWidth="2" />
        
        {/* Rhombus inscribed in the square - corners touching midpoints of edges */}
        <path d="M 300 0 L 600 300 L 300 600 L 0 300 Z" 
              fill="none" 
              stroke="#8B0000" 
              strokeWidth="2" />
        
        {/* House numbers based on traditional North Indian kundli layout from sample */}
        {/* Top triangle - House 1 (Ascendant/Lagna) */}
        <text x="300" y="80" textAnchor="middle" className="house-number">1</text>
        
        {/* Top left outer - House 12 */}
        <text x="150" y="120" textAnchor="middle" className="house-number">12</text>
        
        {/* Top right outer - House 2 */}
        <text x="450" y="120" textAnchor="middle" className="house-number">2</text>
        
        {/* Left triangle - House 11 */}
        <text x="80" y="300" textAnchor="middle" className="house-number">11</text>
        
        {/* Right triangle - House 3 */}
        <text x="520" y="300" textAnchor="middle" className="house-number">3</text>
        
        {/* Bottom left outer - House 10 */}
        <text x="150" y="480" textAnchor="middle" className="house-number">10</text>
        
        {/* Bottom triangle - House 7 */}
        <text x="300" y="520" textAnchor="middle" className="house-number">7</text>
        
        {/* Bottom right outer - House 4 */}
        <text x="450" y="480" textAnchor="middle" className="house-number">4</text>
        
        {/* Center diamond houses */}
        {/* Center top - House 8 */}
        <text x="300" y="230" textAnchor="middle" className="house-number">8</text>
        
        {/* Center left - House 9 */}
        <text x="230" y="300" textAnchor="middle" className="house-number">9</text>
        
        {/* Center bottom - House 6 */}
        <text x="300" y="370" textAnchor="middle" className="house-number">6</text>
        
        {/* Center right - House 5 */}
        <text x="370" y="300" textAnchor="middle" className="house-number">5</text>
        
        {/* Planets positioned directly in each house section */}
        {Array.from({ length: 12 }, (_, i) => {
          const houseNum = i + 1;
          const housePlanets = getPlanetsInHouse(houseNum);
          
          // Define positions for each house - moved well inside house boundaries
          const housePositions: Record<number, { 
            baseX: number; 
            baseY: number; 
            textAnchor: 'start' | 'middle' | 'end';
            direction: 'horizontal' | 'vertical';
            spacing: number;
          }> = {
            1: { baseX: 300, baseY: 110, textAnchor: 'middle', direction: 'vertical', spacing: 13 },   // Top triangle - moved down from border
            2: { baseX: 420, baseY: 150, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Top right - moved left from border
            3: { baseX: 450, baseY: 315, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Right triangle - moved left from border
            4: { baseX: 420, baseY: 440, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Bottom right - moved left and up
            5: { baseX: 335, baseY: 300, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Center right - moved left from edge
            6: { baseX: 300, baseY: 360, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Center bottom - moved up from edge
            7: { baseX: 300, baseY: 470, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Bottom triangle - moved up from border
            8: { baseX: 300, baseY: 260, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Center top - moved down from edge
            9: { baseX: 265, baseY: 300, textAnchor: 'middle', direction: 'vertical', spacing: 13 },  // Center left - moved right from edge
            10: { baseX: 180, baseY: 440, textAnchor: 'middle', direction: 'vertical', spacing: 13 }, // Bottom left - moved right and up
            11: { baseX: 150, baseY: 315, textAnchor: 'middle', direction: 'vertical', spacing: 13 }, // Left triangle - moved right from border
            12: { baseX: 180, baseY: 150, textAnchor: 'middle', direction: 'vertical', spacing: 13 }  // Top left - moved right and down
          };
          
          const position = housePositions[houseNum];
          if (!position || !housePlanets.length) return null;
          
          return (
            <g key={`house-${houseNum}-planets`}>
              {housePlanets.map((planet, planetIndex) => {
                const label = planetLabels[planet.planet] || planet.planet;
                const color = planetColors[label] || '#111827';
                
                // Calculate position based on direction and spacing
                let x = position.baseX;
                let y = position.baseY;
                
                if (position.direction === 'vertical') {
                  y += planetIndex * position.spacing;
                } else {
                  // For horizontal arrangement (if needed for crowded houses)
                  x += planetIndex * position.spacing;
                }
                
                // For houses with many planets, arrange in grid
                if (housePlanets.length > 3) {
                  const cols = 2;
                  const row = Math.floor(planetIndex / cols);
                  const col = planetIndex % cols;
                  x = position.baseX + (col * 25) - 12; // Offset to center 2-column grid
                  y = position.baseY + (row * position.spacing);
                }
                
                return (
                  <text
                    key={`${houseNum}-${planet.planet}`}
                    x={x}
                    y={y}
                    textAnchor={position.textAnchor}
                    fontSize="12"
                    fontWeight="bold"
                    fill={color}
                    fontFamily="'Noto Sans Devanagari', serif"
                  >
                    {label}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Legend (optional) */}
      <div className="legend">
        <div className="legend-row">
          <span>* वक्री</span>
          <span>^ अस्त</span>
          <span>□ वर्गोत्तम</span>
        </div>
        <div className="legend-row">
          <span>↑ उच्च</span>
          <span>↓ नीच</span>
        </div>
      </div>

      <style jsx>{`
        .kundli-wrapper {
          max-width: 640px;
          margin: 0 auto;
          padding: 16px;
        }
        .kundli-chart {
          width: 600px;
          height: 600px;
          display: block;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .house-number {
          font-family: 'Times New Roman', serif;
          font-size: 16px;
          font-weight: 700;
          fill: #7c2d12;
        }
        .legend {
          margin-top: 16px;
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          border: 2px solid #d97706;
          border-radius: 12px;
          padding: 12px;
        }
        .legend-row {
          display: flex;
          justify-content: space-around;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin: 6px 0;
        }
        @media (max-width: 480px) {
          .house-number { font-size: 14px; }
        }
      `}</style>
    </div>
  );
};

export default TraditionalKundli;