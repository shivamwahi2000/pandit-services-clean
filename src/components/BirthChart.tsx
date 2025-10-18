'use client';

import React from 'react';

interface Planet {
  sign: string;
  house: number;
  longitude: number;
  degrees_in_sign: number;
}

interface BirthChartProps {
  planets: Record<string, Planet>;
  chartType?: 'north' | 'south';
  size?: number;
}

const BirthChart: React.FC<BirthChartProps> = ({ 
  planets, 
  chartType = 'north',
  size = 400 
}) => {
  const getPlanetSymbol = (planet: string) => {
    const symbols: { [key: string]: string } = {
      'Sun': '☉', 'Moon': '☽', 'Mars': '♂', 'Mercury': '☿',
      'Jupiter': '♃', 'Venus': '♀', 'Saturn': '♄', 'Rahu': '☊', 'Ketu': '☋',
      'Ascendant': 'As'
    };
    return symbols[planet] || planet.charAt(0);
  };

  const getSignSymbol = (sign: string) => {
    const symbols: { [key: string]: string } = {
      'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
      'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    };
    return symbols[sign] || sign.substring(0, 2);
  };

  const getSignNumber = (sign: string): number => {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs.indexOf(sign);
  };

  // Group planets by house
  const planetsByHouse: { [key: number]: Array<{name: string, data: Planet}> } = {};
  Object.entries(planets).forEach(([name, data]) => {
    const house = data.house;
    if (!planetsByHouse[house]) {
      planetsByHouse[house] = [];
    }
    planetsByHouse[house].push({ name, data });
  });

  // North Indian Chart Layout
  const renderNorthChart = () => {
    const centerSize = size * 0.3;
    const houseSize = (size - centerSize) / 2;
    
    // House positions for North Indian style
    const housePositions = [
      // House 1 (Ascendant) - Top Left
      { x: 0, y: 0, w: houseSize, h: houseSize },
      // House 2 - Top Center
      { x: houseSize, y: 0, w: centerSize, h: houseSize },
      // House 3 - Top Right  
      { x: houseSize + centerSize, y: 0, w: houseSize, h: houseSize },
      // House 4 - Right Top
      { x: houseSize + centerSize, y: houseSize, w: houseSize, h: centerSize },
      // House 5 - Right Bottom
      { x: houseSize + centerSize, y: houseSize + centerSize, w: houseSize, h: houseSize },
      // House 6 - Bottom Right
      { x: houseSize, y: houseSize + centerSize, w: centerSize, h: houseSize },
      // House 7 - Bottom Left
      { x: 0, y: houseSize + centerSize, w: houseSize, h: houseSize },
      // House 8 - Left Bottom
      { x: 0, y: houseSize, w: houseSize, h: centerSize },
      // House 9 - Left Top (same as house 1 position but different)
      { x: houseSize, y: houseSize, w: centerSize * 0.5, h: centerSize * 0.5 },
      // House 10 - Center Top
      { x: houseSize + centerSize * 0.5, y: houseSize, w: centerSize * 0.5, h: centerSize * 0.5 },
      // House 11 - Center Right
      { x: houseSize + centerSize * 0.5, y: houseSize + centerSize * 0.5, w: centerSize * 0.5, h: centerSize * 0.5 },
      // House 12 - Center Left
      { x: houseSize, y: houseSize + centerSize * 0.5, w: centerSize * 0.5, h: centerSize * 0.5 }
    ];

    return (
      <svg width={size} height={size} className="border-2 border-primary">
        {/* Draw house divisions */}
        {/* Outer border */}
        <rect x="0" y="0" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2"/>
        
        {/* Horizontal lines */}
        <line x1="0" y1={houseSize} x2={size} y2={houseSize} stroke="currentColor" strokeWidth="1"/>
        <line x1="0" y1={houseSize + centerSize} x2={size} y2={houseSize + centerSize} stroke="currentColor" strokeWidth="1"/>
        
        {/* Vertical lines */}
        <line x1={houseSize} y1="0" x2={houseSize} y2={size} stroke="currentColor" strokeWidth="1"/>
        <line x1={houseSize + centerSize} y1="0" x2={houseSize + centerSize} y2={size} stroke="currentColor" strokeWidth="1"/>
        
        {/* Center diamond divisions */}
        <line x1={houseSize} y1={houseSize} x2={houseSize + centerSize} y2={houseSize + centerSize} stroke="currentColor" strokeWidth="1"/>
        <line x1={houseSize + centerSize} y1={houseSize} x2={houseSize} y2={houseSize + centerSize} stroke="currentColor" strokeWidth="1"/>

        {/* House numbers and content */}
        {Array.from({length: 12}, (_, i) => {
          const houseNum = i + 1;
          const pos = housePositions[i];
          const housePlanets = planetsByHouse[houseNum] || [];
          
          return (
            <g key={houseNum}>
              {/* House background */}
              <rect 
                x={pos.x + 2} 
                y={pos.y + 2} 
                width={pos.w - 4} 
                height={pos.h - 4} 
                fill="rgba(99, 102, 241, 0.05)"
                className="hover:fill-primary/10 transition-colors"
              />
              
              {/* House number */}
              <text 
                x={pos.x + 8} 
                y={pos.y + 16} 
                fontSize="10" 
                fontWeight="bold"
                fill="currentColor"
                className="text-text-secondary"
              >
                {houseNum}
              </text>
              
              {/* Sign symbol */}
              {housePlanets.length > 0 && (
                <text 
                  x={pos.x + pos.w - 20} 
                  y={pos.y + 16} 
                  fontSize="12" 
                  fill="currentColor"
                  className="text-accent"
                >
                  {getSignSymbol(housePlanets[0].data.sign)}
                </text>
              )}
              
              {/* Planets in house */}
              {housePlanets.map((planet, idx) => (
                <g key={planet.name}>
                  <text 
                    x={pos.x + 8 + (idx % 2) * 25} 
                    y={pos.y + 30 + Math.floor(idx / 2) * 16} 
                    fontSize="14" 
                    fontWeight="bold"
                    fill="currentColor"
                    className="text-primary"
                  >
                    {getPlanetSymbol(planet.name)}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
        
      </svg>
    );
  };

  // South Indian Chart Layout (12 fixed houses)
  const renderSouthChart = () => {
    const houseSize = size / 4;
    
    // House positions for South Indian style (fixed layout)
    const housePositions = [
      // Row 1
      { x: 0, y: 0, w: houseSize, h: houseSize }, // House 1
      { x: houseSize, y: 0, w: houseSize, h: houseSize }, // House 2  
      { x: houseSize * 2, y: 0, w: houseSize, h: houseSize }, // House 3
      { x: houseSize * 3, y: 0, w: houseSize, h: houseSize }, // House 4
      
      // Row 2
      { x: houseSize * 3, y: houseSize, w: houseSize, h: houseSize }, // House 5
      { x: houseSize * 3, y: houseSize * 2, w: houseSize, h: houseSize }, // House 6
      { x: houseSize * 3, y: houseSize * 3, w: houseSize, h: houseSize }, // House 7
      
      // Row 3
      { x: houseSize * 2, y: houseSize * 3, w: houseSize, h: houseSize }, // House 8
      { x: houseSize, y: houseSize * 3, w: houseSize, h: houseSize }, // House 9
      { x: 0, y: houseSize * 3, w: houseSize, h: houseSize }, // House 10
      
      // Row 4
      { x: 0, y: houseSize * 2, w: houseSize, h: houseSize }, // House 11
      { x: 0, y: houseSize, w: houseSize, h: houseSize }, // House 12
    ];

    return (
      <svg width={size} height={size} className="border-2 border-primary">
        {/* Draw grid */}
        {Array.from({length: 5}, (_, i) => (
          <g key={`lines-${i}`}>
            <line x1="0" y1={i * houseSize} x2={size} y2={i * houseSize} stroke="currentColor" strokeWidth="1"/>
            <line x1={i * houseSize} y1="0" x2={i * houseSize} y2={size} stroke="currentColor" strokeWidth="1"/>
          </g>
        ))}
        
        {/* Outer border */}
        <rect x="0" y="0" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2"/>

        {/* Houses */}
        {Array.from({length: 12}, (_, i) => {
          const houseNum = i + 1;
          const pos = housePositions[i];
          const housePlanets = planetsByHouse[houseNum] || [];
          
          return (
            <g key={houseNum}>
              {/* House background */}
              <rect 
                x={pos.x + 1} 
                y={pos.y + 1} 
                width={pos.w - 2} 
                height={pos.h - 2} 
                fill="rgba(99, 102, 241, 0.05)"
                className="hover:fill-primary/10 transition-colors"
              />
              
              {/* House number */}
              <text 
                x={pos.x + 8} 
                y={pos.y + 16} 
                fontSize="10" 
                fontWeight="bold"
                fill="currentColor"
                className="text-text-secondary"
              >
                {houseNum}
              </text>
              
              {/* Sign symbol */}
              {housePlanets.length > 0 && (
                <text 
                  x={pos.x + pos.w - 20} 
                  y={pos.y + 16} 
                  fontSize="12" 
                  fill="currentColor"
                  className="text-accent"
                >
                  {getSignSymbol(housePlanets[0].data.sign)}
                </text>
              )}
              
              {/* Planets in house */}
              {housePlanets.map((planet, idx) => (
                <text 
                  key={planet.name}
                  x={pos.x + 8 + (idx % 3) * 22} 
                  y={pos.y + 35 + Math.floor(idx / 3) * 18} 
                  fontSize="14" 
                  fontWeight="bold"
                  fill="currentColor"
                  className="text-primary"
                >
                  {getPlanetSymbol(planet.name)}
                </text>
              ))}
            </g>
          );
        })}
        
        {/* Center boxes are empty in South Indian style - they're part of houses */}
      </svg>
    );
  };

  return (
    <div className="bg-surface rounded-lg p-4 border border-line">
      <div className="flex flex-col items-center space-y-4">
        {chartType === 'north' ? renderNorthChart() : renderSouthChart()}
        
        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {Object.entries(planets).slice(0, 8).map(([name, data]) => (
            <div key={name} className="flex items-center space-x-1">
              <span className="text-primary font-bold text-sm">{getPlanetSymbol(name)}</span>
              <span className="text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BirthChart;