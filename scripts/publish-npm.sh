#!/bin/bash

# Aurora UI - Simple NPM Publish Script
# Builds components and publishes to NPM

set -e

echo "🚀 Aurora UI - NPM Publish Process"
echo "=================================="

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/components

# Build TypeScript components
echo "📦 Building TypeScript components..."
npm run build:components

# Copy SCSS files to dist
echo "🎨 Copying SCSS files..."
mkdir -p dist/components/styles
cp -r src/components/styles/* dist/components/styles/

# Remove any test files from styles
find dist/components/styles -name "*.test.*" -delete

# Copy component SCSS files
find src/components -name "*.scss" -not -path "*/styles/*" | while read -r file; do
    rel_path=${file#src/components/}
    target_dir="dist/components/components/$(dirname "$rel_path")"
    mkdir -p "$target_dir"

    # Copy file and fix relative imports - handle ALL possible patterns
    sed -e "s|@use '../styles/|@use '../../styles/|g" \
        -e 's|@use "../styles/|@use "../../styles/|g' \
        -e "s|@use '../styles|@use '../../styles|g" \
        -e 's|@use "../styles|@use "../../styles|g' \
        -e "s|@import '../styles/|@import '../../styles/|g" \
        -e 's|@import "../styles/|@import "../../styles/|g' \
        -e "s|@import '../styles|@import '../../styles|g" \
        -e 's|@import "../styles|@import "../../styles|g' \
        -e "s|'../styles/|'../../styles/|g" \
        -e 's|"../styles/|"../../styles/|g' \
        -e "s|'../styles|'../../styles|g" \
        -e 's|"../styles|"../../styles|g' "$file" > "dist/components/components/$rel_path"
    echo "  ✅ Copied and fixed imports: $rel_path"
done

# Copy README files
echo "📚 Copying README files..."
find src/components -name "README.md" | while read -r file; do
    rel_path=${file#src/components/}
    target_dir="dist/components/components/$(dirname "$rel_path")"
    mkdir -p "$target_dir"
    cp "$file" "dist/components/components/$rel_path"
    echo "  ✅ Copied: $rel_path"
done

echo ""
echo "📊 Build Summary:"
echo "  📦 JS files: $(find dist/components -name "*.js" | wc -l)"
echo "  🎨 SCSS files: $(find dist/components -name "*.scss" | wc -l)"
echo "  📚 README files: $(find dist/components -name "README.md" | wc -l)"
echo "  📄 Type definitions: $(find dist/components -name "*.d.ts" | wc -l)"

echo ""
echo "🚀 Publishing to NPM..."
npm publish

echo ""
echo "✅ Published successfully!"
