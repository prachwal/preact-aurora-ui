#!/bin/bash

# Aurora UI - Quick NPM Publish Script
# Builds and publishes the package to NPM

set -e

echo "🚀 Aurora UI - NPM Publish Process"
echo "=================================="

# Build the package
echo "📦 Step 1/3: Building NPM package..."
./build-npm-package.sh

# Change to dist directory
cd dist

echo ""
echo "📋 Step 2/3: Package contents preview:"
echo "-------------------------------------"
ls -la

echo ""
echo "📄 Package.json preview:"
echo "------------------------"
cat package.json | head -20

echo ""
echo "🤔 Step 3/3: Ready to publish?"
echo "------------------------------"
echo "Review the package contents above."
echo ""
echo "To publish:"
echo "  - For testing: npm publish --dry-run"
echo "  - For real: npm publish"
echo ""
echo "Commands to run from dist/ directory:"
echo "  cd dist"
echo "  npm publish --dry-run  # Test run"
echo "  npm publish           # Real publish"
echo ""
