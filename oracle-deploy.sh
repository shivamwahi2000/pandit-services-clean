#!/bin/bash

# Oracle Cloud Deployment Script for Pandit Services
# This script sets up Docker, Nginx, and all dependencies on Oracle Cloud ARM instance

set -e  # Exit on error

echo "=========================================="
echo "Oracle Cloud Deployment for Pandit Services"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}This script should NOT be run as root (don't use sudo)${NC}"
   echo "Run it as ubuntu user, it will ask for sudo password when needed"
   exit 1
fi

echo -e "${GREEN}Step 1: Updating system packages...${NC}"
sudo apt update
sudo apt upgrade -y

echo ""
echo -e "${GREEN}Step 2: Installing Docker...${NC}"
# Install Docker on ARM Ubuntu
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up Docker repository for ARM
echo \
  "deb [arch=arm64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add current user to docker group
sudo usermod -aG docker $USER

echo -e "${YELLOW}Note: You'll need to logout and login again for docker group to take effect${NC}"

echo ""
echo -e "${GREEN}Step 3: Installing Nginx...${NC}"
sudo apt install -y nginx

echo ""
echo -e "${GREEN}Step 4: Installing Git...${NC}"
sudo apt install -y git

echo ""
echo -e "${GREEN}Step 5: Installing additional tools...${NC}"
sudo apt install -y \
    ufw \
    fail2ban \
    htop \
    curl \
    wget \
    nano \
    net-tools

echo ""
echo -e "${GREEN}Step 6: Configuring firewall (iptables)...${NC}"
# Oracle Cloud uses iptables by default
sudo apt install -y iptables-persistent

# Allow HTTP, HTTPS, and temporarily port 3000
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 3000 -j ACCEPT

# Save iptables rules
sudo netfilter-persistent save

echo ""
echo -e "${GREEN}Step 7: Creating application directory...${NC}"
sudo mkdir -p /opt/pandit-services
sudo chown $USER:$USER /opt/pandit-services

echo ""
echo -e "${GREEN}Step 8: Setting up Docker to start on boot...${NC}"
sudo systemctl enable docker
sudo systemctl start docker

echo ""
echo -e "${GREEN}Step 9: Setting up Nginx to start on boot...${NC}"
sudo systemctl enable nginx
sudo systemctl start nginx

echo ""
echo -e "${GREEN}Step 10: Configuring system limits for Node.js...${NC}"
# Increase file descriptor limits for Node.js
echo "fs.file-max = 65536" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Server setup complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Logout and login again (for docker group to take effect)"
echo "   Run: exit"
echo "   Then SSH back in"
echo ""
echo "2. Clone your repository:"
echo "   cd /opt/pandit-services"
echo "   git clone https://github.com/YOUR_USERNAME/pandit-services-clean.git ."
echo ""
echo "3. Build Docker image:"
echo "   docker build -t pandit-services:latest ."
echo ""
echo "4. Run the container:"
echo "   docker run -d --name pandit-services --restart unless-stopped -p 3000:3000 pandit-services:latest"
echo ""
echo "5. Test the application:"
echo "   curl http://localhost:3000"
echo ""
echo "6. Configure nginx (copy nginx-oracle.conf to /etc/nginx/sites-available/)"
echo ""
echo "7. Setup SSL with certbot:"
echo "   sudo apt install certbot python3-certbot-nginx"
echo "   sudo certbot --nginx -d yourdomain.com"
echo ""
echo -e "${YELLOW}See ORACLE_CLOUD_DEPLOYMENT.md for detailed instructions${NC}"
echo ""
