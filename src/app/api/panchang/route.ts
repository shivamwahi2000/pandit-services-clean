import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, datetime } = body;

    // Default to Mumbai if no coordinates provided
    const coords = {
      latitude: latitude || 19.0821978,
      longitude: longitude || 72.7411014
    };

    // Use current date if not provided
    const targetDate = datetime ? new Date(datetime) : new Date();
    
    console.log('Panchang API: Calculating for date:', targetDate.toISOString(), 'at coordinates:', coords);

    // Create Python script for PyJHora panchang calculations
    const pythonScript = `
import json
import sys
try:
    from jhora.panchanga import drik
    from jhora.utils import julian_day_number
    
    # Use current IST date/time for panchang calculations
    import datetime
    # Get current IST time
    now = datetime.datetime.now()
    year, month, day = now.year, now.month, now.day
    hour, minute, second = now.hour, now.minute, now.second
    
    # Create place object
    place = drik.Place('Current Location', ${coords.latitude}, ${coords.longitude}, 5.5)
    
    # Calculate Julian Day
    jd = julian_day_number((year, month, day), (hour, minute, second))
    
    # Calculate panchang elements
    result = {}
    
    try:
        tithi_info = drik.tithi(jd, place)
        tithi_names = [
            "Pratipad", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami",
            "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
            "Pratipad", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami",
            "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
        ]
        
        if tithi_info and len(tithi_info) >= 2:
            # Get raw PyJHora data
            raw_name = tithi_info[0] if tithi_info[0] else "Unknown"
            raw_num = tithi_info[1] if tithi_info[1] else 0
            
            # If PyJHora returns a number as name, use that as the tithi number
            if isinstance(raw_name, (int, float)) or (isinstance(raw_name, str) and raw_name.isdigit()):
                tithi_num = int(raw_name)
            else:
                tithi_num = int(raw_num) if raw_num else 0
            
            # Ensure tithi number is in valid range (1-30)
            if tithi_num <= 0:
                tithi_num = 1
            elif tithi_num > 30:
                tithi_num = tithi_num % 30 if tithi_num % 30 != 0 else 30
            
            # Determine paksha and get proper name
            if tithi_num <= 15:
                paksha = "Shukla"
                if tithi_num == 15:
                    tithi_name = "Purnima"
                else:
                    tithi_name = tithi_names[tithi_num - 1]
            else:
                paksha = "Krishna"
                if tithi_num == 30:
                    tithi_name = "Amavasya"
                else:
                    # For Krishna paksha, map 16-29 to names 1-14
                    name_index = tithi_num - 16
                    tithi_name = tithi_names[name_index] if name_index < 14 else "Chaturdashi"
        else:
            tithi_name = "Unknown"
            tithi_num = 0
            paksha = "Unknown"
            
        result["tithi"] = {
            "name": tithi_name,
            "number": tithi_num,
            "paksha": paksha
        }
    except Exception as e:
        result["tithi"] = {"name": "Unknown", "number": 0, "paksha": "Unknown"}
    
    try:
        nakshatra_info = drik.nakshatra(jd, place)
        nakshatra_names = [
            "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
            "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
            "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
            "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", 
            "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
        ]
        nakshatra_num = nakshatra_info[1] % 27 if nakshatra_info and len(nakshatra_info) > 1 else 0
        
        # Nakshatra lords mapping
        nakshatra_lords = [
            "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter",  # 1-7
            "Saturn", "Mercury", "Ketu", "Venus", "Sun", "Moon",      # 8-13
            "Mars", "Rahu", "Jupiter", "Saturn", "Mercury", "Ketu",   # 14-19
            "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter",        # 20-25
            "Saturn", "Mercury"                                        # 26-27
        ]
        
        nakshatra_lord = nakshatra_lords[nakshatra_num] if nakshatra_num < len(nakshatra_lords) else "Unknown"
        
        result["nakshatra"] = {
            "name": nakshatra_names[nakshatra_num],
            "number": nakshatra_info[1] if nakshatra_info and len(nakshatra_info) > 1 else 0,
            "lord": nakshatra_lord
        }
    except:
        result["nakshatra"] = {"name": "Unknown", "number": 0}
    
    try:
        yoga_info = drik.yogam(jd, place)
        yoga_names = [
            "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma",
            "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
            "Siddhi", "Vyatipata", "Variyana", "Parigha", "Shiva", "Siddha", "Sadhya",
            "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
        ]
        
        if yoga_info and len(yoga_info) >= 2:
            yoga_num = yoga_info[1] if isinstance(yoga_info[1], int) else int(yoga_info[1])
            # Yoga numbers are 1-27, adjust for 0-based array
            name_index = (yoga_num - 1) % 27
            yoga_name = yoga_names[name_index] if name_index < len(yoga_names) else f"Yoga {yoga_num}"
        else:
            yoga_name = "Unknown"
            yoga_num = 0
            
        result["yoga"] = {
            "name": yoga_name,
            "number": yoga_num
        }
    except Exception as e:
        result["yoga"] = {"name": "Unknown", "number": 0}
    
    try:
        karana_info = drik.karana(jd, place)
        karana_names = [
            "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
            "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
            "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
            "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti",
            "Shakuni", "Chatushpada", "Naga", "Kimstughna"
        ]
        
        if karana_info and len(karana_info) >= 2:
            karana_num = karana_info[1] if isinstance(karana_info[1], int) else int(karana_info[1])
            # Karana numbers cycle through 1-60, adjust for array
            name_index = (karana_num - 1) % len(karana_names)
            karana_name = karana_names[name_index] if name_index < len(karana_names) else f"Karana {karana_num}"
        else:
            karana_name = "Unknown"
            karana_num = 0
            
        result["karana"] = {
            "name": karana_name,
            "number": karana_num
        }
    except Exception as e:
        result["karana"] = {"name": "Unknown", "number": 0}
    
    try:
        # Use Python's datetime to get the correct day
        current_weekday = now.weekday()  # 0=Monday, 1=Tuesday, ..., 6=Sunday
        vara_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        vara_name = vara_names[current_weekday]
        
        # For consistency with vara number, use standard format where Sunday=0
        vara_num = (current_weekday + 1) % 7  # Convert to Sunday=0 format
        
        result["vara"] = {
            "name": vara_name,
            "number": vara_num
        }
    except Exception as e:
        # Ultimate fallback using system day
        import datetime
        today = datetime.datetime.now()
        vara_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        vara_name = vara_names[today.weekday()]
        result["vara"] = {
            "name": vara_name,
            "number": today.weekday()
        }
    
    try:
        ritu_info = drik.ritu(jd, place)
        result["ritu"] = ritu_info if ritu_info else "Unknown"
    except:
        result["ritu"] = "Unknown"
    
    try:
        masa_info = drik.lunar_month(jd, place)
        result["masa"] = masa_info if masa_info else "Unknown"
    except:
        result["masa"] = "Unknown"
    
    # Calculate sunrise, sunset using basic astronomical calculations
    import math
    
    def calculate_sunrise_sunset(julian_day, latitude, longitude):
        # Basic sunrise/sunset calculation
        # Convert to degrees
        lat_rad = math.radians(latitude)
        
        # Day of year from Julian day
        day_of_year = int(julian_day - 2451545.0 + 1.5) % 365
        
        # Solar declination
        declination = math.radians(23.45) * math.sin(math.radians(360 * (284 + day_of_year) / 365))
        
        # Hour angle
        try:
            hour_angle = math.acos(-math.tan(lat_rad) * math.tan(declination))
            hour_angle_deg = math.degrees(hour_angle)
            
            # Convert to hours
            sunrise_hour = 12 - hour_angle_deg / 15 - longitude / 15
            sunset_hour = 12 + hour_angle_deg / 15 - longitude / 15
            
            # Adjust for timezone (IST is UTC+5:30)
            sunrise_hour += 5.5
            sunset_hour += 5.5
            
            # Handle 24-hour overflow
            if sunrise_hour >= 24:
                sunrise_hour -= 24
            if sunrise_hour < 0:
                sunrise_hour += 24
            if sunset_hour >= 24:
                sunset_hour -= 24
            if sunset_hour < 0:
                sunset_hour += 24
                
            sunrise_h = int(sunrise_hour)
            sunrise_m = int((sunrise_hour - sunrise_h) * 60)
            sunset_h = int(sunset_hour)
            sunset_m = int((sunset_hour - sunset_h) * 60)
            
            return f"{sunrise_h:02d}:{sunrise_m:02d}", f"{sunset_h:02d}:{sunset_m:02d}"
        except:
            return "06:30", "18:30"
    
    # Try PyJHora first, then fallback to basic calculation
    try:
        sunrise_info = drik.sunrise(jd, place)
        sunset_info = drik.sunset(jd, place)
        
        if sunrise_info and isinstance(sunrise_info, (int, float)):
            sunrise_hour = (sunrise_info - int(sunrise_info)) * 24
            sunrise_hours = int(sunrise_hour)
            sunrise_minutes = int((sunrise_hour - sunrise_hours) * 60)
            result["sunrise"] = f"{sunrise_hours:02d}:{sunrise_minutes:02d}"
        else:
            raise Exception("PyJHora sunrise failed")
            
        if sunset_info and isinstance(sunset_info, (int, float)):
            sunset_hour = (sunset_info - int(sunset_info)) * 24
            sunset_hours = int(sunset_hour)
            sunset_minutes = int((sunset_hour - sunset_hours) * 60)
            result["sunset"] = f"{sunset_hours:02d}:{sunset_minutes:02d}"
        else:
            raise Exception("PyJHora sunset failed")
            
    except Exception as e:
        # Fallback to basic calculation using place coordinates
        sunrise_time, sunset_time = calculate_sunrise_sunset(jd, place.latitude, place.longitude)
        result["sunrise"] = sunrise_time
        result["sunset"] = sunset_time
        
    # Calculate moonrise and moonset using PyJHora drik module
    def calculate_moon_times(jd, place):
        try:
            # Try PyJHora's moonrise and moonset functions first
            try:
                moonrise_info = drik.moonrise(jd, place)
                moonset_info = drik.moonset(jd, place)
                
                # Format PyJHora results - they return [decimal_hour, 'HH:MM:SS', julian_day]
                moonrise_time = "N/A"
                moonset_time = "N/A"
                
                if moonrise_info and len(moonrise_info) >= 2:
                    # Use the formatted time string from index 1
                    if isinstance(moonrise_info[1], str) and ':' in moonrise_info[1]:
                        # Extract HH:MM from 'HH:MM:SS' format
                        time_parts = moonrise_info[1].split(':')
                        moonrise_time = f"{time_parts[0]}:{time_parts[1]}"
                    else:
                        # Fallback: use decimal hour from index 0
                        decimal_hour = moonrise_info[0]
                        mr_hours = int(decimal_hour) % 24
                        mr_minutes = int((decimal_hour - int(decimal_hour)) * 60)
                        moonrise_time = f"{mr_hours:02d}:{mr_minutes:02d}"
                
                if moonset_info and len(moonset_info) >= 2:
                    # Use the formatted time string from index 1
                    if isinstance(moonset_info[1], str) and ':' in moonset_info[1]:
                        # Extract HH:MM from 'HH:MM:SS' format
                        time_parts = moonset_info[1].split(':')
                        moonset_time = f"{time_parts[0]}:{time_parts[1]}"
                    else:
                        # Fallback: use decimal hour from index 0
                        decimal_hour = moonset_info[0]
                        ms_hours = int(decimal_hour) % 24
                        ms_minutes = int((decimal_hour - int(decimal_hour)) * 60)
                        moonset_time = f"{ms_hours:02d}:{ms_minutes:02d}"
                    
                return moonrise_time, moonset_time
                    
            except Exception as drik_error:
                # Fallback to Swiss Ephemeris calculation
                import swisseph as swe
                
                try:
                    # Simplified Swiss Ephemeris approach
                    latitude = place.latitude
                    longitude = place.longitude
                    
                    # Try current day moonrise
                    try:
                        rise_result = swe.rise_trans(jd, swe.MOON, longitude, latitude, rsmi=swe.CALC_RISE)
                        if rise_result[1]:
                            rise_jd = rise_result[1][0]
                            # Convert to IST
                            rise_hour = ((rise_jd + 5.5/24.0) - int(rise_jd + 5.5/24.0)) * 24
                            mr_hours = int(rise_hour) % 24
                            mr_minutes = int((rise_hour - int(rise_hour)) * 60)
                            moonrise_time = f"{mr_hours:02d}:{mr_minutes:02d}"
                        else:
                            moonrise_time = "N/A"
                    except:
                        moonrise_time = "N/A"
                        
                    # Try current day moonset
                    try:
                        set_result = swe.rise_trans(jd, swe.MOON, longitude, latitude, rsmi=swe.CALC_SET)
                        if set_result[1]:
                            set_jd = set_result[1][0]
                            # Convert to IST
                            set_hour = ((set_jd + 5.5/24.0) - int(set_jd + 5.5/24.0)) * 24
                            ms_hours = int(set_hour) % 24
                            ms_minutes = int((set_hour - int(set_hour)) * 60)
                            moonset_time = f"{ms_hours:02d}:{ms_minutes:02d}"
                        else:
                            moonset_time = "N/A"
                    except:
                        moonset_time = "N/A"
                        
                    return moonrise_time, moonset_time
                    
                except:
                    return "N/A", "N/A"
            
        except Exception as e:
            return "N/A", "N/A"
    
    # Get moonrise and moonset times
    moonrise_time, moonset_time = calculate_moon_times(jd, place)
    
    # Store the calculated moon times
    result["moonrise"] = moonrise_time
    result["moonset"] = moonset_time
    
    # Calculate end times for panchang elements
    try:
        # Tithi end time
        tithi_end_info = drik.tithi(jd + 1, place)  # Next day to get end time
        if tithi_end_info and len(tithi_end_info) >= 3:
            tithi_end_jd = tithi_end_info[2] if tithi_end_info[2] else jd + 0.5
            tithi_end_hour = (tithi_end_jd - int(tithi_end_jd)) * 24
            end_hours = int(tithi_end_hour)
            end_minutes = int((tithi_end_hour - end_hours) * 60)
            result["tithi"]["end_time"] = f"{end_hours:02d}:{end_minutes:02d}"
        else:
            result["tithi"]["end_time"] = "N/A"
    except:
        result["tithi"]["end_time"] = "N/A"
        
    try:
        # Nakshatra end time
        nakshatra_end_info = drik.nakshatra(jd + 1, place)
        if nakshatra_end_info and len(nakshatra_end_info) >= 3:
            nakshatra_end_jd = nakshatra_end_info[2] if nakshatra_end_info[2] else jd + 0.5
            nakshatra_end_hour = (nakshatra_end_jd - int(nakshatra_end_jd)) * 24
            end_hours = int(nakshatra_end_hour)
            end_minutes = int((nakshatra_end_hour - end_hours) * 60)
            result["nakshatra"]["end_time"] = f"{end_hours:02d}:{end_minutes:02d}"
        else:
            result["nakshatra"]["end_time"] = "N/A"
    except:
        result["nakshatra"]["end_time"] = "N/A"
        
    try:
        # Yoga end time
        yoga_end_info = drik.yogam(jd + 1, place)
        if yoga_end_info and len(yoga_end_info) >= 3:
            yoga_end_jd = yoga_end_info[2] if yoga_end_info[2] else jd + 0.5
            yoga_end_hour = (yoga_end_jd - int(yoga_end_jd)) * 24
            end_hours = int(yoga_end_hour)
            end_minutes = int((yoga_end_hour - end_hours) * 60)
            result["yoga"]["end_time"] = f"{end_hours:02d}:{end_minutes:02d}"
        else:
            result["yoga"]["end_time"] = "N/A"
    except:
        result["yoga"]["end_time"] = "N/A"
        
    try:
        # Karana end time
        karana_end_info = drik.karana(jd + 1, place)
        if karana_end_info and len(karana_end_info) >= 3:
            karana_end_jd = karana_end_info[2] if karana_end_info[2] else jd + 0.5
            karana_end_hour = (karana_end_jd - int(karana_end_jd)) * 24
            end_hours = int(karana_end_hour)
            end_minutes = int((karana_end_hour - end_hours) * 60)
            result["karana"]["end_time"] = f"{end_hours:02d}:{end_minutes:02d}"
        else:
            result["karana"]["end_time"] = "N/A"
    except:
        result["karana"]["end_time"] = "N/A"
    
    print(json.dumps({"success": True, "panchang": result}))
    
except Exception as e:
    print(json.dumps({"success": False, "error": str(e)}))
`;

    // Execute Python script (use PYTHON_CMD env var or default to python3)
    const pythonCmd = process.env.PYTHON_CMD || 'python3';
    const python = spawn(pythonCmd, ['-c', pythonScript], {
      env: { ...process.env, PYTHONPATH: process.env.PYTHONPATH || '' }
    });
    
    let output = '';
    let errorOutput = '';
    
    python.stdout.on('data', (data) => {
      const dataStr = data.toString();
      // Only capture lines that look like JSON output
      const lines = dataStr.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('{') && trimmedLine.includes('"success"')) {
          output += trimmedLine;
        }
      }
    });
    
    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    const pythonResult = await new Promise((resolve, reject) => {
      python.on('close', (code) => {
        if (code !== 0) {
          console.error('Python script error:', errorOutput);
          reject(new Error(`Python script failed with code ${code}: ${errorOutput}`));
        } else {
          try {
            const result = JSON.parse(output.trim());
            resolve(result);
          } catch (parseError) {
            reject(new Error(`Failed to parse Python output: ${output}`));
          }
        }
      });
    });

    const result = pythonResult as any;
    if (!result.success) {
      throw new Error(`PyJHora calculation failed: ${result.error}`);
    }

    const panchang = result.panchang;
    console.log('Panchang API: PyJHora panchang data:', panchang);
    
    // Transform PyJHora panchang data to expected format
    const transformedData = {
      tithi: [{
        name: panchang.tithi.name,
        paksha: panchang.tithi.paksha + " Paksha",
        number: panchang.tithi.number,
        isActive: true,
        end: panchang.tithi.end_time || "N/A"
      }],
      nakshatra: [{
        name: panchang.nakshatra.name,
        number: panchang.nakshatra.number,
        isActive: true,
        lord: {
          name: panchang.nakshatra.lord || "Unknown"
        },
        end: panchang.nakshatra.end_time || "N/A"
      }],
      yoga: [{
        name: panchang.yoga.name,
        number: panchang.yoga.number,
        isActive: true,
        end: panchang.yoga.end_time || "N/A"
      }],
      karana: [{
        name: panchang.karana.name,
        number: panchang.karana.number,
        isActive: true,
        end: panchang.karana.end_time || "N/A"
      }],
      vara: {
        name: panchang.vara.name || 'Unknown',
        number: panchang.vara.number || 0
      },
      sunrise: panchang.sunrise || "06:30",
      sunset: panchang.sunset || "18:30",
      moonrise: panchang.moonrise || "N/A",
      moonset: panchang.moonset || "N/A",
      ritu: panchang.ritu,
      masa: panchang.masa
    };

    return NextResponse.json({
      success: true,
      data: transformedData,
      source: 'PyJHora',
      timestamp: targetDate.toISOString()
    });

  } catch (error) {
    console.error('Panchang API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch panchang data',
        details: error instanceof Error ? error.message : 'Unknown error',
        source: 'PyJHora'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Panchang data now powered by PyJHora',
    usage: 'POST /api/panchang with { latitude: number, longitude: number, datetime?: string }',
    source: 'PyJHora'
  });
}