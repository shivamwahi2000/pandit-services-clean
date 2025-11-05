# Oracle VM Setup Instructions

## Prerequisites for Building on Oracle Linux

To successfully build this application on Oracle Linux/RHEL, you need to install Python development headers, a C compiler, and Node.js.

### Install Required System Packages

Run these commands as root or with sudo:

```bash
# Install Python development headers and GCC
sudo yum install python3-devel gcc python3-pip git

# Install Node.js (version 18 or higher recommended)
# Using NodeSource repository:
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs

# Verify installations
node --version
npm --version
python3 --version
gcc --version
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

After installing the prerequisites:

```bash
# Install Node.js dependencies
npm install

# Build the application
npm run build

# Start the production server
npm start
```

## What Gets Installed

The build process will install:
- **pyswisseph**: Swiss Ephemeris library for astronomical calculations (requires compilation)
- **python-dateutil**: Date/time utilities
- **numpy**: Numerical computing library
- **pytz**: Timezone library
- **PyJHora**: Vedic astrology library from GitHub

## Troubleshooting

### `next: command not found`

This means Node.js is not installed or not in your PATH. Install Node.js as shown above.

### If pyswisseph fails to compile:

The most common issue is missing Python development headers. Install with:
```bash
sudo yum install python3-devel gcc
```

The build will continue even if pyswisseph fails - it's only needed for advanced astrology features.

### If PyJHora installation fails:

The script will continue without PyJHora. This is typically due to:
- Network connectivity issues
- GitHub repository access problems
- Git not being installed

### Permission denied errors:

If you get permission errors, you may need to change ownership of the project directory:
```bash
sudo chown -R $USER:$USER /path/to/pandit-services-clean
```

## Current Python Version

The Oracle VM is running Python 3.6. All dependencies have been selected for compatibility with Python 3.6.

## Quick Setup Script

Run this all-in-one setup command on your Oracle VM:

```bash
# Install all prerequisites
sudo yum install -y python3-devel gcc python3-pip git && \
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - && \
sudo yum install -y nodejs && \
npm install && \
npm run build
```
