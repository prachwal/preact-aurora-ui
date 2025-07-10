#!/usr/bin/env node

/**
 * Script to migrate SCSS imports to centralized core.scss system
 * Replaces individual @use imports with single core.scss import
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentFiles = [
  'src/components/ThemeProvider/ThemeToggle.module.scss',
  'src/components/Snackbar/Snackbar.module.scss', 
  'src/components/Tooltip/Tooltip.module.scss',
  'src/components/Loader/Progress.module.scss',
  'src/components/Stepper/Stepper.module.scss',
  'src/components/Button/Button.module.scss',
  'src/components/Layout/Layout.module.scss',
  'src/components/DataTable/DataTable.module.scss',
  'src/components/Drawer/Drawer.module.scss',
  'src/components/Badge/Badge.module.scss',
  'src/components/Menu/Menu.module.scss',
  'src/components/AppLayout/AppLayout.module.scss',
  'src/components/Checkbox/Checkbox.module.scss',
  'src/components/IconButton/IconButton.module.scss',
  'src/components/Header/Header.module.scss',
  'src/components/Radio/Radio.module.scss',
  'src/components/Container/Container.module.scss'
];

const pageFiles = [
  'src/pages/ComponentsPage/ComponentsPage.module.scss',
  'src/pages/DocsHomepage/DocsHomepage.module.scss',
  'src/pages/ReadmePage/ReadmePage.module.scss'
];

function migrateFile(filePath) {
  const fullPath = path.resolve(filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Pattern for individual imports
  const importPatterns = [
    /@use\s+["']\.\.\/styles\/colors\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/typography\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/spacing\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/breakpoints\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/mixins-enhanced\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/\.\.\/components\/styles\/colors-extended\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/\.\.\/components\/styles\/typography\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/\.\.\/components\/styles\/spacing\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/\.\.\/components\/styles\/tokens\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/\.\.\/components\/styles\/breakpoints\.scss["']\s+as\s+\*;\s*/g
  ];

  // Remove all individual imports
  importPatterns.forEach(pattern => {
    const before = content;
    content = content.replace(pattern, '');
    if (before !== content) modified = true;
  });

  // Check if core.scss import already exists
  const hasCoreImport = content.includes("@use '../styles/core.scss'") || 
                        content.includes('@use "../styles/core.scss"') ||
                        content.includes("@use '../../components/styles/core.scss'") ||
                        content.includes('@use "../../components/styles/core.scss"');

  if (modified && !hasCoreImport) {
    // Determine the correct import path
    const isPageFile = filePath.includes('/pages/');
    const coreImport = isPageFile 
      ? "@use '../../components/styles/core.scss' as *;\n"
      : "@use '../styles/core.scss' as *;\n";

    // Add core import at the beginning
    content = coreImport + content;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Migrated: ${filePath}`);
    return true;
  } else {
    console.log(`⚪ No changes needed: ${filePath}`);
    return false;
  }
}

function main() {
  console.log('🚀 Starting SCSS import migration...\n');
  
  let migratedCount = 0;
  const allFiles = [...componentFiles, ...pageFiles];

  allFiles.forEach(filePath => {
    if (migrateFile(filePath)) {
      migratedCount++;
    }
  });

  console.log(`\n📊 Migration complete!`);
  console.log(`✅ Migrated: ${migratedCount} files`);
  console.log(`⚪ No changes: ${allFiles.length - migratedCount} files`);
  console.log(`📁 Total processed: ${allFiles.length} files`);
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile };
