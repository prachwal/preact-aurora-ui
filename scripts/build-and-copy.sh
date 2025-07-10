#!/bin/bash
set -e

# Clean dist and TypeScript cache
rm -rf dist node_modules/.tmp

# Build TypeScript
tsc -p tsconfig.build.json --outDir dist/components

# Fix structure: Move files from dist/components/components/* to dist/components/*
if [ -d "dist/components/components" ]; then
    # Move all files from the nested structure to the correct location
    for component_dir in dist/components/components/*/; do
        component_name=$(basename "$component_dir")
        # Copy JS and TS files to the top-level component directory
        if [ -d "$component_dir" ]; then
            cp "$component_dir"*.js "$component_dir"*.d.ts "dist/components/$component_name/" 2>/dev/null || true
        fi
    done
    # Remove the nested components directory
    rm -rf dist/components/components
fi

# Copy all .module.scss files to dist/components, preserving structure
find src/components -name '*.module.scss' -exec bash -c 'mkdir -p dist/components/$(dirname ${1#src/components/}) && cp $1 dist/components/$(dirname ${1#src/components/})/' _ {} \;

# Copy global SCSS files to dist/styles
mkdir -p dist/styles
cp src/components/styles/*.scss dist/styles/

echo "Build and style copy complete."
