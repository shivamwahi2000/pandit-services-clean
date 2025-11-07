import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, month, latitude, longitude } = body;

    // Default to Mumbai if no coordinates provided
    const coords = {
      latitude: latitude || 19.0821978,
      longitude: longitude || 72.7411014
    };

    console.log(`Panchang Month API: Calculating for ${year}-${month} at coordinates:`, coords);

    // Create Python script to calculate panchang for entire month
    const pythonScript = `
import json
import sys
import calendar

try:
    from jhora.panchanga import drik
    from jhora.utils import julian_day_number

    year = ${year}
    month = ${month + 1}  # JavaScript months are 0-indexed, Python are 1-indexed

    # Create place object
    place = drik.Place('Location', ${coords.latitude}, ${coords.longitude}, 5.5)

    # Get number of days in month
    days_in_month = calendar.monthrange(year, month)[1]

    month_data = []

    # Calculate for each day
    for day in range(1, days_in_month + 1):
        try:
            # Calculate Julian Day for noon (12:00) of each day
            jd = julian_day_number((year, month, day), (12, 0, 0))

            # Get tithi
            tithi_info = drik.tithi(jd, place)

            tithi_names = [
                "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami",
                "Navami", "Dashami", "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Purnima",
                "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami",
                "Navami", "Dashami", "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Amavasya"
            ]

            if tithi_info and len(tithi_info) >= 2:
                raw_name = tithi_info[0] if tithi_info[0] else "Unknown"
                raw_num = tithi_info[1] if tithi_info[1] else 0

                if isinstance(raw_name, (int, float)) or (isinstance(raw_name, str) and raw_name.isdigit()):
                    tithi_num = int(raw_name)
                else:
                    tithi_num = int(raw_num) if raw_num else 0

                if tithi_num <= 0:
                    tithi_num = 1
                elif tithi_num > 30:
                    tithi_num = tithi_num % 30 if tithi_num % 30 != 0 else 30

                # Determine paksha
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
                        name_index = tithi_num - 16
                        tithi_name = tithi_names[name_index] if name_index < 14 else "Chaturdashi"
            else:
                tithi_name = "Unknown"
                tithi_num = 0
                paksha = "Unknown"

            # Get nakshatra
            nakshatra_info = drik.nakshatra(jd, place)
            nakshatra_names = [
                "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
                "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
                "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
                "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
                "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
            ]

            nakshatra_num = nakshatra_info[1] % 27 if nakshatra_info and len(nakshatra_info) > 1 else 0
            nakshatra_name = nakshatra_names[nakshatra_num]

            month_data.append({
                "date": day,
                "tithi": tithi_name,
                "tithiNumber": tithi_num,
                "paksha": paksha,
                "nakshatra": nakshatra_name
            })

        except Exception as day_error:
            month_data.append({
                "date": day,
                "tithi": "Error",
                "tithiNumber": 0,
                "paksha": "Unknown",
                "nakshatra": "Unknown"
            })

    print(json.dumps({"success": True, "data": month_data}))

except Exception as e:
    print(json.dumps({"success": False, "error": str(e)}))
`;

    // Execute Python script
    const pythonCmd = process.env.PYTHON_CMD || 'python3';
    const python = spawn(pythonCmd, ['-c', pythonScript], {
      env: { ...process.env, PYTHONPATH: process.env.PYTHONPATH || '' }
    });

    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      const dataStr = data.toString();
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

    console.log(`Panchang Month API: Successfully calculated ${result.data.length} days`);

    return NextResponse.json({
      success: true,
      data: result.data,
      source: 'PyJHora',
      year,
      month
    });

  } catch (error) {
    console.error('Panchang Month API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch month panchang data',
        details: error instanceof Error ? error.message : 'Unknown error',
        source: 'PyJHora'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Panchang month data powered by PyJHora',
    usage: 'POST /api/panchang-month with { year: number, month: number (0-11), latitude?: number, longitude?: number }',
    source: 'PyJHora'
  });
}
