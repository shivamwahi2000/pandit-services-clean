#!/bin/bash

echo "🚀 Setting up Pandit Services Website (Clean Version)"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Python 3 version: $(python3 --version)"

# Install Node.js dependencies
echo ""
echo "📦 Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Node.js dependencies installed successfully"
else
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi

# Install Python dependencies
echo ""
echo "🐍 Installing Python dependencies for PyJHora..."
pip3 install jhora swisseph

if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed successfully"
else
    echo "❌ Failed to install Python dependencies"
    echo "💡 You may need to install PyJHora manually:"
    echo "   pip3 install jhora swisseph"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🏃 To start the development server:"
echo "   npm run dev"
echo ""
echo "🌐 The website will be available at:"
echo "   http://localhost:3000"
echo ""
echo "📚 Key features:"
echo "   ✅ PyJHora-powered panchang calculations"
echo "   ✅ Accurate moonrise/moonset times"
echo "   ✅ 4 animated service banners"
echo "   ✅ Complete Vedic astrology system"
echo "   ✅ No ProKerala dependencies"