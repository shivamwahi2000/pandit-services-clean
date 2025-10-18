import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received PyJHora kundli request:', JSON.stringify(body, null, 2));
    
    const { 
      name, 
      datetime, 
      latitude, 
      longitude
    } = body;

    // Validate required fields
    if (!name || !datetime || !latitude || !longitude) {
      console.log('Validation failed - missing fields:', { name: !!name, datetime: !!datetime, latitude: !!latitude, longitude: !!longitude });
      return NextResponse.json(
        { error: 'Missing required fields: name, datetime, latitude, longitude' },
        { status: 400 }
      );
    }

    // Validate coordinates are not 0,0
    if (latitude === 0 && longitude === 0) {
      console.log('Validation failed - invalid coordinates: 0,0');
      return NextResponse.json(
        { error: 'Invalid coordinates: location does not have valid latitude/longitude' },
        { status: 400 }
      );
    }

    // Create Python script for PyJHora calculations
    const pythonScript = `
import json
import sys

def safe_float_convert(value):
    """Safely convert value to float, handling any type"""
    try:
        if isinstance(value, (int, float)):
            return float(value)
        elif isinstance(value, str):
            return float(value)
        elif isinstance(value, (list, tuple)) and len(value) > 0:
            return float(value[0])
        else:
            return 0.0
    except:
        return 0.0

def calculate_kundli(name, datetime_str, latitude, longitude, location_name="Birth Location"):
    try:
        import warnings
        warnings.filterwarnings('ignore')  # Suppress all warnings
        
        import swisseph as swe
        from jhora.horoscope.chart.charts import *
        from jhora.panchanga.drik import *
        
        # Parse datetime string
        dt_parts = datetime_str.replace('+05:30', '').split('T')
        date_part = dt_parts[0]
        time_part = dt_parts[1] if len(dt_parts) > 1 else "00:00:00"
        
        year, month, day = map(int, date_part.split('-'))
        hour, minute, second = map(int, time_part.split(':'))
        
        # Calculate Julian Day
        jd = swe.julday(year, month, day, hour + minute/60.0)
        
        # Create place object
        place = Place(location_name, safe_float_convert(latitude), safe_float_convert(longitude), +5.5)
        
        # Get planetary positions
        chart_data = rasi_chart(jd, place)
        
        # Initialize result
        result = {
            "name": name,
            "birth_details": {
                "datetime": datetime_str,
                "latitude": safe_float_convert(latitude),
                "longitude": safe_float_convert(longitude),
                "location": location_name,
                "julian_day": safe_float_convert(jd)
            },
            "planets": {},
            "houses": {},
            "yogas": [],
            "nakshatra_details": {},
            "yoga_summary": {}
        }
        
        # Planet and sign mappings
        planet_names = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu', 'Ascendant']
        sign_names = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                     'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
        
        # Get accurate planetary positions using Swiss Ephemeris directly
        planet_ids = [swe.SUN, swe.MOON, swe.MARS, swe.MERCURY, swe.JUPITER, swe.VENUS, swe.SATURN]
        main_planet_names = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn']
        
        # Calculate main planets using Swiss Ephemeris
        for i, planet_id in enumerate(planet_ids):
            try:
                planet_name = main_planet_names[i]
                swe_result = swe.calc_ut(jd, planet_id)
                longitude = safe_float_convert(swe_result[0])
                
                # Calculate sign and degrees
                sign_num = int(longitude // 30) % 12
                sign_name = sign_names[sign_num] if sign_num < len(sign_names) else "Unknown"
                degrees_in_sign = safe_float_convert(longitude % 30)
                
                # Get house from PyJHora chart data
                house_num = 1  # Default
                if i < len(chart_data) and len(chart_data[i]) >= 2 and isinstance(chart_data[i][1], tuple):
                    house_num = int(chart_data[i][1][0]) + 1
                
                result["planets"][planet_name] = {
                    "sign": sign_name,
                    "house": house_num,
                    "longitude": longitude,
                    "degrees_in_sign": degrees_in_sign
                }
            except Exception as planet_error:
                continue
        
        # Add Rahu and Ketu (calculated differently)
        try:
            # Rahu is always 180 degrees opposite to Ketu
            # Get from PyJHora chart data for house positions
            if len(chart_data) > 7:  # Rahu index
                rahu_data = chart_data[7]
                if len(rahu_data) >= 2 and isinstance(rahu_data[1], tuple):
                    rahu_house = int(rahu_data[1][0]) + 1
                    
                    # Calculate Rahu longitude (mean node)
                    rahu_result = swe.calc_ut(jd, swe.MEAN_NODE)
                    rahu_longitude = safe_float_convert(rahu_result[0])
                    rahu_sign_num = int(rahu_longitude // 30) % 12
                    
                    result["planets"]["Rahu"] = {
                        "sign": sign_names[rahu_sign_num],
                        "house": rahu_house,
                        "longitude": rahu_longitude,
                        "degrees_in_sign": safe_float_convert(rahu_longitude % 30)
                    }
                    
                    # Ketu is 180 degrees opposite
                    ketu_longitude = (rahu_longitude + 180) % 360
                    ketu_sign_num = int(ketu_longitude // 30) % 12
                    ketu_house = ((rahu_house + 5) % 12) + 1  # Opposite house
                    
                    result["planets"]["Ketu"] = {
                        "sign": sign_names[ketu_sign_num],
                        "house": ketu_house,
                        "longitude": ketu_longitude,
                        "degrees_in_sign": safe_float_convert(ketu_longitude % 30)
                    }
        except:
            pass
        
        # Calculate comprehensive panchang using PyJHora
        try:
            # Initialize panchang data structure
            panchang_data = {
                "tithi": {"name": "Unknown", "number": 0, "paksha": "Unknown"},
                "nakshatra": {"name": "Unknown", "number": 0},
                "yoga": {"name": "Unknown", "number": 0},
                "karana": {"name": "Unknown", "number": 0},
                "vara": {"name": "Unknown", "number": 0},
                "ritu": "Unknown",
                "masa": "Unknown"
            }
            
            # Calculate tithi (lunar day)
            try:
                tithi_info = tithi(jd, place)
                if tithi_info and len(tithi_info) >= 2:
                    panchang_data["tithi"] = {
                        "name": tithi_info[0],
                        "number": tithi_info[1],
                        "paksha": "Shukla" if tithi_info[1] <= 15 else "Krishna"
                    }
            except:
                pass
            
            # Calculate nakshatra (constellation)
            nakshatra_names = [
                "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
                "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
                "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
                "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", 
                "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
            ]
            
            try:
                nakshatra_info = nakshatra(jd, place)
                if nakshatra_info and len(nakshatra_info) >= 2:
                    nakshatra_num = nakshatra_info[1] % 27
                    panchang_data["nakshatra"] = {
                        "name": nakshatra_names[nakshatra_num],
                        "number": nakshatra_info[1]
                    }
                else:
                    # Fallback calculation using moon longitude
                    if "Moon" in result["planets"]:
                        moon_long = result["planets"]["Moon"]["longitude"]
                        nakshatra_num = int((moon_long * 27) // 360)
                        panchang_data["nakshatra"] = {
                            "name": nakshatra_names[nakshatra_num % 27],
                            "number": nakshatra_num
                        }
            except:
                # Final fallback
                if "Moon" in result["planets"]:
                    moon_long = result["planets"]["Moon"]["longitude"]
                    nakshatra_num = int((moon_long * 27) // 360)
                    panchang_data["nakshatra"] = {
                        "name": nakshatra_names[nakshatra_num % 27],
                        "number": nakshatra_num
                    }
            
            # Calculate yoga
            try:
                yoga_info = yogam(jd, place)
                if yoga_info and len(yoga_info) >= 2:
                    panchang_data["yoga"] = {
                        "name": yoga_info[0],
                        "number": yoga_info[1]
                    }
            except:
                pass
            
            # Calculate karana (half tithi)
            try:
                karana_info = karana(jd, place)
                if karana_info and len(karana_info) >= 2:
                    panchang_data["karana"] = {
                        "name": karana_info[0],
                        "number": karana_info[1]
                    }
            except:
                pass
            
            # Calculate vara (weekday)
            try:
                vara_info = vaara(jd)
                if vara_info:
                    panchang_data["vara"] = {
                        "name": vara_info,
                        "number": int(jd) % 7
                    }
            except:
                pass
            
            # Calculate ritu (season)
            try:
                ritu_info = ritu(jd, place)
                if ritu_info:
                    panchang_data["ritu"] = ritu_info
            except:
                pass
            
            # Calculate masa (lunar month)
            try:
                masa_info = lunar_month(jd, place)
                if masa_info:
                    panchang_data["masa"] = masa_info
            except:
                pass
            
            # Add panchang data to result
            result["panchang"] = panchang_data
            
            # Legacy nakshatra_details for backward compatibility
            result["nakshatra_details"] = {
                "birth_nakshatra": panchang_data["nakshatra"]["name"],
                "moon_sign": result["planets"].get("Moon", {}).get("sign", "Unknown"),
                "sun_sign": result["planets"].get("Sun", {}).get("sign", "Unknown"),
                "tithi": panchang_data["tithi"]["name"],
                "yoga": panchang_data["yoga"]["name"],
                "karana": panchang_data["karana"]["name"],
                "vara": panchang_data["vara"]["name"],
                "ritu": panchang_data["ritu"],
                "masa": panchang_data["masa"]
            }
            
        except Exception as e:
            print(f"Error calculating panchang: {e}")
            # Basic fallback
            result["nakshatra_details"] = {
                "birth_nakshatra": "Calculation Error",
                "moon_sign": result["planets"].get("Moon", {}).get("sign", "Unknown"),
                "sun_sign": result["planets"].get("Sun", {}).get("sign", "Unknown"),
                "tithi": "Unknown",
                "yoga": "Unknown",
                "karana": "Unknown",
                "vara": "Unknown",
                "ritu": "Unknown",
                "masa": "Unknown"
            }
        
        # Create house information
        for i in range(12):
            house_planets = []
            for planet_name, planet_info in result["planets"].items():
                if planet_info.get("house") == (i + 1):
                    house_planets.append(planet_name)
            
            result["houses"][f"house_{i+1}"] = {
                "house_number": i + 1,
                "planets": house_planets,
                "planet_count": len(house_planets)
            }
        
        # Comprehensive yoga analysis
        yogas_found = []
        planets = result["planets"]
        
        # Check for major yogas
        
        # 1. Gaja Kesari Yoga - Jupiter in Kendra from Moon
        if "Jupiter" in planets and "Moon" in planets:
            jupiter_house = planets["Jupiter"].get("house", 0)
            moon_house = planets["Moon"].get("house", 0)
            if jupiter_house and moon_house:
                # Kendra houses from Moon: 1st, 4th, 7th, 10th
                kendra_positions = []
                for offset in [0, 3, 6, 9]:  # 1st, 4th, 7th, 10th from Moon
                    kendra_house = ((moon_house + offset - 1) % 12) + 1
                    kendra_positions.append(kendra_house)
                
                if jupiter_house in kendra_positions:
                    yogas_found.append({
                        "name": "Gaja Kesari Yoga",
                        "description": "Jupiter in Kendra from Moon - bestows wisdom, wealth, fame and spiritual growth",
                        "benefic": True,
                        "planets_involved": ["Jupiter", "Moon"]
                    })
        
        # 2. Raj Yoga - Lords of Kendra and Trikona together
        kendra_houses = [1, 4, 7, 10]
        trikona_houses = [1, 5, 9]
        
        # Check for planets in both Kendra and Trikona
        kendra_planets = []
        trikona_planets = []
        
        for planet_name, planet_info in planets.items():
            house = planet_info.get("house", 0)
            if house in kendra_houses:
                kendra_planets.append(planet_name)
            if house in trikona_houses:
                trikona_planets.append(planet_name)
        
        # If same planet in both Kendra and Trikona (1st house)
        common_planets = set(kendra_planets) & set(trikona_planets)
        for planet in common_planets:
            if planet != "Rahu" and planet != "Ketu":  # Exclude nodes
                yogas_found.append({
                    "name": f"Raja Yoga by {planet}",
                    "description": f"{planet} in 1st house creates Raja Yoga - brings leadership and success",
                    "benefic": True,
                    "planets_involved": [planet]
                })
        
        # 3. Dhana Yoga - Wealth combinations
        wealth_houses = [2, 11]  # 2nd house (wealth), 11th house (gains)
        
        for planet_name, planet_info in planets.items():
            house = planet_info.get("house", 0)
            if house in wealth_houses and planet_name in ["Jupiter", "Venus", "Mercury"]:
                yogas_found.append({
                    "name": f"Dhana Yoga by {planet_name}",
                    "description": f"{planet_name} in house {house} creates wealth and prosperity",
                    "benefic": True,
                    "planets_involved": [planet_name]
                })
        
        # 4. Neecha Bhanga Raja Yoga - Check for exaltation/debilitation
        # This is simplified - in reality needs more complex calculations
        
        # 5. Benefic planets in Kendra
        benefic_planets = ["Jupiter", "Venus", "Moon", "Mercury"]
        for planet_name in benefic_planets:
            if planet_name in planets:
                house = planets[planet_name].get("house", 0)
                if house in [1, 4, 7, 10]:
                    yogas_found.append({
                        "name": f"{planet_name} in Kendra",
                        "description": f"{planet_name} in angular house {house} - provides stability and strength",
                        "benefic": True,
                        "planets_involved": [planet_name]
                    })
        
        # 6. Upachaya houses for malefics (good placement)
        upachaya_houses = [3, 6, 10, 11]
        malefic_planets = ["Mars", "Saturn", "Rahu", "Ketu"]
        
        for planet_name in malefic_planets:
            if planet_name in planets:
                house = planets[planet_name].get("house", 0)
                if house in upachaya_houses:
                    yogas_found.append({
                        "name": f"{planet_name} in Upachaya",
                        "description": f"{planet_name} in house {house} - malefic well-placed for growth and improvement",
                        "benefic": True,
                        "planets_involved": [planet_name]
                    })
        
        # 7. Planetary conjunctions
        house_groups = {}
        for planet_name, planet_info in planets.items():
            house = planet_info.get("house", 0)
            if house not in house_groups:
                house_groups[house] = []
            house_groups[house].append(planet_name)
        
        # Check for significant conjunctions
        for house, planet_list in house_groups.items():
            if len(planet_list) >= 2:
                # Filter out Ascendant for conjunction analysis
                filtered_planets = [p for p in planet_list if p != "Ascendant"]
                if len(filtered_planets) >= 2:
                    benefic_in_conjunction = any(p in ["Jupiter", "Venus", "Moon", "Mercury"] for p in filtered_planets)
                    malefic_in_conjunction = any(p in ["Mars", "Saturn", "Rahu", "Ketu", "Sun"] for p in filtered_planets)
                    
                    conjunction_type = "Mixed"
                    if benefic_in_conjunction and not malefic_in_conjunction:
                        conjunction_type = "Benefic"
                    elif malefic_in_conjunction and not benefic_in_conjunction:
                        conjunction_type = "Challenging"
                    
                    yogas_found.append({
                        "name": f"Planetary Conjunction in House {house}",
                        "description": f"{', '.join(filtered_planets)} together in house {house} - {conjunction_type.lower()} combination",
                        "benefic": conjunction_type != "Challenging",
                        "planets_involved": filtered_planets
                    })
        
        # 8. Check for specific sign-based yogas
        for planet_name, planet_info in planets.items():
            sign = planet_info.get("sign", "")
            
            # Exaltation signs (simplified)
            exaltation_signs = {
                "Sun": "Aries", "Moon": "Taurus", "Mars": "Capricorn", 
                "Mercury": "Virgo", "Jupiter": "Cancer", "Venus": "Pisces", "Saturn": "Libra"
            }
            
            if planet_name in exaltation_signs and sign == exaltation_signs[planet_name]:
                yogas_found.append({
                    "name": f"{planet_name} Exaltation",
                    "description": f"{planet_name} exalted in {sign} - planet at maximum strength",
                    "benefic": True,
                    "planets_involved": [planet_name]
                })
        
        result["yogas"] = yogas_found
        
        result["yogas"] = yogas_found
        
        # Summary
        benefic_count = len([y for y in yogas_found if y.get("benefic", True)])
        challenging_count = len([y for y in yogas_found if not y.get("benefic", True)])
        
        result["yoga_summary"] = {
            "total_yogas": len(yogas_found),
            "benefic_yogas": benefic_count,
            "challenging_yogas": challenging_count
        }
        
        # Generate additional chart data for visualization
        try:
            # Navamsa Chart (D9)
            navamsa_data = navamsa_chart(chart_data)
            navamsa_positions = {}
            for i, planet_data in enumerate(navamsa_data):
                if i < len(main_planet_names):
                    planet_name = main_planet_names[i]
                    if len(planet_data) >= 2 and isinstance(planet_data[1], list) and len(planet_data[1]) >= 2:
                        navamsa_sign = int(planet_data[1][0]) % 12
                        longitude = safe_float_convert(planet_data[1][1])
                        
                        # Calculate house based on sign (for navamsa, sign = house)
                        house = navamsa_sign + 1
                        
                        # Calculate degrees in sign from longitude
                        degrees_in_sign = longitude % 30
                        
                        navamsa_positions[planet_name] = {
                            "sign": sign_names[navamsa_sign],
                            "house": house,
                            "longitude": longitude,
                            "degrees_in_sign": degrees_in_sign
                        }
            
            result["navamsa_chart"] = navamsa_positions
            
        except Exception as navamsa_error:
            result["navamsa_chart"] = {}
        
        return result
        
    except Exception as e:
        return {
            "error": f"Calculation error: {str(e)}",
            "success": False
        }

if __name__ == "__main__":
    try:
        name = sys.argv[1] if len(sys.argv) > 1 else "Test"
        datetime_str = sys.argv[2] if len(sys.argv) > 2 else "1990-10-15T14:30:00+05:30"
        latitude = float(sys.argv[3]) if len(sys.argv) > 3 else 28.6139
        longitude = float(sys.argv[4]) if len(sys.argv) > 4 else 77.2090
        location_name = sys.argv[5] if len(sys.argv) > 5 else "Birth Location"
        
        result = calculate_kundli(name, datetime_str, latitude, longitude, location_name)
        # Ensure clean JSON output only
        import sys
        sys.stderr = open('/dev/null', 'w')  # Suppress stderr output
        print(json.dumps(result, default=str))
        
    except Exception as e:
        error_result = {"error": f"Script error: {str(e)}", "success": False}
        print(json.dumps(error_result, indent=2))
        sys.exit(1)
`;

    // Write Python script to temporary file
    const scriptPath = path.join(process.cwd(), 'temp_pyjhora_script.py');
    const fs = await import('fs');
    fs.writeFileSync(scriptPath, pythonScript);

    console.log('Executing PyJHora script...');

    // Execute Python script
    const pythonProcess = spawn('python3', [
      scriptPath,
      name,
      datetime,
      latitude.toString(),
      longitude.toString(),
      `${latitude}, ${longitude}`
    ]);

    let pythonOutput = '';
    let pythonError = '';

    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      pythonError += data.toString();
    });

    const pythonResult = await new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          try {
            // Clean the output - remove any extra lines or warnings
            const cleanOutput = pythonOutput.trim();
            const lines = cleanOutput.split('\n');
            
            // Find the JSON output (should be the last substantial line)
            let jsonOutput = '';
            for (let i = lines.length - 1; i >= 0; i--) {
              const line = lines[i].trim();
              if (line.startsWith('{') && line.endsWith('}')) {
                jsonOutput = line;
                break;
              }
            }
            
            if (!jsonOutput) {
              // Try the full output as JSON
              jsonOutput = cleanOutput;
            }
            
            const result = JSON.parse(jsonOutput);
            resolve(result);
          } catch (parseError) {
            console.error('Error parsing Python output:', parseError);
            console.error('Raw output length:', pythonOutput.length);
            console.error('Raw output (first 500 chars):', pythonOutput.substring(0, 500));
            console.error('Raw output (last 500 chars):', pythonOutput.substring(Math.max(0, pythonOutput.length - 500)));
            
            // Try to extract any JSON from the output
            const jsonMatch = pythonOutput.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              try {
                const result = JSON.parse(jsonMatch[0]);
                console.log('Successfully extracted JSON from mixed output');
                resolve(result);
                return;
              } catch (secondParseError) {
                console.error('Failed to parse extracted JSON:', secondParseError);
              }
            }
            
            reject(new Error(`Failed to parse Python script output: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`));
          }
        } else {
          console.error('Python script error:', pythonError);
          console.error('Python output:', pythonOutput);
          reject(new Error(`Python script failed with code ${code}: ${pythonError}`));
        }
      });
    });

    // Clean up temporary file
    try {
      fs.unlinkSync(scriptPath);
    } catch (cleanupError) {
      console.warn('Could not clean up temporary script file:', cleanupError);
    }

    console.log('PyJHora calculation completed successfully');
    
    // Return the kundli data
    return NextResponse.json({
      success: true,
      data: pythonResult,
      name: name,
      timestamp: new Date().toISOString(),
      source: 'PyJHora - Open Source',
      debug: {
        hasError: typeof pythonResult === 'object' && pythonResult !== null && 'error' in pythonResult && (pythonResult as any).error ? true : false,
        calculationsIncluded: ['planets', 'houses', 'yogas', 'nakshatra']
      }
    });

  } catch (error) {
    console.error('PyJHora Kundli API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate Kundli using PyJHora',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST method to generate Kundli using PyJHora (Open Source)',
    usage: 'POST /api/kundli with { name, datetime, latitude, longitude, timezone? }',
    features: [
      'Complete open source calculations', 
      'Detailed planetary positions', 
      'Basic yoga analysis', 
      'Nakshatra calculations',
      'House-wise planet distribution',
      'No API limits or costs'
    ],
    source: 'PyJHora - Based on PVR Narasimha Rao\'s Vedic Astrology book'
  });
}