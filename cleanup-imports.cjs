#!/usr/bin/env node

/**
 * Clean up duplicate imports after migration
 */

const fs = require('fs');

const componentFiles = [
  'src/components/Footer/Footer.module.scss',
  'src/components/Chip/Chip.module.scss',
  'src/components/Tabs/Tabs.module.scss',
  'src/components/Card/Card.module.scss',
  'src/components/Switch/Switch.module.scss',
  'src/components/TextField/TextField.module.scss',
  'src/components/Grid/Grid.module.scss',
  'src/components/Grid/Col.module.scss',
  'src/components/Grid/Row.module.scss',
  'src/components/Content/Content.module.scss',
  'src/components/Breadcrumbs/Breadcrumbs.module.scss',
  'src/components/PageHeader/PageHeader.module.scss',
  'src/components/Sidebar/Sidebar.module.scss',
  'src/components/Sidebar/SidebarToggle.module.scss',
  'src/components/BottomNavigation/BottomNavigation.module.scss',
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
];

function cleanupFile(filePath) {
  const fullPath = require('path').resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Remove duplicate imports that should be in core.scss
  const duplicateImports = [
    /@use\s+["']\.\.\/styles\/breakpoints\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/mixins-enhanced\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/tokens\.scss["']\s+as\s+\*;\s*/g,
    /@use\s+["']\.\.\/styles\/utilities\.scss["']\s+as\s+\*;\s*/g,
  ];

  duplicateImports.forEach((pattern) => {
    content = content.replace(pattern, '');
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Cleaned: ${filePath}`);
    return true;
  } else {
    console.log(`⚪ No cleanup needed: ${filePath}`);
    return false;
  }
}

function main() {
  console.log('🧹 Cleaning up duplicate imports...\n');

  let cleanedCount = 0;

  componentFiles.forEach((filePath) => {
    if (cleanupFile(filePath)) {
      cleanedCount++;
    }
  });

  console.log(`\n📊 Cleanup complete!`);
  console.log(`✅ Cleaned: ${cleanedCount} files`);
  console.log(`📁 Total processed: ${componentFiles.length} files`);
}

if (require.main === module) {
  main();
}
