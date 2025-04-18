FROM node:23-slim

# Install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Vite
EXPOSE 5173
# Wrangler auth callback
EXPOSE 8976

# node user
USER 1000