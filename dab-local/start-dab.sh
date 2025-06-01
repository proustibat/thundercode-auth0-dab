#!/bin/bash

# Get the directory of this script, even when called from elsewhere
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Configuration
CONFIG_FILE="$SCRIPT_DIR/dab-config.json"
IMAGE="mcr.microsoft.com/azure-databases/data-api-builder:latest"
PORT=5000

# Config file check
if [ ! -f "$CONFIG_FILE" ]; then
  echo "❌ $CONFIG_FILE not found!"
  exit 1
fi

echo "🚀 Running Data API Builder..."
docker run --platform linux/amd64 \
  -v "$CONFIG_FILE":/App/dab-config.json \
  -e ASPNETCORE_URLS=http://+:$PORT \
  -e ASPNETCORE_FORWARDEDHEADERS_ENABLED=false \
  -p $PORT:$PORT \
  --env-file "$SCRIPT_DIR/.env" \
  $IMAGE
