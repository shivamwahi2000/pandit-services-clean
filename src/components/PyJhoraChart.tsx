'use client';

import React from 'react';

/** ---------- Types ---------- **/
interface PlanetPosition {
  planet: string;
  house: number;
  sign?: string;
  degree?: number;
  longitude?: number;
  retrograde?: boolean;
}

interface PyJhoraChartProps {
  planets?: PlanetPosition[];
  chartType?: 'rasi' | 'navamsa';
  className?: string;
}

/** ---------- Component ---------- **/
const PyJhoraChart: React.FC<PyJhoraChartProps> = ({
  planets = [],
  chartType = 'rasi',
  className = '',
}) => {
  
  // Use test data if no planets provided
  const testPlanets = planets.length === 0 ? [
    { planet: 'Sun', house: 1, sign: 'Aries', degree: 15.5 },
    { planet: 'Moon', house: 4, sign: 'Cancer', degree: 22.3 },
    { planet: 'Mars', house: 7, sign: 'Libra', degree: 8.7 },
    { planet: 'Mercury', house: 2, sign: 'Taurus', degree: 28.1 },
    { planet: 'Jupiter', house: 5, sign: 'Leo', degree: 12.9 },
    { planet: 'Venus', house: 3, sign: 'Gemini', degree: 5.4 },
    { planet: 'Saturn', house: 10, sign: 'Capricorn', degree: 18.2 },
    { planet: 'Rahu', house: 8, sign: 'Scorpio', degree: 25.6 },
    { planet: 'Ketu', house: 2, sign: 'Taurus', degree: 25.6 },
  ] : planets;
  
  /** PyJhora-style planet labels in Sanskrit (authentic abbreviations) */
  const planetLabels: Record<string, string> = {
    Sun: 'सू',      // Surya
    Moon: 'च',      // Chandra  
    Mars: 'मं',      // Mangal
    Mercury: 'बु',   // Budh
    Jupiter: 'गु',   // Guru
    Venus: 'शु',     // Shukra
    Saturn: 'श',     // Shani
    Rahu: 'रा',      // Rahu
    Ketu: 'के',      // Ketu
    Ascendant: 'लग्न', // Lagna
  };

  /** PyJhora-style planet colors */
  const planetColors: Record<string, string> = {
    सू: '#FF6B35', // Sun - orange
    च: '#4A90E2',  // Moon - blue
    मं: '#E74C3C', // Mars - red
    बु: '#2ECC71', // Mercury - green
    गु: '#F39C12', // Jupiter - yellow/orange
    शु: '#9B59B6', // Venus - purple
    श: '#34495E',  // Saturn - dark gray
    रा: '#8E44AD', // Rahu - purple
    के: '#95A5A6', // Ketu - gray
  };

  /** Helper: Get planets for a specific house using PyJhora logic */
  const getPlanetsInHouse = (house: number) => {
    return testPlanets.filter((p) => p.house === house);
  };

  /** Render planets as text elements (PyJhora style) */
  const renderHousePlanets = (house: number, x: number, y: number, textAnchor: string = 'middle') => {
    const housePlanets = getPlanetsInHouse(house);
    if (!housePlanets.length) return null;

    return (
      <text 
        x={x} 
        y={y} 
        textAnchor={textAnchor} 
        fontSize="11" 
        fontFamily="'Noto Sans Devanagari', sans-serif"
        className="planet-text"
      >
        {housePlanets.map((planet, i) => {
          const label = planetLabels[planet.planet] || planet.planet.slice(0, 2);
          const color = planetColors[label] || '#333';
          
          return (
            <tspan
              key={`${house}-${i}`}
              x={x}
              dy={i === 0 ? '0' : '14'}
              fill={color}
              fontWeight="600"
              fontSize="11"
            >
              {label}
              {planet.retrograde ? '*' : ''}
            </tspan>
          );
        })}
      </text>
    );
  };

  /** Traditional North Indian Diamond Chart using PyJhora house logic */
  const renderDiamondChart = () => {
    const size = 500;
    const center = size / 2;
    const outerRadius = size * 0.4;
    const innerRadius = size * 0.2;

    // House positions in traditional North Indian style
    const housePositions = {
      1: { x: center, y: 60, textAnchor: 'middle' },          // Top (Ascendant)
      2: { x: center + 160, y: 100, textAnchor: 'middle' },   // Top-right
      3: { x: center + 190, y: center, textAnchor: 'start' }, // Right
      4: { x: center + 160, y: center + 140, textAnchor: 'middle' }, // Bottom-right
      5: { x: center + 60, y: center + 30, textAnchor: 'middle' },   // Inner right
      6: { x: center, y: center + 60, textAnchor: 'middle' },        // Inner bottom
      7: { x: center, y: size - 60, textAnchor: 'middle' },          // Bottom
      8: { x: center - 160, y: center + 140, textAnchor: 'middle' }, // Bottom-left
      9: { x: center - 60, y: center + 30, textAnchor: 'middle' },   // Inner left
      10: { x: center - 190, y: center, textAnchor: 'end' },         // Left
      11: { x: center - 160, y: 100, textAnchor: 'middle' },         // Top-left
      12: { x: center, y: center - 60, textAnchor: 'middle' },       // Inner top
    };

    return (
      <div className={`pyjhora-chart-wrapper ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="pyjhora-diamond-chart"
        >
          {/* Background */}
          <rect width={size} height={size} fill="#FFFEF7" stroke="#8B4513" strokeWidth="2" />
          
          {/* Outer diamond */}
          <path 
            d={`M ${center} 40 L ${size - 40} ${center} L ${center} ${size - 40} L 40 ${center} Z`}
            fill="none" 
            stroke="#8B4513" 
            strokeWidth="2"
          />
          
          {/* Inner diamond */}
          <path 
            d={`M ${center} ${center - innerRadius} L ${center + innerRadius} ${center} L ${center} ${center + innerRadius} L ${center - innerRadius} ${center} Z`}
            fill="none" 
            stroke="#8B4513" 
            strokeWidth="1"
          />
          
          {/* Diagonal lines from corners to center diamond */}
          <line x1="40" y1={center} x2={center - innerRadius} y2={center} stroke="#8B4513" strokeWidth="1" />
          <line x1={size - 40} y1={center} x2={center + innerRadius} y2={center} stroke="#8B4513" strokeWidth="1" />
          <line x1={center} y1="40" x2={center} y2={center - innerRadius} stroke="#8B4513" strokeWidth="1" />
          <line x1={center} y1={size - 40} x2={center} y2={center + innerRadius} stroke="#8B4513" strokeWidth="1" />
          
          {/* Diagonal lines from corners to opposite corners */}
          <line x1={center} y1="40" x2={center + 120} y2={center - 60} stroke="#8B4513" strokeWidth="1" />
          <line x1={center} y1="40" x2={center - 120} y2={center - 60} stroke="#8B4513" strokeWidth="1" />
          <line x1={size - 40} y1={center} x2={center + 120} y2={center - 60} stroke="#8B4513" strokeWidth="1" />
          <line x1={size - 40} y1={center} x2={center + 120} y2={center + 60} stroke="#8B4513" strokeWidth="1" />
          <line x1={center} y1={size - 40} x2={center + 120} y2={center + 60} stroke="#8B4513" strokeWidth="1" />
          <line x1={center} y1={size - 40} x2={center - 120} y2={center + 60} stroke="#8B4513" strokeWidth="1" />
          <line x1="40" y1={center} x2={center - 120} y2={center + 60} stroke="#8B4513" strokeWidth="1" />
          <line x1="40" y1={center} x2={center - 120} y2={center - 60} stroke="#8B4513" strokeWidth="1" />

          {/* House numbers (PyJhora style) */}
          {Array.from({ length: 12 }, (_, i) => {
            const houseNum = i + 1;
            const pos = housePositions[houseNum as keyof typeof housePositions];
            
            return (
              <g key={houseNum}>
                {/* House number */}
                <text
                  x={pos.x}
                  y={pos.y - 20}
                  textAnchor={pos.textAnchor}
                  fontSize="12"
                  fontWeight="bold"
                  fill="#8B4513"
                  className="house-label"
                >
                  {houseNum}
                </text>
                
                {/* Planets in house */}
                {renderHousePlanets(houseNum, pos.x, pos.y, pos.textAnchor)}
              </g>
            );
          })}
          
          {/* Chart title */}
          <text
            x={center}
            y={20}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#8B4513"
          >
            {chartType === 'rasi' ? 'जन्म कुंडली (D1)' : 'नवांश चार्ट (D9)'}
          </text>
        </svg>

        {/* Legend */}
        <div className="chart-legend">
          <div className="legend-title">ग्रह संकेत (Planet Symbols)</div>
          <div className="legend-grid">
            {Object.entries(planetLabels).map(([planet, symbol]) => (
              <div key={planet} className="legend-item">
                <span 
                  className="legend-symbol"
                  style={{ color: planetColors[symbol] || '#333' }}
                >
                  {symbol}
                </span>
                <span className="legend-name">{planet}</span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .pyjhora-chart-wrapper {
            max-width: 600px;
            margin: 0 auto;
            padding: 16px;
            background: linear-gradient(135deg, #FFF8DC, #F5F5DC);
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          .pyjhora-diamond-chart {
            width: 100%;
            height: auto;
            display: block;
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
          }
          
          .planet-text {
            font-family: 'Noto Sans Devanagari', 'Times New Roman', serif;
          }
          
          .house-label {
            font-family: 'Times New Roman', serif;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
          }
          
          .chart-legend {
            margin-top: 16px;
            background: rgba(255,255,255,0.9);
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #D4AF37;
          }
          
          .legend-title {
            font-weight: bold;
            font-size: 14px;
            color: #8B4513;
            margin-bottom: 8px;
            text-align: center;
            font-family: 'Noto Sans Devanagari', sans-serif;
          }
          
          .legend-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 6px;
            font-size: 11px;
          }
          
          .legend-item {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .legend-symbol {
            font-weight: bold;
            font-size: 12px;
            min-width: 20px;
            font-family: 'Noto Sans Devanagari', serif;
          }
          
          .legend-name {
            font-size: 10px;
            color: #666;
          }
          
          @media (max-width: 480px) {
            .pyjhora-chart-wrapper {
              padding: 12px;
            }
            
            .house-label {
              font-size: 10px;
            }
            
            .planet-text {
              font-size: 9px;
            }
          }
        `}</style>
      </div>
    );
  };

  return renderDiamondChart();
};

export default PyJhoraChart;