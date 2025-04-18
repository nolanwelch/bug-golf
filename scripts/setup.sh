#!/bin/sh
set -e

# Install dependencies
npm install

# Wrangler login
if ! npx wrangler whoami 2>/dev/null | grep -q "You are logged in"; then
  npx wrangler login --callback-host 0.0.0.0 --browser false
fi