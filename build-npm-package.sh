#!/bin/bash

# Aurora UI - NPM Package Build Script
# Buduje pakiet NPM z komponentów znajdujących się w src/components

set -e  # Exit on any error

echo "🚀 Building Aurora UI NPM Package..."

# Zmienne
DIST_DIR="dist"
SRC_COMPONENTS="src/components"
DOCS_COMPONENTS="docs/components"

# Cleanup
echo "🧹 Cleaning up previous build..."
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Build TypeScript components
echo "📦 Building TypeScript components..."
npx tsc --project tsconfig.build.json

# Move compiled files from dist/components to dist root
echo "📁 Restructuring build output..."
if [ -d "$DIST_DIR/components" ]; then
    # Move all component directories to dist root
    mv "$DIST_DIR/components"/* "$DIST_DIR/"
    rmdir "$DIST_DIR/components"
fi

# Move hooks if compiled separately
if [ -d "$DIST_DIR/hooks" ]; then
    echo "  ✅ Hooks found in build output"
else
    echo "  ⚠️  Hooks not found in build output"
fi

# Move types if compiled separately
if [ -d "$DIST_DIR/types" ]; then
    echo "  ✅ Types found in build output"
else
    echo "  ⚠️  Types not found in build output"
fi

# Copy global styles if they were compiled
if [ -d "$DIST_DIR/styles" ]; then
    echo "  ✅ Global styles found in build output"
else
    # Copy global styles manually if not compiled
    if [ -d "src/styles" ]; then
        cp -r "src/styles" "$DIST_DIR/"
        echo "  ✅ Copied: src/styles -> dist/styles"
    fi
fi

# Copy SCSS files
echo "🎨 Copying SCSS files..."
find "$SRC_COMPONENTS" -name "*.scss" -type f | while read -r file; do
    # Get relative path from src/components
    rel_path=${file#$SRC_COMPONENTS/}
    target_dir="$DIST_DIR/$(dirname "$rel_path")"
    mkdir -p "$target_dir"
    cp "$file" "$DIST_DIR/$rel_path"
    echo "  ✅ Copied: $rel_path"
done

# Copy global styles
echo "🎨 Copying global styles..."
if [ -d "src/styles" ]; then
    cp -r "src/styles" "$DIST_DIR/"
    echo "  ✅ Copied: src/styles -> dist/styles"
fi

# Copy README files from components
echo "📚 Copying component README files..."
find "$SRC_COMPONENTS" -name "README.md" -type f | while read -r file; do
    rel_path=${file#$SRC_COMPONENTS/}
    target_dir="$DIST_DIR/$(dirname "$rel_path")"
    mkdir -p "$target_dir"
    cp "$file" "$DIST_DIR/$rel_path"
    echo "  ✅ Copied: $rel_path"
done

# Copy main README for components
echo "📚 Copying main components README..."
if [ -f "$SRC_COMPONENTS/README.md" ]; then
    cp "$SRC_COMPONENTS/README.md" "$DIST_DIR/README.md"
    echo "  ✅ Copied: src/components/README.md -> dist/README.md"
fi

# Generate package.json for NPM
echo "📄 Generating package.json for NPM..."
cat > "$DIST_DIR/package.json" << EOF
{
  "name": "preact-aurora-ui",
  "version": "$(node -p "require('./package.json').version")",
  "description": "Modern Preact UI component library following Material Design 3 principles",
  "main": "index.js",
  "module": "index.js",
  "types": "index.d.ts",
  "files": [
    "**/*.js",
    "**/*.d.ts",
    "**/*.scss",
    "**/*.md",
    "styles/**/*"
  ],
  "keywords": [
    "preact",
    "ui",
    "components",
    "material-design",
    "md3",
    "typescript",
    "scss"
  ],
  "author": "$(node -p "require('./package.json').author || 'Aurora UI Team'")",
  "license": "$(node -p "require('./package.json').license || 'MIT'")",
  "repository": {
    "type": "git",
    "url": "$(node -p "require('./package.json').repository?.url || ''")"
  },
  "peerDependencies": {
    "preact": "^10.0.0"
  },
  "sideEffects": [
    "**/*.scss"
  ]
}
EOF

# Generate main index.js
echo "📄 Generating main index file..."
cat > "$DIST_DIR/index.js" << 'EOF'
// Aurora UI - Main Export File
// Auto-generated - do not edit manually

// Export all components
EOF

# Generate main index.d.ts
cat > "$DIST_DIR/index.d.ts" << 'EOF'
// Aurora UI - Main Types Export File
// Auto-generated - do not edit manually

// Export all component types
EOF

# Dynamically add exports to index files
echo "🔗 Adding component exports..."
find "$DIST_DIR" -name "index.js" -not -path "$DIST_DIR/index.js" | while read -r file; do
    # Get component directory name
    component_dir=$(dirname "$file")
    component_name=$(basename "$component_dir")

    # Skip if it's the styles directory
    if [ "$component_name" = "styles" ]; then
        continue
    fi

    # Get relative path for import
    rel_path=$(realpath --relative-to="$DIST_DIR" "$component_dir")

    # Add export to main index.js
    echo "export * from './$rel_path';" >> "$DIST_DIR/index.js"
    echo "export * from './$rel_path';" >> "$DIST_DIR/index.d.ts"

    echo "  ✅ Added export: $component_name"
