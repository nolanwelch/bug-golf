#!/bin/sh
set -e

# Install global dependencies
npm install -g cross-env

# Install project dependencies
npm install && npx prisma generate

# Wrangler login
if ! npx wrangler whoami 2>/dev/null | grep -q "You are logged in"; then
    npx wrangler login --callback-host 0.0.0.0 --browser false
fi
