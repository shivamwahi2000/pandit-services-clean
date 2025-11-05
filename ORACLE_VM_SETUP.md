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

## Recommended: Upgrade Python to 3.9+

Python 3.6 is EOL (end of life) and causes many compatibility issues. **Strongly recommended** to upgrade to Python 3.9 or higher.

### Install Python 3.9 on Oracle Linux 8+:

```bash
# Install Python 3.9
sudo yum install -y python39 python39-devel python39-pip

# Set Python 3.9 as default (optional)
sudo alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1
sudo alternatives --install /usr/bin/pip3 pip3 /usr/bin/pip3.9 1

# Verify
python3 --version  # Should show Python 3.9.x
```

### Install Python 3.9 on Oracle Linux 7:

```bash
# Enable Software Collections
sudo yum install -y centos-release-scl

# Install Python 3.9
sudo yum install -y rh-python39 rh-python39-python-devel

# Enable Python 3.9
scl enable rh-python39 bash

# Or add to .bashrc for permanent:
echo 'source scl_source enable rh-python39' >> ~/.bashrc
```

**Benefits of upgrading:**
- PySwisseph compiles more reliably
- Modern numpy versions with better performance
- Better package compatibility overall
- Security updates and bug fixes

## Quick Setup Script

### For Oracle Linux 8+ (Recommended - with Python 3.9):

```bash
# Install Python 3.9 and all prerequisites
sudo yum install -y python39 python39-devel python39-pip gcc git && \
sudo alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1 && \
sudo alternatives --install /usr/bin/pip3 pip3 /usr/bin/pip3.9 1 && \
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - && \
sudo yum install -y nodejs && \
cd ~/pandit-services-clean && \
npm install && \
npm run build
```

### For Oracle Linux with Python 3.6 (Legacy):

```bash
# Install all prerequisites (will have more issues)
sudo yum install -y python3-devel gcc python3-pip git && \
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - && \
sudo yum install -y nodejs && \
cd ~/pandit-services-clean && \
npm install && \
npm run build
```
