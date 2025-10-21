# Multi-stage build for PyJHora + Next.js
FROM node:18-bullseye as base

# Install system dependencies for PyJHora
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Python requirements first for better caching
COPY requirements.txt ./

# Install Python dependencies with specific versions
RUN python3 -m pip install --upgrade pip setuptools wheel && \
    python3 -m pip install --no-cache-dir -r requirements.txt

# Verify PyJHora installation
RUN python3 -c "import jhora; import swisseph; print('PyJHora and Swiss Ephemeris installed successfully')"

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:18-bullseye-slim as production

# Install runtime dependencies for Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python packages from base stage
COPY --from=base /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/
COPY --from=base /usr/local/bin/ /usr/local/bin/

# Copy built application from base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/public ./public
COPY --from=base /app/requirements.txt ./

# Copy source files needed for runtime
COPY src ./src
COPY next.config.ts ./
COPY tsconfig.json ./

# Create non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nextjs

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PYTHONPATH=/usr/local/lib/python3.9/site-packages

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/panchang || exit 1

# Start the application
CMD ["npm", "start"]