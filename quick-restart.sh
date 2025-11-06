#!/bin/bash

# Quick Restart Script - Just restart PM2 without rebuilding
# Use this when you only made minor changes that don't require a rebuild

echo "🔄 Quick restarting app..."

cd ~/pandit-services-clean || { echo "❌ Project directory not found"; exit 1; }

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Restart PM2
echo "🔄 Restarting PM2..."
pm2 restart pandit-services

echo "✅ App restarted!"
pm2 status pandit-services
