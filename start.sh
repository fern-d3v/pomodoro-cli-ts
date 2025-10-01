#!/bin/bash
# Quick start script for Pomodoro Timer

echo "🍅 Starting Pomodoro Timer..."
echo "Make sure you have bun installed: https://bun.sh"
echo ""

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed. Please install it first:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
fi

# Start the timer
echo "🚀 Starting timer..."
bun run dev