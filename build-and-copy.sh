#!/bin/bash
set -e

# Clean dist and TypeScript cache
rm -rf dist node_modules/.tmp

# Build TypeScript
tsc -p tsconfig.build.json

# Copy all .module.scss files to dist/components, preserving structure
find src/components -name '*.module.scss' -exec bash -c 'mkdir -p dist/components/$(dirname ${1#src/components/}) && cp $1 dist/components/$(dirname ${1#src/components/})/' _ {} \;

# Copy global SCSS files to dist/styles
mkdir -p dist/styles
cp src/components/styles/*.scss dist/styles/

echo "Build and style copy complete."