done

# Add exports for hooks directory (even if no index.js exists)
echo "🔗 Adding hooks exports..."
if [ -d "$DIST_DIR/hooks" ]; then
    # Add specific hook exports
    find "$DIST_DIR/hooks" -name "*.js" -not -name "*.test.*" | while read -r file; do
        hook_file=$(basename "$file" .js)
        echo "export * from './hooks/$hook_file';" >> "$DIST_DIR/index.js"
        echo "export * from './hooks/$hook_file';" >> "$DIST_DIR/index.d.ts"
        echo "  ✅ Added hook export: $hook_file"
    done
fi

# Add exports for types directory
echo "🔗 Adding types exports..."
if [ -d "$DIST_DIR/types" ]; then
    echo "export * from './types';" >> "$DIST_DIR/index.js"
    echo "export * from './types';" >> "$DIST_DIR/index.d.ts"
    echo "  ✅ Added types export"
fi

# Fix import paths in .d.ts files
echo "🔧 Fixing import paths in .d.ts files..."
find "$DIST_DIR" -name "*.d.ts" -not -path "$DIST_DIR/index.d.ts" | while read -r file; do
    # Get relative path from the file to the dist root
    dir_path=$(dirname "$file")
    relative_path=$(realpath --relative-to="$dir_path" "$DIST_DIR")

    # Fix imports from '../../types/theme' to '../types/theme' (or appropriate relative path)
    if grep -q "from '[\.\/]*\.\./\.\./types" "$file"; then
        # Calculate correct relative path to types
        if [ "$relative_path" = "." ]; then
            # File is in dist root
            types_path="./types"
        else
            # File is in subdirectory
            types_path="$relative_path/types"
        fi

        # Replace the incorrect paths
        sed -i "s|from '[\.\/]*\.\./\.\./types|from '$types_path|g" "$file"
        echo "  ✅ Fixed imports in: $(basename "$file")"
    fi
done

# Fix duplicate exports issue - remove types export from main index if ThemeProvider already exports them
echo "🔧 Fixing duplicate type exports..."
if [ -f "$DIST_DIR/index.d.ts" ]; then
    # Comment out the duplicate types export temporarily to avoid conflicts
    sed -i 's|^export \* from '\''./types'\'';$|// export * from '\''./types'\''; // Temporarily disabled to avoid conflicts with ThemeProvider|g' "$DIST_DIR/index.d.ts"
    echo "  ✅ Temporarily disabled types export to avoid conflicts"
fi

# Copy .npmignore if exists
if [ -f ".npmignore" ]; then
    cp ".npmignore" "$DIST_DIR/"
    echo "  ✅ Copied: .npmignore"
fi

# Generate .npmignore if it doesn't exist
if [ ! -f "$DIST_DIR/.npmignore" ]; then
    cat > "$DIST_DIR/.npmignore" << 'EOF'
# Development files
*.test.js
*.test.d.ts
*.stories.js
*.stories.d.ts
**/*.test.*
**/*.stories.*

# Source maps
*.map

# Documentation (keep component READMEs)
docs/
*.development.md

# Build artifacts
node_modules/
.git/
EOF
    echo "  ✅ Generated: .npmignore"
fi

# Generate DOCS.md with local paths for NPM package
echo "📄 Generating DOCS.md with local documentation paths..."
cat > "$DIST_DIR/DOCS.md" << 'EOF'
# Aurora UI - Dokumentacja lokalnie

Po zainstalowaniu pakietu `preact-aurora-ui`, dokumentacja jest dostępna w:

## 📚 Dokumentacja komponentów

EOF

# Add local documentation paths
find "$DIST_DIR" -name "README.md" -not -path "$DIST_DIR/README.md" -not -path "$DIST_DIR/DOCS.md" | sort | while read -r file; do
    # Get component name from path
    component_name=$(basename "$(dirname "$file")")
    if [ "$component_name" != "styles" ]; then
        echo "- **$component_name**: \`node_modules/preact-aurora-ui/$component_name/README.md\`" >> "$DIST_DIR/DOCS.md"
    fi
done

echo "" >> "$DIST_DIR/DOCS.md"
echo "## 🌐 Dokumentacja online" >> "$DIST_DIR/DOCS.md"
echo "" >> "$DIST_DIR/DOCS.md"
echo "Pełna dokumentacja dostępna na: [GitHub](https://github.com/prachwal/preact-aurora-ui)" >> "$DIST_DIR/DOCS.md"
echo "  ✅ Generated: DOCS.md with local paths"

# Display build summary
echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "📊 Build Summary:"
echo "  📁 Output directory: $DIST_DIR/"
echo "  📦 Components built: $(find "$DIST_DIR" -name "*.js" -not -name "index.js" | wc -l)"
echo "  🎨 SCSS files: $(find "$DIST_DIR" -name "*.scss" | wc -l)"
echo "  📚 README files: $(find "$DIST_DIR" -name "README.md" | wc -l)"
echo "  📄 TypeScript definitions: $(find "$DIST_DIR" -name "*.d.ts" | wc -l)"
echo ""
echo "🚀 Ready for NPM publishing!"
echo "   Run: cd $DIST_DIR && npm publish"
echo ""
