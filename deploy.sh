#!/bin/bash

# Pandit Services Deployment Script for Oracle VM
# This script pulls latest changes, builds, and restarts the app with PM2

echo "🚀 Starting deployment process..."

# Navigate to project directory
cd ~/pandit-services-clean || { echo "❌ Project directory not found"; exit 1; }

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main || { echo "❌ Git pull failed"; exit 1; }

# Install dependencies (in case new packages were added)
echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

# Build the Next.js application
echo "🔨 Building Next.js application..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Restart PM2 process
echo "🔄 Restarting PM2 process..."
if pm2 list | grep -q "pandit-services"; then
  echo "   Found existing PM2 process, restarting..."
  pm2 restart pandit-services || { echo "❌ PM2 restart failed"; exit 1; }
else
  echo "   No existing PM2 process found, starting new one..."
  pm2 start npm --name "pandit-services" -- start || { echo "❌ PM2 start failed"; exit 1; }
fi

# Save PM2 configuration
pm2 save

echo "✅ Deployment completed successfully!"
echo "🌐 App is running on port 3000"
echo ""
echo "📊 PM2 Status:"
pm2 status pandit-services
echo ""
echo "📝 View logs with: pm2 logs pandit-services"
