# Oracle VM Setup Instructions

## Prerequisites for Building on Oracle Linux

To successfully build this application on Oracle Linux/RHEL, you need to install Python development headers and a C compiler.

### Install Required System Packages

Run these commands as root or with sudo:

```bash
# Install Python development headers
sudo yum install python3-devel

# Install GCC compiler
sudo yum install gcc

# Install other build essentials (optional but recommended)
sudo yum install python3-pip
```

### Verify Installation

Check that Python development headers are installed:

```bash
python3-config --includes
```

This should output something like:
```
-I/usr/include/python3.6m -I/usr/include/python3.6m
```

## Build Process

After installing the prerequisites, you can run:

```bash
npm run build
```

## What Gets Installed

The build process will install:
- **pyswisseph**: Swiss Ephemeris library for astronomical calculations (requires compilation)
- **python-dateutil**: Date/time utilities
- **numpy**: Numerical computing library
- **pytz**: Timezone library
- **PyJHora**: Vedic astrology library from GitHub

## Troubleshooting

### If pyswisseph fails to compile:

The most common issue is missing Python development headers. Make sure you've installed `python3-devel` as shown above.

### If PyJHora installation fails:

The script will continue without PyJHora, but astrology features may not work. This is typically due to:
- Network connectivity issues
- GitHub repository access problems
- Git not being installed

Install git if needed:
```bash
sudo yum install git
```

## Current Python Version

The Oracle VM is running Python 3.6. All dependencies have been selected for compatibility with Python 3.6.
